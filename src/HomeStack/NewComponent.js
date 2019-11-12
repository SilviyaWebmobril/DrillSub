import React ,{Component} from 'react';
import colors from '../Utility/Colors';
import {View ,Text,StyleSheet,Dimensions,TouchableOpacity,Image} from 'react-native';

export default class NewComponent extends Component{


    state={
        post:[],

    }

    showReaction(index){
        this.props.posts[this.props.index].smiley = true
        this.props.resetPost(this.props.posts)
      }

      toggleSmiley(){
        if( this.props.posts[this.props.index].smiley == true){
            this.props.posts[this.props.index].smiley = false
            this.props.resetPost(this.props.posts)
        }
      }
    
      likePosts(post_id,like_id){

       
        this.props.posts.map(item=>{
         if(item.id == post_id){
         if(like_id == 1){
          Object.assign(item,{likes_count:item.likes_count+1})
         }
         }
        })

      //  console.log("PPPPPPPPPP",JSON.stringify(p))

       this.props.resetPost(this.props.posts)


        // AsyncStorage.getItem("user_id").then((item) => {
        //   if (item) {
        //     var formData = new FormData();
    
        //     formData.append('user_id',item);
        //     formData.append('post_id',post_id);
        //     formData.append('like_type',like_id);
            
    
        //                   this.setState({loading_status:true})
        //                   let url = urls.base_url +'api/like_post'
        //                   fetch(url, {
        //                   method: 'POST',
        //                   headers: {
        //                     'Accept': 'application/json',
        //                     'Content-Type': 'multipart/form-data',
        //                   },
        //               body: formData
    
        //                 }).then((response) => response.json())
        //                       .then((responseJson) => {
        //               this.setState({loading_status:false})
        //               console.log(JSON.stringify(responseJson))
        //          //    ToastAndroid.show(JSON.stringify(responseJson), ToastAndroid.SHORT);
        //                           if(!responseJson.error){
    
        //                             Platform.OS === 'android' 
        //                             ?   ToastAndroid.show(responseJson.message, ToastAndroid.SHORT)
        //                             : Alert.alert(responseJson.message)
    
    
    
    
    
        //                             var p = [...this.state.posts]
        //                             p.map(item=>{
        //                              if(item.id == post_id){
        //                              if(like_id == 1){
        //                               Object.assign(item,{likes_count:item.likes_count+1})
        //                              }
        //                              }
        //                             })
    
        //                             console.log("PPPPPPPPPP",JSON.stringify(p))
    
        //                            this.setState({posts:p})
        //                         }
        //                         else{
    
                                 
        //                             Platform.OS === 'android' 
        //                             ?   ToastAndroid.show(responseJson.message, ToastAndroid.SHORT)
        //                             : Alert.alert(responseJson.message)
        //                         }
        //                       }).catch((error) => {
        //                         this.setState({loading_status:false})
                                
        //                         Platform.OS === 'android' 
        //                   ?   ToastAndroid.show(error.message, ToastAndroid.SHORT)
        //                   : Alert.alert("Try Again !")
    
    
        //                       });
        //   }
        //   else{
        //     ToastAndroid.show("User not found !",ToastAndroid.LONG)
        //   }
        // });
      }

