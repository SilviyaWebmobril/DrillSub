import React ,{Component } from 'react';
import {View ,StyleSheet,Text,TextInput,ActivityIndicator,AsyncStorage,Alert,BackHandler,TouchableOpacity,Image,ToastAndroid} from 'react-native';
import HomeHOC from '../HOC/HomeHOC';
import {KeyboardAwareScrollView}  from 'react-native-keyboard-aware-scroll-view';
import Colors from '../Utility/Colors';
import RNPickerSelect from 'react-native-picker-select';
import {Chevron} from 'react-native-shapes';
import CustomButton from '../CustomUI/CustomButton';
import Axios from 'axios';
import ApiUrl from '../Utility/ApiUrl';
import RNPrint from 'react-native-print';
import {PermissionsAndroid} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob'
import Share from 'react-native-share';
import RNFS from 'react-native-fs';


export default class CategoryDetails extends Component {

    static navigationOptions = ({ navigation }) => ({
        
        title:navigation.state.params.name,
        headerTitleStyle: {
            color: 'black',
            alignSelf: 'center',
            textAlign: 'center',
            fontSize: 13,
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
            value_id:1,
            quantity:"",
            vegitarianData:[{label:"NO",value:1},{label:"YES",value:2}],
            diameter:[],
            price:"0",
            response:[],
            dia:""
            
        }

    }

    componentDidMount(){

     
     
        this.setState({loading:true});
        var formdata = {
            cat_id : this.props.navigation.getParam('id')
        }
        Axios.post(ApiUrl.base_url +  ApiUrl.get_category_details,formdata).then(response => {

           
            this.setState({loading:false});
            if(response.data.status == "SUCCESS" && this.props.navigation.getParam("update") == 0){
              
              
                this.setState({response:response.data.data});
                const dia = [...response.data.data];
                const stateDiameter = [...this.state.diameter];
                dia.map(item =>{
                    var value = {};
                    Object.assign(value,{label:item.diameter,value:item.id});
                    stateDiameter.push(value)
                });
                this.setState({diameter:stateDiameter})
            }else if(response.data.status == "SUCCESS" && this.props.navigation.getParam("update") == 1){
                var price ;
              
                this.setState({response:response.data.data});
                const dia = [...response.data.data];
                const stateDiameter = [...this.state.diameter];
                dia.map(item =>{
                    var value = {};
                    Object.assign(value,{label:item.diameter,value:item.id});
                    stateDiameter.push(value)
                });
                this.setState({diameter:stateDiameter});
                this.setState({dia:this.props.navigation.getParam('size')})
                this.setState({quantity: this.props.navigation.getParam("quantity")});
               
                this.setState({price:this.props.navigation.getParam("price")});
                
            }
        }).catch(error => {

            console.log("response error",error);
            Alert.alert(
                'Network Error',
                "Check Your Network Connection .! And try again later .",
                [
            
                {text: 'OK', onPress: () => {}},
                
                ], 
                { cancelable: false }
                )
        });
    }

    calculatePrice = () =>{

        const data = [...this.state.response];
        var price;
        data.map(item => {

            if(item.id == this.state.value_id){
                console.log(item.cost_per_unit)
                this.setState({dia:item.diameter});
                if(this.state.quantity != ""){
                   
                    price = parseFloat(this.state.quantity) * parseFloat(item.cost_per_unit);
                    this.setState({price:price},()=>{
                        console.log("pr =",this.state.price);

                    });
                }else{
                    this.setState({price:"0"})
                }
                
            }

        });
      
      

    }

    saveHandler = async() =>{

        if(this.state.quantity == ""){
            alert("Please enter quantity");
            return;
        }
      
        this.setState({loading:true});
        const value = await AsyncStorage.getItem('token');
       
        if(this.props.navigation.getParam("update") == 0){

            var formdata = {
                user_id : JSON.parse(value),
                size: this.state.dia,
                quantity:this.state.quantity,
                cat_id: this.props.navigation.getParam('id')
    
            }

            Axios.post(ApiUrl.base_url + ApiUrl.save_details,formdata).then(response=>{

                this.setState({loading:false});
                if(response.data.status == "SUCCESS"){
    
                    
                    Alert.alert(
                        'Quantity Saved',
                        "Quantity saved successfully!",
                        [
                    
                        {text: 'OK', onPress: () => {}},
                        
                        ], 
                        { cancelable: false }
                        )
    
                }else{
                    
                    Alert.alert(
                        'Quantity Saved',
                        "Some Error Occured. Please try again Later!",
                        [
                    
                        {text: 'OK', onPress: () => {}},
                        
                        ], 
                        { cancelable: false }
                        )
                }
            }).catch(error=>{
                this.setState({loading:false});
               
                Alert.alert(
                    'Network Error',
                    "Check Your Network Connection .! And try again later .",
                    [
                
                    {text: 'OK', onPress: () => {}},
                    
                    ], 
                    { cancelable: false }
                    )
            });
        }else{

            var formdata = {
                cart_id : (this.props.navigation.getParam('cart_id')),
                size: this.state.dia,
                quantity:this.state.quantity,
    
            }

            Axios.post(ApiUrl.base_url + ApiUrl.edit_save_details,formdata).then(response=>{

                this.setState({loading:false});
                
                console.log("response edit", response)
                if(response.data.status == "SUCCESS"){
    
                    this.props.navigation.state.params.onRefresh();
                    Alert.alert(
                        'Quantity Saved',
                        "Quantity Saved Successfully!",
                        [
                    
                        {text: 'OK', onPress: () => {}},
                        
                        ], 
                        { cancelable: false }
                        )
    
                }else{
                    Alert.alert(
                        'Quantity Saved',
                        "Some Error Occured. Please try again Later!",
                        [
                    
                        {text: 'OK', onPress: () => {}},
                        
                        ], 
                        { cancelable: false }
                        )
                }
            }).catch(error=>{
                this.setState({loading:false});
                console.log("on errror",error);
                
                Alert.alert(
                    'Network Error',
                    "Check Your Network Connection .! And try again later .",
                    [
                
                    {text: 'OK', onPress: () => {}},
                    
                    ], 
                    { cancelable: false }
                    )
            });

        }
      
    }

    generatePDF = async() =>{

        if(this.state.quantity == ""){
            alert("Please enter quantity");
            return;
        }
        this.setState({loading:true});
        const  cat_id = this.props.navigation.getParam('id');
        const size  = this.state.dia;
        const quantity = this.state.quantity;
        const url =  "https://webmobril.org/dev/drillsub/api/Mobileapi/pdffile?cat_id="+cat_id+"&size="+size+"&quantity="+quantity;
        console.log("url ==>",url);

        var formdata = new FormData();
        formdata.append("cat_id",cat_id);
        formdata.append("size",size);
        formdata.append("quantity",quantity);
        Axios.post("https://webmobril.org/dev/drillsub/api/Mobileapi/pdffile",formdata).then(async res =>{

        console.log("respp =>",res);
        this.setState({loading:false});
            await RNPrint.print({
                html: res.data.category_data
              })

        }).catch(err => {
            Alert.alert(
                'Generate PDF',
                "Some Error Occured. Please try again Later!",
                [
            
                {text: 'OK', onPress: () => {}},
                
                ], 
                { cancelable: false }
                )
        })
       
       
        
    }

     async requestReadPermission() {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
              title: 'DrillSub Requires Permission',
              message:
                'DrillSub needs access to your storage ' +
                'to share the File',
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
          return false;
        }
      }

      

