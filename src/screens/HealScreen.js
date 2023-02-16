import React, {useState, useEffect,createRef} from "react";
import { StyleSheet, Text, View, Image, ScrollView,Dimensions , FlatList,ImageBackground, ActivityIndicator, Modal, Pressable,useWindowDimensions, Alert, Button, Platform } from 'react-native'

import { TouchableOpacity } from 'react-native-gesture-handler';

import { connect } from 'react-redux';
import { COLORS } from "../constants/Colors";
import ProductListView from "../common/ProductListView";
import LoadingView from "../common/LoadingView";
import MemberHeader from "../common/MemberHeader";

import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HealScreen = ({ navigation, reduxUser }) => {
    const [apiStatus, setApiStatus] = useState(false);
    const [isLoading, setLoading] = useState(true);
    const [isLoadingImage, setisLoadingImage] = useState(false);
    const [data, setData] = useState("");
    const [access_token, setaccess_token] = useState("");
    const [patient_id, setpatient_id] = useState("");
    const [corporate_id, setcorporate_id] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const [mostSellingProducts, setmostSellingProducts] = useState(false);
    const [meditationData, setmeditationData] = useState(false);
    const [healerData, sethealerData] = useState(false);
    const [enrolledHealerData, setenrolledHealerData] = useState(false);

    const get_healer_data = (patient_id,corporate_id,access_token) => {
        // https://aaranyawellness.com/api/patient/get-home-page-data
        var body  = {"corporate_id": corporate_id, "patient_id": patient_id}
        fetch("https://aaranyawellness.com/api/patient/get-home-page-data",{
            method : 'POST',
            headers : {
                'Accept': 'application/json',
                'Content-type': 'application/json',
                'Authorization': "Bearer "+access_token,
                mode: 'cors'
            },
            body: JSON.stringify(body),
             })
            .then((response) => response.json())
            .then((responseData) => {
                console.log('HOMEDATAttttttttttttttttttttttttt',responseData.schedule.ongoingschedule);
                // Alert.alert("succes");
                sethealerData(responseData.schedule.ongoingschedule);
                setenrolledHealerData(responseData.schedule.enrolledschedulest)
                setApiStatus(false);
             })
            .catch(function(error) {
                // Alert.alert(error);
                        console.warn('There has been a problem with your fetch operation: ' + error);
                         // ADD THIS THROW error
                         setApiStatus(false);
                          throw error;
                        
                        });
                        if(!healerData)
                        {
                            setIsDataLoaded(true);
                        }
                        if(!enrolledHealerData){
                            setIsDataLoaded(true);
                        }

    }

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
        <View style={{marginBottom:20}}>
                <MemberHeader title="Heal"/> 
            <ScrollView showsVerticalScrollIndicator={false} style={{marginBottom:40}}>
            <View style={styles.products}>
                    <Text style={styles.catTitle}>Heal</Text>
                    <Text style={[styles.catTitle,{fontSize:18}]}>Popular Dailies</Text>
            </View>
        
            <ImageBackground borderRadius={20} source={{uri: 'https://aaranyawellness.com/uploads/audio/1634836271.png'}} style={[styles.bannerImage]}>
                <View style={{flex: 1,flexDirection:'row' ,position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, borderRadius:10, justifyContent: 'center', alignItems: 'center'}}>
                    <View style={{flex:1}}>
                    </View>
                    <View style={{flex:1}}>
                    <TouchableOpacity style={{borderRadius: 10, backgroundColor:'gray', paddingTop:5, paddingEnd:20, paddingStart:20,paddingBottom:5, width:100}}><Text style={{textAlign:'center'}}>Start</Text></TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>

            <View style={{flex:1,flexDirection:'row'}}>
            <ImageBackground  borderRadius={20} source={{uri: 'https://aaranyawellness.com/uploads/audio/1634836271.png'}} style={[styles.bannerImage,{flex:1}]}>
                <View style={{flex: 1,flexDirection:'row' , top: 0, left: 0, right: 0, bottom: 0, borderRadius:10, justifyContent: 'flex-end', margin:15,alignItems: 'flex-end'}}>
                    <View style={{flex:1}}>
                        <Text style={{fontSize:12}}>15 min</Text>
                        <Text style={{fontSize:12}}>Meditation</Text>
                    </View>
                    <View style={{flex:1}}>
                    <TouchableOpacity style={{borderRadius: 10, backgroundColor:'gray', paddingTop:5, paddingEnd:5, paddingStart:5,paddingBottom:5, width:70}}><Text style={{textAlign:'center'}}>Start</Text></TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
            <ImageBackground borderRadius={20} source={{uri: 'https://aaranyawellness.com/uploads/audio/1634836271.png'}} style={[styles.bannerImage,{flex:1}]}>
                <View style={{flex: 1,flexDirection:'row', top: 0, left: 0, right: 0, bottom: 0, borderRadius:10, justifyContent: 'flex-end', margin:15, alignItems: 'flex-end'}}>
                    <View style={{flex:1}}>
                        <Text style={{fontSize:12}}>15 mi</Text>
                        <Text style={{fontSize:12}}>Meditation</Text>
                    </View>
                    <View style={{flex:1}}>
                    <TouchableOpacity style={{borderRadius: 10, backgroundColor:'gray', paddingTop:5, paddingEnd:5, paddingStart:5,paddingBottom:5, width:70}}><Text style={{textAlign:'center'}}>Start</Text></TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
         
            </View>
           
            <View style={[styles.products, {flexDirection:'row',width:'100%', marginLeft:5, marginRight:5 }]}>
                    <Text style={[styles.catTitle,{fontSize:18, flex:1}]}>Healers</Text>
                    <Text style={[styles.catTitle,{fontSize:18,  flex:1, textAlign: 'right', marginRight:5}]}>See All</Text>
            </View>
            {
                        (!healerData)
                        ?
                        <View>
                        <ActivityIndicator size={20} color="black" />
                    </View>
                        :
                    <FlatList
                        data={healerData}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) =>
                        <View style={{flex:1,flexDirection:'row', }}>
                            <TouchableOpacity  onPress={() => {
                                navigation.navigate('HealerAppointment')
                            }} style={{height:170,width:150}}>
                                <View style={[{borderRadius: 10, margin:10, marginBottom:5,backgroundColor:'#fff', flexDirection:'row'}]}>
                                    <ImageBackground borderRadius={10} source={{uri: item.logo_image}} style={{borderRadius: 20,margin:10,height:100,backgroundColor:'#000000',flex:1}}>  
                                    </ImageBackground>
                                </View>
                                <Text style={{textAlign:'center'}}>{item.servicedata[0].service}</Text>
                            </TouchableOpacity>
                        </View>
                        }
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                    /> 
                    }    

                    {
                        (!healerData)
                        ?
                        <View>
                        <ActivityIndicator size={20} color="black" />
                    </View>
                        :
                    <View>
                    <View style={[styles.products, {flexDirection:'row',width:'100%', marginLeft:5, marginRight:5 }]}>
                        <Text style={[styles.catTitle,{fontSize:18, flex:1}]}>Healers (enrolled) </Text>
                        <Text style={[styles.catTitle,{fontSize:18,  flex:1, textAlign: 'right', marginRight:5}]}>See All</Text>
                    </View>
                     
                    <FlatList
                        data={healerData}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) =>
                        <View style={{flex:1,flexDirection:'row', }}>
                            <TouchableOpacity  onPress={() => {
                                navigation.navigate('HealerAppointment')
                            }} style={{height:170,width:150}}>
                                <View style={[{borderRadius: 10, margin:10, marginBottom:5,backgroundColor:'#fff', flexDirection:'row'}]}>
                                    <ImageBackground borderRadius={10} source={{uri: item.logo_image}} style={{borderRadius: 20,margin:10,height:100,backgroundColor:'#000000',flex:1}}>
                                        
                                    </ImageBackground>
                                
                                </View>
                                <Text style={{textAlign:'center'}}>{item.servicedata[0].service}</Text>
                            </TouchableOpacity>
                        </View>

                        }
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                    /> 
                     </View>  
                    } 
 
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

export default connect(mapStateToProps)(HealScreen);

