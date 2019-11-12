import React ,{Component} from 'react';
import {View,Text ,StyleSheet,TouchableOpacity,Alert} from 'react-native';
import SignUpHoc from '../HOC/SignupHOC';
import CustomLogo from '../CustomUI/CustomLogo';
import { CustomTextInput } from '../CustomUI/CustomTextInput';
import Colors from '../Utility/Colors';
import CustomButton from '../CustomUI/CustomButton';
import Axios from 'axios';
import ApiUrl from '../Utility/ApiUrl';
import AsyncStorage from '@react-native-community/async-storage';


class ForgotPassword extends Component {


    submitEmail = () =>{

        if(this.refs.email.getInputTextValue('email') !== "invalid" ){
            this.props.load(true);
            var formdata  ={
               
                "email": this.refs.email.getInputTextValue('email'),
    
            }
          
            Axios.post(ApiUrl.base_url +  ApiUrl.send_otp,formdata).then(response => {
                this.props.load(false);
                   
                
                    if(response.data.status == "SUCCESS"){
    
                    
                        this.props.navigation.navigate("OTP",{"email":this.refs.email.getInputTextValue('email')});
    
                    
    
                    }else{
                       
                        Alert.alert(
                            'Forgot Password',
                            "his Email is not registered with us.",
                            [
                        
                            {text: 'OK', onPress: () => {}},
                            
                            ], 
                            { cancelable: false }
                            )
                      
    
                    }
    
                }
            ).catch(error=>{
                this.props.load(false);
                
               
                Alert.alert(
                    'Forget Password',
                    "Check Your Network Connection .! And try again later .",
                    [
                
                    {text: 'OK', onPress: () => {}},
                    
                    ], 
                    { cancelable: false }
                    )
            });
           }else{
           

            Alert.alert(
                'Forget Password',
                "Please enter email",
                [
            
                {text: 'OK', onPress: () => {}},
                
                ], 
                { cancelable: false }
                )
        }
            
    
    
    }

    render(){
        return(

            <View style={{flex:8,height:null,paddingBottom:200}}>
                <CustomLogo />
                <Text style={styles.customHeader}> Forgot Password</Text>
               
                <CustomTextInput 
                ref="email"
                field_text={{marginLeft:40}}
                image_name={require('../../Assets/@.png')} 
                image_style={{width:30,height:30,marginTop:10,marginRight:5}} 
                placeholder="Enter Email"
                text="EMAIL"
                inputType="email"
                error_text="Please Enter Valid Email"
                />
               
              
                <CustomButton text="Submit" onPressHandler={()=>{ this.submitEmail()}}/>
               
               
               
            </View>
        );
    }
}

export default SignUpHoc(ForgotPassword);

const styles= StyleSheet.create({

    customHeader:{
        fontSize:20,
        fontWeight:"bold",

    },
    

    
})