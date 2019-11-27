import React ,{Component} from 'react';
import {View ,StyleSheet,Text,TouchableOpacity ,Alert} from 'react-native';
import Colors from '../Utility/Colors';
import { withNavigation } from 'react-navigation';
import { CheckBox } from 'react-native-elements';
import Axios from 'axios';
import ApiUrl from '../Utility/ApiUrl';

class SavedSingleItem extends Component {


    editHandler = (cartid ,id,name, size, quantity,price) =>{

       this.props.navigation.navigate('CategoryDetails',{onRefresh:this.onRefresh,cart_id:cartid ,id:id , name : name, size:size, quantity: quantity,price : price,update:1})

    }

    onRefresh =() =>{
        console.log("in reresh")
        // calling function from saved Item 
        this.props.onRefreshPage();
    }

    removeHandler =(cartid) =>{

        let formdata = {
            cart_id :cartid
        }
        Axios.post(ApiUrl.base_url+ApiUrl.remove_cart,formdata).then(response => {

            console.log("response =>",response);
            if(response.data.status == 'SUCCESS'){

                this.props.onRefreshPage();

            }else{

                Alert.alert(
                    'Saved Item',
                    "Something went wrong !Please try again later .",
                    [
                
                    {text: 'OK', onPress: () => {}},
                    
                    ], 
                    { cancelable: false }
                    )
    
                
            }
            
        }).catch(error =>{

            console.log("error",error);
            Alert.alert(
                'Saved Item',
                "Check Your Network Connection .! And try again later .",
                [
            
                {text: 'OK', onPress: () => {}},
                
                ], 
                { cancelable: false }
                )


        });
    }

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.viewRow}>
                    <Text style={styles.headStyle}>{this.props.data.category_name}</Text>
                    <TouchableOpacity
                    onPress={()=>{this.editHandler(this.props.data.id ,this.props.data.categoty_id,this.props.data.category_name,this.props.data.size, this.props.data.quantity,this.props.data.total_price)}}>
                        <View >
                            <Text style={styles.editStyle}>Edit</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                    onPress={()=>{this.removeHandler(this.props.data.id ,this.props.data.categoty_id,this.props.data.category_name,this.props.data.size, this.props.data.quantity,this.props.data.total_price)}}>
                        <View >
                            <Text style={styles.editStyle}>Remove</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.viewRow1}>
                    
                <CheckBox
                   
                    checked={this.props.data.final_check}
                    onPress={()=>{this.props.checkFinal(this.props.data.id)}}
                    containerStyle={{backgroundColor:'transparent',borderColor:"transparent",}} 
                    />

                    <Text style={styles.subHeading1}>Size :{this.props.data.size}''</Text>
                    <Text style={styles.subHeading2}>Qunantity :{this.props.data.quantity}</Text>
                    <Text style={styles.subHeading3}>Price : ${this.props.data.total_price}</Text>
                </View>
                <View style={styles.viewLine}></View>

            </View>
        )
    }
}

export default withNavigation(SavedSingleItem);

const styles = StyleSheet.create({

    container:{

        flexDirection:"column",
        marginTop:5,
        marginBottom:5

    },
    viewRow:{
        flexDirection:"row",
        justifyContent:"space-between",
        flex:10
    
    },
    viewRow1:{
        flexDirection:"row",
        justifyContent:"space-between"
    
    },
    editStyle:{
        color:Colors.yellow_theme,
        flex:1.5,
        marginLeft:5
    },
    headStyle:{
        fontWeight:"700",
        fontSize:15,
        marginBottom:5,
        flex:7

    },
    subHeading1:{
        fontSize:12,
        flex:1,
        marginTop:20,
       alignSelf:"flex-start",
       marginBottom:10,
       color:"grey"
      
    },
    subHeading2:{
        fontSize:12,
        flex:1,
        marginTop:20,
       textAlign:'center',
       color:"grey"
      
    },
    subHeading3:{
        fontSize:12,
        flex:1,
        marginTop:20,
        color:"grey",
        textAlign:'right'
      
    },
    viewLine:{
        width:"100%",backgroundColor:"#ECECEC",height:1,marginTop:5
    }


})