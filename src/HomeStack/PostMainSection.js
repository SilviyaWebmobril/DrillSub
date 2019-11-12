import React ,{Component} from 'react';
import {View ,Text, StyleSheet, TouchableOpacity,Dimensions,Image,ToastAndroid,TextInput,PermissionsAndroid,Platform,Alert} from 'react-native';
import colors from '../Utility/Colors';
import ImagePicker from 'react-native-image-picker';
import AsyncStorage from '@react-native-community/async-storage';

export default class PostMainSection extends Component  {

    constructor(props){
        super(props);
        this.state = {
            post_error:false,
            post_text:"",
            imageSourceDummy:"",
            photo:"",
            imageSource:null,
            videoSource:null,
            post_text_error:false,
            post_error_msg:"Your Post should contain description with only one Image / Video .Kindly input all to upload your post."
        }
    }


      addPhoto() {
        const options = {
          maxWidth: 500,
          maxHeight: 500,
          storageOptions: {
            skipBackup: true
          }
        };
     
        //launchCamera
        //showImagePicker
        //launchImageLibrary
        ImagePicker.launchCamera(options, (response) => {
          console.log('Response = ', response);
     
          if (response.didCancel) {
            console.log('User cancelled photo picker');
           // ToastAndroid.show('User cancelled photo picker',ToastAndroid.SHORT);
          }
          else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          }
          else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
          }
          else {
           //const image_data = { uri: `data:image/jpeg;base64,${response.data}` };
            let source = { uri: response.uri};
    
            var photo = {
              uri: response.uri,
              type:"image/jpeg",
              name: Platform.OS == 'android'  ? response.fileName : "asdfsdfasdfsdf.jpeg"
            };
           
    
            this.setState({
              imageSourceDummy: source ,
              photo:photo,
     
            });
          //  this.PhotoSheet.open();
    
            {/*photo is a file object to send to parameters */}
          }
        });
     }

       
  isValid(){
    const { post_text, imageSource , videoSource } = this.state;

    console.log(post_text)

      let valid = false;

        if (post_text.toString().trim().length > 0 && 
        (imageSource != null || videoSource != null)
        ) {

          console.log("True")
            
              valid = true;
              //return true
          }

          if(imageSource != null && videoSource != null){
      
            console.log("SADFDSF")
         //   this.ErroSheet.open()
            //open error sheet 
            this.setState({post_error:true,post_text_error:true})
            this.setState({post_error_msg:"Please Add Photo Image 1 or Photo Image 2"})
            return false;
          }

          else if (post_text.toString().trim().length === 0) {
  
          // this.setTimeout(this.setState({post_text_error:true}), 5000);
          // this.setState({post_error:true,post_text_error:true})
          this.setState({post_error:true,post_text_error:true})

           setTimeout(() => {

            this.setState({post_text_error:false,post_error:false})
           
      
          }, 2000);
        
      
            
            return false;
          }

          else  if(imageSource == null && videoSource == null){

            this.setState({post_error:true,image_video_error:true})
            console.log("imagesssssssss")
            return false;
          }

        
        return valid

  }

      
     makePost(){
        if(this.isValid()){
     
     
          console.log("Making posts")
     
         AsyncStorage.getItem("user_id").then((item) => {
           if (item) {
             var formData = new FormData();
     
             formData.append('user_id',item);
             formData.append('title','title');
             formData.append('description',this.state.post_text);
             {
               this.state.imageSource != null
               ?    formData.append('image',this.state.photo)
               : formData.append('video',this.state.video)
             }
             {
               this.state.imageSource != null
               ?    formData.append('media_type',1)
               : formData.append('media_type',2)
             }
             
     
                           this.setState({loading_status:true})
                           let url = urls.base_url +'api/create_post'
                           fetch(url, {
                           method: 'POST',
                           headers: {
                             'Accept': 'application/json',
                             'Content-Type': 'multipart/form-data',
                           },
                       body: formData
     
                         }).then((response) => response.json())
                               .then((responseJson) => {
                       this.setState({loading_status:false})
                       console.log(JSON.stringify(responseJson))
                  //    ToastAndroid.show(JSON.stringify(responseJson), ToastAndroid.SHORT);
     
                  
                  Platform.OS === 'android' 
                  ?   ToastAndroid.show(responseJson.message, ToastAndroid.SHORT)
                  : Alert.alert(responseJson.message)
     
                  
                                   if(!responseJson.error){
     
                                     this.setState({imageSource:null,
                                     post_text:'',
                                   videoSource:null,
                                 video:null,photo:null})
     
                                 this.getPosts()
                                  
                                 }
                                 else{
     
                                  
                                 }
                               }).catch((error) => {
                                 this.setState({loading_status:false})
                                 
                                 Platform.OS === 'android' 
                           ?   ToastAndroid.show(error.message, ToastAndroid.SHORT)
                           : Alert.alert("Try Again !")
     
     
                               });
           }
           else{
             ToastAndroid.show("User not found !",ToastAndroid.LONG)
           }
         });
        }
       }
    
    

    render(){

        return(
            <View style={{height:Dimensions.get('window').height * 0.18,}}>
                <View style={styles.postsectionmain}>

                    <View style={styles.postmain}>

                        <View style={styles.userimagemain}>
                            <Image style={styles.userimagepost}
                            source={require('../../Assets/view.png')}
                            ></Image>
                        </View>

                        <View style={styles.postinputmain}>
                            <TextInput
                            style={styles.postinput}
                            multiline={true}
                            placeholder={'Write Something here ..'}
                            value={this.state.post_text}
                            onChangeText={(post_text) => this.setState({post_text:post_text}) }
                            >
                            
                            </TextInput>    
                        </View>
                    </View>

                    <View style={styles.postimagemain}>

                        <View style={styles.postphoto}>
                            <Text>Photo</Text>
                            <TouchableOpacity  onPress={()=> this.addPhoto()}>
                                <Image 
                            
                                source={require('../../Assets/@_sign.png')} style={styles.photopost} resizeMode='contain'/>
                            </TouchableOpacity>

                        </View>

                        <View style={styles.postvideomain}>
                            <Text>Video</Text>
                            <TouchableOpacity  onPress={()=> this.addVideo()}>
                                <Image source={require('../../Assets/@_sign.png')}
                                style={styles.photopost} resizeMode='contain'/>
                            </TouchableOpacity>
                        </View>


                        <View style={styles.postbuttonmain}>
                            <TouchableOpacity onPress={()=> this.makePost()}>
                                <View style={styles.postbutton}>
                                    <Text style={styles.postbuttoncolor}>Post</Text>
                                </View>
                            </TouchableOpacity>
                        </View>


                    </View>



                 
                    </View>

                    <View style={styles.borderview}></View>
                    {
                        this.state.post_error
                        ?
                        <View style={{height:null,width:'90%',
                        backgroundColor:'white',borderColor:'red',borderWidth:0.5,elevation:6,
                        padding:15,margin:5}}>
                            {
                            this.state.post_text_error
                            ?   <Text style={{color:colors.color_primary,
                                fontWeight:'bold',alignSelf:'center',margin:5}}>Please Enter Post Description.</Text>
                            : <Text style={{color:colors.color_primary,
                                fontWeight:'bold',alignSelf:'center',margin:5}}>Please Enter one image/video .</Text>
                            }
                        

                            <View style={{flexDirection:'row',
                        flex:4,justifyContent:'space-around',alignItems:'center'}}>

                            <Text style={{flex:3,fontSize:13}}>{this.state.post_error_msg}</Text>
                            <TouchableOpacity onPress={()=> this.setState({post_error:false})}>
                                <View style={{padding:10,justifyContent:'center',alignItems:'center',
                                backgroundColor:colors.color_primary,margin:5,elevation:3,borderRadius:10,marginLeft:9}}>
                                <Text style={{color:'white'}}>OK</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        

                        </View>
                        : null

                        }
            </View>
            
          
 
        )
    }
}

