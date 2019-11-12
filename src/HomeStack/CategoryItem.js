import React, {Component} from 'react';
import {View,Text, Image,StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image'
import Colors from '../Utility/Colors';

export default class CategoryItem extends Component {


    render() {
        return(
            <View style={styles.container}>
                <FastImage source={{uri:"https://www.webmobril.org/dev/drillsub/"+this.props.data.image}} resizeMode={FastImage.resizeMode.cover} style={styles.imageStyle} />
                <View style={{backgroundColor:Colors.yellow_theme,alignContent:"center",justifyContent:"center",alignContent:"center"}}>
                    <Text style={styles.titleStyle}>
                        {this.props.data.category_name}
                    </Text>
                </View>
                
            </View>
        )


    }


}


const styles = StyleSheet.create({

    container:{
        
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 1,
        elevation:5,
        shadowRadius: 5,
        borderColor:Colors.yellow_theme,  
        borderRadius:10,
        backgroundColor:Colors.yellow_theme,
        borderWidth:0.1,
        justifyContent:"center", alignItems:"center"  ,
        alignContent:"center"
    },
    imageStyle:{
        width:150,
        height:130,
        borderWidth:0.2,
        borderTopRightRadius:7,
        borderTopLeftRadius:7,
        borderColor:Colors.yellow_theme,
        backgroundColor:Colors.yellow_theme
        
    
    },
    titleStyle:{
        marginTop:5,
        marginBottom:5,
        fontSize:12,
        width:120,
        lineHeight:17,
        alignSelf:"center",
        justifyContent:"center",
        alignContent:"center",
        alignItems:"center",
        textAlign:"center"
       


    }
})