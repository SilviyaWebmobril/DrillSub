import React,{Component} from 'react';
import {View,Text,StyleSheet,FlatList,TouchableOpacity,Image,ActivityIndicator,Alert} from 'react-native';
import CustomButton from '../CustomUI/CustomButton';
import { CustomTextInput } from '../CustomUI/CustomTextInput';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Axios from 'axios';
import ApiUrl from '../Utility/ApiUrl';
import FinalEstimateItem from './FinalEstimateItem';
import AsyncStorage from '@react-native-community/async-storage';
import RNPrint from 'react-native-print';
import {PermissionsAndroid} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob'
import { StackActions, NavigationActions} from 'react-navigation';;


export default class FinalEstimate  extends Component {


    static navigationOptions = ({ navigation }) => ({
        
        title:"Final Estimate",
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
          
        )
     
    });

    constructor(props){
        super(props);
        this.state = {
            loading:false,
            saved_item:[],
            total_amount:""
        }
    }

    componentDidMount(){

        var formdata = new FormData();
        formdata.append("cart_id",this.props.navigation.getParam('final_check_box',""));
         this.setState({loading:true});
 
         Axios.post(ApiUrl.base_url + ApiUrl.total_price_estimation,formdata).then(response =>{
             this.setState({loading:false});
             if(response.data.status == "SUCCESS"){
 
                this.setState({saved_item:response.data.data.saved_item})
                this.setState({total_amount:response.data.data.total_price.total})
 
 
             }else{
 
                 Alert.alert(
                     'Error',
                     "Something went wrong! . Please try again later.",
                     [
                 
                     {text: 'OK', onPress: () => {}},
                     
                     ], 
                     { cancelable: false }
                     )
             }
 
         }).catch(error => {
 
             console.log("on error",error);
             Alert.alert(
                'Error',
                "Check your Network Connection!",
                [
            
                {text: 'OK', onPress: () => {}},
                
                ], 
                { cancelable: false }
                )
 
         });
    }

    renderItem = (data) =>{
        let { item, index } = data;
        
        return(
          <FinalEstimateItem data={item} />
        )
    }

    submitHandler = async() => {

       
        const name = await AsyncStorage.getItem('name');
        const user_id = await AsyncStorage.getItem('token');

        if(this.refs.address.getInputTextValue('message') == 'invalid'){

            Alert.alert(
                'Final Estimate',
                "Please Enter Project Address",
                [
            
                {text: 'OK', onPress: () => {}},
                
                ], 
                { cancelable: false }
                )

            return;


        }

        if(this.refs.projectname.getInputTextValue('message') == 'invalid'){

            Alert.alert(
                'Final Estimate',
                "Please Enter Project Name",
                [
            
                {text: 'OK', onPress: () => {}},
                
                ], 
                { cancelable: false }
                )

        }

       
        if(this.refs.address.getInputTextValue('message') !== "invalid"){

            this.setState({loading:true});
           
            var formdata = new FormData();
            formdata.append("address",this.refs.address.getInputTextValue('message'));
            formdata.append("cart_id",this.props.navigation.getParam('final_check_box',""));
            formdata.append("project_name",this.refs.projectname.getInputTextValue('message'));
            formdata.append("user_name", name);
            formdata.append("user_id",JSON.parse(user_id));
            Axios.post(ApiUrl.base_url+"totalPriceestimationNew",formdata).then(response=>{
                this.setState({loading:false});
                console.log("response ==>", response.data);
                if(response.data.status == "SUCCESS"){
    
                    Alert.alert(
                        'Final Estimate',
                        `${response.data.message} and saved in Projects Folder.`,
                        [
                    
                        {text: 'OK', onPress: () => {this.props.navigation.navigate('SavedFinalEstimatePdf');
                        const resetAction = StackActions.reset({
                            index: 0,
                            //key: 'PrivacyPolicy', // here there will be no key as 
                            actions: [
                                NavigationActions.navigate({ routeName: 'SavedFinalEstimatePdf' }),
                            
                            ],
                        })
                  
                        this.props.navigation.dispatch(resetAction);}},
                        
                        ], 
                        { cancelable: false }
                        )
                }else{
                    Alert.alert(
                        'Final Estimate',
                        `${response.data.message}`,
                        [
                    
                        {text: 'OK', onPress: () => {}},
                        
                        ], 
                        { cancelable: false }
                        )
                }
    
            }).catch(error =>{
                console.log("error12233",error);
                this.setState({loading:false});
    
                Alert.alert(
                    'Final Estimate',
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
                'Final Estimate',
                "Please Enter Address!",
                [
            
                {text: 'OK', onPress: () => {}},
                
                ], 
                { cancelable: false }
                )

        }
       
       
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


    generatePdfIOS = async(url) => {

   

            const { config, fs } = RNFetchBlob
            let dirs = RNFetchBlob.fs.dirs
            let filePath = dirs.DocumentDir + "/drillsub.pdf"
            let options = {
              fileCache: true,
              path:  filePath,
              description : 'pdf'
           
            }
            config(options).fetch('GET', url).then(async(res) => {
                console.log("response === > ",res);
                let filePath = res.path();
                console.log("File Path",filePath);
                let options = {
                    type: 'application/pdf', //if your file isn't mp3 change to the mime type of your file
                    url:   Platform.OS === 'android' ? "file://"+filePath : filePath
                  };
                  Alert.alert(
                    'Final Estimate',
                    "Final Estimate Pdf has been saved in Files App ,Go to Browse -> On my iPhone -> DrillSub to find the pdf. ",
                    [
                
                    {text: 'OK', onPress: () => {}},
                    
                    ], 
                    { cancelable: false }
                    )
                
               
            });
    

      
      

    }
 

    generatePdf = async(url) => {

   

        const request = await this.requestReadPermission(url);
        console.log("get result",request);
      
        if(request){

            const { config, fs } = RNFetchBlob
            let dirs = RNFetchBlob.fs.dirs
            let options = {
              fileCache: true,
              addAndroidDownloads : {
                useDownloadManager : true,
                notification : true,
                path:  dirs.DownloadDir  + "/drillsub.pdf" ,
                description : 'pdf'
              }
            }
            config(options).fetch('GET', url).then(async(res) => {
                console.log("response === > ",res);
                let filePath = res.path();
                let options = {
                    type: 'application/pdf', //if your file isn't mp3 change to the mime type of your file
                    url:   Platform.OS === 'android' ? "file://"+filePath : filePath
                  };
                  console.log("opttions=>",options);
                 // await Share.open(options);
               
            });
    

        }else{

            Alert.alert(
                'Final Estimate',
                "Please Allow access the storage from Settings !",
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

                    <View style={styles.viewRow1}>
                        <Text style={styles.subHeading4}>Project Name</Text>
                        <Text style={styles.subHeading1}>Size </Text>
                        <Text style={styles.subHeading2}>Qunantity </Text>
                        <Text style={styles.subHeading3}>Price </Text>
                    </View>
                    <View style={styles.viewLine}></View>

                    <FlatList
                        data={this.state.saved_item}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={(item) =>this.renderItem(item)}
                        style={{paddingBottom:10,marginTop:10}}
                        
                        />

                        <View style={styles.viewRow1}>
                            <Text style={{textAlign:'right',flex:3,fontWeight:"bold"}}>Total Amount : </Text>
                            <Text style={{fontWeight:"bold"}}> $ {this.state.total_amount}</Text>

                        </View>

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

                         <CustomTextInput 
                            ref="projectname"
                            field_text={{marginLeft:40}}
                            text_input_width={{width:"80%"}}
                            image_name={require('../../Assets/pdf.png')} 
                            image_style={{width:30,height:30,marginTop:10,marginRight:5}} 
                            placeholder="Enter File Name"
                            text="SAVE AS PDF"
                            inputType="message"
                            error_text="Please Enter File Name"
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