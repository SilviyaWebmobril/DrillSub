import React ,{Component} from 'react';
import {View,Text,StyleSheet,FlatList,Alert} from 'react-native';
import HomeHOC from '../HOC/HomeHOC';
import Colors from '../Utility/Colors';
import Axios from 'axios';
import ApiUrl from '../Utility/ApiUrl';
import AsyncStorage from '@react-native-community/async-storage';
import SavedSingleItem  from './SavedSingleItem';

class SavedItem extends Component {

    constructor(props){
        super(props);
        this.state={
            saved_item:[],
            d:[],
            dataNotFound:false,
            errorMsg:""
        }
    }

    async componentDidMount(){

        const value = await AsyncStorage.getItem('token');
        var formdata = {
            user_id : JSON.parse(value)
        }
        this.props.load(true);
        Axios.post(ApiUrl.base_url + ApiUrl.saved_data,formdata).then(res => {

            this.props.load(false)

            console.log("response ", res.data);
            if(res.data.status == 'SUCCESS'){
               
               

                this.setState({saved_item:res.data.data},()=>{
                    console.log("savedd_ite data",this.state.saved_item);
                });
                
            }else{

                this.setState({dataNotFound:true},()=>{

                    this.setState({errorMsg:"No Saved Items Found."})

                });

            }

        }).catch(error => {
            this.props.load(false);
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
           <SavedSingleItem data={item} onRefreshPage={()=>this.onRefreshPage()}/>
        )
    }

    onRefreshPage= () =>{

        this.componentDidMount();
    }


    render(){
        return(
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
        )
    }
}

export default HomeHOC(SavedItem,{title :"Saved Items",header_color:"white", image_name :require('../../Assets/back-arrow.png') ,hamburger:false });


const styles = StyleSheet.create({

   
})