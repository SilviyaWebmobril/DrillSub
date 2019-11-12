import React ,{Component} from 'react';
import {View,Text ,StyleSheet,Alert} from 'react-native';
import SignUpHoc from '../HOC/SignupHOC';
import CustomLogo from '../CustomUI/CustomLogo';
import { CustomTextInput } from '../CustomUI/CustomTextInput';
import Colors from '../Utility/Colors';
import CustomButton from '../CustomUI/CustomButton';
import Axios from 'axios';
import ApiUrl from '../Utility/ApiUrl';
import AsyncStorage from '@react-native-community/async-storage';




class SignIn extends Component {

    constructor(props){
        super(props);
        this.state ={
            isSec :true
        }
    }

    componentDidMount(){

        this.refs.email.setTextInputValue(this.props.navigation.getParam('email'),"email");
    }


    submitResetPassword = () =>{

        if(this.refs.password.getInputTextValue('password') == "invalid"){

            alert("Password Length must be greater than or equal to 6");
            return;
        
        }
        if(this.refs.confirm_password.getInputTextValue('confirm_password') == "invalid"){

            alert("Confirm Password Length must be greater than or equal to 6");
            return;
        
        }
        if(this.refs.email.getInputTextValue('email') !== "invalid" || this.refs.password.getInputTextValue('password') !== "invalid" || this.refs.confirm_password.getInputTextValue('confirm_password') !== "invalid"){
            this.props.load(true);
            var formdata  ={
               
                "email": this.refs.email.getInputTextValue('email'),
                "new_pass" : this.refs.password.getInputTextValue('password'),
                "confirm_pass" : this.refs.confirm_password.getInputTextValue('confirm_password')
    
            }
            console.log("formdata",formdata);
            Axios.post(ApiUrl.base_url +  ApiUrl.reset_password,formdata).then(response => {
                this.props.load(false);
                   
                
                    if(response.data.status == "SUCCESS"){
    
                        alert("Password Changed Successfully !. Please SignIn");
                      
                        this.props.navigation.navigate("SignIn");
    
                    
                    }else{
                        alert(`${response.data.message}`);
                        Alert.alert(
                            'Reset Password',
                            `${response.data.message}`,
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
                    'Reset Password',
                    "Check Your Network Connection .! And try again later .",
                    [
                
                    {text: 'OK', onPress: () => {}},
                    
                    ], 
                    { cancelable: false }
                    )
            });
           }else{
           
            Alert.alert(
                'Reset Password',
                "All fields are Required !",
                [
            
                {text: 'OK', onPress: () => {}},
                
                ], 
                { cancelable: false }
                )
        }
            
    
    
    }

    render(){
        return(

            <View style={{flex:8,height:null,}}>
                <CustomLogo />
                <Text style={styles.customHeader}> Reset Password </Text>
               
                <CustomTextInput 
                ref="email"
                field_text={{marginLeft:40}}
                image_name={require('../../Assets/@.png')} 
                image_style={{width:30,height:30,marginTop:0,marginRight:5}} 
                placeholder="Enter Email"
                text="EMAIL"
                inputType="email"
                editable={false}
                error_text="Please Enter Valid Email"
                />
                <CustomTextInput 
                ref="password"
                field_text={{marginLeft:40}}
                text_input_width={{width:"80%"}}
                image_name={require('../../Assets/password.png')} 
                image_style={{width:30,height:30,marginTop:10,marginRight:5}} 
                placeholder="Enter Password"
                text="PASSWORD"
                inputType="password"
                isPassword={true}
                secureTextEntry={this.state.isSec}
                changeSecureText={()=> this.changeSecureText} // calling child function directly without ref in component
                error_text="Password must be greater than 6"
                />
                 <CustomTextInput 
                ref="confirm_password"
                field_text={{marginLeft:40}}
                text_input_width={{width:"80%"}}
                image_name={require('../../Assets/password.png')} 
                image_style={{width:30,height:30,marginTop:10,marginRight:5}} 
                placeholder="Enter Confirm Password"
                text="CONFIRM PASSWORD"
                inputType="confirm_password"
                isPassword={true}
                secureTextEntry={this.state.isSec}
                changeSecureText={()=> this.changeSecureText} // calling child function directly without ref in component
                error_text="Confirm Password must be greater than 6"
                />
               
                <CustomButton text="Submit" onPressHandler={()=>{this.submitResetPassword()}} btn_style={{marginTop:60}}/>
               
            
               
            </View>
        );
    }
}

export default SignUpHoc(SignIn);

const styles= StyleSheet.create({

    customHeader:{
        fontSize:20,
        fontWeight:"bold",

    },
   
    
})