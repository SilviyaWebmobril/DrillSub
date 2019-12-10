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


    state={
        disabled:false
    }


    submitEmail = () =>{


        if(this.refs.email.getInputTextValue('email') == 0){

            Alert.alert(
                'Sign Up',
                "Please Enter Email !",
                [
            
                {text: 'OK', onPress: () => {}},
                
                ], 
                { cancelable: false }
                )
            return;


        }else if(this.refs.email.getInputTextValue('email') == "invalid"){

            Alert.alert(
                'Sign Up',
                "Please Enter Valid Email !",
                [
            
                {text: 'OK', onPress: () => {}},
                
                ], 
                { cancelable: false }
                )
            return;

            
        }

        this.setState({disabled:true})
      
            this.props.load(true);
            var formdata  ={
               
                "email": this.refs.email.getInputTextValue('email'),
    
            }
          
            Axios.post(ApiUrl.base_url +  ApiUrl.send_otp,formdata).then(response => {
                this.props.load(false);
                this.setState({disabled:false})
                   
                
                    if(response.data.status == "SUCCESS"){
                        
                        this.props.navigation.navigate("OTP",{"email":this.refs.email.getInputTextValue('email')});
    
    
                    }else{
                       
                       
                        Alert.alert(
                            'Forgot Password',
                            "This Email is not registered with us.",
                            [
                        
                            {text: 'OK', onPress: () => {}},
                            
                            ], 
                            { cancelable: false }
                            )
                      
    
                    }
    
                }
            ).catch(error=>{
                this.props.load(false);
                this.setState({disabled:false})
                
               
                Alert.alert(
                    'Forget Password',
                    "Check Your Network Connection .! And try again later .",
                    [
                
                    {text: 'OK', onPress: () => {}},
                    
                    ], 
                    { cancelable: false }
                    )
            });
           
            
    
    
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
                keyboardType="email-address"
                inputType="email"
                error_text="Please Enter Valid Email"
                />
               
              
                <CustomButton text="Submit" disabled={this.state.disabled} onPressHandler={()=>{ this.submitEmail()}}/>
               
               
               
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