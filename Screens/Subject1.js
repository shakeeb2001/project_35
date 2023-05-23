import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Button, Text, Linking, Alert } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from '../firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App({ route }) {
  const [files, setFiles] = useState([]);
  const { isLecturer } = route.params;

  useEffect(() => {
    retrieveFiles();
  }, []);

  const retrieveFiles = async () => {
    try {
      const storedFiles = await AsyncStorage.getItem('subject1_files');
      if (storedFiles !== null) {
        setFiles(JSON.parse(storedFiles));
      }
    } catch (error) {
      console.log('Error retrieving files from AsyncStorage:', error);
    }
  };

  const saveFiles = async (updatedFiles) => {
    try {
      await AsyncStorage.setItem('subject1_files', JSON.stringify(updatedFiles));
      setFiles(updatedFiles);
      
    } catch (error) {
      console.log('Error saving files to AsyncStorage:', error);
    }
  };

  const handleDownload = async (file) => {
    const storageRef = ref(storage, file.name);
    const downloadURL = await getDownloadURL(storageRef);
    Linking.openURL(downloadURL);
  };

  const handleDelete = async (file) => {
    if (isLecturer) {
      Alert.alert(
        'Delete Confirmation',
        `Are you sure you want to delete ${file.name}?`,
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Delete',
            style: 'destructive',
            onPress: async () => {
              await deleteFile(file);
            },
          },
        ]
      );
    }
  };

  const deleteFile = async (file) => {
    try {
      const storageRef = ref(storage, file.name);
      await deleteObject(storageRef);
      const updatedFiles = files.filter((f) => f.name !== file.name);
      saveFiles(updatedFiles);
      console.log(`Deleted ${file.name} successfully!`);
    } catch (error) {
      console.log('Error deleting file:', error);
    }
  };

  const handleSubmit = async () => {
    if (files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const { uri, name } = files[i];
        const response = await fetch(uri);
        const blob = await response.blob();
        const storageRef = ref(storage, name);
        await uploadBytes(storageRef, blob);
        console.log(`Uploaded ${name} successfully!`);
      }
    }
  };

  const handleChange = async () => {
    const { type, uri, name } = await DocumentPicker.getDocumentAsync({
      type: 'application/pdf',
      multiple: true,
    });

    if (type === 'success') {
      const newFiles = [...files];
      newFiles.push({ uri, name });
      saveFiles(newFiles);
    }
  };

  return (
    <View style={styles.container}>
      <View>
        {files.length > 0 && (
          <View>
            {isLecturer && <Text style={styles.filesCount}>{`${files.length} file(s) selected:`}</Text>}
            {files.map((file, index) => (
              <View key={index} style={styles.fileContainer}>
                <View style={styles.fileInfoContainer}>
                  <Text style={styles.fileName}>{file.name}</Text>
                  <Button
                    title="Download"
                    onPress={() => handleDownload(file)}
                    style={styles.downloadButton}
                    color="#1C6758"
                  />
                </View>
                {isLecturer && (
                  <Button
                    title="Delete"
                    onPress={() => handleDelete(file)}
                    style={styles.deleteButton}
                    color="#1C6758"
                  />
                )}
              </View>
            ))}
          </View>
        )}
        {isLecturer && (
          <Button title="Choose Files" onPress={handleChange} color="#1C6758" style={styles.chooseButton} />
        )}
        {isLecturer && (
          <Button title="Upload" onPress={handleSubmit} color="#1C6758" />
        )}
      </View>
    </View>
  );
   
}  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  chooseButton: {
    marginBottom: 10, // Adjust this value to control the line spacing
  },
  filesCount: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  fileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 30, // Add margin bottom to create spacing between buttons
    paddingRight: 20,
  },
  fileInfoContainer: {
    flexDirection: 'row',
    alignItems: 'left',
  },
  fileName: {
    fontSize: 20,
    color: 'black',
    marginRight: 10, // Add margin right to create horizontal spacing
  },
  downloadButton: {
    fontSize: 12,
    color: '#1C6758',
    width: 80, // Set a fixed width for the download button
  },
  deleteButton: {
    fontSize: 12,
    color: '#1C6758',
    right :0,
    top:0,
    alignItems:'flex-end',
    position:'absolute',
  },
});
