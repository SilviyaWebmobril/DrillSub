import React ,{Component} from 'react';
import {View,Text,StyleSheet,Image,Dimensions,TouchableOpacity,Alert} from 'react-native';
import HomeHOC from '../HOC/HomeHOC';
const widthD = Dimensions.get("window").width;
import {CustomTextInput} from '../CustomUI/CustomTextInput';
import ImagePicker from 'react-native-image-picker';
import FastImage from 'react-native-fast-image';
import AsyncStorage from '@react-native-community/async-storage';
import CustomButton from '../CustomUI/CustomButton';
import Axios from 'axios';
import ApiUrl from '../Utility/ApiUrl';


class EditUserDetails extends Component {


   constructor(props){
       super(props);
       this.state ={
           email:"",
           name:"",
           avatarSource:"",
           storeprofile:false,
           photoSource:"",
           fileName:""
       }
   }

   

     componentDidMount(){

        this.getUserName();
        this.getUserEmailAndProfile();
       
    }

    getUserEmailAndProfile = async() =>{
        try {
            const email = await AsyncStorage.getItem('email');
            this.refs.email.setTextInputValue(email,"email");

            const profile = await AsyncStorage.getItem("profile");
            console.log("profile",this.state.avatarSource);
            this.setState({avatarSource:profile},()=>{

                console.log("this.state.avtar",this.state.avatarSource);
                if(this.state.avatarSource !== null){
                    this.setState({storeprofile:true})
                }
                
            })
            
           
        } catch(e) {
       
        }
     }
     getUserName = async() =>{
        try {
          
            AsyncStorage.getItem('name').then(name => {
               
                this.refs.name.setTextInputValue(name,"name");
            });
            
          
        } catch(e) {
       
        }
     }
  

    showImagePicker = () =>{

        const options = {
            title: 'Select Image',
            storageOptions: {
              skipBackup: true,
              path: 'images',
            },
        };

        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);
           
            if (response.didCancel) {
              console.log('User cancelled image picker');
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
              console.log('User tapped custom button: ', response.customButton);
            } else {
              const source = { uri: response.uri };
           
              // You can also display the image using data:
              // const source = { uri: 'data:image/jpeg;base64,' + response.data };
              this.setState({fileName:response.fileName})
              this.setState({storeprofile:false})
              this.setState({photoSource:source.uri})
              this.setState({
                avatarSource: source,
              });
            }
          });
          
    }

    submitDetails = async() =>{


        if(this.refs.name.getInputTextValue('name') !== "invalid"){

            this.props.load(true);
            var formdata = new FormData(); 
            var email = await AsyncStorage.getItem('email'); 
            if(this.state.fileName == ""){

                formdata.append("email",email)
                formdata.append("name",this.refs.name.getInputTextValue('name'))
            }else{
                formdata.append("email",email);
                formdata.append("name",this.refs.name.getInputTextValue('name'))
               
                var photo = {
                    uri: this.state.photoSource,
                    type:"image/jpeg",
                    name: Platform.OS == 'android'  ? this.state.fileName : "asdfsdfasdfsdf.jpeg",
                };
                formdata.append("profile",photo);
            }

           
      
       
        console.log("formadata",formdata);

        Axios.post(ApiUrl.base_url + ApiUrl.updateProfile,formdata).then(response => {
            this.props.load(false);
            

            if(response.data.status ==  "SUCCESS"){
                AsyncStorage.setItem("name",response.data.updatedUser[0].name);
                AsyncStorage.setItem("email",response.data.updatedUser[0].email);
                AsyncStorage.setItem("profile",response.data.updatedUser[0].user_profile);
                this.props.navigation.navigate("HomeScreen")
                
                
            }else{
               
                Alert.alert(
                    'User Profile',
                    "Something went wrong !Please try again Later.",
                    [
                
                    {text: 'OK', onPress: () => {}},
                    
                    ], 
                    { cancelable: false }
                    )
            }


        }).catch(error => {
            this.props.load(false);
           console.log("error",error);
            Alert.alert(
                'User Profile',
                "Check Your Network Connection .! And try again later .",
                [
            
                {text: 'OK', onPress: () => {}},
                
                ], 
                { cancelable: false }
                )
          
            

            })

        }else{

            Alert.alert(
                'User Profile',
                "User Name is compulsory!",
                [
            
                {text: 'OK', onPress: () => {}},
                
                ], 
                { cancelable: false }
                )
          
        }
        
    }

    render(){
        return(
            <View style={{height:null}}>
                
                <View >
                    {this.state.storeprofile
                    ?
                        <FastImage style={styles.imageStyles}  source={{uri:"https://webmobril.org/dev/drillsub/"+this.state.avatarSource}} resizeMode={FastImage.resizeMode.cover} />
                    :
                        
                            (this.state.avatarSource == null 
                            ?
                                <FastImage style={styles.imageStyles}  source={require('../../Assets/camera.png')} resizeMode={FastImage.resizeMode.cover} />
                            :
                                <FastImage style={styles.imageStyles}  source={this.state.avatarSource} resizeMode={FastImage.resizeMode.cover} />
                            ) 
                        
                    }
                   
                    
                    <TouchableOpacity
                        style={styles.backgroundContainer}
                        onPress={()=>{this.showImagePicker()}}>
                        <Image  style={styles.crossButton} source={require('../../Assets/edit.png')} />
                    </TouchableOpacity>

                </View>

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
                editable={false}
                inputType="email"
                error_text="Please Enter Valid Email"
                />

                <CustomButton text="Submit" onPressHandler={()=>{this.submitDetails()}}/>

            </View>
        )
    }
}

export default HomeHOC(EditUserDetails,{title :" Edit Profile ",header_color:"white", image_name :require('../../Assets/back-arrow.png') ,hamburger:false });


const styles  = StyleSheet.create({

    imageStyles:{

        width:150,
        height:150,
        overflow:"hidden",
        borderRadius:widthD/2,
        borderWidth:1,
        marginTop:20,
        marginRight:40,
        marginLeft:40,
        alignSelf:"center"

    },
    crossButton:{
        width:20,
        height:20,
        marginTop:20,
        marginRight:20,
        alignSelf:"flex-end"
    },

    backgroundContainer: {
        position: 'absolute',
        top: 10,
        bottom: 0,
        left: 0,
        right: 80,
      },
})