import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import { Searchbar } from 'react-native-paper';
import firebase from '../Fire';

import { NewsContext } from './contexts/NewsContext'

export default function List({ navigation }) {
  const [listFire, setListFire] = useState([]);
  const [currentList, setCurrentList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const { news, setNews } = useContext(NewsContext)

  

  useEffect(() => {
    try {
      firebase.database().ref('/crud').on('value', (snapshot) => {
        const list = [];
        snapshot.forEach((childItem) => {
          list.push({
            key: childItem.key,
            title: childItem.val().title,
            text: childItem.val().text,
            author: childItem.val().author,
          });
        });
        setListFire(list);
        setCurrentList(list);
      })

    } catch (error) {
      alert(error);
    }
  }, [])

  const handleSelect = item => {
    setNews({
      key: item.key,
      title: item.title,
      text: item.text,
      author: item.author,
    })
    navigation.push("Detalhes")
  }
  const onChangeSearch = search => {
    console.log(search)
    setSearchQuery(search)
    setCurrentList(listFire.filter(
      ({title, text, author}) =>  title.includes(search) || 
                                  text.includes(search) || 
                                  author.includes(search) 
    ))

  }



  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Buscar notícia"
        onChangeText={onChangeSearch}
        value={searchQuery}
      />
      <FlatList style={styles.viewFlat} data={currentList}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) =>

          <View style={styles.iconFlat}>
             <TouchableOpacity
                style={styles.button}
                onPress={() => handleSelect(item) }
              >
                <Text>{item.title}</Text>
              </TouchableOpacity>
          </View>

        } />

      <TouchableOpacity style={styles.btnEnviar} onPress={() => navigation.push("Criar Notícia")}>
        <Text style={styles.text}>Criar nova notícia</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
  },
  textInput: {
    width: 300,
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 10,
    textAlign: 'center',
    marginTop: 5
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10
  },
  btnEnviar: {
    margin: 10,
    borderWidth: 1,
    borderColor: 'red',
    width: 250,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  iconFlat: {
    flexDirection: 'row',
    width: 350,
    height: 50,
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5
  },
  
  viewFlat: {
    // maxHeight: 410,
  }
});