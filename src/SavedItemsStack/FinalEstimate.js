import React,{Component} from 'react';
import {View,Text,StyleSheet,FlatList,TouchableOpacity,Image,ActivityIndicator,Alert} from 'react-native';
import CustomButton from '../CustomUI/CustomButton';
import { CustomTextInput } from '../CustomUI/CustomTextInput';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Axios from 'axios';
import ApiUrl from '../Utility/ApiUrl';
import FinalEstimateItem from './FinalEstimateItem';
import AsyncStorage from '@react-native-community/async-storage';


export default class FinalEstimate  extends Component {


    static navigationOptions = ({ navigation }) => ({
        
        title:"Final Estimate",
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
        this.state = {
            loading:false,
            saved_item:[],
            total_amount:""
        }
    }

    componentDidMount(){

        var formdata = new FormData();
        formdata.append("cart_id",this.props.navigation.getParam('final_check_box',""));
         this.setState({loading:true});
 
         Axios.post(ApiUrl.base_url + ApiUrl.total_price_estimation,formdata).then(response =>{
             this.setState({loading:false});
             if(response.data.status == "SUCCESS"){
 
                this.setState({saved_item:response.data.data.saved_item})
                this.setState({total_amount:response.data.data.total_price.total})
 
 
             }else{
 
                 Alert.alert(
                     'Error',
                     "Something went wrong! . Please try again later.",
                     [
                 
                     {text: 'OK', onPress: () => {}},
                     
                     ], 
                     { cancelable: false }
                     )
             }
 
         }).catch(error => {
 
             console.log("on error",error);
             Alert.alert(
                'Error',
                "Check your Network Connection!",
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
          <FinalEstimateItem data={item} />
        )
    }

    submitHandler = async() => {

        this.setState({loading:true});
        const name = await AsyncStorage.getItem('name');

       
        if(this.refs.address.getInputTextValue('message') !== "invalid"){

            var formdata = new FormData();
            formdata.append("address",this.refs.address.getInputTextValue('address'));
            formdata.append("cart_id",this.props.navigation.getParam('final_check_box',""));
            formdata.append("user_name", name);
            Axios.post(ApiUrl.base_url+ApiUrl.submit_final_estimate,formdata).then(response=>{
                this.setState({loading:false});
                if(response.data.status == "SUCCESS"){
    
                    Alert.alert(
                        'Final Estimate',
                        ` ${response.data.message}`,
                        [
                    
                        {text: 'OK', onPress: () => {}},
                        
                        ], 
                        { cancelable: false }
                        )
                }else{
                    Alert.alert(
                        'Final Estimate',
                        ` ${response.data.message}`,
                        [
                    
                        {text: 'OK', onPress: () => {}},
                        
                        ], 
                        { cancelable: false }
                        )
                }
    
            }).catch(error =>{
                console.log("error",error);
                this.setState({loading:false});
    
                Alert.alert(
                    'Final Estimate',
                    "Check Your Network Connection!",
                    [
                
                    {text: 'OK', onPress: () => {}},
                    
                    ], 
                    { cancelable: false }
                    )
    
            });

        }else{
            this.setState({loading:false});
            Alert.alert(
                'Final Estimate',
                "Please Enter Address!",
                [
            
                {text: 'OK', onPress: () => {}},
                
                ], 
                { cancelable: false }
                )

        }
       
       
    }


    render(){
        return(
            <View style={styles.container}>
                <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
                    <View style={{height:null,}}>

                    <View style={styles.viewRow1}>
                        <Text style={styles.subHeading4}>Project Name</Text>
                        <Text style={styles.subHeading1}>Size </Text>
                        <Text style={styles.subHeading2}>Qunantity </Text>
                        <Text style={styles.subHeading3}>Price </Text>
                    </View>
                    <View style={styles.viewLine}></View>

                    <FlatList
                        data={this.state.saved_item}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={(item) =>this.renderItem(item)}
                        style={{paddingBottom:10,marginTop:10}}
                        
                        />

                        <View style={styles.viewRow1}>
                            <Text style={{textAlign:'right',flex:3,fontWeight:"bold"}}>Total Amount : </Text>
                            <Text style={{fontWeight:"bold"}}> $ {this.state.total_amount}</Text>

                        </View>

                        <CustomTextInput 
                            ref="address"
                            field_text={{marginLeft:40}}
                            text_input_width={{width:"80%"}}
                            image_name={require('../../Assets/house.png')} 
                            image_style={{width:30,height:30,marginTop:10,marginRight:5}} 
                            placeholder="Enter Project Address"
                            text="PROJECT ADDRESS"
                            inputType="message"
                            error_text="Please Enter Project Address"
                            />
                        
                            <CustomButton text="Submit" onPressHandler={()=>{this.submitHandler()}} btn_style={{marginTop:20}}/>
                        
            

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


const styles = StyleSheet.create({

    container:{
        
        backgroundColor: 'transparent',
        flex:1,
        paddingRight:20,
        paddingLeft:20,
        
      
    },
    viewRow1:{
        flexDirection:"row",
        justifyContent:"space-between"
    
    },
    subHeading4:{
        fontSize:12,
        flex:3,
        marginTop:20,
        color:"black",
        textAlign:'left',
        alignSelf:"center",
      
    },
    subHeading1:{
        fontSize:12,
        flex:1,
        marginTop:20,
        color:"black",
        textAlign:'center',
        alignSelf:"center",
      
    },
    subHeading2:{
        fontSize:12,
        flex:1,
        marginTop:20,
       textAlign:'center',
       color:"black",
       alignSelf:"center",
      
    },
    subHeading3:{
        fontSize:12,
        flex:1,
        marginTop:20,
        color:"black",
        textAlign:'right',
        alignSelf:"center",
      
    },
    viewLine:{
        width:"100%",backgroundColor:"#ECECEC",height:1,marginTop:5
    }


   
})