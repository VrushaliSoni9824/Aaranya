import React, {useState, useEffect,createRef} from "react";
import { StyleSheet, Text, View, Image, ScrollView,Dimensions , FlatList,ImageBackground, ActivityIndicator, Modal, Pressable,useWindowDimensions, Alert, Button } from 'react-native'

import { TouchableOpacity } from 'react-native-gesture-handler';

import { connect } from 'react-redux';
import { COLORS } from "../constants/Colors";
import ProductListView from "../common/ProductListView";
import LoadingView from "../common/LoadingView";
import MemberHeader from "../common/MemberHeader";

import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HealAppointment = ({ navigation, reduxUser }) => {
    const [apiStatus, setApiStatus] = useState(false);
    const [isLoading, setLoading] = useState(true);
    const [isLoadingImage, setisLoadingImage] = useState(false);
    const [data, setData] = useState("");
    const [access_token, setaccess_token] = useState("");
    const [patient_id, setpatient_id] = useState("");
    const [corporate_id, setcorporate_id] = useState("");
 
 useEffect(() => {

    const getAsyncData = async () => {
        const access_token = await AsyncStorage.getItem("access_token");
        setaccess_token(access_token);
        const patient_id = await AsyncStorage.getItem("id");
        setpatient_id(patient_id);
        const corporate_id = await AsyncStorage.getItem("corporate_id");
        setcorporate_id(corporate_id);
        get_healer_data(patient_id,corporate_id,access_token);
      };
      getAsyncData();

 },[]);

    

    return (
        <SafeAreaView style={{ flex: 1, }}>
        <ImageBackground
        source={require('../assets/bacjroundhomeimagetwo.png')}
        resizeMode="stretch"
        imageStyle= {{opacity:0.18}}
        style = {{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            // paddingBottom:30,
            backgroundColor: '#184039',
            
        }}>
        <View>
            
            <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{flex:1, flexDirection:'row'}}>
            <View style={[styles.products,{marginLeft:10, flex:1}]}>
                    <Text style={[styles.catTitle,{fontSize:27}]}>Heal</Text>
                    <Text style={[styles.catTitle,{fontSize:18}]}>Acupreassure & Sujok</Text>
                    <Text style={[styles.catTitle,{fontSize:14}]}>Online/Group/In-Person</Text>
            </View>
            <View style={[styles.products,{marginLeft:10, flex:1}]}>
            <Image borderRadius={100} source={{uri:'https://aaranyawellness.com/uploads/healers/167604109760938585_no.png'}}
                   style = {{ height:100, width:100}}>
                  
                   </Image>
            </View>
            </View>
           
        
            <View style={[styles.bannerImage,{backgroundColor:'#feefce'}]}>
              <View style={{flex: 1,flexDirection:'column'}}>
              <View style={{flex: 1,flexDirection:'row' ,position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, borderRadius:10, justifyContent: 'center', alignItems: 'center'}}>
                <View style={{flex:1, flexDirection:'row'}}>
                  <View style={[styles.products,{marginLeft:10, flex:1}]}>
                    <Text style={[styles.catTitle,{fontSize:15, color:'#000'}]}>Nalin Tiwari</Text>
                    <Text style={[styles.catTitle,{fontSize:12, color:'#000'}]}>Acupreassure & Sujok</Text>   
                  </View>
                <View style={[styles.products,{marginLeft:10, flex:1}]}>
            <Text style={[styles.catTitle,{fontSize:15, textAlign:'right', color:'#000'}]}>4.5</Text>
            </View>
                </View>
                </View>
              {/* <Text style={[styles.catTitle,{fontSize:12, color:'#000'}]}>Acupreassure & Sujok</Text> */}
              </View>
                
                
            </View>
            <Text style={[styles.catTitle,{fontSize:18, flex:1, marginLeft:10}]}>Stats</Text>
            <View style={[styles.bannerImage,{backgroundColor:'#54a191',justifyContent:'center',alignContent:'center'}]}>
                <View style={{marginTop:10,flex: 1,flexDirection:'column' ,position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, borderRadius:10, justifyContent: 'center', alignItems: 'center'}}>
                <View style={[{padding:5,flex:1,flexDirection:'row',width:'100%', marginLeft:10, marginRight:10 }]}>
                    <Text style={[styles.catTitle,{fontSize:12, flex:1, color:'#000'}]}>Total Session: </Text>
                    <Text style={[styles.catTitle,{fontSize:12,  flex:1, textAlign: 'right', marginRight:10, color:'#000'}]}>0</Text>
                </View>
                <View style={[{marginBottom:10,padding:5,flex:1,flexDirection:'row',width:'100%', marginLeft:10, marginRight:5 }]}>
                    <Text style={[styles.catTitle,{fontSize:12, flex:1, color:'#000'}]}>Experience: </Text>
                    <Text style={[styles.catTitle,{fontSize:12,  flex:1, textAlign: 'right', marginRight:10, color:'#000'}]}>1 Exp.</Text>
                </View>
                </View>
            </View>
            
            <View style={[styles.products, {flexDirection:'row',width:'100%', marginLeft:5, marginRight:5 }]}>
                    <Text style={[styles.catTitle,{fontSize:18, flex:1}]}>Availibility</Text>
                    <Text style={[styles.catTitle,{fontSize:18,  flex:1, textAlign: 'right', marginRight:5}]}>16th Feb</Text>
            </View>

            <View style={{flex:1,flexDirection:'row'}}>
              <View style={[{ borderRadius: 20, backgroundColor:'#fff', margin:10,height:40,flex:1,justifyContent: 'center',alignItems: 'center'}]}>
                <Text style={{color:'#000'}}>11:00 PM - 11:00 PM</Text>
              </View>
              <View style={[{ borderRadius: 20, backgroundColor:'#fff', margin:10,height:40,flex:1,justifyContent: 'center',alignItems: 'center'}]}>
                <Text style={{color:'#000'}}>11:00 PM - 11:00 PM</Text>
              </View>
            </View>

            <View style={{flex:1,flexDirection:'row'}}>
              <View style={[{ borderRadius: 20, backgroundColor:'#fff', margin:10,height:40,flex:1,justifyContent: 'center',alignItems: 'center'}]}>
                <Text style={{color:'#000'}}>11:00 PM - 11:00 PM</Text>
              </View>
              <View style={[{ borderRadius: 20, backgroundColor:'#fff', margin:10,height:40,flex:1,justifyContent: 'center',alignItems: 'center'}]}>
                <Text style={{color:'#000'}}>11:00 PM - 11:00 PM</Text>
              </View>
            </View>
           
          
            <View style={[{ borderRadius: 20, backgroundColor:'#54a191', margin:10,height:40,flex:1,justifyContent: 'center',alignItems: 'center'}]}>
                <Text style={{color:'#fff'}}>Book Appointment</Text>
              </View>
          
 
            </ScrollView>
        </View>
        </ImageBackground>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    catTitle: {

        fontSize: 25,
        fontWeight: "bold",
        color: '#fff'
    },  products: {
        padding: 10,
    },  banner: {
        margin: 5,
        marginTop: 5,
        borderRadius:10
    },
    bannerImage: {
        // width: '100%',
        // height:'50%',
        borderRadius: 20,
        margin:10,
        height:150
    }
});
const mapStateToProps = state => {
    return {
        reduxUser : state.user,
        reduxPlans: state.subscriptionPlans
    };
}

export default connect(mapStateToProps)(HealAppointment);

