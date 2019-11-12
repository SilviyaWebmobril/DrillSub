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


class SignUp extends Component {

    constructor(props){
        super(props);
        this.state ={
            isSec :true
        }
    }

    submitSignUp(){

        if(this.refs.password.getInputTextValue('password') == "invalid"){

            alert("Password Length must be greater than or equal to 6");
            return;
        
        }
       
       if(this.refs.name.getInputTextValue('name') !== "invalid" && this.refs.email.getInputTextValue('email') !== "invalid" || this.refs.name.getInputTextValue('password') !== "invalid"){
        this.props.load(true);
        var formdata  ={
            "name" :this.refs.name.getInputTextValue('name'),
            "email": this.refs.email.getInputTextValue('email'),
            "password" : this.refs.password.getInputTextValue('password')

        }
        console.log("formadata",formdata);
        
        Axios.post(ApiUrl.base_url +  ApiUrl.signup,formdata).then(response => {
            this.props.load(false);
               

                if(response.data.status == "SUCCESS"){

                  
                    AsyncStorage.setItem("token",JSON.stringify(response.data.data.id));
                    AsyncStorage.setItem("name",response.data.data.name);
                    AsyncStorage.setItem("email",response.data.data.email);
                    this.refs.name.resetTextInput("name");
                    this.refs.email.resetTextInput("email");
                    this.refs.password.resetTextInput("password");
                    this.props.navigation.navigate("HomeDrawer");

                   
                    Alert.alert(
                        'Sign Up',
                        "User Regisstered Successfully",
                        [
                    
                        {text: 'OK', onPress: () => {}},
                        
                        ], 
                        { cancelable: false }
                        )


                }else{
                   
                    Alert.alert(
                        'Sign Up',
                        "User Already Registered",
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
                'Sign Up Error',
                "Check Your Network Connection .! And try again later .",
                [
            
                {text: 'OK', onPress: () => {}},
                
                ], 
                { cancelable: false }
                )
        });
       }else{
       
        Alert.alert(
            'Sign Up Error',
            "All fields are Required",
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
                <Text style={styles.customHeader}> Sign Up</Text>
                <CustomTextInput 
                ref="name"
                field_text={{marginLeft:40}}
                image_name={require('../../Assets/name.png')} 
                image_style={{width:30,height:30,marginTop:10,marginRight:5}} 
                placeholder="Enter Name"
                text="NAME"
                inputType="name"
                error_text="Please Enter Name"
                  
                />
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
                <View style={styles.viewColumn}>
                    <Text style={{fontWeight:"bold",color:"grey"}}>By clicking 'Sign Up' you agree  to the </Text>
                    <View style={styles.viewRow}>
                        <Text style={styles.textTerms}>Terms of Use </Text>
                        <Text style={{fontWeight:"bold",color:"grey"}}> and </Text>
                        <Text style={styles.textTerms}> Privacy Policy</Text>
                    </View>
                </View>

                <CustomButton text="Sign Up" onPressHandler={()=>{this.submitSignUp()}}/>
               
                <View style={styles.viewRow1}>
                    <Text style={{fontWeight:"bold",color:"grey"}}> Have an account? </Text>
                    <TouchableOpacity
                        onPress={()=>{
                            this.refs.name.resetTextInput("name");
                            this.refs.email.resetTextInput("email");
                            this.refs.password.resetTextInput("password");
                            this.props.navigation.navigate('SignIn')}}>
                        <Text style={styles.textTerms}> Sign In</Text>
                    </TouchableOpacity>
                    
                </View>
                
               
            </View>
        );
    }
}

export default SignUpHoc(SignUp);

const styles= StyleSheet.create({

    customHeader:{
        fontSize:20,
        fontWeight:"bold",

    },
    viewColumn:{
        flexDirection:"column",
        alignSelf:'center',
        marginTop:20,
        flex:1,
      
    },
    viewRow:{
        flexDirection:"row",
        alignSelf:"center",
        
    },
    viewRow1:{
        flexDirection:"row",
        alignSelf:"center",
        marginTop:30,
        flex:1
        
    },
    textTerms:{
        color:Colors.yellow_theme,
        fontWeight:"bold",
        
    }
    
})