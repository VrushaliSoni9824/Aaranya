import React, {useState,useEffect} from 'react';
import { Dimensions, Button, StatusBar, StyleSheet, Text, View, TextInput, ScrollView, KeyboardAvoidingView, ActivityIndicator, Keyboard } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as Animatable  from 'react-native-animatable';
import { connect } from 'react-redux';
import { COLORS } from '../constants/Colors';
import { FORGOTPASSWORDSCREEN, LOGINSCREEN, SIGNUPOTPVERIFY, HOMESCREEN } from '../constants/Screens';
import { API_LINK, ASYNC_LOGIN_KEY, SMALL_LOGO_RATIO } from '../constants/Strings';
import { showMessage } from 'react-native-flash-message';
import { prepLoggedInUserData, storeAsyncData } from '../utils';
import { storeUser } from '../Store/user/actions';
import { getLogoDimensions } from '../utils';
import SelectDropdown from 'react-native-select-dropdown'
import DateTimePickerModal from "react-native-modal-datetime-picker";




const Profile = ({navigation,route,  reduxUser, reduxStoreUser}) => {

    const [apiStatus, setApiStatus] = useState(false);
    

    const dropdownIcon = () => { 
    return <Icon name="chevron-down" color="#000000" size={20} />;}

    const [corporate_code, setcorporate_code] = useState('');
    
    const [patientId, setpatientId] = useState('');
    
    const [password, setPassword] = useState('');

    const [name, setName] = useState('');
    const [nameError, setNameError] = useState(false);

    const [email, setEmail] = useState(''); 
    const [emailError, setemailError] = useState(false); 

    const [organization, setorganization] = useState('Wills Towers Watson'); 
    const [organizationError, setorganizationError] = useState(false);   

    const [passwordError, setPasswordError] = useState(false);
    const genderOptions = ["Male","Female"];
    const [gender, setgender] = useState('Male');
    
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [day, setday] = useState('Day');
    const [month, setmonth] = useState('Month');
    const [year, setyears] = useState('Year');


    useEffect(() => {

        var varpatientId = route.params.patientId;
        var varcorporate_code = route.params.corporate_code;
        setpatientId(varpatientId);
        setcorporate_code(varcorporate_code);
            console.log("varpatientId:"+varpatientId);
            console.log("setcorporate_code"+varcorporate_code);
            
    },[])


    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        // console.warn("A date has been picked: ", date);
        var d = new Date(date)
        var month = parseInt(d.getMonth())+1;
        setday(d.getDate().toString());
        setmonth(month.toString());
        setyears(d.getFullYear().toString());
        console.log("day:"+d.getDate())
        console.log("month:"+month)
        console.log("year:"+d.getFullYear())
        hideDatePicker();
    };


    const processSignup = () => {

        var valid = true;
        // setApiStatus(true);
        console.log("Email:"+email);
        console.log("pass:"+password);
        console.log("gend:"+gender);
        console.log("org:"+organization);
        console.log("date:"+day+"/"+month+"/"+year);
        console.log("varcorporate_code"+corporate_code);
        console.log("name"+name);

        // goToLogin();

        if(name.trim() == '')
        {
            setNameError("Please enter name");
            valid = false;
        }
        else
        {
            setNameError(false);
        }

        if(email.trim() == '')
        {
            setemailError('Please enter email id ');
            valid = false;
        }
        else
        {
            setemailError(false);
        }

        if(organization.trim() == '')
        {
            setorganizationError('Please enter organization  ');
            valid = false;
        }
        else
        {
            setemailError(false);
        }

        if(password.trim() == '')
        {
            setPasswordError('Please enter password');
            valid = false;
        }
        else{
            setPasswordError(false);
        }

        if(valid)
        {

            Keyboard.dismiss();
            fetch('https://aaranyawellness.com/api/update-profile',{
                method : 'POST',
                headers : {
                    'Accept': 'application/json',
                    'Content-type': 'application/json',
                    mode: 'cors'
                },
                body: JSON.stringify({
                    patient_id:patientId,
                    corporate_code : corporate_code
                     })
                 })
                .then((response) => response.json())
                .then((responseData) => {
                   
                    console.log('Regsiter RESPONSE:',responseData);
                  
                   
                  if(responseData.status == true)
                  {
                    setEmail('');
                    setPassword('');
                    setName('');
                    setorganization('');

                    showMessage({
                        message: "Registration successful ! ",
                        description: "Please verify your mobile number",
                        type: "success",
                      });
                      
                      goToLogin();
                    
                    
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

        
        }
    }

    const goToLogin = () => {
        navigation.navigate(LOGINSCREEN);

    }

    const goToOtpScreen = (loggedInUser) => {
        navigation.navigate(SIGNUPOTPVERIFY,{catName: "hello",loggedInUser: loggedInUser});
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
                <Text style={styles.title}>Welcome!</Text>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    
                <Text style={styles.subtitle}>Please enter some information to countinue </Text>

                <View style={styles.form}> 

                    <Text style={styles.phone}>Email ID</Text>
                    <TextInput placeholder="Enter Email" placeholderTextColor='#000' style={styles.input} keyboardType = 'email-address' value={email} onChangeText={text => setEmail(text)} />
                    {(emailError) ? <View><Text style={styles.error}>{emailError}</Text></View>: <></>}


                    <Text style={styles.phone}>PASSWORD</Text>
                    <TextInput placeholder="Enter Password" placeholderTextColor='#000' style={styles.input} keyboardType = 'default' value={password} onChangeText={text => setPassword(text)} />
                    {(passwordError) ? <View><Text style={styles.error}>{passwordError}</Text></View>: <></>}
                
                </View>
                <View style={{flexDirection:'row',flex:1}}>
                    <View style={{flexDirection:'column',flex:0.2}}>
                    
                    <Text style={styles.phone}>GENDER</Text>
                    <SelectDropdown
                            data={genderOptions}
                            defaultValueByIndex={0}
                            buttonStyle={{backgroundColor: 'white', fontSize: 14,height:50,width:95}}
                            buttonTextStyle={{ fontSize: 14}}
                            dropdownIconPosition="left"
                            dropDownIcon={dropdownIcon}
                            onSelect={(selectedItem, index) => {
                                console.log(selectedItem, index)
                                setgender(selectedItem);
                            }}
                            buttonTextAfterSelection={(selectedItem, index) => {
                               return selectedItem
                            }}
                            rowTextForSelection={(item, index) => {
                                return item
                            }}
                        />


                    </View>
                    <Text style={{flexDirection:'column',flex:0.2}}> </Text>
                    <View style={{flexDirection:'column',flex:0.6}}>

                    <Text style={styles.phone}>NAME</Text>
                    <TextInput placeholder="Enter Name" placeholderTextColor='#000' style={styles.input} keyboardType = 'email-address' value={name} onChangeText={text => setName(text)} />
                    {(nameError) ? <View><Text style={styles.error}>{nameError}</Text></View>: <></>}
                    
                    </View>
                </View>
                <View>
                    <Text style={styles.phone}>ORGANISATION </Text>
                    <TextInput placeholder="Wills Towers Watson" placeholderTextColor='#000' style={styles.input} keyboardType = 'email-address' value={organization} onChangeText={text => setorganization(text)} />
                    {(organizationError) ? <View><Text style={styles.error}>{organizationError}</Text></View>: <></>}
                </View>
                
                <TouchableOpacity style={{flexDirection:'row',flex:1}} onPress={showDatePicker}>
                    <View style={{flexDirection:'column',flex:0.5, marginRight: 5}}>
                        <Text style={styles.phone}>Date of birth</Text>
                        <TextInput placeholderTextColor='#000' editable={false} style={styles.input} keyboardType = 'numeric' value={day} />
                  
                       
                    </View>
                    <View style={{flexDirection:'column',flex:0.5, marginRight: 5, marginLeft:5}}>
                        <Text style={styles.phone}></Text>
                        <TextInput placeholderTextColor='#000' editable={false} style={styles.input} keyboardType = 'numeric' value={month} />
                     

                    </View>
                    <View style={{flexDirection:'column',flex:0.5, marginLeft: 5}}>
                        <Text style={styles.phone}></Text>
                        <TextInput placeholderTextColor='#000' editable={false} style={styles.input} keyboardType = 'numeric' value={year}  />
                    
                    </View>
                </TouchableOpacity>

                {/* <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      /> */}
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
        
        fontSize:12,
        // color:'#009999',
        color:'#2f746f',
    },
    form:{
        paddingVertical:10,
        marginTop:20
    },
    phone:{
        
        fontWeight:'normal',
        // color:'#009999',
        color:'#2f746f',
        marginBottom:2

    },
    input:{
        height: 50, 
        width: "100%", 
        // borderColor: '#009999', 
        borderColor: '#2f746f',
        borderWidth: .5,  
        marginBottom: 10,
        paddingLeft:10,
        borderRadius:20,
        color:'#000',
        borderColor: '#ffffff', 
        borderRadius:5,
        backgroundColor:'#fff',
        
    },
    getstart:{
        alignItems:'center',
        backgroundColor: '#2f746f',
        // backgroundColor:'#009999',
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

export default connect(mapStateToProps,mapDispatchToProps)(Profile);
