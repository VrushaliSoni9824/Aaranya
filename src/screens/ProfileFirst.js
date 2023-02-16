import React, {useState,useEffect} from 'react';
import { Dimensions, StatusBar, StyleSheet, Text, View, TextInput,ScrollView, KeyboardAvoidingView, ActivityIndicator, Keyboard } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as Animatable  from 'react-native-animatable';
import { connect } from 'react-redux';
import { COLORS } from '../constants/Colors';
import { FORGOTPASSWORDSCREEN, LOGINSCREEN, PROFILESCREEN } from '../constants/Screens';
import { API_LINK, ASYNC_LOGIN_KEY, SMALL_LOGO_RATIO } from '../constants/Strings';
import { showMessage } from 'react-native-flash-message';
import { prepLoggedInUserData, storeAsyncData } from '../utils';
import { storeUser } from '../Store/user/actions';
import { getLogoDimensions } from '../utils';
// import OTPInputView from '@twotalltotems/react-native-otp-input'



const ProfileFirst = ({navigation,route,  reduxUser, reduxStoreUser}) => {

    const [apiStatus, setApiStatus] = useState(false);
    
    const [phone, setPhone] = useState('');
    const [corporate_code, setcorporate_code] = useState('');
    
    const [password, setPassword] = useState('');

    const [name, setName] = useState('');
    const [nameError, setNameError] = useState(false);

    const [email, setEmail] = useState(''); 
    const [emailError, setemailError] = useState(false);   

    const [phoneError, setPhoneError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const [otp, setotp] = useState('');
    const [otpError, setotpError] = useState(false);
    
    useEffect(() => {

        // setPhone(route.params.varphno);
        // var varphno = route.params.varphno.toString().substring(0,4)+"xxxxxx";
        // var varcorporate_code = route.params.corporate_code;

        
            
        //     setcorporate_code(varcorporate_code);

        //     console.log("varphnoooooooooooo:"+varphno);
            
    },[])


    const processSignup = () => {

        goToUpdateProfile("12","WILLS");
        // var valid = true;
        // // setApiStatus(true);

        // // goToUpdateProfile();
        // if(otp.trim() == '')
        // {
        //     setotpError("Please enter otp");
        //     valid = false;
        // }
        // else
        // {
        //     setotpError(false);
        // }

        // console.log("***************************")
        // console.log(phone)
        // console.log(otp)

        // if(valid)
        // {

        //     Keyboard.dismiss();
        //     fetch("https://aaranyawellness.com/api/otp-verify",{
        //         method : 'POST',
        //         headers : {
        //             'Accept': 'application/json',
        //             'Content-type': 'application/json',
        //             mode: 'cors'
        //         },
        //         body: JSON.stringify({
        //             mobile : phone,
        //             otp: otp 
        //              })
        //          })
        //         .then((response) => response.json())
        //         .then((responseData) => {
        //             console.log("=================response========================");
        //             console.log('Regsiter RESPONSE:',responseData);
        //             console.log("===================");
                  
                   
        //           if(responseData.status == true)
        //           {
        //             setPhone('');
        //             setPassword('');
        //             setName('');
        //             setEmail('');

        //             showMessage({
        //                 message: "Success",
        //                 description: responseData.message,
        //                 type: "success",
        //               });
                    
        //               goToUpdateProfile(responseData.data.id,corporate_code);
                    
        //            }
        //           else
        //           {
        //             showMessage({
        //                 message: "Error",
        //                 description: responseData.message,
        //                 type: "default",
        //                 backgroundColor: 'red'
        //               });
        //             //Alert.alert('Error',responseData.message);
        //           }

        //           setApiStatus(false);
        //          })
        //         .catch(function(error) {
        //                     console.warn('There has been a problem with your fetch operation: ' + error);
        //                      // ADD THIS THROW error
        //                      setApiStatus(false);
        //                       throw error;
                            
        //                     })
        //             ;
            
        //     // api call

        //     /*
        //     const loggedinUser = {
        //         name: 'sudip',
        //         email: 'sudip@gmail.com',
        //         mobile: '1231232',
        //         userId: '1'
        //     };

        //     reduxStoreUser(loggedinUser);
        //     */
        // }
        setApiStatus(false);

    }

    const goToUpdateProfile = (id,corporate_code) => {
        navigation.navigate(PROFILESCREEN,{patientId: id,corporate_code:corporate_code});

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
                <Text style={styles.title}>Verification</Text>
                <Text style={styles.subtitle}>Enter the 4-digit code Aaranya just sent to {phone}</Text>
                <View style={styles.form}> 
                    
                {/* <OTPInputView
                code={otp} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
    onCodeChanged = {code => {
        setotp(code);
        console.log("Code:"+code)
    }}
      style={{ width: 250, height: 80, alignSelf: 'center',marginTop:50,marginBottom:20 }}
      pinCount={4}
      autoFocusOnLoad={false}
  
      codeInputFieldStyle={styles.inputFeilds}
      codeInputHighlightStyle={styles.inputFeildsFocus}
      onCodeFilled = {(code) => {
        
    }}
    /> */}

    <Text>Didn't receive the code?</Text>
    <Text style={{marginBottom:20,color:'#d99900'}}>Resend</Text>
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
                        {/* <View style={[styles.col, styles.ac]}>
                                
                                <TouchableOpacity onPress={goToLogin}>
                                    <Text style={styles.link}>Login</Text>
                                </TouchableOpacity>
                        </View> 

                        <View style={[styles.col, styles.ac]}>
                            <TouchableOpacity onPress={goToForgotPassword}>
                                    <Text style={styles.link}>Forgot Password?</Text>
                                </TouchableOpacity>
                        </View> */}
                    </View>

                
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
    indicatorStyle: {
       
        paddingVertical:13,
           }
    ,
    link: {
        fontWeight: 'normal',
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
    
        paddingTop: 50,
    
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
        borderTopRightRadius:80,
        paddingVertical:80,
        paddingHorizontal:20,
    },
    logo:{
        width:LogoDimension.LogoWidth,
        height:LogoDimension.LogoHeight,
    },
    title:{
        color:'white',
        fontSize:36,
        fontWeight:'normal',
        textAlign:'left',
        
    },
    subtitle:{
        paddingVertical:10,
        textAlign:'left',
        fontSize:17,
        color:'#2f746f',
    },
    form:{
        paddingVertical:20,
    },
    phone:{
        
        fontWeight:'normal',
        color:'#2f746f',

    },
    input:{
        height: 50, 
        width: "100%", 
        borderColor: '#2f746f', 
        borderWidth: .5,  
        marginBottom: 20,
        paddingLeft:10,
        borderRadius:20,
        color:'#2f746f',
    },
    getstart:{
        alignItems:'center',
        backgroundColor:'#2f746f',
        borderRadius:30,
        
    },
    getstartText:{
        color:'white',
        padding:12,
        fontSize:14,
        fontWeight:'400',
    },
    borderStyleBase: {
        width: 30,
        height: 45
      },
    
      borderStyleHighLighted: {
        borderColor: "#03DAC6",
      },
    
      underlineStyleBase: {
        width: 30,
        height: 45,
        borderWidth: 0,
        borderBottomWidth: 1,
      },
    
      underlineStyleHighLighted: {
        borderColor: "#03DAC6",
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

export default connect(mapStateToProps,mapDispatchToProps)(ProfileFirst);
