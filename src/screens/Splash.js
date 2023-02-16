import React, {useState, useEffect} from 'react';
import { Dimensions, StatusBar, StyleSheet, Text, View, ActivityIndicator,ScrollView,  } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as Animatable  from 'react-native-animatable';
import { HOMESCREEN, LOGINSCREEN } from '../constants/Screens';
import Home from './Home';
import { connect } from 'react-redux';
import { storeUser } from '../Store/user/actions';
import { getAsyncData, getLogoDimensions } from '../utils';
import { API_LINK, ASYNC_LOGIN_KEY, BIG_LOGO_RATIO, MEDIA_LINK } from '../constants/Strings';
import { addToCart } from '../Store/user/actions';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { prepLoggedInUserData, storeAsyncData } from '../utils';
const Splash = ({navigation, reduxUser, storeUser, _loadCart,reduxStoreUser}) => {

    const [isDataLoaded, setIsDataLoaded] = useState(false);
    const [action, setaction] = useState(LOGINSCREEN);
    const [isLoggedIn, setIsLoggedIn] = useState(reduxUser.isLoggedIn);
    const [appInit, setAppInit] = useState(false);


    useEffect(() => {

        const getAsyncData = async () => {
            const isLoggedIn = await AsyncStorage.getItem("isLoggedIn");

            if(isLoggedIn == "true"){
                const loggedInUser = prepLoggedInUserData({"id":27,"first_name":null,"last_name":null,"mobile":"7567442367","password":"81dc9bdb52d04dc20036dbd8313ed055","password_status":"0","email":"sonivrushali1234@gmail.com","location":null,"status":"0","gender":null,"otp":"3331","otp_status":"yes","is_verified":1,"corporate_id":10,"fcm_token":null,"employee_id":null,"date_of_birth":null,"profile_img":"https://aaranyawellness.com/green/images/image.jpg","employee_id_img":null,"disease":null,"access_token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImNkNTRiYzc4OGU3YzQzZjJmNDM3OTY2YzVlOWRmNTZlNjZlNmVkYWEwYjI0NDYyOWI4MmRkNDVmOTY3OTdiYmNiZmRmODAyYTA4ODNmNmMwIn0.eyJhdWQiOiIxIiwianRpIjoiY2Q1NGJjNzg4ZTdjNDNmMmY0Mzc5NjZjNWU5ZGY1NmU2NmU2ZWRhYTBiMjQ0NjI5YjgyZGQ0NWY5Njc5N2JiY2JmZGY4MDJhMDg4M2Y2YzAiLCJpYXQiOjE2NzY1MjU2NTAsIm5iZiI6MTY3NjUyNTY1MCwiZXhwIjoxNzA4MDYxNjUwLCJzdWIiOiIyNyIsInNjb3BlcyI6W119.EtmcDrl-KIjBGAm098Yw-rkebI-AfNLEBPSiRy6UPDgl5_RmCL5MN5xe8j20gacCsCe9KkPVh4QD_nwiNWJCsz-bEZbxqepFq0I72oEX-d31AjhvynOD8kTKsmr-IdkgRrYyfrdhJQyoKhwTKpjPkaP-NIG8ZcaCQALzb3EAOnq2Aoa7Y8ODEHAXY6dSoLrg50mF90soJABZOdMRkJYymHNkmHJlm1voJsUSu_oVsHT12xmRDIdXiHNNXjWVqanef26mEcpt_WUBAEmrTEAxJO6_EcrEsF3MGcFVZldSjLMoLl9dA6ccHL0-mLOVnFlir_rp5RCF7pqWlHSMSSjCKZ6kIr0gL1lZAHAqc_Z9m6Er_vF_zpklvROo4Cx2R5qvnqJf6hfTIdLHVOPnzeDuT55q-OLV6wWuBfkWJRvnP6dK37z6PljopBmC5XTI05Kr7PWBZUnxyVIn_1ooJlQy208k5_34PtetYLKnmzAwyFvC9XNdhIVSHfIDDGtMrrXWi5ElsF4o_53RrugGSTDePNQAzENaZr3IFrIR9y4cXTNag8uhBsTbNkubMlqF9xRKuziDfMRFaNjJt2Tm3SpkoQzaLxTQ84PYHHbSLQUobwbr09KGTGILfaMNIEonK0wKnFPcoYxUVwYiQyrwLN3xUqY7v67IQG9H4s5ZqnY0iUE","corporate_name":"Willis Towers Watson"});
                  reduxStoreUser(loggedInUser);
                //   storeAsyncData(ASYNC_LOGIN_KEY,loggedInUser);

                // navigation.replace('Home');
            }else{
                navigation.replace(action);
            }
           
          };
        


        // if(isLoggedIn == false)
        // {
        //     getAsyncData(ASYNC_LOGIN_KEY).then((asUser) => {
        //         if(asUser !== null)
        //         {
        //             console.log('ASYNC USER',JSON.parse(asUser));
        //             var temp = JSON.parse(asUser);

        //             if(temp.hasOwnProperty('name') && temp.name != '')
        //             {
        //                 const asPUser = JSON.parse(asUser);
        //                 console.log('Storing DAta to REcus ' + asPUser.userId );
        //                 console.log('API',API_LINK+'fetch_cart');
                        

        //                 // load customer cart
        //                 fetch(API_LINK+'fetch_cart',{
        //                     method : 'POST',
        //                     headers : {
        //                         'Accept': 'application/json',
        //                         'Content-type': 'application/json',
        //                         mode: 'cors'
        //                     },
        //                     body: JSON.stringify({
        //                         user_id: asPUser.userId
                                
        //                          })
        //                      })
        //                     .then((response) => response.json())
        //                     .then((responseData) => {
        //                         console.log('AUTO CART RESPONSE:',responseData);
        //                       if(responseData.hasOwnProperty('Total'))
        //                       {
                               
        //                         let total = responseData.Total;
        //                         let subTotal = responseData.Total;
        //                         let qty = 0;
        //                         let cart = [];

        //                         for(let i = 0; i < responseData.cart.length; i++)
        //                         {
        //                             let cartItem = {
        //                                 id: responseData.cart[i].id,
        //                                 name: responseData.cart[i].product_name,
        //                                 image: MEDIA_LINK + responseData.cart[i].image_1,
        //                                 qty: responseData.cart[i].pro_qty,
        //                                 rate: responseData.cart[i].sale_price
        //                             };
        //                             cart.push(cartItem);
        //                             qty += parseInt(responseData.cart[i].pro_qty);
        //                         }

        //                         const newCart = {
        //                             cart:cart,
        //                             cartSubTotal: subTotal,
        //                             cartCount: qty,
        //                             total: total
        //                         }
                               
        //                         _loadCart(newCart);
                                
        //                        }
                             
        //                      })
        //                     .catch(function(error) {
        //                                 console.warn('There has been a problem with your fetch operation: ' + error);
        //                                  // ADD THIS THROW error
        //                                  setApiStatus(false);
        //                                   throw error;
                                        
        //                                 })
        //                         ;
                        
        //                 storeUser(asPUser);
        //                 setIsLoggedIn(true);

        //             }
        //             else{
        //                 setIsLoggedIn(false);
        //             }
        //         }
        //     });
        //     setAppInit(true);
        //     console.log('PRU',reduxUser);
        // }
        // else{
        //     setAppInit(true);
        // }

        setTimeout(() => {
           getAsyncData();
        },3000);

    },[]);

    return (<View style={styles.containers}>
       
            <Animatable.Image animation="bounceIn" duration={1550} source={require('../assets/logoo.png')} style={[styles.logo]} />
            <Text style={{fontSize:20,fontStyle:'normal',marginTop:10}}>Aaranya</Text>

        </View>
    )
}


