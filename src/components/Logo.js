import React from 'react';
import { StyleSheet,  View, Image  } from 'react-native';

export default function Logo() {

  return (
        <Image 
        style={styles.logo}
        source={require('../../assets/images/logo-code7.svg')}/>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 150,
    height: 50,
    resizeMode: 'stretch',
    marginBottom: 5,
    marginTop: 5
  }
});