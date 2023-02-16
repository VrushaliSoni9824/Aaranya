import React, {useState, useEffect,createRef} from "react";
import { StyleSheet, Text, View, Image, ScrollView,Dimensions , FlatList,ImageBackground, ActivityIndicator, Modal, Pressable,useWindowDimensions, Alert, Platform } from 'react-native'
import { SliderBox } from "react-native-image-slider-box";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements'
import { connect } from 'react-redux';
import { COLORS } from "../constants/Colors";
import { API_LINK } from "../constants/Strings";
import { isTemplateElement } from "@babel/types";
import ProductListView from "../common/ProductListView";
import LoadingView from "../common/LoadingView";
import MemberHeader from "../common/MemberHeader";
import { loadPlans } from "../Store/subscribe/actions";

import { SafeAreaView } from "react-native-safe-area-context";
// import OTPInputView from '@twotalltotems/react-native-otp-input'

import RenderHtml, { HTMLElementModel, HTMLContentModel } from 'react-native-render-html';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {BlurView} from '@react-native-community/blur';

const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

const images = [
    'https://www.purie.in/images/slide-1.png',
    'https://www.purie.in/images/slide-2.png'
    

]
const Home = ({ navigation, reduxUser }) => {
    const [apiStatus, setApiStatus] = useState(false);
    const { width } = useWindowDimensions();
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
    const [categories, setCategories] = useState(false);
    const [wallet, setWallet] = useState(false);

    const [showBlur, setShowBlur] = useState(true);
  const [viewRef, setViewRef] = useState(null);
  const [blurType, setBlurType] = useState('light');
  const backgroundImageRef = createRef();
  
   // const [isHomePageReady, setisHomePageReady] = useState(false);

  
   const getadvertisement = async () => {
//     try {
//      const response = await fetch('https://purie.in/app/api/fetch_advertisement.php');
//      const json = await response.json();
//      console.log("*****************************************************");
//      console.log(JSON.stringify(response));
//      console.log("*****************************************************");
//      setData(json.data);
//    } catch (error) {
//      console.error(error);
//    } finally {
//      setLoading(false);
//    }

fetch('https://purie.in/app/api/fetch_advertisement.php',{
      method: 'GET'
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log("*****************************************************");
             console.log(responseJson[0].image_url);
             console.log( responseJson[0].image_url+ '?' + new Date())
             console.log("*****************************************************");
            //  setData(responseJson[0].image_url);
            setData(responseJson[0].image_url+ '?' + new Date());
             setModalVisible(true);
             setLoading(false);
      })
      .catch((error) => {
        //Error 
        console.error(error);
        setLoading(false);
      });


 }

 useEffect(() => {
    // console.log("********************");
    // console.log(JSON.stringify(reduxUser));
    const getAsyncData = async () => {
        const access_token = await AsyncStorage.getItem("access_token");
        setaccess_token(access_token);
        const patient_id = await AsyncStorage.getItem("id");
        setpatient_id(patient_id);
        const corporate_id = await AsyncStorage.getItem("corporate_id");
        setcorporate_id(corporate_id);
        console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&")
        console.log(access_token);
        loadHomeData(access_token);
        loadHomeData2(access_token,corporate_id,patient_id)
      };
    
      getAsyncData();

 },[]);

    const loadHomeData2 = (access_token,corporate_id,patient_id) => {
        // https://aaranyawellness.com/api/patient/get-home-track-data
        var body  = {"corporate_id": corporate_id, "patient_id": patient_id}
        fetch("https://aaranyawellness.com/api/patient/get-home-track-data",{
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
                console.log('HOMEDATAttttttttttttttttttttttttt',responseData);
                // Alert.alert("succes");
                setmeditationData(responseData.meditateaudio)
                // setmostSellingProducts(responseData.packages);
                // setmostSellingProducts(responseData.data);
                //setIsDataLoaded(true);
             setApiStatus(false);
             })
            .catch(function(error) {
                // Alert.alert(error);
                        console.warn('There has been a problem with your fetch operation: ' + error);
                         // ADD THIS THROW error
                         setApiStatus(false);
                          throw error;
                        
                        });
               
    }

    const loadHomeData = (access_token) => {
        
       
        console.log('home data api call ');

        fetch("https://aaranyawellness.com/api/service-get-all",{
            method : 'GET',
            headers : {
                'Accept': 'application/json',
                'Content-type': 'application/json',
                'Authorization': "Bearer "+access_token,
                mode: 'cors'
            }
             })
            .then((response) => response.json())
            .then((responseData) => {
                console.log('HOMEDATA',responseData);
                setmostSellingProducts(responseData.data);
                //setIsDataLoaded(true);
             
             // setApiStatus(false);
             })
            .catch(function(error) {
                        console.warn('There has been a problem with your fetch operation: ' + error);
                         // ADD THIS THROW error
                         setApiStatus(false);
                          throw error;
                        
                        });
               
                        
                if(!mostSellingProducts)
                {
                    setIsDataLoaded(true);
                }
                                         
    }


    // if(!isDataLoaded)s
    // {
    // loadHomeData();
    // }

    console.log('RD',reduxUser);

    const renderProduct = (item) => {
        console.log('REN FLAT',item);
        return (
        <ProductListView
         item={item}
         />
        );
    }

    

    return (
        <SafeAreaView style={{ flex: 1, }}>
{/* =========open Modal */}

{/* <View style={modalstyle.centeredView}> */}

    <View style={{flex:1}}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(modalVisible);
        }}
      >
        
        <View style={modalstyle.centeredView}>
          <View style={modalstyle.modalView}>
          <Pressable
              style={{flex:1,width:'100%'}}
              onPress={() => {
                console.log("aaaaaaaaaaa")
                setModalVisible(!modalVisible)}}
            >
        
            <View style={{flex:1,width:'100%'}}>
                <View style={{flex:0.02,alignItems:'flex-end'}}>
                <Pressable
              style={[modalstyle.button, modalstyle.buttonClose]}
              onPress={() => {
                console.log("aaaaaaaaaaa")
                setModalVisible(!modalVisible)}}
            >
            <Image source={require('../assets/cancel.png')}
                    style={{width: 20, height: 20,borderRadius:20}} />
              {/* <Text style={modalstyle.textStyle}> aaaa </Text> */}
            </Pressable>
                </View>

                {/* <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <ActivityIndicator size={20} color={COLORS.INDICATORCOLOR} />
                    </View> */}
                {(isLoading) ? 
                    <View style={{flex:0.98,backgroundColor:'#000',borderRadius:20, alignItems:'center'}}>
                        <ActivityIndicator size={20} color={COLORS.INDICATORCOLOR} />
                    </View>
                :
                <View style={{flex:0.98,backgroundColor:'#000',borderRadius:20}}>
                    <Image 
                    onLoadStart={()=>{
                        setisLoadingImage(true);
                    }}

                    onLoadEnd={() => {
                        setisLoadingImage(false);
                    }}
                    source={{uri:data, cache: "reload"}} style={{width: '100%', height: '100%',borderRadius:20}} />
                {isLoadingImage && <LoadingView/>}
                </View>
                }
               
            </View>
            </Pressable>

          </View>
        </View>
       
      </Modal>
      </View>
      {/* <Pressable
        style={[modalstyle.button, modalstyle.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={modalstyle.textStyle}>Show Modal</Text>
      </Pressable> */}
    {/* </View> */}
   

