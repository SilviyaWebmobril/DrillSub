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




class SignIn extends Component {

    

    constructor(props){
        super(props);
        this.state ={
            isSec :true,
            disabled :false
        }
    }

    submitSignIn = () =>{

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

       
        if(this.refs.password.getInputTextValue('password') ==  0){


            Alert.alert(
                'Sign Up',
                "Password must not be Blank!",
                [
            
                {text: 'OK', onPress: () => {}},
                
                ], 
                { cancelable: false }
                )
            return;
        


        }else if(this.refs.password.getInputTextValue('password') == 1){


            Alert.alert(
                'Sign Up',
                "Password Length should be minimum of 6 characters !",
                [
            
                {text: 'OK', onPress: () => {}},
                
                ], 
                { cancelable: false }
                )
            return;
        



        }

       
       
      //  if(this.refs.email.getInputTextValue('email') !== "invalid" || this.refs.password.getInputTextValue('password') !== "invalid"){

         
            this.setState({disabled:true})
            this.props.load(true);
            var formdata  ={
               
                "email": this.refs.email.getInputTextValue('email'),
                "password" : this.refs.password.getInputTextValue('password')
    
            }
          
            Axios.post(ApiUrl.base_url +  ApiUrl.login,formdata).then(response => {
                this.props.load(false);
                this.setState({disabled:false})
                   
    
                    if(response.data.status == "SUCCESS"){
    
                      
                        AsyncStorage.setItem("token",JSON.stringify(response.data.data.id));
                        AsyncStorage.setItem("name",response.data.data.name);
                        AsyncStorage.setItem("email",response.data.data.email);
                        AsyncStorage.setItem("profile",response.data.data.profile);
                        this.refs.email.resetTextInput('email');
                        this.refs.password.resetTextInput('password');
                        this.props.navigation.navigate("HomeDrawer");
    
                      //  alert("User Regisstered Successfully");
    
    
                    }else{
                      
                      

                        Alert.alert(
                            'Sign In',
                            "Invalid Email or Password",
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
                    'Sign In',
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

             <>
                <CustomLogo />
                <Text style={styles.customHeader}> Sign In</Text>
               
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
                <CustomTextInput 
                ref="password"
                text_input_width={{width:"80%"}}
                field_text={{marginLeft:40}}
                image_name={require('../../Assets/password.png')} 
                image_style={{width:30,height:30,marginTop:10,marginRight:5}} 
                placeholder="Enter Password"
                text="PASSWORD"
                inputType="password"
                isPassword={true}
                
                changeSecureText={()=> this.changeSecureText} // calling child function directly without ref in component
                error_text="Password must be greater than 6"
                />
                <TouchableOpacity
                        onPress={()=>{this.refs.email.resetTextInput('email');
                        this.refs.password.resetTextInput('password');
                        this.props.navigation.navigate('ForgotPassword')}}>
                        <Text style={styles.forgotPassword}> Forgot Password?</Text>
                    </TouchableOpacity>
                <View style={styles.viewColumn}>
                    <Text style={{fontWeight:"bold",color:"grey"}}>By clicking 'Sign In' you agree  to the </Text>
                    <View style={styles.viewRow}>
                        <TouchableOpacity onPress={()=>{this.props.navigation.navigate('TermsOfUse')}}>
                        <Text style={styles.textTerms}>Terms of Use </Text>
                        </TouchableOpacity>
                       
                        <Text style={{fontWeight:"bold",color:"grey"}}> and </Text>
                        <TouchableOpacity onPress={()=>{this.props.navigation.navigate('PrivacyPolicy',{login:0})}}>
                        <Text style={styles.textTerms}> Standard Conditions</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <CustomButton text="Sign In" onPressHandler={()=>{this.submitSignIn()}} disabled={this.state.disabled}/>
               
                <View style={styles.viewRow1}>
                    <Text style={{fontWeight:"bold",color:"grey"}}> Don't have an account? </Text>
                    <TouchableOpacity
                        onPress={()=>
                       { this.refs.email.resetTextInput('email');
                        this.refs.password.resetTextInput('password');
                        this.props.navigation.navigate('SignUp')}}>
                        <Text style={styles.textTerms}> Sign Up</Text>
                    </TouchableOpacity>
                   
                </View>
                
               
             </>
        );
    }
}

export default SignUpHoc(SignIn);

const styles= StyleSheet.create({

    customHeader:{
        fontSize:20,
        fontWeight:"bold",

    },
    viewColumn:{
        flexDirection:"column",
        alignSelf:'center',
        marginTop:10,
       // flex:1,
      
    },
    viewRow:{
        flexDirection:"row",
        alignSelf:"center",
        
    },
    viewRow1:{
        flexDirection:"row",
        alignSelf:"center",
       
        //backgroundColor:"blue",
       // flex:1
        
    },
    textTerms:{
        color:Colors.yellow_theme,
        fontWeight:"bold",
        
    },
    forgotPassword:{
        justifyContent:"flex-end",
        alignSelf:"flex-end",
        marginTop:20,
        color:"grey",
        marginRight:10,
        fontSize:12,
        fontWeight:"bold",
       // textDecorationLine: 'underline',
    }
    
})