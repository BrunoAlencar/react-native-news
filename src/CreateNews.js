import React, { useState, useEffect } from 'react';
import { 
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Alert
} from 'react-native';
import firebase from '../Fire';

export default function Show({ navigation }) {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [author, setAuthor] = useState('');


  function createFire() {
    try {
      firebase.database().ref('/crud').push({
        title: title,
        text: text,
        author: author
      })

    } catch (error) {
      Alert.alert(
        "Erro",
        "Ops, algo deu errado...Se o problema persistir por favor entra em contato com o suporte, isso pode nos ajudar!",
      );
    }
    finally {
      setTitle('');
      setText('');
      setAuthor('');
     

      Alert.alert(
        "Sucesso!",
        "Notícia criada com sucesso!",
      );
      navigation.pop()
    }
  }

  return (
    <SafeAreaView style={styles.container}>

      <TextInput style={styles.textInput}
        onChangeText={title => setTitle(title)} value={title}
        placeholder='Título da notícia'
      />

      <TextInput style={styles.textInput}
        multiline={true}
        numberOfLines={6}
        onChangeText={text => setText(text)} value={text}
        placeholder='Texto da notícia'
      />

      <TextInput style={styles.textInput}
        onChangeText={author => setAuthor(author)} value={author}
        placeholder='Autor'
      />

      <TouchableOpacity style={styles.btnEnviar} onPress={createFire}>
        <Text style={styles.text}>Salvar</Text>
      </TouchableOpacity>

    </SafeAreaView>
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
      margin: 5,
      textAlign: "center",
      fontSize: 18,
    },
    textInput: {
        width: 300,
        minHeight: 50,
        backgroundColor: '#fff',
        borderRadius: 4,
        textAlign: 'center',
        padding: 5,
        marginTop: 10,
        fontSize: 16
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
});