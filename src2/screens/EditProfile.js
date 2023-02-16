import React, {useState} from 'react'
import { StyleSheet, Text, View, Image, TextInput,ImageBackground, TouchableOpacity, ActivityIndicator, Keyboard, KeyboardAvoidingView, ScrollView } from 'react-native'
import MemberHeader from '../common/MemberHeader'
import * as Animatable  from 'react-native-animatable'
import Icon from 'react-native-vector-icons/Ionicons';
import { showMessage } from 'react-native-flash-message';
import { COLORS } from '../constants/Colors';
import { connect } from "react-redux";
import { API_LINK, ASYNC_LOGIN_KEY, SMALL_LOGO_RATIO } from '../constants/Strings';
import {storeUser}  from '../Store/user/actions';
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch } from "react-redux";
import { clearAsyncStorage, clearAsyncData } from "../utils";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { logout } from "../Store/user/actions";
const EditProfile = ({navigation, reduxUser, rdStoreUser}) => {

    const [apiStatus, setApiStatus] = useState(false);
    const [name, setName] = useState(reduxUser.customer.name);
    const [nameError, setNameError] = useState(false);

    const [email, setEmail] = useState(reduxUser.customer.email);
    const [emailError, setEmailError] = useState(false);

    const dispatch = useDispatch();
   
    const processLogin = (params) => {
        
    }

    const actionLogout = async() => {
        //reduxLogout();
        dispatch(logout());
        AsyncStorage.setItem("isLoggedIn", "false");
        await clearAsyncData(ASYNC_LOGIN_KEY);
       // await rdLogout();
          }  

    



    return (
        <SafeAreaView style={{ flex: 1, }}>

<ImageBackground
        source={require('../assets/bacjroundhomeimagetwo.png')}
        resizeMode="stretch"
        imageStyle= {{opacity:0.18}}
        style = {{
            //make overlay
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
           //change this color to the other one which you want
            backgroundColor: '#184039',
            
        }}>
        <View>
            <MemberHeader title="Profile"/> 
            <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.profileName}>Edit Profile</Text>
            </View>
            <View style={styles.form}> 
                    <Text style={styles.phone}>Name</Text>
                    <TextInput placeholder="Name" style={styles.input} keyboardType = 'default' value={name} onChangeText={text => setName(text)}   />
                    {(nameError) ? <View><Text style={styles.error}>{nameError}</Text></View>: <></>}


                    <Text style={styles.phone}>Email</Text>
                    <TextInput placeholder="Your Email" style={styles.input} keyboardType = 'email' value={email} onChangeText={text => setEmail(text)}  />
                    {(emailError) ? <View><Text style={styles.error}>{emailError}</Text></View>: <></>}
                    
                </View>

                
                    {
                        (!apiStatus)
                        ?
                        <TouchableOpacity onPress={processLogin}>
                        <View style={styles.getstart}>
                        
                        <Text style={styles.getstartText}>Update Profile</Text>
                    
                    </View>
                    </TouchableOpacity>
                        :
                        <View style={styles.getstart}>
                        <ActivityIndicator size={20} color={COLORS.INDICATORCOLOR} style={styles.indicatorStyle}  />
                        </View>
                    }
                    
                    <TouchableOpacity style={{marginTop:10}} onPress={actionLogout}>
                        <View style={styles.getstart}>
                        
                        <Text style={styles.getstartText}>Logout</Text>
                    
                    </View>
                    </TouchableOpacity>
                

            
            </View>
        </View>
        </ImageBackground>

        </SafeAreaView>          
    )
}


const styles = StyleSheet.create({
     error:{
        color:'red',
        paddingBottom:10,
    },

    getstart:{
        alignItems:'center',
        backgroundColor:'#2f746f',
        marginLeft:40,
        marginRight:40,
        borderRadius:50,
        
    },
    getstartText:{
        color:'white',
        paddingVertical:13,
        fontSize:16,
        fontWeight:'600',
    },
    container:{
        padding:20,
    },
    
    profileName:{
        paddingVertical:10,
        fontSize:25,
        color:'#fff',
        fontWeight:'600'
    },
    profile:{
        width:200,
        height:200,
    },
    header:{
        paddingTop:40,
        justifyContent:'center',
        alignItems:'center'
    },

    form:{
        paddingVertical:20,
    },
    phone:{
        paddingTop:10,
        fontWeight:'600',
        color:'#fff',

    },
    input:{
        height: 50, 
        width: "100%", 
        borderColor: '#fff', 
        borderWidth: .5,  
        marginTop: 5,
        paddingLeft:10,
        borderRadius:20,
        color:'#fff',
    },
    indicatorStyle: {
       
        paddingVertical:13,
           }
    ,
})


const mapStateToProps = (state) => {
    return {
        reduxUser : state.user
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
     rdStoreUser : user => dispatch(storeUser(user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
