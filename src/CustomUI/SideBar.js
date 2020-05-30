import React,{Component} from 'react';
import {View ,Text, ScrolView,Image,StyleSheet,Dimensions,TouchableOpacity,Alert,ActivityIndicator} from 'react-native';
import { withNavigation } from 'react-navigation';
import Colors from '../Utility/Colors';
import { StackActions, NavigationActions} from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';
import ApiUrl from '../Utility/ApiUrl';
import FastImage from 'react-native-fast-image';


const widthD = Dimensions.get("window").width;
const heightH = Dimensions.get("window").height;

export default class  SideBar extends Component  {

    constructor(props){
        super(props);
        this.state = {
            name:"",
            email:"",
            profile:"",
            isLoading:false,
        }
    }

    componentDidMount(){
       
      setInterval(()=>{

      
        this.getUserEmailAndProfile();
        this.getUserName();
      },4000)
     
    }

  
     getUserEmailAndProfile = async() =>{
        try {

          
            const email = await AsyncStorage.getItem('email');
            this.setState({email:email});

            const profile = await AsyncStorage.getItem("profile");
            this.setState({profile:profile},()=>{
               
            })
            
           
        } catch(e) {
       
        }
     }
     getUserName = async() =>{
        try {
            const name = await AsyncStorage.getItem('name');
            this.setState({name:name},()=>{
               
            });
            
          
        } catch(e) {
       
        }
     }
  //hello
     showLogoutAlert = () =>{
        Alert.alert(
            'Logout',
            "Are you sure that you want to logout ?",
            [
         
           
            {text: 'CANCEL', onPress: () =>  {console.log("ok")}},
            {text: 'OK', onPress: () =>  {this.removeData()}},
            ], 
            { cancelable: false }
            )
        
     }
  
      removeData = async()=>{
       
       console.log("on remove");
        const keys = ['token', 'name','email','profile']
        try {
            AsyncStorage.clear();
            this.props.navigation.toggleDrawer()
       
        this.props.navigation.navigate('SignIn');
       
        } catch(e) {
        // remove error

        }
       
    }

