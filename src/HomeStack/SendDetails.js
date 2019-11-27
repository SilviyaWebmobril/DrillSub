import React,{Component} from 'react';
import {View,Text,StyleSheet,FlatList,TouchableOpacity,Image,ActivityIndicator,Alert} from 'react-native';
import CustomButton from '../CustomUI/CustomButton';
import { CustomTextInput } from '../CustomUI/CustomTextInput';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Axios from 'axios';
import ApiUrl from '../Utility/ApiUrl';
import AsyncStorage from '@react-native-community/async-storage';


export default class SendDetails  extends Component {


    static navigationOptions = ({ navigation }) => ({
        
        title:"Send Details",
        headerTitleStyle: {
            color: 'black',
            alignSelf: 'center',
            textAlign: 'center',
            fontSize: 15,
            fontWeight:"bold"
           
        },
        headerLeft:(
            <TouchableOpacity
              onPress={()=>{navigation.goBack()}}
            >
              <Image source={require('../../Assets/back-arrow.png')} style={{width:24,height:24,marginLeft:20}}/>
             
            </TouchableOpacity>
          
        )
     
    });

    constructor(props){
        super(props);
        this.state = {
            loading:false,
            email:"",
            name:""
        }
    }

    componentDidMount = async()=>{

        const name = await AsyncStorage.getItem('name');
        const email = await AsyncStorage.getItem('email');
        this.refs.email.setTextInputValue(email,"email");
        this.refs.name.setTextInputValue(name,"name");
 
        
       


    }

    submitHandler = async() => {

        this.setState({loading:true});
        const name = await AsyncStorage.getItem('name');
        const email = await AsyncStorage.getItem('email');
        const project_name = this.props.navigation.state.params.name;

        console.log("monile == >", this.refs.address.getInputTextValue('message'));

       
        if(this.refs.address.getInputTextValue('message') !== "invalid" ||  this.refs.mobile.getInputTextValue('mobile') !== "invalid"){

            Axios.get(`https://webmobril.org/dev/drillsub/api/Mobileapi/sendCategory_DetailwithAddress?project_name=${project_name}&user_name=${name}&user_email=${email}&user_mobile=${this.refs.mobile.getInputTextValue('mobile')}&project_address=${this.refs.address.getInputTextValue('address')}`).then(response=>{
                this.setState({loading:false});
                if(response.data.status == "SUCCESS"){

                    this.refs.address.setTextInputValue("message");
                    this.refs.mobile.resetTextInput("mobile");
    
                    Alert.alert(
                        'Send Details',
                        ` ${response.data.message}`,
                        [
                    
                        {text: 'OK', onPress: () => {}},
                        
                        ], 
                        { cancelable: false }
                        )
                }else{
                    Alert.alert(
                        'Send Details',
                        ` ${response.data.message}`,
                        [
                    
                        {text: 'OK', onPress: () => {}},
                        
                        ], 
                        { cancelable: false }
                        )
                }
    
            }).catch(error =>{
                console.log("error",error);
                this.setState({loading:false});
    
                Alert.alert(
                    'Send Details',
                    "Check Your Network Connection!",
                    [
                
                    {text: 'OK', onPress: () => {}},
                    
                    ], 
                    { cancelable: false }
                    )
    
            });

        }else{
            this.setState({loading:false});
            Alert.alert(
                'Send Details',
                "Please Enter Address and mobile!",
                [
            
                {text: 'OK', onPress: () => {}},
                
                ], 
                { cancelable: false }
                )

        }
       
       
    }


    render(){
        return(
            <View style={styles.container}>
                <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
                    <View style={{height:null,}}>

                        <View style={{marginTop:20,marginLeft:20}}>
                            <Text style={{fontWeight:"bold",fontSize:15,color:"grey",marginBottom:5}}>Project Name </Text>
                            <Text style={{fontWeight:"bold",fontSize:15}}>{this.props.navigation.state.params.name}</Text>
                        </View>

                    <CustomTextInput 
                        ref="name"
                        cont={{marginTop:15}}
                        field_text={{marginLeft:40}}
                        image_name={require('../../Assets/name.png')} 
                        image_style={{width:30,height:30,marginTop:10,marginRight:5}} 
                        placeholder="Enter Name"
                        text="NAME"
                        inputType="name"
                        editable={false}
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
                        editable={false}
                        error_text="Please Enter Valid Email"
                        />

                        <CustomTextInput 
                        ref="mobile"
                        field_text={{marginLeft:40}}
                        image_name={require('../../Assets/phone.png')} 
                        image_style={{width:30,height:30,marginTop:10,marginRight:5}} 
                        placeholder="Enter Mobile"
                        text="MOBILE"
                        keyboardType="phone-pad"
                        inputType="mobile"
                        error_text="Please Enter Valid Mobile"
                        />

                        <CustomTextInput 
                            ref="address"
                            field_text={{marginLeft:40}}
                            text_input_width={{width:"80%"}}
                            image_name={require('../../Assets/location.png')} 
                            image_style={{width:30,height:30,marginTop:10,marginRight:5}} 
                            placeholder="Enter Project Address"
                            text="PROJECT ADDRESS"
                            inputType="message"
                            error_text="Please Enter Project Address"
                            />
                        
                            <CustomButton text="Submit" onPressHandler={()=>{this.submitHandler()}} btn_style={{marginTop:20}}/>
                        
            

                    </View>

                </KeyboardAwareScrollView>
                {
                    this.state.loading  &&
                    <View
                        style={[
                        StyleSheet.absoluteFill,
                        { backgroundColor: 'rgba(0, 0, 0, 0.7)', justifyContent: 'center' }
                        ]}
                    >
                        <ActivityIndicator size="large" />
                    </View>
                            
                }  

            </View>
        )
    }
}


const styles = StyleSheet.create({

    container:{
        
        backgroundColor: 'transparent',
        flex:1,
        paddingRight:20,
        paddingLeft:20,
        
      
    },
    viewRow1:{
        flexDirection:"row",
        justifyContent:"space-between"
    
    },
    subHeading4:{
        fontSize:12,
        flex:3,
        marginTop:20,
        color:"black",
        textAlign:'left',
        alignSelf:"center",
      
    },
    subHeading1:{
        fontSize:12,
        flex:1,
        marginTop:20,
        color:"black",
        textAlign:'center',
        alignSelf:"center",
      
    },
    subHeading2:{
        fontSize:12,
        flex:1,
        marginTop:20,
       textAlign:'center',
       color:"black",
       alignSelf:"center",
      
    },
    subHeading3:{
        fontSize:12,
        flex:1,
        marginTop:20,
        color:"black",
        textAlign:'right',
        alignSelf:"center",
      
    },
    viewLine:{
        width:"100%",backgroundColor:"#ECECEC",height:1,marginTop:5
    }


   
})