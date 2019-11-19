import React ,{Component} from 'react';
import {View,Text,StyleSheet,FlatList,Alert,ActivityIndicator,TouchableOpacity,Image} from 'react-native';
import HomeHOC from '../HOC/HomeHOC';
import Colors from '../Utility/Colors';
import Axios from 'axios';
import ApiUrl from '../Utility/ApiUrl';
import AsyncStorage from '@react-native-community/async-storage';
import SavedSingleItem  from './SavedSingleItem';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CustomButton from '../CustomUI/CustomButton';

export default class SavedItem extends Component {

    static navigationOptions = ({ navigation }) => ({
        
        title:"Saved Items",
        headerTitleStyle: {
            color: 'black',
            alignSelf: 'center',
            textAlign: 'center',
            fontSize: 15,
            fontWeight:"bold"
           
        },
        headerLeft:(
            <TouchableOpacity
              onPress={()=>{navigation.navigate("HomeScreen")}}
            >
              <Image source={require('../../Assets/back-arrow.png')} style={{width:24,height:24,marginLeft:20}}/>
             
            </TouchableOpacity>
          
        )
     
    });

    constructor(props){
        super(props);
        this.state={
            saved_item:[],
            d:[],
            dataNotFound:false,
            errorMsg:"",
            final_checkbox_for_estimation:"",
            loading:false,
        }
    }

    async componentDidMount(){

        const value = await AsyncStorage.getItem('token');
        var formdata = {
            user_id : JSON.parse(value)
        }
        this.setState({loading:true})
        Axios.post(ApiUrl.base_url + ApiUrl.saved_data,formdata).then(res => {

            this.setState({loading:false})

            console.log("response ", res.data);
            if(res.data.status == 'SUCCESS'){
               
               var new_response = [...res.data.data];
               new_response.forEach(element => {
                   
                    Object.assign({final_check:false},element);
               });

                this.setState({saved_item:new_response},()=>{
                    console.log("savedd_ite data",this.state.saved_item);
                });
                
            }else{

                this.setState({dataNotFound:true},()=>{

                    this.setState({errorMsg:"No Saved Items Found."})

                });

            }

        }).catch(error => {
            this.setState({loading:false});
            console.log("error",error)
           Alert.alert(
                'Saved Item',
                "Check Your Network Connection .! And try again later .",
                [
            
                {text: 'OK', onPress: () => {}},
                
                ], 
                { cancelable: false }
                )

        });
    }

    renderItem = (data) =>{
        let { item, index } = data;
        
        return(
           <SavedSingleItem data={item} onRefreshPage={()=>this.onRefreshPage()} checkFinal={this.checkFinal}/>
        )
    }

    checkFinal =(id) =>{

        console.log("id =>",id);
        var newValues ;
        var value = this.state.final_checkbox_for_estimation ;
        var removedValues;


        var saved_item  = [...this.state.saved_item];

        saved_item.forEach(element => {

            if(element.id ==  id){
                if(element.final_check){
                    element.final_check = false;
                    removedValues = this.removeValue(this.state.final_checkbox_for_estimation,element.id,",");
                    this.setState({final_checkbox_for_estimation:removedValues},()=>{
                        console.log("final_checkbox_for_estimation removed id =>",this.state.final_checkbox_for_estimation);
                    })

                }else{
                    element.final_check = true;
                    if(value ==  ""){
                        this.setState({final_checkbox_for_estimation:element.id},()=>{
                            console.log("final_checkbox_for_estimation =>",this.state.final_checkbox_for_estimation);
                        })
                    }else{
                        newValues = [value,element.id].join(",");
    
                        this.setState({final_checkbox_for_estimation:newValues},()=>{
                            console.log("final_checkbox_for_estimation =>",this.state.final_checkbox_for_estimation);
                        })
                    }
                   
                }
                
            }
            
        });

        this.setState({saved_item:saved_item});





    }

    removeValue = (list, value, separator) => {
        // separator = separator || ",";
        var values = list.split(separator);
        for(var i = 0 ; i < values.length ; i++) {
          if(values[i] == value) {
            values.splice(i, 1);
            return values.join(separator);
          }
        }
        return list;
      }


    onRefreshPage= () =>{

        this.componentDidMount();
    }

    submit= () =>{
        console.log("submitted...");
        this.props.navigation.navigate("FinalEstimate",{final_check_box:this.state.final_checkbox_for_estimation});


      
    }


    render(){
        return(
            <View style={styles.container}>
                    <View style={{flexDirection:"row",justifyContent:"space-between",justifyContent:"space-between",height:null}}>
                        <Text style={{fontSize:15,fontWeight:"bold",margin:10,flex:2}}>Please select the rows for final estimation.</Text>
                        <CustomButton text="Submit" onPressHandler={()=>{this.submit()}} btn_style={{alignSelf:"flex-start",marginTop:10,height:50,width:"40%"}}/>
                    </View>
                <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>


                <View style={{height:null,}}>

             
                    <FlatList
                        data={this.state.saved_item}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={(item) =>this.renderItem(item)}
                        style={{paddingBottom:10,marginTop:10}}
                        
                        />

                    {this.state.dataNotFound ?
                        <Text style={{alignContent:"center",fontSize:17,fontWeight:"bold",alignSelf:"center",textAlignVertical:"center",justifyContent:"center"}}>{this.state.errorMsg}</Text>
                    :
                        <View/>
                    }

                    </View>

                </KeyboardAwareScrollView>
                {
                    this.state.loading  &&
                    <View
                        style={[
                        StyleSheet.absoluteFill,
                        { backgroundColor: 'rgba(0, 0, 0, 0.7)', justifyContent: 'center' }
                        ]}
                    >
                        <ActivityIndicator size="large" />
                    </View>
                            
                }  
            </View>

        )
    }
}

// export default HomeHOC(SavedItem,{title :"Saved Items",header_color:"white", image_name :require('../../Assets/back-arrow.png') ,hamburger:false ,saved_item:1,submit:this.submit()});


const styles = StyleSheet.create({

    container:{
        
        backgroundColor: 'transparent',
        flex:1,
        paddingRight:20,
        paddingLeft:20,
        
      
    },

   
})