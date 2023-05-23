import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import { auth } from '../firebase';

const SignOut = () => {
  const navigation = useNavigation();

  const handleSignOut = () =>
    auth
      .signOut()
      .then(() => {
        navigation.replace('Login');
      })
      .catch((error) => alert(error.message));

  const logoImage = require('../assets/Logo.png');

  return (
    <View style={styles.container}>
      <Image source={logoImage} style={styles.logoImage} />
      <TouchableOpacity style={styles.button} onPress={handleSignOut}>
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: '80%',
    backgroundColor: '#1C6758',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '10%',
    marginBottom: 100,
    shadowColor: '#023e8a',
  },
  buttonText: {
    color: '#FFF',
    textAlign: 'center',
    fontSize: 16,
  },
  logoImage: {
    width: 200,
    height: 200,
    // Adjust the width and height according to your image dimensions
  },
});

export default SignOut;