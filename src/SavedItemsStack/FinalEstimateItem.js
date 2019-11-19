import React ,{Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Colors from '../Utility/Colors';


export default class FinalEstimateItem extends Component {

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.viewRow1}>
                    <Text style={styles.subHeading4}>{this.props.data.category_name}''</Text>
                    <Text style={styles.subHeading1}>{this.props.data.size}''</Text>
                    <Text style={styles.subHeading2}>{this.props.data.quantity}</Text>
                    <Text style={styles.subHeading3}>${this.props.data.price}</Text>
                </View>
                <View></View>
                <View style={styles.viewLine}></View>

        </View>
        )
    }
}



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
        flex:1,
        marginLeft:5
    },
    headStyle:{
        fontWeight:"700",
        fontSize:15,
        marginBottom:5,
        flex:9

    },
    subHeading4:{
        fontSize:12,
        flex:3,
       
        color:"black",
        textAlign:'left',
        alignSelf:"center",
        fontWeight:"bold"
      
    },
    subHeading1:{
        fontSize:12,
        flex:1,
       
        color:"black",
        textAlign:'center',
        alignSelf:"center",
        fontWeight:"bold"
      
    },
    subHeading2:{
        fontSize:12,
        flex:1,
       
       textAlign:'center',
       color:"black",
       alignSelf:"center",
       fontWeight:"bold"
      
    },
    subHeading3:{
        fontSize:12,
        flex:1,
       
        color:"black",
        textAlign:'right',
        alignSelf:"center",
        fontWeight:"bold"
      
    },
    viewLine:{
        width:"100%",backgroundColor:"#ECECEC",height:1,marginTop:5
    }


})