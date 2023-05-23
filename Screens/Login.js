import { useNavigation } from '@react-navigation/core';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { auth } from '../firebase';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLecturer, setIsLecturer] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    if (email === 'shekeeb@gmail.com' && password === '234567') {
      setIsLecturer(true);
    } else {
      setIsLecturer(false);
    }
  }, [password]);

  const handleLogin = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        if (user) {
          navigation.navigate('Home', {
            isLecturer: isLecturer,
          });
        }
        console.log('Logged in with:', user.email);
      })
      .catch(error => alert('Incorrect password or email'));
  };

  const logoImage = require('../assets/Logo.png');

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={logoImage} style={styles.logoImage} />
        
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="E-mail"
          placeholderTextColor="#93CDB1"
          value={email}
          onChangeText={text => setEmail(text)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Password"
          placeholderTextColor="#93CDB1"
          value={password}
          onChangeText={text => setPassword(text)}
          secureTextEntry
        />
      </View>
      <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
        <Text style={styles.loginText}>LOGIN</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 2,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  logoContainer: {
    marginBottom: 30,
    textAlign: 'left',
  },
  logoImage: {
    width: 300,
    height: 300,
    // Adjust the width and height according to your image dimensions
  },
  logo: {
    fontWeight: 'bold',
    fontSize: 30,
    color: '#406325',
    marginBottom: 10,
    textAlign: 'left',
    marginLeft:35,    
    
  },
  inputView: {
    width: '80%',
    backgroundColor: '#EDFFEF',
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.10,
    shadowRadius: 5,
    elevation: 10,
  },
  inputText: {
    height: 50,
    color: 'black',
  },
  loginBtn: {
    width: '80%',
    backgroundColor: '#1C6758',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 10,
    shadowColor: '#023e8a',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.10,
    shadowRadius: 5,
    elevation: 10,
  },
  loginText: {
    color: 'white',
  },
});

export default LoginScreen;