import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();


const App = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Marks" component={MarksScreen} />
    </Stack.Navigator>
  );
};

const MarksScreen = ({route}) => {
  const { isLecturer } = route.params;
  const [modules, setModules] = useState([
    { name: 'SAD', mark: 80 },
    { name: 'MAD', mark: 70 },
    { name: 'Inroduction to IOT', mark: 60 },
  ]);

  const [editing, setEditing] = useState(false);
  const [editedModules, setEditedModules] = useState([...modules]);

  const handleEdit = () => {
    setEditing(true);
    setEditedModules([...modules]);
  };

  const handleSave = () => {
    setModules([...editedModules]);
    setEditing(false);
  };

  const handleMarkChange = (value, index) => {
    const updatedModules = [...editedModules];
    updatedModules[index].mark = parseInt(value) || 0;
    setEditedModules(updatedModules);
  };

  return (
   <View style={styles.container}>
      <View style={styles.header}>
      <Text style={styles.title}>Marks</Text>
      </View>
      <View style={styles.table}>
        <View style={styles.row}>
          <Text style={styles.cell1}>Module</Text>
          <Text style={styles.cell1}>Total Marks</Text>
        </View>
        {editedModules.map((module, index) => (
          <View key={index} style={styles.row}>
            <Text style={styles.cell}>{module.name}</Text>
            {editing ? (
              <TextInput
                style={styles.cellInput}
                value={module.mark.toString()}
                onChangeText={(value) => handleMarkChange(value, index)}
                keyboardType="numeric"
              />
            ) : (
              <Text style={styles.cell}>{module.mark}</Text>
            )}
          </View>
        ))}
      </View>
      {isLecturer && !editing && (
        <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
      )}
      {isLecturer && editing && (
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  /*header: {
    backgroundColor: 'rgba(5, 255, 40, 0.25)',
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 8,
    height: 80,
    paddingTop: 20,
  },*/
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  table: {
    padding: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  cell: {
    flex: 1,
    fontSize: 16,
    textAlign: 'center',
    
  },
  cell1: {
    flex: 1,
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    backgroundColor:'#1C6758',
    color: 'white',
    padding:20,
    
    
  },

  cellInput: {
    flex: 1,
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 4,
  },
  editButton: {
    marginVertical: 30,
    marginHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 4,
    backgroundColor: '#1C6758',
  },
  editButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
  },
  saveButton: {
    
    marginBottom: 16,
    marginHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 4,
    backgroundColor: '#1C6758',
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
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
    paddingTop: 40,
    paddingLeft : 155,
    marginTop : 0,

  },
});

export default MarksScreen