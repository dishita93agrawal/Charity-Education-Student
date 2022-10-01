import React, { Component } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import MyStack from './navigation/navigate';


export default class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>
    );
  }
}

