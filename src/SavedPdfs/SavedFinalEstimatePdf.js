import React ,{ Component } from 'react';
import { View ,Text , StyleSheet ,Platform, FlatList ,Alert,Image, ActivityIndicator,TouchableOpacity,TouchableWithoutFeedback}  from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Card  } from 'react-native-elements';
import RNFetchBlob from 'rn-fetch-blob'
import Axios from 'axios';
import ApiUrl from '../Utility/ApiUrl';
import AsyncStorage from '@react-native-community/async-storage';
import {PermissionsAndroid} from 'react-native';
import Share from 'react-native-share';


export  default class SavedFinalEstimatePdf extends Component {



    static navigationOptions = ({ navigation }) => ({
        
        title:"Saved Estimate Pdf",
        headerTitleStyle: {
            color: 'black',
            alignSelf: 'center',
            textAlign: 'center',
            fontSize: 15,
            fontWeight:"bold"
           
        },
        headerLeft:(
             <TouchableOpacity
              onPress={()=>{navigation.navigate("HomeScreen")}}
            >
              <Image source={require('../../Assets/back-arrow.png')} style={{width:24,height:24,marginLeft:20}}/>
             
            </TouchableOpacity>
        //   <View/>
        )
     
    });

     state = {
         loading:false,
          saved_pdf:[],
          dataNotFound:false

     }

      componentDidMount =async()=>{

        const user_id  =  await AsyncStorage.getItem('token');
        var formdata = new FormData();
        formdata.append('user_id',JSON.parse(user_id));

        this.setState({loading:true});
       
        Axios.post(ApiUrl.base_url + ApiUrl.pdf_listing,formdata).then(response =>{
            console.log("r=",response);
            this.setState({loading:false});

            if(response.data.status == "SUCCESS"){

                this.setState({dataNotFound:false});
                this.setState({saved_pdf:response.data.data});
              

            }else{

                this.setState({dataNotFound:true});
               
            }





        }).catch(error => {

            console.log("error ==",error);
            this.setState({loading:false});

            Alert.alert(
                'Network Connection',
                "Check Your Network Connection!",
                [
            
                {text: 'OK', onPress: () => {}},
                
                ], 
                { cancelable: false }
                )


        })
     }

     showDeleteAlert = (item) =>{
        Alert.alert(
            'Delete Pdf File',
            "Are you sure that you want to delete this file ?",
            [
         
           
            {text: 'CANCEL', onPress: () =>  {console.log("ok")}},
            {text: 'OK', onPress: () =>  {this.deletePdf(item)}},
            ], 
            { cancelable: false }
            )
        
     }

     deletePdf = (item) => {

        
        this.setState({loading:true});
        let formdata = new FormData();
        formdata.append("pdf_id",JSON.parse(item.id));
        
       
        Axios.post(ApiUrl.base_url + ApiUrl.delete_cart,formdata).then(response => {

            this.setState({loading:false});
            if(response.data.status == 'SUCCESS'){

                const save_files = [...this.state.saved_pdf]

                save_files.forEach((element,index) => {

                    if(element.id ==  item.id){
                        save_files.splice(index,1);
                    }
                    
                });

                this.setState({saved_pdf:save_files},()=>{
                    console.log("save...",this.state.saved_pdf)
                })

                Alert.alert(
                    'Delete Pdf File',
                    "PDF File has been deleted successfully!",
                    [
                
                    {text: 'OK', onPress: () => {}},
                    
                    ], 
                    { cancelable: false }
                    )


            }else{

               
            }

        }).catch(error =>{

            console.log("error",error);
            this.setState({loading:false});

            Alert.alert(
                'Network Connection',
                "Check your network connection!",
                [
            
                {text: 'OK', onPress: () => {}},
                
                ], 
                { cancelable: false }
                )

        })
     }


