import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';

const Home = ({ route, token }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [plants, setPlants] = useState([]);

  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [userId, setUserId] = useState(null);

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
      setUserId(data.id);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [token]);

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

  useEffect(() => {
    if (isFocused) {
      fetchPlants();
    }
  }, [isFocused, token]);

  const handleSearch = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/plants/search?query=${query}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePlantPress = (plant) => {
    navigation.navigate('Details', { plant, userId: userId, token: token });
  };

  const renderPlantCard = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => handlePlantPress(item)}>
        <View>
          <Image source={{ uri: item.image }} style={styles.image} />
          <Text>{item.title}</Text>
          <Text>{item.description}</Text>
          <Text>{item.price}€</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const plantsToDisplay = query ? results : plants;

  return (
    <ScrollView>
      <TextInput
        placeholder="Rechercher une plante..."
        value={query}
        onChangeText={setQuery} />
      <Button title="Rechercher" onPress={handleSearch} />

      <FlatList
        data={plantsToDisplay}
        renderItem={renderPlantCard}
        keyExtractor={(item) => item.id.toString()}
      />
    </ScrollView>);

};

const styles = StyleSheet.create({

  image: {
    width: 200,
    height: 200,
    marginBottom: 8,
  },

});

export default Home;
