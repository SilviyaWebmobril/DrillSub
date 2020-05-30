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
            
            this.setState({showalert:value})   
          }
  
        render(){
        
            return(
                    //  <View style={{flex:1,height:"100%"}}>
                         
                        <KeyboardAwareScrollView contentContainerStyle={styles.container} automaticallyAdjustContentInsets={true}>

                            < >
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
                                
                              
     
                            </>

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
                         
                      
                                
                        </KeyboardAwareScrollView>
                       
                        
                    // </View> 
                   
               

            );
        }

      

    }
    return HOC;
}


export default SignUpHOC;


const styles = StyleSheet.create({

    container:{
        flexGrow:1,
        backgroundColor: 'transparent',
        paddingTop:30,
        justifyContent:"space-between",
        alignItems:"center",
       
      
      
    },
    imageContainer:{
       // zIndex: -1,
       width:Dimensions.get("window").width,
        height:Dimensions.get("window").height,
      //  flex:1,
        
        paddingTop:120,
        //paddingBottom: DeviceInfo.isTablet() ? 350 : 300,
        paddingRight:20,
        paddingLeft:20
        
    }


})