    render(){

        return(

            <View style={styles.container}>
                <View>
                  
                        <TouchableOpacity
                        onPress={()=>{this.props.navigation.toggleDrawer()}}>
                            <Image  style={styles.crossButton} source={require('../../Assets/cross_mark.png')} />
                        </TouchableOpacity>
                

                    <View >
                       
                        {this.state.profile == null
                        ?
                            <Image style={styles.imageStyles}  source={require('../../Assets/camera.png')} resizeMode="cover" />
                        :
                            <FastImage style={styles.imageStyles}  source={{uri:"https://webmobril.org/dev/drillsub/"+this.state.profile}} resizeMode="cover" />
                        }
                        
                        <TouchableOpacity
                            style={styles.backgroundContainer}
                            onPress={()=>{this.props.navigation.navigate('EditUserDetailsScreen')}}>
                            <Image  style={styles.crossButton} source={require('../../Assets/edit_white.png')} />
                        </TouchableOpacity>

                    </View>
                    <Text style={styles.nameStyle}>{this.state.name}</Text>
                    <Text style={styles.emailStyle}>{this.state.email}</Text>
                    <View style={styles.viewStyle}></View>
                    <TouchableOpacity
                    onPress={() => {
                        this.props.navigation.toggleDrawer()
                       
                        }}>
                        <Text style={styles.headingStyle}> Home </Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                     onPress={() => {
                        this.props.navigation.navigate('ChangePasswordScreen')
                        const resetAction = StackActions.reset({
                            index: 0,
                            //key: 'ChangePassword', // here there will be no key as 
                            actions: [
                                NavigationActions.navigate({ routeName: 'ChangePassword' }),
                            
                            ],
                        })
                  
                        this.props.navigation.dispatch(resetAction);
                        
                        }}
                        >
                        <Text style={styles.headingStyle}> Change Password </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                     onPress={()=>{
                         // Currently we have only homeStack which contains two screens so 
                         // navigating to SavedItemScreen Stack first 
                         // now to restart the component provide the index of the SavedItemStack
                         //without the key
                         this.props.navigation.navigate('SavedItemScreen')
                            const resetAction = StackActions.reset({
                                index: 0,
                                //key: 'SavedItem', // here there will be no key as 
                                actions: [
                                    NavigationActions.navigate({ routeName: 'SavedItem' }),
                                
                                ],
                            })
                      
                            this.props.navigation.dispatch(resetAction);}}
                      >
                        <Text style={styles.headingStyle}> Saved Estimates </Text>
                    </TouchableOpacity>
                    <TouchableOpacity  onPress={() => {
                        
                        this.props.navigation.navigate('SavedFinalEstimatePdf')
                        const resetAction = StackActions.reset({
                            index: 0,
                            //key: 'PrivacyPolicy', // here there will be no key as 
                            actions: [
                                NavigationActions.navigate({ routeName: 'SavedFinalEstimatePdf' }),
                            
                            ],
                        })
                  
                        this.props.navigation.dispatch(resetAction);
                        }}>
                        <Text style={styles.headingStyle}> Projects Folder </Text>
                    </TouchableOpacity>
                    <TouchableOpacity  onPress={() => {
                        
                        this.props.navigation.navigate('PrivacyPolicyScreen',{login:1})
                        const resetAction = StackActions.reset({
                            index: 0,
                            //key: 'PrivacyPolicy', // here there will be no key as 
                            actions: [
                                NavigationActions.navigate({ routeName: 'PrivacyPolicy' }),
                            
                            ],
                        })
                  
                        this.props.navigation.dispatch(resetAction);
                        }}>
                        <Text style={styles.headingStyle}> Standard Conditions </Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity
                    onPress={()=>{
                        this.props.navigation.navigate('ContactUsScreen')
                        const resetAction = StackActions.reset({
                            index: 0,
                            //key: 'Contact', // here there will be no key as 
                            actions: [
                                NavigationActions.navigate({ routeName: 'Contact' }),
                            
                            ],
                        })
                  
                        this.props.navigation.dispatch(resetAction);
                        
                        
                        }}>

                        <Text style={styles.headingStyle}> Contact Us </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={()=>this.showLogoutAlert()}>
                        <Text style={styles.headingStyle}> Logout </Text>
                    </TouchableOpacity>

                </View>
                {
                     this.state.isLoading  &&
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


const styles =  StyleSheet.create({

    container:{
       
        backgroundColor:Colors.yellow_theme,
        height:"100%"

    },

    imageStyles:{

        width:150,
        height:150,
        overflow:"hidden",
        borderRadius:widthD/2,
        borderWidth:1,
        marginTop:20,
        marginRight:40,
        marginLeft:40,
        alignSelf:"center",
        borderColor:'black'

    },
    crossButton:{
        width:20,
        height:20,
        marginTop:20,
        marginRight:20,
        alignSelf:"flex-end"
    },
    nameStyle:{
        fontSize:15,
        fontWeight:"bold",
        marginTop:20,
        alignSelf:"center",
        color:"white"

    },
    emailStyle:{
        fontSize:15,
       
        marginTop:10,
        alignSelf:"center",
        color:"white"

    },
    viewStyle:{
        width:"100%",
        height:0.6,
        backgroundColor:"white",
         marginTop:10
    },
    headingStyle:{
        fontSize:15,
        marginLeft:20,
        fontWeight:"700",
        marginTop:20,
        alignSelf:"flex-start",
        color:"white"
    },


    backgroundContainer: {
        position: 'absolute',
        top: 12,
        bottom: 0,
        left: 0,
        right: 50,
      },
      container1: {
        flex: 1,
        alignItems: 'center',
      },
   
      
})