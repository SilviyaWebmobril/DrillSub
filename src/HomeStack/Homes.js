import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  ImageBackground,
  Image,
  TouchableOpacity,
  Alert,
  ToastAndroid,
  Dimensions,FlatList,
  TextInput,PermissionsAndroid,
  RefreshControl,Fragment,Platform
} from 'react-native';
import colors from '../Utility/Colors';
import { DrawerActions } from 'react-navigation';
import NewComponent from './NewComponent';
import PostMainSection from './PostMainSection';




class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state={
      loading_status:false,
      post_text:'',
      //only for text 
      post_text_error:false,
      //for post eroor full
      post_error:false,
      //no image or video error
      image_video_error:false,
      photo:null,
      imageSource:null,
      videoSource:null,
      //dummy is just temp vidoe or image
      imageSourceDummy:null,
      videoSourceDummy:null,
      video:null,
      refreshing:false,
      smiley:false,
      posts:[{
        "id": 30,
        "user_id": 28,
        "user_name": "Mani",
        "user_pic": "siteimages/user/user2814154721571814541.jpg",
        "title": "title",
        "description": "This sisns s zbz z",
        "media_type": 1,
        "post_video": null,
        "post_thumbnail": null,
        "post_img": "siteimages/post/images/post13397046091572601946.jpg",
        "status": 1,
        "likes_count": 1,
        "likes_like": 1,
        "likes_cool": 0,
        "likes_awesome": 0,
        "likes_fantastic": 0,
        "created_at": "2 days ago",
        "smiley": false
      },
      {
        "id": 29,
        "user_id": 28,
        "user_name": "Mani",
        "user_pic": "siteimages/user/user2814154721571814541.jpg",
        "title": "title",
        "description": "This sisns s zbz z",
        "media_type": 1,
        "post_video": null,
        "post_thumbnail": null,
        "post_img": "siteimages/post/images/post647602441572601944.jpg",
        "status": 1,
        "likes_count": 1,
        "likes_like": 1,
        "likes_cool": 0,
        "likes_awesome": 0,
        "likes_fantastic": 0,
        "created_at": "2 days ago",
        "smiley": false
      },
      {
        "id": 25,
        "user_id": 28,
        "user_name": "Mani",
        "user_pic": "siteimages/user/user2814154721571814541.jpg",
        "title": "title",
        "description": "Hii",
        "media_type": 1,
        "post_video": null,
        "post_thumbnail": null,
        "post_img": "siteimages/post/images/post4335646381572593393.jpg",
        "status": 1,
        "likes_count": 2,
        "likes_like": 2,
        "likes_cool": 0,
        "likes_awesome": 0,
        "likes_fantastic": 0,
        "created_at": "3 days ago",
        "smiley": false
      },
      {
        "id": 24,
        "user_id": 28,
        "user_name": "Mani",
        "user_pic": "siteimages/user/user2814154721571814541.jpg",
        "title": "title",
        "description": "New",
        "media_type": 1,
        "post_video": null,
        "post_thumbnail": null,
        "post_img": "siteimages/post/images/post11294026571572592860.jpg",
        "status": 1,
        "likes_count": 2,
        "likes_like": 1,
        "likes_cool": 0,
        "likes_awesome": 0,
        "likes_fantastic": 1,
        "created_at": "3 days ago",
        "smiley": false
      },
      {
        "id": 21,
        "user_id": 28,
        "user_name": "Mani",
        "user_pic": "siteimages/user/user2814154721571814541.jpg",
        "title": "title",
        "description": "No.a",
        "media_type": 1,
        "post_video": null,
        "post_thumbnail": null,
        "post_img": "siteimages/post/images/post11561293521571919465.jpg",
        "status": 1,
        "likes_count": 2,
        "likes_like": 1,
        "likes_cool": 0,
        "likes_awesome": 0,
        "likes_fantastic": 1,
        "created_at": "1 week ago",
        "smiley": false
      },
      {
        "id": 20,
        "user_id": 28,
        "user_name": "Mani",
        "user_pic": "siteimages/user/user2814154721571814541.jpg",
        "title": "title",
        "description": "No.a",
        "media_type": 1,
        "post_video": null,
        "post_thumbnail": null,
        "post_img": "siteimages/post/images/post6265793671571919464.jpg",
        "status": 1,
        "likes_count": 0,
        "likes_like": 0,
        "likes_cool": 0,
        "likes_awesome": 0,
        "likes_fantastic": 0,
        "created_at": "1 week ago",
        "smiley": false
      },
      {
        "id": 19,
        "user_id": 28,
        "user_name": "Mani",
        "user_pic": "siteimages/user/user2814154721571814541.jpg",
        "title": "title",
        "description": "No.a",
        "media_type": 1,
        "post_video": null,
        "post_thumbnail": null,
        "post_img": "siteimages/post/images/post3008187041571919464.jpg",
        "status": 1,
        "likes_count": 2,
        "likes_like": 2,
        "likes_cool": 0,
        "likes_awesome": 0,
        "likes_fantastic": 0,
        "created_at": "1 week ago",
        "smiley": false
      },
      {
        "id": 18,
        "user_id": 28,
        "user_name": "Mani",
        "user_pic": "siteimages/user/user2814154721571814541.jpg",
        "title": "title",
        "description": "No.a",
        "media_type": 1,
        "post_video": null,
        "post_thumbnail": null,
        "post_img": "siteimages/post/images/post8293146931571919464.jpg",
        "status": 1,
        "likes_count": 1,
        "likes_like": 1,
        "likes_cool": 0,
        "likes_awesome": 0,
        "likes_fantastic": 0,
        "created_at": "1 week ago",
        "smiley": false
      },
      {
        "id": 17,
        "user_id": 28,
        "user_name": "Mani",
        "user_pic": "siteimages/user/user2814154721571814541.jpg",
        "title": "title",
        "description": "No.a",
        "media_type": 1,
        "post_video": null,
        "post_thumbnail": null,
        "post_img": "siteimages/post/images/post20937647691571919462.jpg",
        "status": 1,
        "likes_count": 1,
        "likes_like": 1,
        "likes_cool": 0,
        "likes_awesome": 0,
        "likes_fantastic": 0,
        "created_at": "1 week ago",
        "smiley": false
      },
      {
        "id": 16,
        "user_id": 28,
        "user_name": "Mani",
        "user_pic": "siteimages/user/user2814154721571814541.jpg",
        "title": "title",
        "description": "Komal",
        "media_type": 2,
        "post_video": "siteimages/post/videos/post18671858091571919404.mp4",
        "post_thumbnail": null,
        "post_img": null,
        "status": 1,
        "likes_count": 0,
        "likes_like": 0,
        "likes_cool": 0,
        "likes_awesome": 0,
        "likes_fantastic": 0,
        "created_at": "1 week ago",
        "smiley": false
      },
      {
        "id": 15,
        "user_id": 28,
        "user_name": "Mani",
        "user_pic": "siteimages/user/user2814154721571814541.jpg",
        "title": "title",
        "description": "Komal",
        "media_type": 2,
        "post_video": "siteimages/post/videos/post3716105451571919392.mp4",
        "post_thumbnail": null,
        "post_img": null,
        "status": 1,
        "likes_count": 0,
        "likes_like": 0,
        "likes_cool": 0,
        "likes_awesome": 0,
        "likes_fantastic": 0,
        "created_at": "1 week ago",
        "smiley": false
      },
      {
        "id": 14,
        "user_id": 28,
        "user_name": "Mani",
        "user_pic": "siteimages/user/user2814154721571814541.jpg",
        "title": "title",
        "description": "Komal",
        "media_type": 2,
        "post_video": "siteimages/post/videos/post4378344651571919384.mp4",
        "post_thumbnail": null,
        "post_img": null,
        "status": 1,
        "likes_count": 0,
        "likes_like": 0,
        "likes_cool": 0,
        "likes_awesome": 0,
        "likes_fantastic": 0,
        "created_at": "1 week ago",
        "smiley": false
      },
      {
        "id": 13,
        "user_id": 28,
        "user_name": "Mani",
        "user_pic": "siteimages/user/user2814154721571814541.jpg",
        "title": "title",
        "description": "Komal",
        "media_type": 2,
        "post_video": "siteimages/post/videos/post15590980451571919377.mp4",
        "post_thumbnail": null,
        "post_img": null,
        "status": 1,
        "likes_count": 0,
        "likes_like": 0,
        "likes_cool": 0,
        "likes_awesome": 0,
        "likes_fantastic": 0,
        "created_at": "1 week ago",
        "smiley": false
      },
      {
        "id": 12,
        "user_id": 28,
        "user_name": "Mani",
        "user_pic": "siteimages/user/user2814154721571814541.jpg",
        "title": "title",
        "description": "Komal",
        "media_type": 2,
        "post_video": "siteimages/post/videos/post1280017651571919376.mp4",
        "post_thumbnail": null,
        "post_img": null,
        "status": 1,
        "likes_count": 0,
        "likes_like": 0,
        "likes_cool": 0,
        "likes_awesome": 0,
        "likes_fantastic": 0,
        "created_at": "1 week ago",
        "smiley": false
      },
      {
        "id": 5,
        "user_id": 5,
        "user_name": "Vipin",
        "user_pic": "siteimages/user/default_avtar.png",
        "title": "aaaa",
        "description": "sdfsdfsdfsdfsdfsdfsdfsdfdsf",
        "media_type": 2,
        "post_video": "siteimages/post/videos/post4303734141571402186.mp4",
        "post_thumbnail": null,
        "post_img": null,
        "status": 1,
        "likes_count": 9,
        "likes_like": 6,
        "likes_cool": 1,
        "likes_awesome": 2,
        "likes_fantastic": 0,
        "created_at": "2 weeks ago",
        "smiley": false
      },
      {
        "id": 4,
        "user_id": 5,
        "user_name": "Vipin",
        "user_pic": "siteimages/user/default_avtar.png",
        "title": "fgd",
        "description": "fdgfd",
        "media_type": 2,
        "post_video": "siteimages/post/videos/post3864316061571402073.mp4",
        "post_thumbnail": null,
        "post_img": null,
        "status": 1,
        "likes_count": 3,
        "likes_like": 2,
        "likes_cool": 0,
        "likes_awesome": 1,
        "likes_fantastic": 0,
        "created_at": "2 weeks ago",
        "smiley": false
      },
      {
        "id": 3,
        "user_id": 5,
        "user_name": "Vipin",
        "user_pic": "siteimages/user/default_avtar.png",
        "title": "test",
        "description": "test",
        "media_type": 2,
        "post_video": "siteimages/post/videos/post6625614721571402032.mp4",
        "post_thumbnail": null,
        "post_img": null,
        "status": 1,
        "likes_count": 1,
        "likes_like": 0,
        "likes_cool": 0,
        "likes_awesome": 0,
        "likes_fantastic": 1,
        "created_at": "2 weeks ago",
        "smiley": false
      },
      {
        "id": 2,
        "user_id": 5,
        "user_name": "Vipin",
        "user_pic": "siteimages/user/default_avtar.png",
        "title": "aaaa",
        "description": "sdfsdfsdfsdfsdfsdfsdfsdfdsf",
        "media_type": 2,
        "post_video": "siteimages/post/videos/post3139791681571401736.mp4",
        "post_thumbnail": null,
        "post_img": null,
        "status": 1,
        "likes_count": 5,
        "likes_like": 3,
        "likes_cool": 1,
        "likes_awesome": 0,
        "likes_fantastic": 1,
        "created_at": "2 weeks ago",
        "smiley": false
      },
      {
        "id": 1,
        "user_id": 5,
        "user_name": "Vipin",
        "user_pic": "siteimages/user/default_avtar.png",
        "title": "test",
        "description": "test",
        "media_type": 2,
        "post_video": "siteimages/post/videos/post17708719541571401467.MOV",
        "post_thumbnail": null,
        "post_img": null,
        "status": 1,
        "likes_count": 2,
        "likes_like": 1,
        "likes_cool": 0,
        "likes_awesome": 1,
        "likes_fantastic": 0,
        "created_at": "2 weeks ago",
        "smiley": false
      }]
     
    };


  }

  static navigationOptions  = ({ navigation }) => ({
    headerTitleStyle: { alignSelf: 'flex-start' },
    //he back button and title both use this property as their color.
    headerTintColor: 'royalblue',
    headerStyle: {
      backgroundColor: colors.color_primary,
    
          shadowOffset: {
      width: 0,
      height: 3,
  },
  shadowOpacity: 0.5,//for ios
  shadowRadius: 6,
  elevation:10,//for android
    },
   // headerTitle: () => <Text>dssd</Text>,
  //title:"SSSS",
    headerRight: () => (

      <View style={{flexDirection:'row',alignItems:'center',marginRight:7}}>
        {/*  onPress={()=>{ this.props.navigation.navigate("Discover") }}*/}
          <TouchableOpacity onPress={()=>{ navigation.navigate("Discover") }}>
          <Image source={require('../../Assets/@_sign.png')} style={{width:30,height:30}} resizeMode='contain'/>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=>{ navigation.goBack() }}>
          <Image source={require('../../Assets/@_sign.png')} style={{width:30,height:30,marginLeft:20}} resizeMode='contain'/>
          </TouchableOpacity>
    
    </View>
    ),
    headerLeft: () => (
      <View style={{flexDirection:'row',alignItems:'center',marginLeft:7}}>
      <TouchableOpacity onPress={()=>{ navigation.toggleDrawer()}}>
      <Image source={require('../../Assets/@_sign.png')} style={{width:25,height:25}} resizeMode='contain'/>
      </TouchableOpacity>

      <Text style={{marginLeft:20,color:'white',fontSize:17}}>Feeds</Text>
     </View>
    ),
  });

  


  componentDidMount(){
    StatusBar.setBackgroundColor(colors.status_bar_color)
  }


 

  likePosts(post_id,like_id){
    AsyncStorage.getItem("user_id").then((item) => {
      if (item) {
        var formData = new FormData();

        formData.append('user_id',item);
        formData.append('post_id',post_id);
        formData.append('like_type',like_id);
        

                      this.setState({loading_status:true})
                      let url = urls.base_url +'api/like_post'
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
                              if(!responseJson.error){

                                Platform.OS === 'android' 
                                ?   ToastAndroid.show(responseJson.message, ToastAndroid.SHORT)
                                : Alert.alert(responseJson.message)





                                var p = this.state.posts
                                p.map(item=>{
                                 if(item.id == post_id){
                                 if(like_id == 1){
                                  Object.assign(item,{likes_count:item.likes_count+1})
                                 }
                                 }
                                })

                                console.log("PPPPPPPPPP",JSON.stringify(p))

                               this.setState({posts:p})
                            }
                            else{

                             
                                Platform.OS === 'android' 
                                ?   ToastAndroid.show(responseJson.message, ToastAndroid.SHORT)
                                : Alert.alert(responseJson.message)
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

  getPosts(){
    AsyncStorage.getItem("user_id").then((item) => {
      if (item) {
        var formData = new FormData();

        formData.append('user_id',item);
        

                      this.setState({loading_status:true})
                      let url = urls.base_url +'api/home_screen'
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
                              if(!responseJson.error){

                                //report
                                var length = responseJson.posts.length.toString();
                                var temp_arr=[]
                                // for(var i = 0 ; i < length ; i++){


                                // var id = responseJson.posts[i].id
                                // var user_id = responseJson.posts[i].user_id
                                // var user_pic = responseJson.posts[i].user_pic
                                // var user_name = responseJson.posts[i].user_name
                                // var title = responseJson.posts[i].title
                                // var media_type = responseJson.posts[i].media_type
                                // var description = responseJson.posts[i].description
                                // var post_video = responseJson.posts[i].post_video
                                // var post_img = responseJson.posts[i].post_img
                                // var post_thumbnail = responseJson.posts[i].post_thumbnail
                                // var created_at = responseJson.posts[i].created_at
                                // var smiley = false
                                
                                //       const array = [...temp_arr];
                                //       array[i] = { ...array[i], user_id: user_id };
                                //       array[i] = { ...array[i], id: id };
                                //       array[i] = { ...array[i], user_pic: user_pic };
                                //       array[i] = { ...array[i], user_name: user_name};
                                //       array[i] = { ...array[i], title: title };
                                //       array[i] = { ...array[i], media_type: media_type };
                                //       array[i] = { ...array[i], description: description};
                                //       array[i] = { ...array[i], post_video: post_video};
                                //       array[i] = { ...array[i], post_img: post_img };
                                //       array[i] = { ...array[i], post_thumbnail: post_thumbnail };
                                //       array[i] = { ...array[i], created_at: created_at};
                                //       array[i] = { ...array[i], smiley: smiley};
                                     
  
                                //       temp_arr = array
                                // }



                                //attaching a key to all objects 
                                var p = responseJson.posts
                                p.map(item=>{
                                  Object.assign(item,{smiley:false})
                                })

                                console.log("PPPPPPPPPP",JSON.stringify(p))

                               this.setState({posts:p})

                            }
                            else{

                             
                                Platform.OS === 'android' 
                                ?   ToastAndroid.show(responseJson.message, ToastAndroid.SHORT)
                                : Alert.alert(responseJson.message)
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


  checkPermissionPhoto(){
    PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA).then(response => {
      if (response === true){
        this.addPhoto()
    }
      else if (response === false){
          Alert("Please enable camera permission in device settings.")
      }
    })
  }



 

  addVideo() {
    const options = {
      title: 'Video Picker', 
      mediaType: 'video', 
      videoQuality: 'medium',
      durationLimit: 30,
      takePhotoButtonTitle: 'Take Video...',
      allowsEditing: true,
     // customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
      storageOptions: {
        skipBackup: true
      }
    };
 
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);
 
      if (response.didCancel) {
        console.log('User cancelled photo picker');
       // ToastAndroid.show('User cancelled photo picker',ToastAndroid.SHORT);
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);

       // ToastAndroid.show(JSON.stringify(response),ToastAndroid.LONG)
      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {
       //const image_data = { uri: `data:image/jpeg;base64,${response.data}` };
        let source = { uri: response.uri};
        console.log("VIDEO>>>>",JSON.stringify(response))
        var video={
          name: 'name.mp4',
          uri: source.uri,
          type: 'video/mp4'
        }
       

        this.setState({
          videoSourceDummy: source ,
         video:video
 
        });

        this.VideoSheet.open();

   
      

       
      }
    });
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
  



  componentWillMount(){
    this.props.navigation.closeDrawer()
    this.getPosts()
  
    // console.log("val-----------",this.props.user[0]['user_image'])
    // console.log("val-----------",this.props.user[0]['user_name'])
    // console.log("val-----------",this.props.user[0]['email'])
  }


  imageVideoCheck(){
    const { imageSource , videoSource } = this.state
    
    if(imageSource == null && videoSource == null){
      return null
    }
    else if(imageSource != null && videoSource  == null){
      return(
       <View></View>
      )

    }
    else if(videoSource != null && imageSource  == null){
      return(
                      <View style={{height:null,width:"90%",backgroundColor:'red',padding:20}}>
                         
                      </View>
                      

       
      )

    }
  }

  next(item){
    let user_id = item.user_id
    let obj={
      'user_id':user_id
    }
 this.props.navigation.navigate("SellerProfile",{result:obj})
  }

  toggleSmiley(){
    if( this.state.posts[index].smiley == true){
      this.state.posts[index].smiley = false
      this.setState({posts:  this.state.posts})
    }
  }

  showReaction(index){
    this.state.posts[index].smiley = true
              this.setState({posts:  this.state.posts})
  }


  hitReaction(index,like_id){
    this.likePosts(this.state.posts[index].id,like_id)
    this.state.posts[index].smiley = false
    this.setState({posts:  this.state.posts})
  }

  setVideo(){
    this.setState({videoSource:this.state.videoSourceDummy})
  }

  //1-Like
// 2-Cool
// 3-Awesome
// 3-Fantastic

  resetAllPost = (posts) =>{

    this.setState({posts:posts})
  }

  renderItem = ({item, index}) => {
    return(
      <NewComponent  posts={this.state.posts} index={index} resetPost={(posts) => this.resetAllPost(posts)}  />
    )
   }


   setImage(){
    this.setState({imageSource:this.state.imageSourceDummy})
   }

   clearImage(){
    this.setState({imageSource:null,imageSourceDummy:null})
   }

   clearVideo(){
    this.setState({videoSource:null,videoSourceDummy:null})
   }
   
 

    render()
    {


   
      
        return(
          <SafeAreaView style={styles.container} forceInset={{ top: 'never' }}>
          

          {/* <PhotoSheet></PhotoSheet>
          <VideoSheet></VideoSheet>
          <ErroSheet></ErroSheet> */}

          {/* 


      */}


    
    
            <ScrollView style={styles.scrollview}
            showsVerticalScrollIndicator={false}
             refreshControl={
            <RefreshControl style={{backgroundColor: 'transparent'}} 
            refreshing={this.state.loading_status} onRefresh={()=> this.getPosts()} />
          }
           contentContainerStyle={styles.scrollviewcontainer}>

           {/* top item */}
           
              <PostMainSection />
            {/* top item  end*/}

            

        {/* post error */}

        {/* {
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

            <Text style={{flex:3,fontSize:13}}>Your Post should contain description with only one Image / Video .Kindly input all to upload your post.</Text>
              <TouchableOpacity onPress={()=> this.setState({post_error:false})}>
                  <View style={{padding:10,justifyContent:'center',alignItems:'center',
                  backgroundColor:colors.color_primary,margin:5,elevation:3,borderRadius:10,marginLeft:9}}>
                  <Text style={{color:'white'}}>OK</Text>
                  </View>
              </TouchableOpacity>
          </View>
         

          </View>
          : null

        } */}





      

          

           {/* post error  end*/}


               {/* image video preview */}
               
           
       
         



                {/* image video preview  end*/}

               {/*
                <View style={{height:null,width:"90%",backgroundColor:'red',padding:20}}>
                          <VideoPlayer source={this.state.videoSource} 
                            style={{height:200,width:400}} />
                      </View>
            */}

         

            <FlatList
            style={{marginBottom:10,width:'100%'}}
            data={this.state.posts}
            ref={(ref) => this.homeList = ref}
            refreshing={this.state.refreshing}
            onRefresh={async () => {
             // await this.setState({refreshing: true, postsId: [0], radiusId: 0, followingId: 0});
              //this.getPosts();
              console.log("Refreshing !!") 
            }}
            onEndReached={async () => {
             //ToastAndroid.show("No more posts found!!",ToastAndroid.SHORT)
            }}
           
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
            renderItem={(item,index) => this.renderItem(item,index)}
            keyExtractor={item => item.id}
          
           // onEndReachedThreshold={0.5}
            contentContainerStyle={{paddingBottom: 20}}
          />



    
            <Text>No more Post Found</Text>
          
           
                 
                 
                 
    
    
              
    
             
    
            </ScrollView>
    
            {this.state.loading_status &&
              <View style={[
                StyleSheet.absoluteFill,
                { backgroundColor: 'rgba(0, 0, 0, 0.7)', justifyContent: 'center' }
              ]}>
              <PacmanIndicator color={colors.color_primary}/>
              </View>
            }
           
          </SafeAreaView>

        )
    }
}

// const mapStateToProps = state => {
// 	return {
	
// 		user: state.user,
	
// 	};
// };

// const mapDispatchToProps = dispatch => {
//   return {
   
//     change: (userinfo) => dispatch(changeUser(userinfo)),
   
    
//   }
// }


export default Home;



const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:colors.status_bar_color
    },
    
    scrollviewcontainer:{justifyContent:'center',alignItems:'center'},
    scrollview:{backgroundColor:'white',width:'100%',flex:1},
  
   userimagemain:{flex:0.3,height:'100%',alignItems:'center',justifyContent:'center'},
   userimagepost:{ height: 50, width: 50,borderRadius:65,overflow:'hidden'},
    postinputmain:{flex:0.9,height:'100%'},
    postinput:{margin:10,width:'85%',height:'85%',borderColor:'grey',
    borderWidth:1,borderRadius:10,padding:10,textAlignVertical:'top'},
    postimagemain:{flex:0.8,height:'100%',flexDirection:'row'},
    postphoto:{flex:0.7,height:'100%',justifyContent:'center',alignItems:'center'},
    photopost:{width:30,height:30},
    postvideomain:{flex:0.7,height:'100%',justifyContent:'center',alignItems:'center'},
    postbuttonmain:{flex:1,height:'100%',justifyContent:'center',alignItems:'center'},
    postbutton:{margin:3,backgroundColor:'blue',height:35,justifyContent:'center',
    alignItems:'center',padding:11,borderRadius:5},
    postbuttoncolor:{color:'white'},
    borderview:{width:'100%',height:0.5,backgroundColor:'grey',marginBottom:15},

    errorsheetmain:{width:Dimensions.get('window').width * 0.94,
    height:'20%',
    backgroundColor:'white',padding:10,
    flexDirection:'column',backgroundColor:'white'},
   postcard:{
     width: Dimensions.get('window').width* 0.95,
   height:null,backgroundColor:'white',
   margin:10,padding:0,borderWidth:0.5,elevation:3
  },
  sheetvideo:{height:'100%',width:'90%'},
  videosheetmain:{width:Dimensions.get('window').width * 0.94,
          height:'60%',
          backgroundColor:'white',padding:10,
          flexDirection:'row',backgroundColor:'white'},
  notext:{color:colors.color_primary},
  yestext:{color:'white'},
  sheetbuttonview:{flex:1,margin:10,elevation:10},
  sheetbuttonparent:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',
  flex:2},
    sheetlabel:{margin:10},
    sheetbuttonviewtouch:{width:'100%',backgroundColor:colors.color_primary,padding:15,
                justifyContent:'center',alignItems:'center',elevation:10},
    postcardtouch:{
      flexDirection:'row',
      justifyContent:'flex-start',alignItems:'center'
    },
     userimage:{height:40,width:40,
      overflow:'hidden',borderRadius:20,margin:10},

      username:{marginBottom:5,fontWeight:'bold'},
      clockimage:{width:17,height:17,marginRight:6},
      timeview:{flexDirection:'row',width:'90%',alignItems:'center'},

      timetext:{color:'grey',fontSize:13},

      descriptiontext:{margin:5
      },
      postimage:{alignSelf:'center',height:'100%',width:'90%',
      overflow:'hidden',flex:1},
      timeviewmain:{marginLeft:8},
      postborder:{width:'100%',backgroundColor:'grey',height:0.5},
      liketouch:{flexDirection:'row',alignItems:'center'},
      likeimagemain:{height:25,width:25,
        overflow:'hidden',borderRadius:12,margin:10},

        reaction:{position:'absolute',
        bottom:10,left:10,
        backgroundColor:'white',
        width:null,flexDirection:'row',
         alignItems:'center',borderRadius:10,
        padding:5,borderWidth:1},
        reactionimage:{width:20,height:20,marginRight:10},
        photosheetmain:{width:'60%',height:'80%',
        padding:0,flex:3,flexDirection:'row',
        backgroundColor:'white',justifyContent:'center',alignItems:'center'},

        sheetimage:{height:'90%',width:'60%',
      },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(128,128,128,0.5)'
  }
  });


