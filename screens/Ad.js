import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import axios from 'axios';
import { ScrollView } from 'react-native-web';

const Logo = require('../assets/image/Logo.png');

const Ad = ({ token }) => {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');

  const pickImage = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permission to access location was denied');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const formData = new FormData();
  formData.append('image', {
    uri: image,
    name: 'image.jpg',
    type: 'image/jpeg'
  });
  formData.append('title', title);
  formData.append('description', description);
  formData.append('price', price);

  const handleSubmit = async () => {
    try {
      // Create a new FormData object with the image, title, description, and price
      const formData = new FormData();
      formData.append('image', {
        uri: image,
        name: 'image.jpg',
        type: 'image/jpeg'
      });
      formData.append('title', title);
      formData.append('description', description);
      formData.append('price', price);

      // Upload the form data to the server
      const response = await fetch('http://127.0.0.1:8000/api/plants/store', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      });
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to create plant!');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <Image source={Logo} style={styles.logo} />
        <Text style={styles.textCreate}>Créer une nouvelle annonce :</Text>

        {image && <Image source={{ uri: image }} style={styles.image} />}

        <TouchableOpacity style={styles.buttonImage} onPress={pickImage}>
          <Text style={styles.buttonText}>Sélectionner une image de votre galerie</Text>
        </TouchableOpacity>

        <Text style={styles.text} >Titre de l'annonce :</Text>
        <TextInput value={title} style={styles.input} onChangeText={setTitle} />

        <Text style={styles.text} >Description :</Text>
        <TextInput value={description} style={styles.inputDesc} onChangeText={setDescription} multiline />

        <Text style={styles.text} >Prix pour la garde :</Text>
        <TextInput value={price} style={styles.input} keyboardType="numeric" onChangeText={setPrice} />

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Ajouter</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default Ad;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  textCreate: {
    fontWeight: "bold",
    fontSize: 20,
    alignSelf: 'center',
    marginBottom:15,
  },
  logo: {
    width: 100,
    height: 100,
    margin: 20,
    alignSelf: 'center'
  },
  input: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    maxWidth: 370,
    fontSize: 15,
    minHeight: 30,
    alignSelf: 'center',
    padding: 10,
  },
  inputDesc: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    fontSize: 15,
    maxWidth: 370,
    minHeight: 100,
    alignSelf: 'center',
    padding: 10,
  },
  text: {
    alignSelf: 'center',
    fontSize: 15,
    marginBottom: 5,
    fontWeight: 400,
  },
  image: {
    height: 200,
    width: 200,
    marginTop: 10,
    marginBottom: 10,
    alignSelf: 'center'
  },
  buttonImage: {
    marginBottom: 30,
    borderRadius: 10,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "gray",
    margin: 10
  },
  button: {
    margin: 10,
    marginBottom: 20,
    borderRadius: 10,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0B7143"
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 15,
  },
});