const styles= StyleSheet.create({

    postsectionmain:{
        backgroundColor:'white',
       height:Dimensions.get('window').height * 0.18,
        width:'100%',flexDirection:'row',
        alignItems:'center',
        
        padding:10,flex:2,marginBottom:0},

    postmain:{flex:1.2,height:'100%',flexDirection:'row'},

    userimagemain:{flex:0.3,height:'100%',alignItems:'center',justifyContent:'center'},
    userimagepost:{ height: 50, width: 50,borderRadius:65,overflow:'hidden'},

    postinputmain:{flex:0.9,height:'100%'},

    postimagemain:{flex:0.8,height:'100%',flexDirection:'row'},

    postphoto:{flex:0.7,height:'100%',justifyContent:'center',alignItems:'center'},
    photopost:{width:30,height:30},
    postvideomain:{flex:0.7,height:'100%',justifyContent:'center',alignItems:'center'},
    postbuttonmain:{flex:1,height:'100%',justifyContent:'center',alignItems:'center'},
    postbutton:{margin:3,backgroundColor:'blue',height:35,justifyContent:'center' ,alignItems:'center',padding:11,borderRadius:5},
    postbuttoncolor:{color:'white'},
    borderview:{width:'100%',height:0.5,backgroundColor:'grey',marginBottom:15},



})