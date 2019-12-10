import React,{Component} from 'react';
import {View, StyleSheet, ImageBackground, Image,Dimensions} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import SplashScreen from 'react-native-splash-screen'

const width = Dimensions.get('window').width;
const height =  Dimensions.get('window').height;


export default class Splash extends Component {

    componentDidMount(){
        
        console.log("mounting splash");
        this.interval = setInterval(() => {

            this.getMyValue();
          
        
        }, 5000);
        

    }

    getMyValue = async() =>{

        try {
            const value = await AsyncStorage.getItem('token');
            SplashScreen.hide();
            if(value !== null) {
               
              this.props.navigation.navigate("HomeDrawer");
            }else{
                
                this.props.navigation.navigate("SignUpScreen");
            }
        } catch(e) {
       
        }
    }

    render(){
        return(

           <ImageBackground style={{flex:1,alignContent:"center",justifyContent:"center"}} source={require('../../Assets/splash-bg.png')}>
               <Image source={require('../../Assets/logo.png')} resizeMode="contain" style={{width:width/1.1,alignSelf:"center",marginLeft:20,marginRight:20,height:height/4}}/>
           </ImageBackground>

        );
    }
}