import {Image, StyleSheet} from 'react-native';

import CharacterListScreen from '../screens/CharacterListScreen';
import DetailCharactertScreen from '../screens/DetailCharacterScreen';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();
const HomeNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={CharacterListScreen}
        options={{
          title: 'Título con imagen',
          headerTitle: () => (
            <Image
              style={styles.image}
              source={{
                uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Rick_and_Morty.svg/1200px-Rick_and_Morty.svg.png',
              }}
              resizeMode="contain"
            />
          ),
        }}
      />
      <Stack.Screen
        name="Detail"
        component={DetailCharactertScreen}
        options={({route}) => ({title: route.params.name})}
      />
    </Stack.Navigator>
  );
};

export default HomeNavigator;

const styles = StyleSheet.create({
  image: {
    width: 150,
    height: 150,
  },
});
