import React, {useState} from 'react';
import { Dimensions, StatusBar, StyleSheet, Text, View, TextInput, ScrollView, KeyboardAvoidingView, ActivityIndicator, Keyboard } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as Animatable  from 'react-native-animatable';
import { connect } from 'react-redux';
import { COLORS } from '../constants/Colors';
import { FORGOTPASSWORDSCREEN, LOGINSCREEN, SIGNUPOTPVERIFY } from '../constants/Screens';
import { API_LINK, ASYNC_LOGIN_KEY, SMALL_LOGO_RATIO } from '../constants/Strings';
import { showMessage } from 'react-native-flash-message';
import { prepLoggedInUserData, storeAsyncData } from '../utils';
import { storeUser } from '../Store/user/actions';
import { getLogoDimensions } from '../utils';



const Signup = ({navigation,  reduxUser, reduxStoreUser}) => {

    const [apiStatus, setApiStatus] = useState(false);
    
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');

    const [name, setName] = useState('');
    const [nameError, setNameError] = useState(false);

    const [email, setEmail] = useState(''); 
    const [emailError, setemailError] = useState(false);   

    const [phoneError, setPhoneError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);



    const processSignup = () => {

        var valid = true;
        // setApiStatus(true);

        if(email.trim() == '')
        {
            setemailError('Please enter email id ');
            valid = false;
        }
        else
        {
            setemailError(false);
        }

        if(phone.trim() == '')
        {
            setPhoneError('Please enter phone number');
            valid = false;
        }
        else if(phone.trim().length != 10)
        {
            setPhoneError('Phone length should be 10 characters');
            valid = false;
        }
        else{
            setPhoneError(false);
        }

        if(valid)
        {

            Keyboard.dismiss();
            fetch("https://aaranyawellness.com/api/send-otp-patient",{
                method : 'POST',
                headers : {
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                    mode: 'cors'
                },
                body: JSON.stringify({
                    mobile : phone,
                    corporate_code: email
                    
                     })
                 })
                .then((response) => response.json())
                .then((responseData) => {
                   
                    console.log('Regsiter RESPONSE:',responseData);
                  
                   
                  if(responseData.status == true)
                  {
                    const varphno = phone;
                    setPhone('');
                    setPassword('');
                    setName('');
                    setEmail('');

                    // showMessage({
                    //     message: "Registration successful ! ",
                    //     description: "Please verify your mobile number",
                    //     type: "success",
                    //   });

                     
                      goToOtpScreen(varphno,email);
                    
                    
                   }
                  else
                  {
                    showMessage({
                        message: "Error",
                        description: "Error ! Enter valid mobile number and corporate id",
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

        
        }
    }

    const goToLogin = () => {
        navigation.navigate(LOGINSCREEN);

    }

    const goToOtpScreen = (varphno,email) => {
        navigation.navigate(SIGNUPOTPVERIFY,{varphno: varphno,corporate_code:email});
    }

    const goToForgotPassword = () => {
        navigation.navigate(FORGOTPASSWORDSCREEN);
    }

    return (
        <>
        <ScrollView style={{minHeight: '100%', backgroundColor: '#183f38'}} >
         <View style={styles.page}>
            
                <KeyboardAvoidingView>

             
        <View style={[styles.container, styles.headerSpace]}>
            <StatusBar barStyle="dark-content"/>
          

            <Animatable.View style={styles.footer} animation="fadeInUpBig" > 
                <Text style={styles.title}>Sign Up</Text>
                <Text style={styles.subtitle}>Enter your phone number to sign up</Text>

                <View style={styles.form}> 
                    <Text style={styles.phone}>COUNTRY</Text>
                    <TextInput placeholder="India" placeholderTextColor='#000' editable={false} style={styles.input} keyboardType = 'default' value={name} onChangeText={text => setName(text)} />
                    {(nameError) ? <View><Text style={styles.error}>{nameError}</Text></View>: <></>}

                    <Text style={styles.phone}>PHONE NUMBER</Text>
                    <TextInput placeholder="Enter Phone" placeholderTextColor='#000' style={styles.input} keyboardType = 'numeric' value={phone} onChangeText={text => setPhone(text)} />
                    {(phoneError) ? <View><Text style={styles.error}>{phoneError}</Text></View>: <></>}

                    <Text style={styles.phone}>CORPOTATE ID</Text>
                    <TextInput placeholder="Enter Corporate ID" placeholderTextColor='#000' style={styles.input} keyboardType = 'email-address' value={email} onChangeText={text => setEmail(text)} />
                    {(emailError) ? <View><Text style={styles.error}>{emailError}</Text></View>: <></>}


                </View>
                


                <View style={styles.getstart}>
                    {
                        (!apiStatus)
                        ?
                        <TouchableOpacity onPress={processSignup}>
                        <Text style={styles.getstartText}>COUNTINUE</Text>
                    </TouchableOpacity>
                        :

                        <TouchableOpacity >
                            <ActivityIndicator size={20} color={COLORS.INDICATORCOLOR} style={styles.indicatorStyle}  />
                        </TouchableOpacity>
                    }
                    
                </View>


                    <View style={[styles.row, styles.sectionHeight]}>
                        <View style={[styles.col, styles.ac]}>
                                
                                <TouchableOpacity onPress={goToLogin}>
                                    <Text style={styles.link}>Login</Text>
                                </TouchableOpacity>
                        </View> 

                        <View style={[styles.col, styles.ac]}>
                            <TouchableOpacity onPress={goToForgotPassword}>
                                    <Text style={styles.link}>Forgot Password?</Text>
                                </TouchableOpacity>

                        </View>
                   
                    </View>

                
            </Animatable.View>
        </View>
        </KeyboardAvoidingView>
        <Text style={{textAlign:'center'}}>Problem Signing up?</Text>
                   </View>
            </ScrollView>

            </>
    )
}

const LogoDimension = getLogoDimensions(SMALL_LOGO_RATIO);



const styles = StyleSheet.create({
    indicatorStyle: {
       
        paddingVertical:13,
           }
    ,
    link: {
        fontWeight: 'normal',
        // color:'#009999',
        color:'#2f746f',
     },
    sectionHeight: {
        marginTop: '10%'
    },
    ac:{
        alignItems: 'center'
    },
    ar: {
        alignItems: 'flex-end'
    },
    col: {
        flex: 1
    },
    row: {
        flexDirection: 'row'
    },
    error: {
        color: '#f00',
        top: -20,
        marginLeft: 15
    },
    page: {
        flex:1,
        backgroundColor: '#183f38'
    },
    headerSpace:{
    
        paddingTop: 60
    },
    container:{
        flex:2,
        backgroundColor:'#183f38',
    },
    header:{
        flex:3,
        justifyContent:'center',
        alignItems:'center'
    },
    footer:{
        flex:5,
        backgroundColor:'#183f38',
        borderTopLeftRadius:50,
        borderTopRightRadius:50,
        paddingVertical:30,
        paddingHorizontal:20,
    },
    logo:{
        width:LogoDimension.LogoWidth,
        height:LogoDimension.LogoHeight,
    },
    title:{
        color:'#fff',
        fontSize:30,
        fontWeight:'normal',
        textAlign:'left',
        marginTop:50
    },
    subtitle:{
        paddingVertical:10,
        
        fontSize:17,
        // color:'#009999',
        color:'#2f746f',
    },
    form:{
        paddingVertical:10,
        marginTop:40
    },
    phone:{
        
        fontWeight:'normal',
        // color:'#009999',
        color:'#2f746f',
        marginBottom:5

    },
    input:{
        height: 50, 
        width: "100%", 
        // borderColor: '#009999', 
        borderColor:'#2f746f',
        borderWidth: .5,  
        marginBottom: 20,
        paddingLeft:10,
        borderRadius:20,
        color:'#000',
        borderColor: '#ffffff', 
        borderRadius:5,
        backgroundColor:'#fff',
        
    },
    getstart:{
        alignItems:'center',
        // backgroundColor:'#009999',
        backgroundColor:'#2f746f',
        marginLeft:40,
        marginRight:40,
        borderRadius:50,
        
    },
    getstartText:{
        color:'white',
        padding:10,
        fontSize:12,
        fontWeight:'normal',
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

export default connect(mapStateToProps,mapDispatchToProps)(Signup);
