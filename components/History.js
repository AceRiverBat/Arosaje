import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const Plants = ({ token }) => {
    const [user, setUser] = useState(null);
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
            } catch (error) {
                console.error(error);
            }
        };

        fetchUser();
    }, [token]);

    useEffect(() => {
        const fetchPlants = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/plants`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });
                const data = await response.json();
                setPlants(data);
            } catch (error) {
                console.error(error);
            }
        };

        if (user) {
            fetchPlants();
        }
    }, [user, token]);

    return (
        <>
            {plants ? (
                <>
                    {plants.map((plant) => {
                        if (plant.guardian_id === user.id) {
                            return (
                                <View key={plant.id} style={styles.adContainer}>
                                    <View style={styles.row}>
                                        <Image source={{ uri: plant.image }} style={styles.image} />
                                        <View style={styles.adTextContainer}>
                                            <Text style={styles.adTitle}>{plant.title}</Text>
                                            <Text style={styles.adDescription}>{plant.description}</Text>
                                        </View>
                                    </View>
                                </View>
                            );
                        } else {
                            return null;
                        }
                    })}
                </>
            ) : (
                <Text style={styles.title}>You don't have any plants yet.</Text>
            )}

        </>
    );
};

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
    },
    rowTitle: {
        flexDirection: "row",
        justifyContent: 'space-between'
    },
    price: {
        color: "#0B7143",
        fontWeight: '600',
        fontSize: 20,
        margin: 5
    },
    adContainer: {
        backgroundColor: '#fff',
        padding: 10,
        marginBottom: 10,
        marginTop: 20,
        borderWidth: 1,
        borderColor: '#ADADAD',
        borderRadius: 5,
        minWidth: "80%",
        margin: 10,
    },
    adDescription: {
        fontSize: 16,
        marginBottom: 5,
    },
    text: {
        fontSize: 18,
        marginBottom: 10,
    },
    image: {
        width: 70,
        height: 150,
        margin: 10,
        alignSelf: 'center'
    },
    adTitle: {
        fontSize: 25,
        marginBottom: 5,
    },
});

export default Plants;
