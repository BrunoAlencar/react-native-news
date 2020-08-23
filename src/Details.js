import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, StatusBar, useIs  } from 'react-native';
import { FAB } from 'react-native-paper';
import { NewsContext } from './contexts/NewsContext';

export default function Details({ navigation }) {
  const {news} = useContext(NewsContext)

  function editFire() {
    navigation.push("Code7 Editar");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{news.text}</Text>
      <Text style={styles.text}>{news.author}</Text>
      <FAB
        style={styles.fab}
        small
        icon="pencil"
        onPress={() => editFire()}
      />
   
      <StatusBar backgroundColor="#151A4E" barStyle="dark-content" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#151A4E',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 16,
    margin: 12,
    textAlign: "justify"
  },
  textInput: {
    width: 300,
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 10,
    textAlign: 'center',
    marginTop: 5
  },
  
  viewFlat: {
    maxHeight: 410,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#7959eb'
  },
});