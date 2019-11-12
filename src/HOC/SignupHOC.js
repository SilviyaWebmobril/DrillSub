import React ,{Component} from 'react';
import {View,StyleSheet, Text,Image,ScrollView,ImageBackground,Dimensions,ActivityIndicator,TouchableOpacity} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import CustomAlert from '../CustomUI/CustomAlert';
import Colors from '../Utility/Colors';
import DeviceInfo from 'react-native-device-info';
const height = Dimensions.get('window').height;

const SignUpHOC = (WrappedComponent) => {

    class HOC extends Component {

      constructor(props){
        super(props);
        console.log(this.props.navigation)
      }
        state = {
            loading: false, 
            showalert:false,
          };

          load = (value) => {

            this.setState({loading:value})

          }

          showAlert = (value) => {
            console.log("value",value);
            this.setState({showalert:value})   
          }
  
        render(){
        
            return(
                    <View>
                         
                        <KeyboardAwareScrollView style={styles.container}>

                            <View >
                                <ImageBackground source={require('../../Assets/signup-bggg.png')}resizeMode="stretch" style={styles.imageContainer} >
                                  {this.props.navigation.state.routeName !== "SignIn"
                                  ?
                                  <TouchableOpacity onPress={()=>{this.props.navigation.goBack()}}>
                                    <View style={{alignSelf:"flex-end"}}>
                                      <Text style={{color:Colors.yellow_theme,fontSize:17}}>Back</Text>
                                    </View>
                                  </TouchableOpacity>
                                  :
                                  <View/>
                                  }
                               
                               
                                <WrappedComponent {...this.props} load={this.load} showAlert={this.showAlert}/>
                                    
                                
                                </ImageBackground>
                                
                              
     
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
                         {
                            this.state.showalert  ?
                           
                                <CustomAlert  {...this.props} showAlert={this.showAlert} />
                                :
                                <View/>
                            
                        }
                        
                    </View>
                   
               

            );
        }

      

    }
    return HOC;
}


export default SignUpHOC;


const styles = StyleSheet.create({

    container:{
        
        backgroundColor: 'transparent',
       
      
      
    },
    imageContainer:{
       // zIndex: -1,
    //    width:Dimensions.get("window").width,
    //    height:Dimensions.get("window").height,
        flex:1,
        paddingTop:100,
        paddingBottom: DeviceInfo.isTablet() ? 350 : 200,
        paddingRight:20,
        paddingLeft:20
        
    }


})