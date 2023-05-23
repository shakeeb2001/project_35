import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import SAD from './Subject1';

const Stack = createStackNavigator();

function App() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SAD" component={SAD} />
    </Stack.Navigator>
  );
}

export default function Materials({ navigation, route }) {
  const { isLecturer } = route.params;

  const modules = [
    {
      id: 1,
      title: 'System Analysis and Design',
      //description: 'Study the principles of Software Analysis and Development',
      icon: 'calculator-outline',
    },
    {
      id: 2,
      title: 'Mobile Application Development',
      //description: 'Study the basics of Mobile Application Development',
      icon: 'book-outline',
    },

    {
      id: 3,
      title: 'Introduction to IOT',
      //description: 'Study the basics of Mobile Application Development',
      icon: 'book-outline',
    },

    
  ];

  const handleModulePress = (module) => {
    navigation.navigate('SAD', { module ,isLecturer});
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Materials</Text>
      </View>
      <View style={styles.modules}>
        {modules.map((module) => (
          <ModuleCard
            key={module.id}
            module={module}
            onPress={() => handleModulePress(module)}
            isLecturer = {isLecturer}
          />
        ))}
      </View>
    </View>
  );
}

function ModuleCard({ module, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.card}>
        <Text style={styles.title}>{module.title}</Text>
        <Text style={styles.description}>{module.description}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  modules: {
    flex: 1,
    padding: 16,
  },
  card: {
    backgroundColor: '#1C6758',
    borderRadius: 10,
    padding: 35,
    marginBottom: 10,
    elevation: 2,
    textAlign:'center',
    justifyContent:'center',
  },
  title: {
    fontSize: 18,
    //fontWeight: 'bold',
    marginBottom: 5,
    color:'white',
  },
  description: {
    fontSize: 14,
    color: 'white',
  },

  title: {
    fontSize: 22,
    fontWeight: '',
    color: 'white',
    
  },
  header: {
    backgroundColor: 'black',
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 10,
    height: 80,
    paddingLeft : 140,
    paddingTop: 40,
    marginTop : 0,

  },
});
