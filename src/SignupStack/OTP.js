import React ,{Component} from 'react';
import {View,Text ,StyleSheet,TouchableOpacity,TextInput,Alert} from 'react-native';
import SignUpHoc from '../HOC/SignupHOC';
import CustomLogo from '../CustomUI/CustomLogo';
import { CustomTextInput } from '../CustomUI/CustomTextInput';
import Colors from '../Utility/Colors';
import CustomButton from '../CustomUI/CustomButton';
import Axios from 'axios';
import ApiUrl from '../Utility/ApiUrl';
import AsyncStorage from '@react-native-community/async-storage';




class ForgotPassword extends Component {

    constructor(props){
        super(props);
        this.state ={
            otp1:"",
            otp2:"",
            otp3:"",
            otp4:"",
            otp5:"",
            otp6:"",
            disableResend:true,
            seconds: 60 ,
        }
    }

    

    componentDidMount() {
        this.interval = setInterval(() => this.tick(), 2000);
        
      }
      componentWillUnmount() {
        clearInterval(this.interval);
      }

      isValid = () =>{
        if(this.state.otp1 == "" || this.state.otp2 == "" || this.state.otp3 == "" || this.state.otp4 == "" || this.state.otp5 == "" || this.state.otp6  == ""){
            return false;
        }else{
            return true;
        }
    }

    onStartTimer(){
        if(!this.state.disableResend){
            clearInterval(this.interval);
            this.setState({seconds:60});
            this.interval = setInterval(() => this.tick(), 1000);
            this.setState({disableResend:true})
        }
       
    }
    
    tick() {
        this.state.seconds>0?this.setState(prevState => ({seconds: prevState.seconds - 1})): (clearInterval(this.interval),alert("OTP Expired Please RESEND"),this.setState({disableResend:false}));
    }