{/* ========= close modal */}

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
            {/* {Platform.OS == "android" && */}
                <MemberHeader title=""/> 
            {/* } */}
            <View style={{backgroundColor:'#000'}}>
            {/* <Text style={styles.descriptionContainerVer}>abbbbcdnnxsdndnddn</Text> */}
            
            </View>
            
            <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.products}>
                    <Text style={styles.catTitle}>Quick Heal</Text>
                </View>
                <View style={{ marginLeft: 10, marginRight:10 }}>
                    {
                        (!mostSellingProducts)
                        ?
                        <View>
                            <ActivityIndicator size={20} color="black" />
                        </View>
                        :
                    <FlatList
                        data={mostSellingProducts}
                        keyExtractor={item => item.id}
                        renderItem={renderProduct}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                    /> 
                    }    
                    
                </View>
            
                {/* <SliderBox images={images}
                    dotColor="black"
                    autoplay
                    circleLoop
                    dotStyle={{ width: 7, height: 7, borderRadius: 3, borderColor: "white", borderWidth: 3 }}
                    imageLoadingColor="grey"
                /> */}

            {
                (!isDataLoaded)
                ?
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                        <ActivityIndicator size={20} color={COLORS.INDICATORCOLOR} />
                    </View>
                :
                <>
               
                {/* <View style={styles.categorycontainer}>
                    <Text style={styles.catTitle}>Most Popular Category</Text>
                    <View style={styles.categoryrow}>
                    {
                        (!categories)
                        ?
                        <View style={{flexDirection: 'row', flex:1, justifyContent: 'center'}}>
                            <ActivityIndicator size={20} color="black" />
                        </View>
                        :
                        <FlatList
                            data={categories}
                            keyExtractor={item => item.id}
                            renderItem={renderCategory}
                            numColumns={4}
                        />
                    }
                        
                    </View>
                </View> */}
                <View style={styles.products}>
                    <Text style={styles.catTitle}>Meditate</Text>
                </View>
                </>
            }


                    {
                        (!mostSellingProducts)
                        ?
                        <View>
                        <ActivityIndicator size={20} color="black" />
                    </View>
                        :
                        <FlatList
                        data={meditationData}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) =>
                        // <View style={styles.banner}>
                        // <View>
                        //     <Text>{item.title}</Text>
                        //     <Image style={styles.bannerImage} source={{uri: item.image}} />
                        // </View>
                        // </View>
                        <TouchableOpacity style={styles.banner} onPress = { () => {
                            navigation.navigate('Category')
                        }}>
                    
                <ImageBackground source={{uri: item.image}} style={styles.bannerImage}>
   <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'flex-start'}}>
     <Text style={{textAlign:'left', marginLeft:20, fontSize:20, color:'#000'}}>{item.title}</Text>
   </View>
    </ImageBackground>
                    
                </TouchableOpacity>
    }
                        // horizontal={true}
                        showsHorizontalScrollIndicator={false}
                    /> 
                    }  

                <View style={styles.footer}></View>

            </ScrollView>
        </View>
        </ImageBackground>
        </SafeAreaView>
    )
}