    render(){

        console.log("props",this.props.posts);
        console.log("index",this.props.index)
        return(

            <View style={styles.postcard}>
    
            <TouchableOpacity onPress={()=>{this.toggleSmiley()}}>
           
            <TouchableOpacity
             //onPress={()=> this.next(this.props)}
            >
            <View style={styles.postcardtouch}>
    
    
           
                 <Image source={{uri:"http://webmobril.org/dev/cannabis/"+this.props.user_pic}}
                    style={styles.userimage}  />
    
                    <View style={styles.timeviewmain}>
                    <Text style={styles.username}>user name</Text>
                    <View style={styles.timeview}>
                          <Image source={require('../../Assets/@_sign.png')}
                            style={styles.clockimage} resizeMode='contain'/>
    
                          <Text style={styles.timetext}>Created at Date</Text>
                    
                    </View>
                    </View>
    
                   
            </View>
            </TouchableOpacity>
            
              
                <Text style={{margin:5
                }}>{this.props.description}</Text>
    
    
                <TouchableOpacity onPress={()=> console.log("PRessssssssssssss")}>
                <View style={[
                    { width: '100%'},
                 
                    { height:Dimensions.get('window').height *0.25,
                      margin: 10,alignSelf:'center'
                  }]} >
    
                 
                  {/* {
                    item.media_type == '2'
                    ?
                    <Video source={{uri:urls.base_url+item.post_video}} 
                    disableBack
                    disableFullscreen
                    disableVolume
                    disableSeekbar
                    muted={true}
                    autoplay={false}
                    paused={false}
                    onPause={()=> console.log("Pause")}
                    onPlay={()=> console.log("Play..")}
                    resizeMode='stretch'
                    showOnStart={true}
                    seekColor={colors.color_primary}
                    style={{width:'93%',height:'100%',alignSelf:'center'}} />
                    : 
                    <Image source={{uri:urls.base_url+item.post_img}} resizeMode='cover'
                    style={{alignSelf:'center',height:'100%',width:'90%',
                    overflow:'hidden',flex:1}}  />
      
                  } */}
               
    
                  </View>
                  </TouchableOpacity>
    
                  <View style={styles.postborder}></View>
    
                  
                <TouchableOpacity activeOpacity={0.6}
                  style={styles.liketouch}
                onPress={()=> this.likePosts(this.props.posts[this.props.index].id,1)}
                onLongPress={()=> {
                this.showReaction(this.props.index)
                }}>
                
                   <Image source={require('../../Assets/@_sign.png')}
                   style={styles.likeimagemain}  />
    
                    <Text>{this.props.posts[this.props.index].likes_count} likes</Text>
    
                    </TouchableOpacity>
    
    
    
                    {
                      this.props.posts[this.props.index].smiley
                      ?
                      <View style={styles.reaction}>
        
    
                      <TouchableOpacity onPress={()=> {
                        this.likePosts(this.props.posts[this.props.index].id,1)
                        this.props.posts[this.props.index].smiley = false
                        this.props.resetPost(this.props.posts)
                      }}>
                      <Image source={require('../../Assets/@_sign.png')}
                     style={styles.reactionimage} resizeMode='contain'/>
                      </TouchableOpacity>
                    
                      <TouchableOpacity onPress={()=> {
                        this.likePosts(this.props.posts[this.props.index].id,2)
                        this.props.posts[this.props.index].smiley = false
                        this.props.resetPost(this.props.posts)
                      }}>
                      <Image source={require('../../Assets/@_sign.png')}
                      style={styles.reactionimage} resizeMode='contain'/>
                      </TouchableOpacity>
    
                      <TouchableOpacity onPress={()=> {
                        this.likePosts(this.props.posts[this.props.index].id,3)
                        this.props.posts[this.props.index].smiley = false
                        this.props.resetPost(this.props.posts)
                      }}>
                      <Image source={require('../../Assets/@_sign.png')}
                      style={styles.reactionimage} resizeMode='contain'/>
                      </TouchableOpacity>
    
    
                      <TouchableOpacity onPress={()=> {
                        this.likePosts(this.props.posts[this.props.index].id,4)
                        this.props.posts[this.props.index].smiley = false
                        this.props.resetPost(this.props.posts)
                      }}>
                      <Image source={require('../../Assets/@_sign.png')}
                      style={styles.reactionimage} resizeMode='contain'/>
                      </TouchableOpacity>
    
    
                      </View>
                      : null
                    }
    
                    
                 
                    </TouchableOpacity>
    
                
          </View>
        )
    }
}



const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:colors.status_bar_color
    },
    
    scrollviewcontainer:{justifyContent:'center',alignItems:'center'},
    scrollview:{backgroundColor:'white',width:'100%',flex:1},
    postsectionmain:{backgroundColor:'white',
    height:Dimensions.get('window').height * 0.18,width:'100%',flexDirection:'row',
   alignItems:'center',padding:10,flex:2,marginBottom:0},
   postmain:{flex:1.2,height:'100%',flexDirection:'row'},
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


