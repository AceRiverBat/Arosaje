import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import axios from 'axios';

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
        <View>
            <Text>Title:</Text>
            <TextInput value={title} onChangeText={setTitle} />

            <Text>Description:</Text>
            <TextInput value={description} onChangeText={setDescription} />

            <Text>Price:</Text>
            <TextInput value={price} onChangeText={setPrice} />

            {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}

            <Button title="Pick an image" onPress={pickImage} />

            <Button title="Create" onPress={handleSubmit} />
        </View>
    );
};

export default Ad;
