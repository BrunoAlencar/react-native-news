import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, StatusBar, useIs  } from 'react-native';
import { FAB } from 'react-native-paper';
import firebase from '../Fire';
import { NewsContext } from './contexts/NewsContext';

export default function Details({ navigation }) {
  const {news} = useContext(NewsContext)

  

  function editFire() {
    navigation.push("Code7 Editar");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{news.title}</Text>
      <Text style={styles.text}>{news.text}</Text>
      <Text style={styles.text}>{news.author}</Text>
      <FAB
        style={styles.fab}
        small
        icon="pencil"
        onPress={() => editFire()}
      />
   
      <StatusBar backgroundColor="blue" barStyle="dark-content" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
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
    maxHeight: 410,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});