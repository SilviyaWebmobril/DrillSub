import React ,{Component} from 'react';
import {View,Text,StyleSheet,TouchableOpacity,Image} from 'react-native';
import HomeHOC from '../HOC/HomeHOC';
import ApiUrl from '../Utility/ApiUrl';
import { WebView } from 'react-native-webview';

export default  class PrivacyPolicy extends Component {

    static navigationOptions = ({ navigation }) => ({
        
        title:" Privacy Policy ",
        headerTitleStyle: {
            color: 'black',
            alignSelf: 'center',
            textAlign: 'center',
            fontSize: 15,
            fontWeight:"bold"
           
        },
        headerTitleStyle: {
            color: 'black',
            alignSelf: 'center',
            textAlign: 'center',
            justifyContent:"space-between",
            fontSize: 17,
           
        },
        
        headerLeft:(
            <TouchableOpacity
              onPress={()=>{navigation.navigate("HomeScreen")}}
            >
              <Image source={require('../../Assets/back-arrow.png')} style={{width:24,height:24,marginLeft:20}}/>
             
            </TouchableOpacity>
          
        )
     
    });


    render(){
        return(
           
            <WebView
                    source={{ uri: "https://webmobril.org/dev/drillsub/api/Mobileapi/privacyPolicy" }}
                    style={{ marginTop: 10 }}
                   
                />
            
        )
    }
}