      shareFile= () =>{

        if(this.requestReadPermission()){

            if(this.state.quantity !== ""){

                const  cat_id = this.props.navigation.getParam('id');
                const size  = this.state.dia;
                const quantity = this.state.quantity;
                const url =  "https://webmobril.org/dev/drillsub/api/Mobileapi/pdffilenew?cat_id="+cat_id+"&size="+size+"&quantity="+quantity;
                this.setState({loading:true});
                Axios.get(url).then(response => {
                    this.setState({loading:false});

                     console.log("res get",response.data.data);
                    const { config, fs } = RNFetchBlob
                    let dirs = RNFetchBlob.fs.dirs
                    let options = {
                      fileCache: true,
                      addAndroidDownloads : {
                        useDownloadManager : true,
                        notification : true,
                        path:  dirs.DownloadDir  + "/drillsub.pdf",
                        description : 'pdf'
                      }
                    }
                    config(options).fetch('GET', response.data.data).then(async(res) => {
                        console.log("response === > ",res);
                        let filePath = res.path();
                        let options = {
                            type: 'application/pdf', //if your file isn't mp3 change to the mime type of your file
                            url:   Platform.OS === 'android' ? "file://"+filePath : filePath
                          };
                          console.log("opttions=>",options);
                          await Share.open(options);
                       
                    });

                   

                }).catch(error =>{

                })


           
              

               
               
            }else{
                Alert.alert(
                    'Share File',
                    "Please Add Quantity !",
                    [
                
                    {text: 'OK', onPress: () => {}},
                    
                    ], 
                    { cancelable: false }
                    )
            }

          
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

  

    render(){
        return(
            <View style={{flex:1}}>
                <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    <Text style={styles.size}> Size (in Feet)     </Text>
                    <RNPickerSelect
                        placeholder={{}}
                        value={(this.state && this.state.value_id) || 1}
                        onValueChange={(itemValue) => {this.setState({value_id: itemValue},()=>{
                            this.calculatePrice() ;
                        } ); }}
                        items={this.state.diameter}
                        style={{
                            inputAndroid: {
                              backgroundColor: 'transparent',
                              color:"black"
                            },
                            iconContainer: {
                              top: 15,
                              right: 15,
                            },
                          }}
                          Icon={() => {
                            return <Chevron size={1.2} color="gray" />;
                          }}
                          useNativeAndroidPickerStyle={false}
                          textInputProps={{underlineColorAndroid: 'grey'}}
                        />

                    <Text style={styles.size}> Quantity (Each) </Text>
                    <TextInput 
                    style={{marginTop:10}}
                    placeholder ="Enter Quantity" 
                    keyboardType="numeric"
                    onChangeText={(value)=> {this.setState({quantity:value},()=>{
                        this.calculatePrice();
                    });}}
                    value={this.state.quantity}/>
                    <View style={styles.viewLine}></View>
                    <Text style={styles.costStyle}>${this.state.price}</Text>

                    <CustomButton text="Save" onPressHandler={()=>{this.saveHandler()}}/>
                    <CustomButton text="Generate PDF" onPressHandler={()=>{this.generatePDF()}}/>
                    <CustomButton text="Share File" onPressHandler={()=>{this.shareFile()}}/>
                

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
    size:{
        fontWeight:"bold",
        fontSize:15,
        color:"grey",
        marginTop:20
    },
    viewLine:{
        width:"100%",backgroundColor:"grey",height:1,marginTop:5
    },
    costStyle:{
        fontSize:25,
        color:"grey",
        fontWeight:"bold",
        textAlign:"center",
        marginTop:30,
        marginBottom:30
    }

})



const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      fontSize: 16,
      paddingVertical: 10,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 0,
      color: 'black',
      margin:20,
      paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 0.5,
        borderColor: 'black',
        marginTop:10,
        borderRadius: 8,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },



  });
  