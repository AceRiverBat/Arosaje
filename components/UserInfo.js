import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, TouchableOpacity } from 'react-native';

const UserInfo = ({ token }) => {
    const [user, setUser] = useState(null);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [postCode, setPostCode] = useState('');

  const [isModified, setIsModified] = useState(false);

  const handleInputChange = () => {
    setIsModified(true);
  };

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
            setIsModified(false);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <View style={styles.container}>
            {user ? (
                <>
                    <View style={styles.fieldContainer}>
                        <View style={styles.field}>
                            <Text style={styles.label}>Prénom :</Text>
                            <TextInput
                                style={styles.inputName}
                                value={firstName}
                                onChangeText={text => {
                                    setFirstName(text);
                                    handleInputChange();
                                  }} />
                        </View>
                        <View style={styles.field}>
                            <Text style={styles.label}>Nom :</Text>
                            <TextInput
                                style={styles.inputName}
                                value={lastName}
                                onChangeText={text => {
                                    setLastName(text);
                                    handleInputChange();
                                  }} />
                        </View>
                    </View>

                    <View style={styles.fieldContainer}>
                        <View style={styles.field}>
                            <Text style={styles.label}>Email:</Text>
                            <TextInput
                                style={styles.inputEmail}
                                value={email}
                                onChangeText={text => {
                                    setEmail(text);
                                    handleInputChange();
                                  }} />
                        </View>
                    </View>

                    <View style={styles.fieldContainer}>
                        <View style={styles.field}>
                            <Text style={styles.label}>Adresse:</Text>
                            <TextInput
                                style={styles.inputAdress}
                                value={address}
                                onChangeText={text => {
                                    setAddress(text);
                                    handleInputChange();
                                  }} />
                        </View>
                    </View>

                    <View style={styles.fieldContainer}>
                        <View style={styles.field}>
                            <Text style={styles.label}>Post Code:</Text>
                            <TextInput
                                style={styles.inputCP}
                                value={postCode}
                                onChangeText={text => {
                                    setPostCode(text);
                                    handleInputChange();
                                  }}/>
                        </View>
                    </View>

                    {isModified &&
                        <TouchableOpacity style={styles.saveBtn}>
                            <Pressable onPress={handleUpdate} >
                                <Text style={styles.buttonText}>Sauvegarder</Text>
                            </Pressable>
                        </TouchableOpacity>
                    }
                </>
            ) : (
                <Text>Loading...</Text>
            )}

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#ffffff',
        paddingBottom: '10%'
      },
      title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
      },
      fieldContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 10,
      },
      field: {
        marginBottom: 10,
      },
      label: {
        flex: 1,
        fontSize: 15,
        marginRight: 16,
      },
      saveBtn: {
        width: "100%",
        borderRadius: 10,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#0B7143",
        marginTop: 20,
      },
      buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 18,
      },
      inputName: {
        flex: 2,
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 8,
        paddingVertical: 4,
        minWidth: 165,
        maxWidth: 165,
      },
      inputEmail: {
        flex: 2,
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 8,
        paddingVertical: 4,
        minWidth: 340,
        maxWidth: 340,
      },
      inputAdress: {
        flex: 2,
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 8,
        paddingVertical: 4,
        minWidth: 340,
        maxWidth: 340,
      },
      inputCP: {
        flex: 2,
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 8,
        paddingVertical: 4,
        minWidth: 100,
        maxWidth: 100,
      },
      inputVille: {
        flex: 2,
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 8,
        paddingVertical: 4,
        minWidth: 200,
        maxWidth: 200,
      },
});

export default UserInfo;
