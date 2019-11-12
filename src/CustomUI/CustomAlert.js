import React ,{Component} from 'react';
import {StyleSheet,View,Text,TouchableOpacity,Dimensions,Button} from  'react-native';
import Modal from 'react-native-modal';
import CustomLogo from './CustomLogo';
import Colors from '../Utility/Colors';
const deviceWidth = Dimensions.get("window").width;


export default class CustomAlert extends Component {

    state  ={
        isVisible:true
    }

    render(){
        return(
            <View style={{margin:40}}>
                <Modal
                    isVisible={this.state.isVisible} >
                        <View style={styles.child}>
                            <CustomLogo />
                            <Text style={styles.textHeading}>Heading</Text>
                            <Text style={styles.textMessage}>Message</Text>
                            <Button onPress={()=>{this.props.showAlert(false)}} title="Cancel" />
                            
                                {/* <TouchableOpacity
                                
                                onPress={()=>{this.onDismissModal()}}
                                 style={styles.btnCancelStyle}>
                                     <View style={styles.textCancelView}>
                                         <Text style={{alignSelf:"center"}}>Cancel</Text>
                                     </View>

                                </TouchableOpacity> */}
                                {/* <TouchableOpacity
                                style={styles.btnOKStyle}>
                                    <View style={styles.textOkView}>
                                         <Text style={{alignSelf:"center"}}> OK</Text>
                                     </View>
                                </TouchableOpacity> */}
                           

                        </View>
                     </Modal>

            </View>
        );
    }
}


const styles = StyleSheet.create({

    container:{
        flex:1,
        
    },
    child:{
        margin:20,
        width: deviceWidth,
        backgroundColor:"white",
        alignSelf:"center",
        elevation:5
        
    },
    textHeading:{
        fontSize:17,
        fontWeight:"bold",
        color:"black"
    },
    textMessage:{
        fontSize:14,
        fontWeight:"bold"
    },
    viewRow:{
        flexDirection:"row",
        flex:2,
        justifyContent:"space-between"
    },
    btnCancelStyle:{
        height:"30%",
        flex:1,
        
    },
    btnOKStyle:{
       
        height:"30%",
        
        flex:1,
        
       
    },
    textCancelView:{
        backgroundColor:"white",
        padding:20,
        justifyContent:"center"
        
    },
    textOkView:{
        backgroundColor:Colors.yellow_theme,
        padding:20,
        justifyContent:"flex-end"
       
    }

})