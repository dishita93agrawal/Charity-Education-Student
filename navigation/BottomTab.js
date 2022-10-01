import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import Settings from '../screens/Settings';
import AskDoubt from '../screens/AskDoubt';
import DoubtDetails from '../screens/DoubtDetails';
import DoubtListScreen from '../screens/DoubtListScreen';
import Home from '../screens/Home';
import { Image, View, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { createStackNavigator } from '@react-navigation/stack';
const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let ionicon;
          if (route.name === 'Home') {
            iconName = focused ? 'search' : 'search-outline';
          } else if (route.name === 'AskDoubt') {
            iconName = focused ? 'add-circle-sharp' : 'add-circle-outline';
          } else if (route.name === 'Settings') {
            iconName = focused ? 'settings-sharp' : 'settings-outline';
          }
          return (
            <View>
              <Ionicons
                name={iconName}
                color={color}
                size={25}
                style={styles.icons}
              />
            </View>
          );
        },
        tabBarActiveTintColor: 'orange',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          height: '10%',
          backgroundColor: '#232268',
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
        },
        tabBarLabelStyle: { padding: 5 },
      })}>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarShowLabel: true,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="AskDoubt"
        component={DoubtStack}
        options={{
          tabBarShowLabel: true,
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarShowLabel: true,
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}
export default MyTabs;

const HStack = createStackNavigator();

const HomeStack = () => {
  return (
    <HStack.Navigator>
      <HStack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
    </HStack.Navigator>
  );
};

const DStack = createStackNavigator();

const DoubtStack = () => {
  return (
    <DStack.Navigator>
      <DStack.Screen
        name="DoubtListScreen"
        component={DoubtListScreen}
        options={{ headerShown: false }}
      />
       <DStack.Screen
        name="AskDoubt"
        component={AskDoubt}
        options={{ headerShown: false }}
      />
      <DStack.Screen
        name="DoubtDetails"
        component={DoubtDetails}
        options={{ headerShown: false }}
      />
     
    </DStack.Navigator>
  );
};

const styles = StyleSheet.create({
  icons: {
    width: 30,
    height: 30,
  },
});
