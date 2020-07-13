import React ,{Component} from 'react';
import {View,Text,StyleSheet,TouchableOpacity,Image,ActivityIndicator} from 'react-native';
import HomeHOC from '../HOC/HomeHOC';
import ApiUrl from '../Utility/ApiUrl';
import { WebView } from 'react-native-webview';

// starndard terms and conditions page

export default  class PrivacyPolicy extends Component {

    static navigationOptions = ({ navigation }) => ({
        
        title:" Standard Conditions ",
        headerTitleStyle: {
            color: 'black',
            alignSelf: 'center',
            textAlign: 'center',
            fontSize: 15,
            fontWeight:"bold",

           
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
              onPress={()=>{navigation.getParam('login') !== 0 ? navigation.navigate("HomeScreen") : navigation.goBack()}}
            >
              <Image source={require('../../Assets/back-arrow.png')} style={{width:24,height:24,marginLeft:20}}/>
             
            </TouchableOpacity>
          
        )
     
    });

    state = {
        visible:true
    }

    hideSpinner() {
        this.setState({ visible: false });
      }


    render(){
        return(
           <View style={{flex:1}}>
                <WebView
                    useWebkit={true}
                    onLoad={() => this.hideSpinner()}
                    source={{ uri: "https://webmobril.org/dev/drillsub/api/Mobileapi/termsconditions" }}
                    style={{ marginTop: 10 }}
                   
                />
                {this.state.visible && (
                   <View
                    style={[
                    StyleSheet.absoluteFill,
                    { backgroundColor: 'rgba(0, 0, 0, 0.7)', justifyContent: 'center' }
                    ]}
                    >
                        <ActivityIndicator size="large" />
                    </View>
                )}
           </View>
           
            
        )
    }
}

