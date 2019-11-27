import React,{Component} from 'react';
import { View,Text,TouchableOpacity,Image,StyleSheet,FlatList,Alert} from 'react-native';
import Colors from '../Utility/Colors';
import HomeHOC from '../HOC/HomeHOC';
import CustomBanner from '../CustomUI/CustomBanner';
import Axios from 'axios';
import ApiUrl from '../Utility/ApiUrl';
import CategoryItem from './CategoryItem';
import DeviceInfo from 'react-native-device-info';

class Home  extends Component {


    constructor(props){
        super(props);
        this.state = {
            responseData :[],
            categoryData:[],
        }
    }

   
    componentDidMount(){
        this.props.load(true);
        Axios.get(ApiUrl.base_url + ApiUrl.banner_api).then(response => {

            
            this.props.load(false);
            if(response.data.status == "SUCCESS"){
                
                this.setState({responseData:response.data.data});
            }
           
            

        }).catch(error => {
            
            this.props.load(false);
            Alert.alert(
                'Network Error',
                "Check Your Network Connection .! And try again later .",
                [
            
                {text: 'OK', onPress: () => {}},
                
                ], 
                { cancelable: false }
                )
           

        });
        this.props.load(true);
        Axios.get(ApiUrl.base_url + ApiUrl.fetch_category).then(response => {

            this.props.load(false);
           if(response.data.status == "SUCCESS"){
            this.setState({categoryData:response.data.data});
           }
           

        }).catch(error => {
            this.props.load(false);
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

    renderItem(data){
        let { item, index } = data;
        console.log("id-->",item.id);
       if(item.id ==  6){

        return(
            <TouchableOpacity
            onPress={()=> this.props.navigation.navigate('SendDetails',{id:item.id , name : item.category_name,update:0})}>
                <CategoryItem data={item} />
            </TouchableOpacity>
           
        );

       }else{

        return(
            <TouchableOpacity
            onPress={()=> this.props.navigation.navigate('CategoryDetails',{id:item.id , name : item.category_name,update:0})}>
                <CategoryItem data={item} />
            </TouchableOpacity>
           
        );
       }
       
    }

    
    render(){
        return(
            <View style={{height:null}}>
                {
                    this.state.responseData.length > 0
                    ?
                        <CustomBanner  images={this.state.responseData}/>
                    :
                    <View/>

                }
               
                <Text style={styles.buildText}>Build Your Project</Text>
                <FlatList
                      numColumns={DeviceInfo.isTablet() ? 3 : 2 }
                      data={this.state.categoryData}
                      keyExtractor={(item, index) => index.toString()}
                      renderItem={(item) =>this.renderItem(item)}
                      style={{paddingBottom:10}}
                      columnWrapperStyle={{flexGrow: 1, justifyContent: 'space-around',marginTop:15}}
                      />
                
            </View>
        )
    }
}

export default HomeHOC(Home,{title :"HOME",header_color:Colors.yellow_theme, image_name :require('../../Assets/menu_button.png') ,hamburger:true });


const styles = StyleSheet.create({

    buildText:{
        fontSize:15,
        flex:1,
        marginTop:10,
        fontWeight:"bold",
        alignSelf:"center"
    }
})