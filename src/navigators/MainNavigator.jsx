import HomeNavigator from './HomeNavigator';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';

const MainNavigator = () => {
  return (
    <NavigationContainer>
      <HomeNavigator />
    </NavigationContainer>
  );
};

export default MainNavigator;
