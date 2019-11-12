import React,{Component} from 'react';
import {View, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import SplashScreen from 'react-native-splash-screen'


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

            <View>

            </View>

        );
    }
}