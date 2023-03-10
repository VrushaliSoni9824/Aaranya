import React, {useState,useEffect} from 'react';
import { Dimensions, StatusBar, StyleSheet, Text, View, TextInput, ScrollView, KeyboardAvoidingView, ActivityIndicator, Keyboard, Touchable } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as Animatable  from 'react-native-animatable';
import { connect } from 'react-redux';
import { storeUser } from '../Store/user/actions';
import { COLORS } from '../constants/Colors';
import { FORGOTPASSWORDSCREEN, REGISTERSCREEN } from '../constants/Screens';
import { API_LINK, ASYNC_LOGIN_KEY, SMALL_LOGO_RATIO } from '../constants/Strings';
import { showMessage } from 'react-native-flash-message';
import { prepLoggedInUserData, storeAsyncData } from '../utils';
import { getLogoDimensions } from '../utils';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Login = ({navigation, reduxUser, reduxStoreUser}) => {

    console.log('RU',reduxUser);

    const [apiStatus, setApiStatus] = useState(false);
    
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [token, settoken] = useState('');
    const [phoneError, setPhoneError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    // const getFCMToken = async () => {
    //     try {
    //       const token1 = await messaging().getToken();
    //       console.log("*****************************");
    //       console.log("FCM token: "+token1);
    //       console.log("*****************************");
    //       settoken(token1)
    //     } catch (e) {
    //       console.log(error);
    //     }
    //   };

    //   useEffect(()=>{
    //     getFCMToken();
    
    // },[]);
    const processLogin = () => {
        var valid = true;
    
        if(phone.trim() == '')
        {
            setPhoneError('Please enter phone number');
            valid = false;
        }
        
        else{
            setPhoneError(false);
        }

        if(password.trim() == '')
        {
            setPasswordError('Please enter password');
            valid = false;
        }
        else{
            setPasswordError(false);
        }

       // valid = false;

        if(valid)
        {
            setApiStatus(true);
            Keyboard.dismiss();
            console.log(API_LINK+'login');
            fetch("https://aaranyawellness.com/api/patient/login",{
                method : 'POST',
                headers : {
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                    mode: 'cors'
                },
                body: JSON.stringify({
                    email : phone,
                    password: password
                    
                     })
                 })
                .then((response) => response.json())
                .then((responseData) => {
                   
                    console.log('LOGIN RESPONSE:',responseData);
                  
                   
                  if(responseData.status == true)
                  {

                    // corporate_id": 10, "corporate_name": "Willis Towers Watson", "date_of_birth": 
                    // "2004-12-10", "disease": null, "email": "sonivrushali1234@gmail.com", "employee_id": null,
                    //  "employee_id_img": null, 
                    //  "password_status": "1", "profile_img": "https://aaranyawellness.com/green/images/image.jpg", 
                    // "status": "1"}, "message": "Login Successfully", "status": true}
                    setPhone('');
                    setPassword('');

                    showMessage({
                        message: "Success",
                        description: responseData.message,
                        type: "success",
                      });
                      AsyncStorage.setItem("access_token", responseData.data.access_token)
                      AsyncStorage.setItem("isLoggedIn", "true");
                      AsyncStorage.setItem("corporate_id", responseData.data.corporate_id.toString());
                      AsyncStorage.setItem("id", responseData.data.id.toString());
                      
                      console.log("wwwwwwwwwwwwwwwwwwwwwww")
                     console.log(JSON.stringify(responseData.data))
                      const loggedInUser = prepLoggedInUserData(responseData.data);
                      reduxStoreUser(loggedInUser);
                    //   storeAsyncData(ASYNC_LOGIN_KEY,loggedInUser);

                    
                      
                    
                   }
                  else
                  {
                    showMessage({
                        message: "Error",
                        description: responseData.message,
                        type: "default",
                        backgroundColor: 'red'
                      });
                    //Alert.alert('Error',responseData.message);
                  }

                  setApiStatus(false);
                 })
                .catch(function(error) {
                            console.warn('There has been a problem with your fetch operation: ' + error);
                             // ADD THIS THROW error
                             setApiStatus(false);
                              throw error;
                            
                            })
                    ;
            
            // api call

            /*
            const loggedinUser = {
                name: 'sudip',
                email: 'sudip@gmail.com',
                mobile: '1231232',
                userId: '1'
            };

            reduxStoreUser(loggedinUser);
            */
        }

        // 



    }
    

    const goToRegister = () => {
        navigation.navigate(REGISTERSCREEN);

    }

    const goToForgotPassword = () => {
        navigation.navigate(FORGOTPASSWORDSCREEN);
    }


    return (
        <>

<ScrollView style={{minHeight: '100%', backgroundColor: '#183f38'}} >
        <View style={[styles.page,{backgroundColor: '#183f38'}]}>
        
            <KeyboardAvoidingView>
        <View style={[styles.container, styles.headerSpace]}>
            <StatusBar barStyle="dark-content"/>
            <View style={styles.header}>
                {/* <Animatable.Image animation="bounceIn" duration={1550} source={require('../assets/logo.png')} style={styles.logo} resizeMode={"stretch"}/> */}
                <Text style={styles.title}>Login </Text>
            </View>

            <Animatable.View style={styles.footer} animation="fadeInUpBig" > 
               
                {/* <Text style={styles.subtitle}>Get start to access the products.</Text> */}

                <View style={styles.form}> 
                    <Text style={styles.phone}>EMAIL</Text>
                    <TextInput placeholder="Enter user Id " placeholderTextColor='#000' style={styles.input} keyboardType = 'default' value={phone} onChangeText={text => setPhone(text)}  />
                    {(phoneError) ? <View><Text style={styles.error}>{phoneError}</Text></View>: <></>}
                    <View style={[styles.col, styles.ac]}>
                            <TouchableOpacity onPress={goToForgotPassword}>
                                    <Text style={styles.link}>Forgot Password?</Text>
                                </TouchableOpacity>
                        </View>
                    <Text style={styles.phone}>Password</Text>
                    <TextInput placeholder="Enter Password" placeholderTextColor='#000' style={styles.input} keyboardType = 'default' value={password} onChangeText={text => setPassword(text)} secureTextEntry={true} />
                    {(passwordError) ? <View><Text style={styles.error}>{passwordError}</Text></View>: <></>}
                </View>
                


                <View >
                    {
                        (!apiStatus)
                        ?
                        <TouchableOpacity style={styles.getstart} onPress={processLogin}>
                        <Text style={styles.getstartText}>SIGN IN</Text>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity style={styles.getstart}>
                        <ActivityIndicator size={20} color={COLORS.INDICATORCOLOR} style={styles.indicatorStyle}  />
                        </TouchableOpacity>
                    }
                    
                </View>


                    {/* <View style={[styles.row, styles.sectionHeight]}> */}
                        <View>
                                
                                <TouchableOpacity onPress={goToRegister}>
                                    
                                    <Text style={{textAlign:'center', marginTop: 20,color:'#5e9c8d'}}> New User? Signup </Text>
                                </TouchableOpacity>
                        </View> 
                    {/* </View> */}
                
            </Animatable.View>

        </View>
        </KeyboardAvoidingView>
       
        </View>   
        </ScrollView>     
        </>
    )
}
 

const LogoDimension = getLogoDimensions(SMALL_LOGO_RATIO);

const styles = StyleSheet.create({
    link: {
        fontWeight: 'bold',
        color:'#707070',
      
     },
    sectionHeight: {
        marginTop: '10%'
    },
    ac:{
        alignItems: 'flex-end'
    },
    ar: {
        alignItems: 'flex-end'
    },
    col: {
        flex: 1
    },
    row: {
        flexDirection: 'row',
        alignItems:'center'
    },
    error: {
        color: '#f00',
        top: -20,
        marginLeft: 15
    },
    page: {
        flex:1,
        backgroundColor: '#183f38',
        
    },
    headerSpace:{
    
        paddingTop: 60
    },
    container:{
        flex:1,
        backgroundColor:'#183f38',
        height: '100%'
    },
    header:{
        flex:4,
        marginTop:40,
        margin:20,
        justifyContent:'flex-start',
        alignItems:'flex-start'
    },
    footer:{
        flex:4.5,
        backgroundColor:'#183f38',
        borderTopLeftRadius:50,
        borderTopRightRadius:50,
        paddingVertical:30,
        paddingHorizontal:50,
    },
    logo:{
        width:LogoDimension.LogoWidth,
        height:LogoDimension.LogoHeight,
    },
    title:{
        color:'#fcedc6',
        fontSize:30,
        fontWeight:'bold',
        textAlign:'center',
        alignContent:'center',
        marginTop:20,
        
        
    },
    subtitle:{
        paddingVertical:10,
        textAlign:'center',
        fontSize:17,
        color:'#2f746f'
    },
    form:{
        paddingVertical:20,
    },
    phone:{
        fontWeight:'600',
        color:'#629c90',

    },
    input:{
        height: 50, 
        width: "100%", 
        borderColor: '#ffffff', 
        borderRadius:5,
        backgroundColor:'#fff',
        borderWidth: .5,  
        marginBottom: 20,
        paddingLeft:10,
        
        color:'#000',
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
    indicatorStyle: {
       
        paddingVertical:13,
        
           }
    
})

const mapStateToProps = state => {
    return {
        reduxUser : state.user
    };
}

const mapDispatchToProps = dispatch => {
    return {
        reduxStoreUser : loggedinUser => dispatch(storeUser(loggedinUser))
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(Login);
