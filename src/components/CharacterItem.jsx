import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import axios from 'axios';

const CharacterItem = ({data, onSelectCharacter}) => {
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios.get(data.url).then(response => {
      setCharacter(response.data);
      setLoading(false);
    });
  }, [data.url]);
  return loading ? (
    <TouchableOpacity
      onPress={onSelectCharacter}
      style={[styles.container, {justifyContent: 'center', backgroundColor:'#ccc'}]}>
      <ActivityIndicator size="large" color="white" />
    </TouchableOpacity>
  ) : (
    <TouchableOpacity onPress={onSelectCharacter} style={styles.container}>
      <View style={styles.name}>
        <Text style={[styles.text,{fontWeight:'bold',fontSize:16}]}>{character.name}</Text>
        <Text style={styles.text}>{character.species}</Text>
      </View>
      <Image
        style={styles.image}
        source={{uri: character.image}}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};

export default CharacterItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    alignItems: 'center',
    height: 180,
    marginHorizontal: 2.5,
    borderRadius:10
  },
  image: {
    height: 180,
    width: '100%',
    borderRadius: 10,
    zIndex: -1,
  },
  name: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(12, 143, 132, 0.842)',
    padding: 5,
    borderBottomLeftRadius:10
  },
  text: {
    color: 'white',
  },
  details: {
    paddingLeft: 10,
  },
});
