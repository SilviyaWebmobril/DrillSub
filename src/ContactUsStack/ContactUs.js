import React ,{Component} from 'react';
import  {View ,Text, StyleSheet ,Platform,AsyncStorage,Alert} from 'react-native';
import HomeHOC from '../HOC/HomeHOC';
import { CustomTextInput } from '../CustomUI/CustomTextInput';
import CustomButton from '../CustomUI/CustomButton';
import Colors from '../Utility/Colors';
import Axios from 'axios';
import ApiUrl from '../Utility/ApiUrl';


class ContactUs  extends Component {


    submitHandler = async() => {

        if(this.refs.subject.getInputTextValue("subject") !== "invalid" && this.refs.message.getInputTextValue("message") !== "invalid"){

            try {
                this.props.load(true);
                const value = await AsyncStorage.getItem('token');
               
                if(value !== null) {
    
                    var formdata = {
                        "user_id" : JSON.parse(value),
                        "subject" :this.refs.subject.getInputTextValue("subject"),
                        "message" : this.refs.message.getInputTextValue("message")
            
                    }
    
                    console.log("form data",formdata);
    
                    Axios.post(ApiUrl.base_url + ApiUrl.contact_us,formdata).then(response => {
                        this.props.load(false);
                        console.log("response  == >" ,response.data.status);
                        if(response.data.status == "SUCCESS"){
    
                            this.refs.subject.setTextInputValue("","subject");
                            this.refs.message.setTextInputValue("","message");
                         
                              Alert.alert(
                                'Contact Us',
                                "Your Message has been sent to the Admin and will contact you soon!",
                                [
                            
                                {text: 'OK', onPress: () => { this.props.navigation.navigate("HomeScreen")}},
                                
                                ], 
                                { cancelable: false }
                            )
                          
                           
    
                        }else{
                            
    
                            Alert.alert(
                                'Contact Us Error',
                                "Some Error Occured .Please try again later",
                                [
                            
                                {text: 'OK', onPress: () => { }},
                                
                                ], 
                                { cancelable: false }
                            )
                        }
    
                    }).catch(error => {
                        this.props.load(false);
    
                        Alert.alert(
                            'Contact Us',
                            "Check Your Network Connection .! And try again later .",
                            [
                        
                            {text: 'OK', onPress: () => {}},
                            
                            ], 
                            { cancelable: false }
                            )
                      
    
                    });
                    
                   
                 
                }
            } catch(e) {
           
            }
    
        }else{

            Alert.alert(
                'Contact Us',
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

               

                <CustomTextInput 
                ref="subject"
                field_text={{marginLeft:40}}
                text_input_width={{width:"80%"}}
                placeholder="Enter Subject"
                text="SUBJECT"
                inputType="subject"
                isPassword={false}
                error_text="Please Enter Subject"
                />

                <CustomTextInput 
               
                ref="message"
                field_text={{marginLeft:40}}
                text_input_width={{width:"80%",height:100,backgroundColor:"red",paddingTop: 0, textAlignVertical:"top",
                paddingBottom: 0}}
                placeholder="Enter Message"
                text="MESSAGE"
                inputType="message"
                multiline={true}
                secureTextEntry={false}
               
                error_text="Please Enter Message"
                />

                <CustomButton  text="Submit"  onPressHandler={()=>{this.submitHandler()}}/>
                  

            </View>
        )
    }
}

export default HomeHOC(ContactUs,{title :"Contact Us",header_color:"white", image_name :require('../../Assets/back-arrow.png') ,hamburger:false });