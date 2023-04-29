import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Image, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const Ad = ({ token }) => {
    const [user, setUser] = useState(null);

    const [image, setImage] = useState(null);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/me', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data = await response.json();
                setUser(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchUser();
    }, [token]);

    const handleChoosePhoto = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            alert('Permission pour accèder à la galerie requise');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            quality: 0.5,
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            aspect: [4, 3],
            base64: true,
        });

        if (result.cancelled) {
            return;
        }

        if (result.fileSize && result.fileSize > 2048 * 1024) {
            alert('La taille de l\'image ne doit pas dépasser 2 Mo.');
            return;
        }

        setImage(result.uri);
    };

    const handleAddPlant = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/users/${user.id}/plants`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    title: name,
                    image: image,
                    description: description,
                    price: price,
                }),
                
            });
            if (response.status !== 200) {
                throw new Error('Failed to add plant');
            }
            const data = await response.text();
            const parsedData = JSON.parse(data);
            console.log('Ad added:', parsedData);
        } catch (error) {
            console.error(error);
        }
    };       

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                {image && (
                    <Image source={{ uri: image }} style={styles.image} />
                )}
                <Button title="Choisir une photo" onPress={handleChoosePhoto} />
            </View>
            <TextInput
                style={styles.input}
                placeholder="Titre"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder="Description"
                value={description}
                onChangeText={setDescription}
            />
            <TextInput
                style={styles.input}
                placeholder="Prix"
                value={price}
                onChangeText={setPrice}
            />
            <Button title="Ajouter l'annonce" onPress={handleAddPlant} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    imageContainer: {
        alignItems: 'center',
        marginBottom: 16,
    },
    image: {
        width: 200,
        height: 200,
        marginBottom: 8,
    },
    input: {
        marginBottom: 16,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
    },
});

export default Ad;