    resendOTP =() =>{


        console.log("resendotp");

        this.props.load(true);
        var formdata  ={
           
            "email": this.props.navigation.getParam('email'),

        }
      
        Axios.post(ApiUrl.base_url +  ApiUrl.resend_otp,formdata).then(response => {
            this.props.load(false);
               
           
                if(response.data.status == "SUCCESS"){

                
                    alert("OTP has been send to your registered mail!")
                    Alert.alert(
                        'OTP Error',
                        "OTP has been send to your registered mail!",
                        [
                    
                        {text: 'OK', onPress: () => {}},
                        
                        ], 
                        { cancelable: false }
                        )
                

                }else{
                   
                    Alert.alert(
                        'OTP Error',
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
           
            Alert.alert(
                'OTP Error',
                "Check Your Network Connection .! And try again later .",
                [
            
                {text: 'OK', onPress: () => {}},
                
                ], 
                { cancelable: false }
                )
        });


    }

    submitOTP = () =>{

        console.log(this.state.otp1+this.state.otp2+this.state.otp3+this.state.otp4+this.state.otp5+this.state.otp6);

        if(this.isValid()){
            this.props.load(true);
            var formdata  ={
               
                "email": this.props.navigation.getParam('email'),
                 "otp":this.state.otp1+this.state.otp2+this.state.otp3+this.state.otp4+this.state.otp5+this.state.otp6
    
            }
          
            Axios.post(ApiUrl.base_url +  ApiUrl.verify_otp,formdata).then(response => {
                this.props.load(false);
                   
               
                    if(response.data.status == "SUCCESS"){
    
                        this.props.navigation.pop();
                        this.props.navigation.navigate("ResetPassword",{email:this.props.navigation.getParam('email')});
    
                    
    
                    }else{
                        this.onStartTimer();
                      
                      
                        Alert.alert(
                            'OTP Error',
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
                    'OTP Error',
                    "Check Your Network Connection .! And try again later .",
                    [
                
                    {text: 'OK', onPress: () => {}},
                    
                    ], 
                    { cancelable: false }
                    )
            });
           }else{
            
            Alert.alert(
                'OTP Error',
                "Please enter OTP",
                [
            
                {text: 'OK', onPress: () => {}},
                
                ], 
                { cancelable: false }
                )
        }
            
    
    
    }

    focusPrevious = () =>{

    }

    render(){
        return(

            <View style={{flex:8,height:null,paddingBottom:200}}>
                <CustomLogo />
                <Text style={styles.customHeader}>OTP</Text>
                <Text style={styles.otpText}>OTP has to send to your registered email ID. Please enter OTP to reset  your password.</Text>
                <View style={styles.viewRow}>
                   <TextInput  ref={(input) => { this.otp1 = input; }} style={styles.inputBox} value={this.state.otp1} onChangeText={(value)=>{
                       
                       this.setState({otp1:value});
                       this.otp2.focus();
                       
                   }}
                   maxLength={1}
                   onKeyPress={e =>{
                    if(e.nativeEvent.key == 'Backspace'){
                        //this.otp1.focus();
                       }else{
                        this.otp2.focus();
                       }
                   }}
                   keyboardType="phone-pad" />

                     <TextInput  ref={(input) => { this.otp2 = input; }} style={styles.inputBox} value={this.state.otp2} onChangeText={(value)=>{
                       
                        this.setState({otp2:value});
                        this.otp3.focus();
                   }}  
                   maxLength={1}
                   keyboardType="phone-pad" 
                   onKeyPress={e =>{ 
                       if(e.nativeEvent.key == 'Backspace'){
                        this.otp1.focus();
                        this.setState({otp1:''})
                       }else{
                        this.otp3.focus();
                       }
                   }} 
                   />
                     <TextInput  ref={(input) => { this.otp3 = input; }} style={styles.inputBox} value={this.state.otp3} onChangeText={(value)=>{
                       
                        this.setState({otp3:value});
                        this.otp4.focus();
                   }}
                   maxLength={1}
                   keyboardType="phone-pad" 
                   onKeyPress={e =>{ 
                    if(e.nativeEvent.key == 'Backspace'){
                     this.otp2.focus();
                     this.setState({otp2:''})
                    }else{
                        this.otp4.focus();
                    }
                }} />
                     <TextInput  ref={(input) => { this.otp4 = input; }} style={styles.inputBox} value={this.state.otp4} onChangeText={(value)=>{
                       
                        this.setState({otp4:value});
                        this.otp5.focus();
                   }}
                   maxLength={1}
                   keyboardType="phone-pad" 
                   onKeyPress={e =>{ 
                    if(e.nativeEvent.key == 'Backspace'){
                     this.otp3.focus();
                     this.setState({otp3:''})
                    }else{
                        this.otp5.focus();
                    }
                }} />
                     <TextInput  ref={(input) => { this.otp5 = input; }} style={styles.inputBox} value={this.state.otp5} onChangeText={(value)=>{
                       
                        this.setState({otp5:value});
                        this.otp6.focus();
                   }}
                   maxLength={1}
                   keyboardType="phone-pad"
                   onKeyPress={e =>{ 
                    if(e.nativeEvent.key == 'Backspace'){
                     this.otp4.focus();
                     this.setState({otp4:''})
                    }else{
                        this.otp6.focus();
                    }
                    }}  />
                     <TextInput  ref={(input) => { this.otp6 = input; }} style={styles.inputBox} value={this.state.otp6} onChangeText={(value)=>{
                      
                       this.setState({otp6:value});
                   }}
                   maxLength={1}
                   keyboardType="phone-pad"
                   onKeyPress={e =>{ 
                    if(e.nativeEvent.key == 'Backspace'){
                     this.otp5.focus();
                     this.setState({otp5:''})
                    }
                }} />
                </View>
               
                <Text style={styles.resendOTPTime}> { this.state.seconds } sec left</Text>
                <TouchableOpacity
                        disabled={this.state.disableResend}
                        onPress={()=>{this.onStartTimer() ;this.resendOTP()}}>
                        <Text style={styles.resendOTP}>Resend OTP </Text>
                </TouchableOpacity>
                <CustomButton text="Submit" onPressHandler={()=>{this.submitOTP()}}/>
               
               
               
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
        
    },
    resendOTPTime:{
        justifyContent:"flex-end",
        alignSelf:"flex-end",
        marginTop:20,
        color:"grey",
        marginRight:10,
        fontSize:12,
        fontWeight:"bold",
        textDecorationLine: 'underline',
    },
    resendOTP:{
        justifyContent:"flex-end",
        alignSelf:"flex-end",
        marginTop:5,
        color:"grey",
        marginRight:10,
        fontSize:12,
        fontWeight:"bold",
        textDecorationLine: 'underline',
    },
    otpText:{
        fontSize:15,
        color:"grey",
        lineHeight:20,
        marginTop:20,
        fontWeight:"700"
    },
    inputBox: {
        width:"10%",
        marginRight:10,
        marginLeft:10,
        marginTop:30,
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        textAlign:"center"

    }
    
})