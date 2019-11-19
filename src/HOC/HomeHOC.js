import React ,{Component} from 'react';
import {View,StyleSheet, Text,Image,ScrollView,TouchableOpacity,Dimensions,ActivityIndicator} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import CustomAlert from '../CustomUI/CustomAlert';
import Colors from '../Utility/Colors';
import CustomButton from '../CustomUI/CustomButton';
const HomeHOC = (WrappedComponent, params) => {

    class HOC extends Component {

    
        static navigationOptions = ({ navigation }) => ({
            title:params.title,
            headerStyle: {
                height: 50,
                backgroundColor: params.header_color,
               
                justify_content:"space-between",
                
               
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
                  onPress={()=>{params.hamburger  ? navigation.toggleDrawer() : navigation.navigate('Home')}}
                >
                  <Image source={params.image_name} style={{width:24,height:24,marginLeft:20}}/>
                 
                </TouchableOpacity>
              
            )
        });
    

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
                    <View  style={styles.container}>

                      {/* {params.saved_item == 1 
                      ?
                      <View style={{flexDirection:"row",justifyContent:"space-between",justifyContent:"space-between",height:null}}>
                        <Text style={{fontSize:15,fontWeight:"bold",margin:10,flex:2}}>Please select the rows for final estimation.</Text>
                        <CustomButton text="Submit" onPressHandler={params.submit} btn_style={{alignSelf:"flex-start",marginTop:10,height:50,width:"40%"}}/>
                      </View>
                      :
                      <View/>
                      }
                          */}
                        <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>

                            <View >
                                
                                <WrappedComponent {...this.props} 
                               
                                load={this.load} showAlert={this.showAlert}/>
                                    
                            
     
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


export default HomeHOC;


const styles = StyleSheet.create({

    container:{
        
        backgroundColor: 'transparent',
        flex:1,
        paddingRight:20,
        paddingLeft:20,
        
      
    },
  


})