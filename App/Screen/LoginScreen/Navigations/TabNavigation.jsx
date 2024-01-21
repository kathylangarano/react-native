import { View, Text } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Colors from '../Utils/Colors';
import { Ionicons, AntDesign, SimpleLineIcons } from '@expo/vector-icons';
import HomeScreen from '../../HomeScreen/HomeScreen';
import BillScreen from '../../BillScreen/BillScreen';
import SettingScreen from '../../SettingScreen/SettingScreen';

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  return (
    <Tab.Navigator screenOptions={{headerShown:false,}}>
      <Tab.Screen name="Home" component={HomeScreen} 
        options={{
            tabBarLabel: 'Home',
            tabBarActiveTintColor: Colors.PRIMARY,
            tabBarIcon:({color,size})=>{
                return<Ionicons name="home" size={size} color={color}/>
                    
                }
            }}
      />
      <Tab.Screen name="Bills" component={BillScreen}
      options={{
            tabBarLabel: 'Bills',
            tabBarActiveTintColor: Colors.PRIMARY,
            tabBarIcon:({color,size})=>{
                return<AntDesign name="book" size={size} color={color}/>
                    
                }
            }}
      />
      <Tab.Screen name="Settings" component={SettingScreen}
      options={{
            tabBarLabel: 'Settings',
            tabBarActiveTintColor: Colors.PRIMARY,
            tabBarIcon:({color,size})=>{
                return<SimpleLineIcons name="settings" size={size} color={color}/>
                    
                }
            }}
       />
    </Tab.Navigator>
  )
}