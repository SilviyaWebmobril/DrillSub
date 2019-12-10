import React ,{Component} from 'react';
import  {View ,Text, StyleSheet,Alert } from 'react-native';
import HomeHOC from '../HOC/HomeHOC';
import { CustomTextInput } from '../CustomUI/CustomTextInput';
import CustomButton from '../CustomUI/CustomButton';
import Colors from '../Utility/Colors';
import Axios from 'axios';
import ApiUrl from '../Utility/ApiUrl';
import AsyncStorage from '@react-native-community/async-storage';

class ChangePassword  extends Component {

    constructor(props){
        super(props);

        this.state ={
            email:""
        }
    }

    getUserEmail = async() =>{
        console.log("on email")
        try {
            const email = await AsyncStorage.getItem('email');
            this.setState({email:email},()=>{

                this.refs.email.setTextInputValue(this.state.email,"email");
            });

           
        } catch(e) {
       
        }
     }
    componentDidMount() {

        this.getUserEmail();
        
    }
  
    submitHandler = () =>{


        if(this.refs.email.getInputTextValue("email") !== "invalid" && this.refs.password.getInputTextValue("password") !== 'invalid'
        && this.refs.confirm_password.getInputTextValue("confirm_password") !== "invalid" && this.refs.old_password.getInputTextValue("password") !== "invalid"){


            var formdata = {
                "email" : this.refs.email.getInputTextValue("email"),
                "new_pass" : this.refs.password.getInputTextValue("password"),
                "confirm_pass" : this.refs.confirm_password.getInputTextValue("confirm_password"),
                "old_pass" :this.refs.old_password.getInputTextValue("password"),
            
            }
    
            this.props.load(true);
          
            Axios.post(ApiUrl.base_url + ApiUrl.change_password,formdata).then(response => {
                this.props.load(false);
              
                if(response.data.status == "SUCCESS"){
    
                    this.refs.email.setTextInputValue(this.state.email,"email");
                    this.refs.password.resetTextInput("password");
                    this.refs.old_password.resetTextInput("password");
                    this.refs.confirm_password.resetTextInput("confirm_password");

                    Alert.alert(
                        'Change Password',
                        'Password Changed Successfully!',
                        [
                    
                        {text: 'OK', onPress: () => {this.props.navigation.navigate("HomeScreen")}},
                        
                        ], 
                        { cancelable: false }
                        )
    
                      
                }else{
                    Alert.alert(
                        'Change Password',
                        `${response.data.message}`,
                        [
                    
                        {text: 'OK', onPress: () => {}},
                        
                        ], 
                        { cancelable: false }
                        )
                  
                }
    
            }).catch(error => {
                this.props.load(false);
             
                Alert.alert(
                    'Change Password',
                    "Check Your Network Connection .! And try again later .",
                    [
                
                    {text: 'OK', onPress: () => {}},
                    
                    ], 
                    { cancelable: false }
                    )
              
    
            })

        }else{

            Alert.alert(
                'Change Password',
                "All Fields are Required.",
                [
            
                {text: 'OK', onPress: () => {}},
                
                ], 
                { cancelable: false }
                )
        }
       
    }
  

    render() {
        return(
            <View style={{flex: 2 ,justifyContent:"center", height :null}}>

                <CustomTextInput text="Email" 
                  inputType="email"
                  ref="email"
                  editable={false}
                  field_text={{marginLeft:40,fontSize:15,}}
                  image_name={require('../../Assets/@.png')} 
                  image_style={{width:30,height:30,marginTop:10,marginRight:5}} 
                  placeholder="Enter Email"
                  error_text="Please Enter Valid Email" />

                <CustomTextInput 
                ref="old_password"
                field_text={{marginLeft:40}}
                text_input_width={{width:"80%"}}
                image_name={require('../../Assets/password.png')} 
                image_style={{width:30,height:30,marginTop:10,marginRight:5}} 
                placeholder="Enter Old Password"
                text="OLD PASSWORD"
                inputType="password"
                isPassword={true}
                secureTextEntry={true}
                changeSecureText={()=> this.changeSecureText} // calling child function directly without ref in component
                error_text="Password must be greater than 6"
                />

                <CustomTextInput 
                ref="password"
                field_text={{marginLeft:40}}
                text_input_width={{width:"80%"}}
                image_name={require('../../Assets/password.png')} 
                image_style={{width:30,height:30,marginTop:10,marginRight:5}} 
                placeholder="Enter New Password"
                text="NEW PASSWORD"
                inputType="password"
                isPassword={true}
                secureTextEntry={true}
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
                secureTextEntry={true}
                changeSecureText={()=> this.changeSecureText} // calling child function directly without ref in component
                error_text="Confirm Password must be greater than 6"
                />

                <CustomButton  text="Submit" onPressHandler={()=>{this.submitHandler()}} />
                  

            </View>
        )
    }
}

export default HomeHOC(ChangePassword,{title :"Change Password",header_color:"white", image_name :require('../../Assets/back-arrow.png') ,hamburger:false });