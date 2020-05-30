import React ,{Component} from 'react';
import {View ,StyleSheet, Text, TouchableOpacity} from 'react-native';
import Colors from '../Utility/Colors';

export default class CustomButton extends Component {

    render(){
        return(
           

                <TouchableOpacity
                    onPress ={this.props.onPressHandler}
                    disabled={this.props.disabled}
                    style={[styles.btnStyle, this.props.btn_style]}>
                    <View style={[styles.viewButon,this.props.view_button]}>
                        <Text style={[styles.btnText,this.props.btn_text]}>{this.props.text}</Text>
                    </View>
                </TouchableOpacity>

        );
    }
}

const styles = StyleSheet.create({

    container:{
       // flex:1,
        marginTop:10,
        justifyContent:"center"
         
    },
    btnStyle:{
        width:"80%",
        height:60,
        alignSelf:"center",
      //  flex:1,
        marginTop:15,
        justifyContent:"center"
    },
    viewButon:{
        backgroundColor:Colors.yellow_theme,
        borderRadius:20,
        borderWidth:1,
        borderColor:Colors.yellow_theme,
        padding:10

    },
    btnText:{
        color:"white",
        fontSize:15,
        fontWeight:"bold",
        alignSelf:"center"
    }
})