import React from 'react';
import {View,StyleSheet,Dimensions,Image,Platform} from 'react-native';
import Carousel from 'react-native-banner-carousel';


const BannerWidth = Dimensions.get('window').width;
const BannerHeight = 200;

const CustomBanner = (props) => {

    
    renderPage = (image, index) =>{
      
        return (
            <View key={index}>
                <Image style={styles.imageStyle}  source={{uri:"https://www.webmobril.org/dev/drillsub/"+image.image}} />
            </View>
        );
    
    }
     

        return (
            <View style={styles.container}> 
                <Carousel
                    autoplay
                    autoplayTimeout={5000}
                    loop
                    index={0}
                    pageSize={BannerWidth}
                >
                    {props.images.map((image, index) => renderPage(image, index))}
                </Carousel>
               
            </View>
        );
    }

    export default CustomBanner;


    const styles = StyleSheet.create({
        container: {
            flex:1,
            backgroundColor: '#fff',
            justifyContent: 'center',
            margin:10,
            alignSelf:"center",
            
            
        },
       
        imageStyle: {
            //backgroundColor:"red",
            alignSelf:"center",
            width: "95%",
             height: BannerHeight , 
             alignSelf:"center",
            borderRadius:5,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 1,
            shadowRadius: 2,    
           
           
         
          },

    
    });