import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Details = ({ route }) => {
  const { plant } = route.params;
  const navigation = useNavigation();
  const [userRole, setUserRole] = useState(null);
  const { userId } = route.params;

  const handleBackPress = () => {
    navigation.goBack();
  };

  useEffect(() => {
    const fetchUserRole = async () => {
      const response = await fetch(`http://127.0.0.1:8000/api/users/${userId}/role`);
      const data = await response.json();
      setUserRole(data.role);
    };

    fetchUserRole();
  }, []);

  const renderCommentButton = () => {
    if (userRole === "botaniste") {
      return (
        <TouchableOpacity onPress={() => console.log("Add comment")}>
          <Text>Add Comment</Text>
        </TouchableOpacity>
      );
    } else {
      return null;
    }
  };

  return (
    <View>
      <TouchableOpacity onPress={handleBackPress}>
        <Text>Retour</Text>
      </TouchableOpacity>

      <Image source={{ uri: plant.image }} style={{ width: 200, height: 200 }} />
      <Text>{plant.name}</Text>
      <Text>{plant.description}</Text>
      <Text>{plant.price}</Text>

      {renderCommentButton()}
    </View>
  );
};

export default Details;
