import {ActivityIndicator, Image, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';

import {ScrollView} from 'react-native-gesture-handler';
import axios from 'axios';

const DetailCharacter = ({route}) => {
  const {data} = route.params;
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios.get(data.url).then(response => {
      setCharacter(response.data);
      setLoading(false);
    });
  }, [data.url]);

  return loading ? (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size="large" color="white" />
    </View>
  ) : (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.containerInfo}>
          <Image
            style={styles.image}
            source={{uri: character.image}}
            resizeMode="contain"
          />
          <View style={styles.containerText}>
            <Text style={styles.textTitle}>Nombre: </Text>
            <Text style={styles.textRegular}>{character.name}</Text>
          </View>
          <View style={styles.containerText}>
            <Text style={styles.textTitle}>Estado: </Text>
            <Text style={styles.textRegular}>{character.status}</Text>
          </View>
          <View style={styles.containerText}>
            <Text style={styles.textTitle}>Especie: </Text>
            <Text style={styles.textRegular}>{character.species}</Text>
          </View>
          <View style={styles.containerText}>
            <Text style={styles.textTitle}>Genero: </Text>
            <Text style={styles.textRegular}>{character.gender}</Text>
          </View>
          <View style={styles.containerText}>
            <Text style={styles.textTitle}>Origen: </Text>
            <Text style={styles.textRegular}>{character.origin.name}</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default DetailCharacter;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    width: '100%',
    alignItems: 'center',
  },
  containerInfo: {
    backgroundColor: '#ffffff',
    width:220,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.39,
    shadowRadius: 8.3,

    elevation: 13,
  },
  image: {
    height: 220,
    width: 220,
  },
  containerText:{
    padding:10,
    flexDirection:'row',
    flexWrap: 'wrap',
  },
  textTitle:{
    fontWeight:'bold',
    fontSize:16
  },
  textRegular:{
    fontSize:16,
  }
});
