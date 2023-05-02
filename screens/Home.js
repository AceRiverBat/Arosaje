import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const Logo = require('../assets/image/Logo.png');

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
        <View style={styles.adContainer}>
          <Image source={{ uri: item.image }} style={styles.adImage} />
          <View style={styles.adTextContainer}>
            <Text style={styles.adTitle}>{item.title}</Text>
            <Text style={styles.adTitleDescription}>{item.description}</Text>
            <Text style={styles.adPrice}>{item.price}€</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const plantsToDisplay = query ? results : plants;

  return (
    <View style={styles.container}>
      <Image source={Logo} style={styles.image} />
      
        <View style={styles.search} >
          <TextInput
            style={styles.input}
            placeholder="Rechercher une plante..."
            value={query}
            onChangeText={setQuery} />
          <TouchableOpacity onPress={handleSearch}>
            <MaterialIcons name='search' size={30} color={'#0B7143'} />
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.scroll}>
        <FlatList
          data={plantsToDisplay}
          renderItem={renderPlantCard}
          keyExtractor={(item) => item.id.toString()}
        />
      </ScrollView>
    </View>
  );

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    backgroundColor: '#fff',
  },
  scroll:{
    flex: 2,
    backgroundColor: '#fff',
  },
  image: {
    width: 140,
    height: 140,
    alignSelf: 'center',
    marginBottom: 20
  },
  textKeepPlant: {
    color: '#0B7143',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 20,
    lineHeight: 40,
    textAlign: 'center',
    marginBottom: 20
  },
  search: {
    flexDirection: 'row',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
    fontSize: 18,
    minWidth: 70,
    marginBottom: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  input: {
    flex: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    fontSize: 16,
    maxWidth: 270,
    minWidth: 270,
    alignSelf: 'center'
  },
  textLastHisto: {
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: 20,
    lineHeight: 40,
    textAlign: 'left'
  },
  LastHisto: {
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  adContainer: {
    backgroundColor: '#fff',
    padding: 10,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: '#ADADAD',
    borderRadius: 5,
    minWidth: 225,
    margin: 10,
    flex: 2,
  },
  adImage: {
    width: 225,
    height: 125,
    margin: 5,
    alignSelf: 'center'
  },
  adTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  adTitleDescription: {
    fontSize: 16,
    marginBottom: 5,
  },
  adDescription: {
    fontSize: 16,
    marginBottom: 5,
  },
  adPrice: {
    fontSize: 20,
    marginBottom: 5,
    alignSelf: 'flex-end',
    color: "#0B7143",
  },
  btnMore: {
    borderRadius: 5,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0B7143"
  },
  textMore: {
    color: '#fff'
  }
});

export default Home;
