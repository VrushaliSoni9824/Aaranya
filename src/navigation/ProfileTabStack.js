import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import {   CHANGEPASSWORDSCREEN, EDITPROFILESCREEN, HEALSCREEN, PROFILESCREEN } from '../constants/Screens';
import Profile from '../screens/Profile';
import EditProfile from '../screens/EditProfile';

const ProfileTabStack = ({navigation}) => {

    const ProfileStack = createStackNavigator();

    return (
        <ProfileStack.Navigator
            headerShown={false}
        >
            {/* <ProfileStack.Screen name={PROFILESCREEN} component={Profile}  options={{headerShown: false  }} /> */}
            <ProfileStack.Screen name={EDITPROFILESCREEN} component={EditProfile}  options={{headerShown: false  }} />
   
        </ProfileStack.Navigator>
    )
}

export default ProfileTabStack;

const styles = StyleSheet.create({})