const LogoDimension = getLogoDimensions(BIG_LOGO_RATIO);

//console.log('DIM',height_logo+'--'+width_logo);
const styles = StyleSheet.create({
    containers:{
        // flex:1,
        height:'100%',
        backgroundColor:'#183f38',
        justifyContent:'center',
        alignItems:'center'
    },
    container:{
        // flex:1,
        backgroundColor:'#',
    },
    header:{
        paddingVertical:100,
        justifyContent:'center',
        alignItems:'center'
    },
    footer:{
        
        backgroundColor:'#fff',
        borderTopLeftRadius:50,
        borderTopRightRadius:50,
        paddingVertical:30,
        paddingHorizontal:50,
    },
    logo:{
        width:150,
        height:150,
    },
    title:{
        color:'#2f746f',
        fontSize:30,
        fontWeight:'normal',
        textAlign:'center',
        
    },
    subtitle:{
        paddingVertical:10,
        textAlign:'center',
        fontSize:17,
        color:'#2f746f',
    },
    getstart:{
        alignItems:'center',
        backgroundColor:'#2f746f',
        marginLeft:40,
        marginRight:40,
        borderRadius:50,
        marginTop:50,
        
    },
    getstartText:{
        color:'white',
        padding:16,
        fontSize:18,
        fontWeight:'normal',
    }
    
})

const mapStateToProps = state => {
    return {
        reduxUser: state.user
    };
}

const mapDispatchToProps = dispatch => {
    return {
        storeUser : (asyncUser) => dispatch(storeUser(asyncUser)),
        _loadCart : (cart) => dispatch(addToCart(cart)),
        reduxStoreUser : loggedinUser => dispatch(storeUser(loggedinUser))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Splash);

