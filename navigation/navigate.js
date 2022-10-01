import React from 'react';
import LogIn from '../screens/LogIn';
import Loading from '../screens/Loading';
import Home from '../screens/Home';
import ForgotPassword from '../screens/ForgotPassword';
import SignUp from '../screens/SignUp';
import DoubtDetails from '../screens/DoubtDetails'
import MyTabs from './BottomTab';
import AnswerDetails from '../screens/AnswerDetails'
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const MyStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Loading"
        component={Loading}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="LogIn"
        component={LogIn}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{ headerShown: false }}
      />    
      <Stack.Screen
        name="AnswerDetails"
        component={AnswerDetails}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Home"
        component={MyTabs}
        options={{ headerShown: false }}
      />
   
    </Stack.Navigator>
  );
};

export default MyStack;
