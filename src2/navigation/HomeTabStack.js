import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import { HEALERAPPOINTMENTSCREEN, DASHBAORD, HOMESCREEN, PRODUCTSCREEN, REVIEWORDERSCREEN, SHIPPINGPOLICY, TERMCNDITION } from '../constants/Screens';
import { HealerAppointment, Home, Product } from '../screens';
// import Subscribe from '../screens/Subscribe';
// import Report from '../screens/Report';
import ChangePassword from '../screens/ChangePassword'

const HomeTabStack = ({navigation}) => {

    const HomeStack = createStackNavigator();

    return (
        <HomeStack.Navigator
            headerShown={false}
        >
            <HomeStack.Screen name={HOMESCREEN} component={Home}  options={{headerShown: false  }} />
            <HomeStack.Screen name={HEALERAPPOINTMENTSCREEN} component={HealerAppointment}  options={{headerShown: false  }}  />
            <HomeStack.Screen name={PRODUCTSCREEN} component={Product}  options={{headerShown: false  }}  />
            {/* <HomeStack.Screen name={SUBSCRIPTIONSSCREEN} component={Subscribe}  options={{headerShown: false  }}  /> */}
            {/* <HomeStack.Screen name={REVIEWORDERSCREEN} component={ReviewOrder}  options={{headerShown: false  }}  />
            <HomeStack.Screen name={ORDERSTATUSSCREEN} component={OrderStatus}  options={{headerShown: false  }}  />
            <HomeStack.Screen name={REFUNDPOLICY} component={RefundPolicy}  options={{headerShown: false  }}  />
            <HomeStack.Screen name={SHIPPINGPOLICY} component={ShippingPolicy}  options={{headerShown: false  }}  />
            <HomeStack.Screen name={Report1} component={Report}  options={{headerShown: false  }}  />
             */}
           
        </HomeStack.Navigator>
    )
}

export default HomeTabStack

const styles = StyleSheet.create({})