     requestReadPermission =async(url)=> {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                {
                title: 'DrillSub Requires Permission',
                message:
                    'DrillSub needs access to your storage ' +
                    'to download the File',
                buttonNeutral: 'Ask Me Later',
                buttonNegative: 'Cancel',
                buttonPositive: 'OK',
                },
            );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {

              
           
            return true;
          } else {
            
           return false;
          }
        } catch (err) {
            console.log("on err",err)
          return false;
        }
      }


      

     shareFile= async(item) =>{

        const request =  await this.requestReadPermission();

        if(request){

                const url =  item.pdf_file;
                this.setState({loading:true});
                let filename  = item.pdf_file.substring(item.pdf_file.lastIndexOf('/') + 1);
              
                    const { config, fs } = RNFetchBlob
                    let dirs = RNFetchBlob.fs.dirs
                    let options = {
                      fileCache: true,
                      addAndroidDownloads : {
                        useDownloadManager : true,
                        notification : true,
                        path:  dirs.DownloadDir  + "/"+filename,
                        description : 'pdf'
                      }
                    }
                    config(options).fetch('GET', url).then(async(res) => {
                        console.log("response === > ",res);
                        this.setState({loading:false});
                        let filePath = res.path();
                        let options = {
                            type: 'application/pdf', //if your file isn't mp3 change to the mime type of your file
                            url:   Platform.OS === 'android' ? "file://"+filePath : filePath
                          };
                          console.log("opttions=>",options);
                          await Share.open(options);
                       
                    });


           
          
          
        }else{
           
            Alert.alert(
                'Share File',
                "Please grant the permission from Settings.!",
                [
            
                {text: 'OK', onPress: () => {}},
                
                ], 
                { cancelable: false }
                )
        }
        
    }

    shareFileIOS = (item) =>{

            const url =  item.pdf_file
            this.setState({loading:true});
            let filename  = item.pdf_file.substring(item.pdf_file.lastIndexOf('/') + 1);
            const { config, fs } = RNFetchBlob
            let dirs = RNFetchBlob.fs.dirs
            let filePath = dirs.DocumentDir + "/"+filename
            let options = {
              fileCache: true,
              path:  filePath,
              description : 'pdf'
           
            }
           config(options).fetch('GET', url).then(async(res) => {
               console.log("response === > ",res);
               this.setState({loading:false});
               let filePath = res.path();
               let options = {
                   type: 'application/pdf', //if your file isn't mp3 change to the mime type of your file
                   url:   filePath
                 };
                 console.log("opttions=>",options);
                 await Share.open(options);
              
           });



    }
 
     renderItem = (data) =>{
        let { item, index } = data;

        let filename  = item.pdf_file.substring(item.pdf_file.lastIndexOf('/') + 1);
        
        return(
            <View style={{margin:0}}>

                <Card style={{width:'100%',padding:3,borderRadius:10}}
                containerStyle={{elevation:4}}>
                    <TouchableWithoutFeedback>




                        <View style={{width:'100%',flex:1,flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                            <View style={{flexDirection:'row',alignItems:'center'}}>
                                <Image style={{width: 30, height: 30,overflow:'hidden',marginRight:10}}  source={require('../../Assets/pdf.png')} />

                                <View>
                                    <Text style={{fontSize:15,color:'black',marginRight:4,fontWeight:'bold'}}>{filename}</Text>
                                </View>

                            </View>

                            <View style={{flexDirection:"row",}}>

                                <TouchableOpacity style={{backgroundColor:'#F7F7F7',marginRight:5,
                                borderRadius:20,padding:9,justifyContent:'center',alignItems:'center'}}
                                onPress={() => this.download(item)}>
                                <Image style={{width: 20, height: 20,}}
                                source={require('../../Assets/download.png')} />
                                </TouchableOpacity>
                                <TouchableOpacity style={{backgroundColor:'#F7F7F7',marginRight:5,
                                borderRadius:20,padding:9,justifyContent:'center',alignItems:'center'}}
                                onPress={() => this.showDeleteAlert(item)}>
                                <Image style={{width: 20, height: 20}}
                                source={require('../../Assets/close.png')} />
                                </TouchableOpacity>
                                <TouchableOpacity style={{backgroundColor:'#F7F7F7',marginRight:5,
                                borderRadius:20,padding:9,justifyContent:'center',alignItems:'center'}}
                                onPress={() => {Platform.OS == 'android' ? this.shareFile(item) : this.shareFileIOS(item)}}>
                                <Image style={{width: 20, height: 20}}
                                source={require('../../Assets/share.png')} />
                                </TouchableOpacity>
                            </View>


                        </View>


                    </TouchableWithoutFeedback>
                </Card>

            </View>
        )
    }


    download =(item) => {

        this.setState({loading:true});
        let filename  = item.pdf_file.substring(item.pdf_file.lastIndexOf('/') + 1)
       
        const { config, fs } = RNFetchBlob
        let dirs = RNFetchBlob.fs.dirs
        let filePath = dirs.DocumentDir + filename;
        let options ;
        if(Platform.OS == 'android'){
          options = {
                fileCache: true,
                addAndroidDownloads : {
                  useDownloadManager : true,
                  notification : true,
                  path:  dirs.DownloadDir  + "/"+filename ,
                  description : 'pdf'
                }
              }
        }else{
            options = {
                fileCache: true,
                path:  filePath,
                description : 'pdf'
             
              }
        }
       
        config(options).fetch('GET', item.pdf_file).then(async(res) => {
            this.setState({loading:false});
            let filePath = res.path();
            console.log("File Path",filePath);
            let options = {
                type: 'application/pdf', //if your file isn't mp3 change to the mime type of your file
                url:   Platform.OS === 'android' ? "file://"+filePath : filePath
              };

              if(Platform.OS ==  'android'){

                Alert.alert(
                    'Save Pdf File',
                    "Final Estimate Pdf has been saved in Documents Directory. ",
                    [
                
                    {text: 'OK', onPress: () => {}},
                    
                    ], 
                    { cancelable: false }
                    )
                

              }else{
                Alert.alert(
                    'Save Pdf File',
                    "Final Estimate Pdf has been saved in Files App ,Go to Browse -> On my iPhone -> DrillSub to find the pdf. ",
                    [
                
                    {text: 'OK', onPress: () => {}},
                    
                    ], 
                    { cancelable: false }
                    )
                
              }
             
           
        });

    }

    render( ){
        return(
            <View style={styles.container}>
                <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
                    <View style={{height:null,}}>

                    <FlatList
                        data={this.state.saved_pdf}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={(item) =>this.renderItem(item)}
                        style={{paddingBottom:10,marginTop:10}}
                        
                        />

                        {this.state.dataNotFound ?
                            <Text style={{alignContent:"center",fontSize:17,fontWeight:"bold",alignSelf:"center",textAlignVertical:"center",justifyContent:"center",color:"grey"}}>Data Not Found.</Text>
                        :
                            <View/>
                        }

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

});