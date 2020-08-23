import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, StatusBar } from 'react-native';
import { Searchbar } from 'react-native-paper';
import firebase from '../Fire';

import { NewsContext } from './contexts/NewsContext'
import Logo from './components/Logo';

export default function List({ navigation }) {
  const [listFire, setListFire] = useState([]);
  const [currentList, setCurrentList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const { setNews } = useContext(NewsContext)
  const [timeOutRegister, setTimeOutRegister] = useState(null)
  

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
    setSearchQuery(search)

    if (timeOutRegister) clearTimeout(timeOutRegister)
    
    setTimeOutRegister(setTimeout(()=> {
      setCurrentList(listFire.filter(
        ({title}) =>  title.toLowerCase().includes(search)
      ))
    }, 500))
  }



  return (
    <View style={styles.container}>
      <Logo/>
      <Searchbar
        placeholder="Buscar notícia"
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={styles.search}
      />
      <FlatList style={styles.viewFlat} data={currentList}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) =>

          <View style={styles.iconFlat}>
             <TouchableOpacity
                style={styles.button}
                onPress={() => handleSelect(item) }
              >
                  <Text style={{fontSize: 16}}>{item.title}</Text>
              </TouchableOpacity>
          </View>

        } />

      <TouchableOpacity style={styles.btnEnviar} onPress={() => navigation.push("Criar Notícia")}>
        <Text style={styles.text}>Criar nova notícia</Text>
      </TouchableOpacity>
      <StatusBar backgroundColor="#151A4E" barStyle="dark-content" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#151A4E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  search: {
    marginTop: 10,
    marginBottom: 15,
  },
  text: {
    color: '#fff',
    margin: 5,
    textAlign: "center",
    fontSize: 18,
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
    backgroundColor: "#fff",
    padding: 10,
    width: 350,
  },
  btnEnviar: {
    margin: 10,
    borderWidth: 1,
    width: 250,
    height: 50,
    alignItems: 'center',
    borderRadius: 30,
    justifyContent: 'center',
    backgroundColor: '#7959eb',
  },
  
  iconFlat: {
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop:5,
    marginBottom:0,
    marginHorizontal: 5, 
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    
    elevation: 12,
  },
  
  viewFlat: {
    maxHeight: 610,
  }
});