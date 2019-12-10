import React ,{Component} from 'react';
import  {View ,Text, StyleSheet ,Platform,AsyncStorage,Alert} from 'react-native';
import HomeHOC from '../HOC/HomeHOC';
import { CustomTextInput } from '../CustomUI/CustomTextInput';
import CustomButton from '../CustomUI/CustomButton';
import Colors from '../Utility/Colors';
import Axios from 'axios';
import ApiUrl from '../Utility/ApiUrl';
import { TextInput } from 'react-native-gesture-handler';


class ContactUs  extends Component {


    state={
        subject:"",
        message:"",
    }


    submitHandler = async() => {

        if(this.state.subject !== "" && this.state.message !== ""){

            try {
                this.props.load(true);
                const value = await AsyncStorage.getItem('token');
               
                if(value !== null) {
    
                    var formdata = {
                        "user_id" : JSON.parse(value),
                        "subject" :this.state.subject,
                        "message" : this.state.message
            
                    }
    
                    console.log("form data",formdata);
    
                    Axios.post(ApiUrl.base_url + ApiUrl.contact_us,formdata).then(response => {
                        this.props.load(false);
                        console.log("response  == >" ,response.data.status);
                        if(response.data.status == "SUCCESS"){
    
                            // this.refs.subject.setTextInputValue("","subject");
                            // this.refs.message.setTextInputValue("","message");

                            this.setState({subject:""});
                            this.setState({message:""});
                         
                              Alert.alert(
                                'Contact Us',
                                "Your message has been sent to the Admin and will contact you soon!",
                                [
                            
                                {text: 'OK', onPress: () => { this.props.navigation.navigate("HomeScreen")}},
                                
                                ], 
                                { cancelable: false }
                            )
                          
                           
    
                        }else{
                            
    
                            Alert.alert(
                                'Contact Us',
                                "Some error occured .Please try again later",
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
                            "Check Your Network Connection ! And try again later .",
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
            <View style={{flex:2,justifyContent:"center", height :null}}>

                
                {/* <CustomTextInput 
                ref="subject"
                field_text={{marginLeft:20}}
                
                placeholder="Enter Subject"
                text="SUBJECT"
                inputType="subject"
                isPassword={false}
                error_text="Please Enter Subject"
                />

                <CustomTextInput 
               
                ref="message"
                field_text={{marginLeft:20}}
                text_input_width={{height:100,paddingTop: 0, textAlignVertical:"top",
                paddingBottom: 0}}
                placeholder="Enter Message"
                text="MESSAGE"
                inputType="message"
                multiline={true}
                secureTextEntry={false}
               
                error_text="Please Enter Message"
                /> */}

                <TextInput 
                    placeholder="Subject"
                    onChangeText ={(value)=>{this.setState({subject:value})}} 
                    style={{marginTop:20,marginBottom:20,marginLeft:5}}
                    value={this.state.subject}/>
                    
                    <View style={styles.viewLine}></View>
                    {/* //borderRadius:15,borderColor:'#808080',borderWidth:1, */}

                <TextInput 
                    placeholder="Messsage"
                    style={{height:100,paddingTop: 0, textAlignVertical:"top",
                    paddingBottom: 0,paddingTop:10,marginLeft:5}}
                    onChangeText ={(value)=>{this.setState({message:value})}} 
                    value={this.state.message}/>

                    <View style={styles.viewLine}></View>

                <CustomButton  text="Submit"  onPressHandler={()=>{this.submitHandler()}}/>
                  

            </View>
        )
    }
}

export default HomeHOC(ContactUs,{title :"Contact Us",header_color:"white", image_name :require('../../Assets/back-arrow.png') ,hamburger:false });

const styles = StyleSheet.create({

    viewLine:{
        width:"100%",backgroundColor:"grey",height:1,marginTop:5,marginBottom:10,marginLeft:8,marginRight:8
    }
})