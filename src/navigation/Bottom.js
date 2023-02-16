import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home } from '../screens';
import Icon from 'react-native-vector-icons/Ionicons';
import HomeTabStack from './HomeTabStack';
import HealTabStack from './HealTabStack';
import ProfileTabStack from './ProfileTabStack';

import {  HOMESCREEN, HOMETABSTACK, HEALSCREEN, PROFILETABSTACK, HEALTABSTACK } from '../constants/Screens';
// import Refer from '../screens/Refer';
import { COLORS } from '../constants/Colors';
import {useSelector} from 'react-redux'

const Tab = createBottomTabNavigator();

export default Bottom = () => {

    return (
        <Tab.Navigator 
        headerShown={false}
          screenOptions={{
            tabBarStyle: {
              paddingTop: 10,
              paddingBottom: 5,
              height: 60,
              overflow: 'hidden',
              backgroundColor: '#184038'
            },
            
          }}
        >
        <Tab.Screen name={HOMESCREEN} component={HomeTabStack} 
            options={{
              headerShown: false,
              tabBarLabel:'',
              tabBarIcon: ({focused}) => {
                return (
                (!focused) 
                ?
                <>
                <Icon name="home-outline" color="white" size={23} />
                <Text style={{fontSize: 12, color: 'white'}}>Home</Text>
                </>
                :
                <>
                <Icon name="home" color="white" size={23} />
                <Text style={{fontWeight: 'normal', color: 'white', fontSize: 12}}>Home</Text>
                </>
                );
              }
            }}
        />
   
            
        
        <Tab.Screen  name={HEALTABSTACK} component={HealTabStack} options={{
              headerShown: false,
              tabBarLabel:'',
              tabBarIcon: ({focused}) => {
                return (
                (!focused) 
                ?
                <>
                <Icon name="calendar-outline" color="white" size={23} />
                <Text style={{fontSize: 12, color: 'white',}}>Heal</Text>
                </>
                :
                <>
                <Icon name="calendar" color="white" size={23} />
                <Text style={{fontWeight: 'normal', color: 'white', fontSize: 12}}>Heal</Text>
                </>
                );
              }
            }}
             />

        
        <Tab.Screen name="PROFILE" component={ProfileTabStack} options={{
              headerShown: false,
              tabBarLabel:'',
              tabBarIcon: ({focused}) => {
                return (
                (!focused) 
                ?
                <>
                <Icon name="person-outline" color="white" size={23} />
                <Text style={{fontSize: 12, color: 'white',}}>Profile</Text>
                </>
                :
                <>
                <Icon name="person" color="white" size={23} />
                <Text style={{fontWeight: 'normal', color: 'white', fontSize: 12}}>Profile</Text>
                </>
                );
              }
            }} />


        </Tab.Navigator>
    )
}



const styles = StyleSheet.create({})
