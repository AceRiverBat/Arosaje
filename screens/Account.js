import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Image } from 'react-native';

const Account = ({ token }) => {
    const [user, setUser] = useState(null);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [postCode, setPostCode] = useState('');
    const [plants, setPlants] = useState([]);

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
                setFirstName(data.firstName);
                setLastName(data.lastName);
                setEmail(data.email);
                setAddress(data.address);
                setPostCode(data.postCode);
            } catch (error) {
                console.error(error);
            }
        };

        fetchUser();
    }, [token]);

    useEffect(() => {
        const fetchPlants = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/user/${user.id}/plants`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data = await response.json();
                setPlants(data.plants);
            } catch (error) {
                console.error(error);
            }
        };

        if (user) {
            fetchPlants();
        }
    }, [user, token]);

    const handleUpdate = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/user/${user.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    email,
                    address,
                    postCode,
                }),
            });
            const data = await response.json();
            setUser(data.user);
        } catch (error) {
            console.error(error);
        }
    };

    const handleDeletePlant = async (plantId) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/plant/${plantId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();
            setPlants(plants.filter((plant) => plant.id !== plantId));
            console.log(data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <View style={styles.container}>
            {user ? (
                <>
                    <Text style={styles.title}>Account Information</Text>
                    <Text style={styles.text}>First Name:</Text>
                    <TextInput
                        style={styles.input}
                        value={firstName}
                        onChangeText={setFirstName}
                    />
                    <Text style={styles.text}>Last Name:</Text>
                    <TextInput
                        style={styles.input}
                        value={lastName}
                        onChangeText={setLastName}
                    />
                    <Text style={styles.text}>Email:</Text>
                    <TextInput
                        style={styles.input}
                        value={email}
                        onChangeText={setEmail}
                    />
                    <Text style={styles.text}>Address:</Text>
                    <TextInput
                        style={styles.input}
                        value={address}
                        onChangeText={setAddress}
                    />
                    <Text style={styles.text}>Post Code:</Text>
                    <TextInput
                        style={styles.input}
                        value={postCode}
                        onChangeText={setPostCode}
                    />
                    <Button title="Update" onPress={handleUpdate} />
                </>
            ) : (
                <Text>Loading...</Text>
            )}

            <Text style={styles.title}>Your Plants</Text>
            {plants ? (
                <>
                    <Text style={styles.title}>Your Plants</Text>
                    {plants.map((plant) => (
                        <View key={plant.id} style={styles.plant}>
                            <Image source={{ uri: plant.image }} style={styles.image} />
                            <Text>{plant.name}</Text>
                            <Text>{plant.description}</Text>
                            <Text>{plant.price}</Text>
                            <Button title="Delete" onPress={() => handleDeletePlant(plant.id)} />
                        </View>
                    ))}
                </>
            ) : (
                <Text style={styles.title}>You don't have any plants yet.</Text>
            )}

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    text: {
        fontSize: 18,
        marginBottom: 10,
    },
    image: {
        width: 200,
        height: 200,
        marginBottom: 8,
    },

});

export default Account;