const modalstyle = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
        },
      modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 10,
        height: '90%',
        width: '90%',
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      button: {
        borderRadius: 20,
        padding: 5,
        elevation: 2
      },
      buttonOpen: {
        backgroundColor: "#000",
      },
      buttonClose: {
        backgroundColor: "#fff",
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center"
      }
});

const styles = StyleSheet.create({
    footer: {
        height: 60
    },
    slider: {
        width: '100%',
        height: 200,
    },
    categorycontainer: {
        width: '100%',
        borderRadius: 20,

        padding: 10,
    },
    catTitle: {

        fontSize: 25,
        fontWeight: "bold",
        color: '#fff'
    },
    categoryrow: {

       
        flexDirection: 'row',
        paddingTop: 0,

    },
    category: {
        width: '24%',
        margin: 2,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 5

    },
    catImg: {
        width: 65,
        height: 65,
        borderRadius: 50,
        borderColor: "gray",
        borderWidth: 1.5

    },
    catName: {
        marginTop: 5,
        color: 'black',
        fontWeight: '300'
    },
    ltr: {
        fontSize: 14,

    },

    products: {
        padding: 10,
    },
    prorow: {
        backgroundColor: '#fff',
        borderRadius: 10,
        width: 170,
        marginRight: 10,
    },
    product: {
        width: '100%',
    
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',


    },
    proImg: {
        width: '100%',
        height: 150,
        marginTop: 3,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    productName: {
        padding: 7,
        fontWeight: '400',
        fontSize: 13

    },
    QtyPrice: {
        paddingLeft: 10,

        justifyContent: 'space-between',

    },

    price: {
        fontSize: 14,
        fontWeight: '400',
    },
    subscribe: {
        alignItems: 'center',
        backgroundColor: '#2f746f',
        margin: 10,
        borderRadius: 50,
    },
    subscribebtn: {
        color: 'white',
        padding: 5,
        fontSize: 15,
        fontWeight: '500',
    },
    buynow: {
        alignItems: 'center',
        backgroundColor: '#98AFC7',
    },
    banner: {
        margin: 5,
        marginTop: 5,
    },
    bannerImage: {
        width: '100%',
        height:'50%',
        borderRadius: 5,
        height:100
    }




})


const mapStateToProps = state => {
    return {
        reduxUser : state.user,
        reduxPlans: state.subscriptionPlans
    };
}

export default connect(mapStateToProps)(Home);

