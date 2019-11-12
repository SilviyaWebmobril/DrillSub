import React from 'react';
import {StyleSheet , View ,Image,Dimensions}  from 'react-native';
const widthD  = Dimensions.get('window').height;
const heightH = Dimensions.get('window').width;


const CustomLogo = () =>{

    return(
        
            <Image source={require('../../Assets/logo1.png')}  resizeMode="contain" style={{width:widthD/2.5,alignSelf:"center"}}/>
    )
}
export default CustomLogo;

const styles = StyleSheet.create({

    container:{
       height:null
    }
})