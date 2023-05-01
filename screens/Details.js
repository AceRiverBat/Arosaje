import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ScrollView } from 'react-native-web';

const Details = ({ route }) => {
  const { plant } = route.params;
  const navigation = useNavigation();
  const [userRole, setUserRole] = useState(null);
  const { userId } = route.params;
  const { token } = route.params;
  const handleBackPress = () => {
    navigation.goBack();
  };

  useEffect(() => {
    const fetchUserRole = async () => {
      const response = await fetch(`http://127.0.0.1:8000/api/users/${userId}/role`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setUserRole(data.role);
    };

    fetchUserRole();
  }, []);

  const renderCommentButton = () => {
    if (userRole === "botaniste") {
      return (
        <TouchableOpacity style={styles.btn} onPress={() => console.log("Add comment")}>
          <Text style={styles.btnText}>Add Comment</Text>
        </TouchableOpacity>
      );
    } else {
      return null;
    }
  };

  return (
    <View>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={handleBackPress}>
          <Ionicons style={styles.icon} name='arrow-back-circle' size={50} color="#0B7143" />
        </TouchableOpacity>
      </View>

      <Image source={{ uri: plant.image }} style={styles.image} />

      <View style={styles.container}>
        <Text style={styles.title} >{plant.title}</Text>
        <Text style={styles.price}>{plant.price}</Text>
      </View>

      <ScrollView>
        <Text style={styles.body}>{plant.description}</Text>
      </ScrollView>

      <View style={styles.header}>
        <View style={styles.btnOption}>
          <TouchableOpacity style={styles.btnGard} onPress={() => console.log("Garder")}>
            <Text style={styles.btnText}>Garder</Text>
          </TouchableOpacity>
          {renderCommentButton()}
        </View>
      </View>
    </View>
  );
};

export default Details;

const styles = StyleSheet.create({
  iconContainer: {
    backgroundColor: '#fff',
    padding: 10,
  },
  icon: {
    alignSelf: 'flex-start',
  },
  header: {
    borderTopWidth: 2,
    borderTopColor: '#ddd',
    marginTop: 10,
    paddingTop: 10,
  },
  image: {
    alignSelf: 'center',
    width: '100%',
    height: 350,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    margin: 5,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  price: {
    color: "#0B7143",
    fontWeight: '600',
    fontSize: 20,
    margin: 5
  },
  body: {
    margin: 5,
    fontSize: 20,
  },
  btnOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 10
  },
  btnGard: {
    width: "40%",
    borderRadius: 5,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0B7143",
  },
  btn: {
    width: "40%",
    borderRadius: 5,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0B7143",
  },
  btnText: {
    color: "#fff",
  },
});