import React from 'react'
import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/core';
import { DrawerActions } from '@react-navigation/routers';
import { useSelector } from 'react-redux';
import {showPrice} from '../utils';
import { COLORS } from '../constants/Colors';


const toggleDrawer = (navigation) => {
        
    
    navigation.openDrawer();
}

const MemberHeader = ({title}) => {

    const reduxUser = useSelector(state => state.user);

    const navigation = useNavigation();

    console.log('RDW',reduxUser);


  

    return (
        <View style={styles.nav}>
            {Platform.OS == "android" &&
                <View style={styles.row}>
                    <View style={styles.col}>
                    <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
                            <Icon name="menu" color="#087E8B" size={25} />
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.col2, styles.ac]}>
                        <Text style={styles.heading}>{title}</Text>
                    </View>
                </View>
            }
        </View>
    )
}

export default MemberHeader

const styles = StyleSheet.create({
    ac: {
        alignItems: 'center'
    },
    ar: {
        alignItems: 'flex-end'
    },
    heading:{
        fontSize: 17,
        fontWeight: 'normal',
        color: '#087E8B',
        paddingTop: 3
    },
 nav: {
     
    // position: 'absolute',
     width: '100%',
     height: 50,
     alignSelf: 'center',
     justifyContent: 'center',
     backgroundColor: Platform.OS == 'android' ? 'white' : '#184038',
     paddingHorizontal: 15

 },
 row: {
     flexDirection: 'row'
 },
 col: {
     flex:1
 },
 col2: {
     flex: 2
 }
})
