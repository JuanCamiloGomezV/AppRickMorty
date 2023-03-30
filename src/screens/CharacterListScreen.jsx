import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import React, {useEffect, useState} from 'react';

import CharacterItem from '../components/CharacterItem';
import axios from 'axios';

const CharacterListScreen = ({navigation}) => {
  const [urlAPI, setUrlAPI] = useState(
    'https://rickandmortyapi.com/api/character',
  );
  const [data, setData] = useState([]);
  const [nextPage, setNextPage] = useState('');
  const [prevPage, setPrevPage] = useState('');
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios.get(urlAPI).then(response => {
      setData(response.data.results);
      setNextPage(response.data.info.next);
      setPrevPage(response.data.info.prev);
      setLoading(false);
    });
  }, [urlAPI]);
  const onSelectCharacter = data => {
    navigation.navigate('Detail', {
      data: data,
      name: data.name,
    });
  };
  const renderItem = ({item}) => (
    <CharacterItem
      data={item}
      onSelectCharacter={() => onSelectCharacter(item)}
    />
  );
  return loading ? (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size="large" color="black" />
    </View>
  ) : (
    <View style={{flex: 1}}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={2}
        ItemSeparatorComponent={() => <View style={{height: 5}} />}
        style={{marginHorizontal: 5}}
        ListFooterComponent={() => <View style={{height: 80}} />}
      />
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <View style={styles.navigator}>
          {prevPage && (
            <TouchableOpacity
              onPress={() => setUrlAPI(prevPage)}
              style={styles.navigatorButton}>
                <Text style={styles.textButton}>Atras</Text>
            </TouchableOpacity>
          )}
          {nextPage && (
            <TouchableOpacity
              onPress={() => setUrlAPI(nextPage)}
              style={styles.navigatorButton}>
                <Text style={styles.textButton}>Siguiente</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

export default CharacterListScreen;

const styles = StyleSheet.create({
  navigator: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 15,
    backgroundColor: '#ffffff',
    width: 330,
    padding:5,
    borderRadius: 10,
    shadowColor: '#0c8f84',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
  navigatorButton:{
    padding: 10,
    margin: 5,
    backgroundColor: '#0c8f84',
    width: 100,
    borderRadius: 10,
    alignItems: 'center',
  },
  textButton:{
    color: '#ffffff',
  }
});
