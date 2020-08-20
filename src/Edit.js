import React, { useState, useContext } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import firebase from '../Fire';
import { NewsContext } from './contexts/NewsContext';


export default function Update({ navigation }) {
  const {news, setNews} = useContext(NewsContext)
  const [title, setTitle] = useState(news.title);
  const [text, setText] = useState(news.text);
  const [author, setAuthor] = useState(news.author);
   
  function upDateFire() {
    try {
      let draftNews = {
        title,
        text,
        author
      }
      firebase.database().ref('/crud/'+ news.key).update(draftNews)
      setNews({key: news.key, ...draftNews})

    } catch (error) {
      alert(error);
    }
    finally {
      setTitle('');
      setText('');
      setAuthor('');
      navigation.pop()
    }
  }

  function delFire() {
    Alert.alert(
      "Atenção!",
      "Deseja realmente excluir a notícia?",
      [
        {
          text: "Cancelar",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { 
          text: "Excluir", onPress: () => {
            firebase.database().ref('/crud/' + news.key).remove()
            navigation.popToTop()
          }
        }
      ],
    );
    
  }

  return (
      <View style={styles.container}>
        <View style={styles.viewCenter}>

          <TextInput style={styles.textInput}
            onChangeText={title => setTitle(title)} value={title}
            placeholder='Título da notícia'
          />

          <TextInput style={styles.textInput}
            multiline={true}
            numberOfLines={4}
            onChangeText={text => setText(text)} value={text}
            placeholder='Texto da notícia'
          />

          <TextInput style={styles.textInput}
            onChangeText={author => setAuthor(author)} value={author}
            placeholder='Autor'
          />
          <TouchableOpacity style={styles.btnEnviar} onPress={() => { upDateFire() }}>
              <Text style={styles.text}>Atualizar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnEnviar} onPress={() => { delFire() }}>
              <Text style={styles.text}>Excluir</Text>
          </TouchableOpacity>

        </View>
      </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
    },
    viewCenter: {
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: '#fff',
    },
    btnEnviar: {
        borderWidth: 1,
        borderColor: 'red',
        width: 100,
        height: 20,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 20
    },
    textInput: {
      width: 300,
      minHeight: 50,
      backgroundColor: '#fff',
      borderRadius: 10,
      textAlign: 'center',
      padding: 5,
      marginTop: 5
  },
});