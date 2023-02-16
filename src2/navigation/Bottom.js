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
              overflow: 'hidden'
            }
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
                <Icon name="home-outline" color="#087E8B" size={23} />
                <Text style={{fontSize: 12, color: '#087E8B',}}>Home</Text>
                </>
                :
                <>
                <Icon name="home" color="#087E8B" size={23} />
                <Text style={{fontWeight: 'bold', color: '#087E8B', fontSize: 12}}>Home</Text>
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
                <Icon name="calendar-outline" color="#087E8B" size={23} />
                <Text style={{fontSize: 12, color: '#087E8B',}}>Heal</Text>
                </>
                :
                <>
                <Icon name="calendar" color="#087E8B" size={23} />
                <Text style={{fontWeight: 'bold', color: '#087E8B', fontSize: 12}}>Heal</Text>
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
                <Icon name="person-outline" color="#087E8B" size={23} />
                <Text style={{fontSize: 12, color: '#087E8B',}}>Profile</Text>
                </>
                :
                <>
                <Icon name="person" color="#087E8B" size={23} />
                <Text style={{fontWeight: 'bold', color: '#087E8B', fontSize: 12}}>Profile</Text>
                </>
                );
              }
            }} />


        </Tab.Navigator>
    )
}



const styles = StyleSheet.create({})
