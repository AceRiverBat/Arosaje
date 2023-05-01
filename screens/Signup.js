import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const Logo = require('../assets/image/Logo.png');

const Signup = ({ navigation }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [address, setAddress] = useState('');
    const [postCode, setPostCode] = useState('');

    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [lastNameError, setLastNameError] = useState('');
    const [firstNameError, setFirstNameError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

    const validate = () => {
        let emailError = '';
        let passwordError = '';
        let lastNameError = '';
        let firstNameError = '';
        let confirmPasswordError = '';

        if (!lastName) {
            lastNameError = 'Veuillez entrer votre nom de famille';
        }
        if (!firstName) {
            firstNameError = 'Veuillez entrer votre prénom';
        }
        if (!email) {
            emailError = 'Veuillez entrer votre email';
        }

        if (!password) {
            passwordError = 'Veuillez entrer votre mot de passe';
        }

        if (!confirmPassword) {
            confirmPasswordError = 'Veuillez saisir de nouveau votre mot de passe';
        }

        if (confirmPassword != password) {
            confirmPasswordError = "Le mot de passe saisi n'est pas identique au mot de passe saisi précedemment";
        }

        if (emailError || passwordError || firstNameError || lastNameError || confirmPasswordError) {
            setEmailError(emailError);
            setPasswordError(passwordError);
            setFirstNameError(firstNameError);
            setLastNameError(lastNameError);
            setConfirmPasswordError(confirmPasswordError);
            return false;
        }

        return true;
    };

    const handleCreateUser = async () => {
        const isValid = validate();
        if (isValid) {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        firstName,
                        lastName,
                        email,
                        password,
                        address,
                        postCode,
                    }),
                });
                const data = await response.json();
                console.log(data);
                navigation.navigate('Login');
            } catch (error) {
                console.error(error);
            }
            navigation.navigate('Login');
        }
    };

    const handleBack = () => {
        navigation.navigate('Login');
    };

    const validateEmail = (text) => {
        // regex pour valider un email
        const emailRegex = /^[^\s@]+@[^\s@]+.[^\s@]+$/;
        return emailRegex.test(text);
    };

    const validatePostCode = (text) => {
        // regex pour valider un code postal
        const postCodeRegex = /^\d{5}$/;
        return postCodeRegex.test(text);
    };

    return (
        <ScrollView style={styles.containerScroll}>
            <View style={styles.iconContainer}>
                <TouchableOpacity onPress={handleBack}>
                    <Ionicons style={styles.icon} name='arrow-back-circle' size={50} color="#0B7143" />
                </TouchableOpacity>
            </View>
            <View style={styles.container}>
                <Image source={Logo} style={styles.image} />
                <Text style={styles.title}>Créer un compte</Text>

                {firstNameError ? <Text style={styles.errorText}>{firstNameError}</Text> : null}
                <View style={styles.inputView}>
                    <TextInput
                        placeholder="Prénom"
                        value={firstName}
                        onChangeText={(text) => setFirstName(text)}
                        style={styles.input} />
                </View>

                {lastNameError ? <Text style={styles.errorText}>{lastNameError}</Text> : null}
                <View style={styles.inputView}>
                    <TextInput
                        placeholder="Nom"
                        value={lastName}
                        onChangeText={(text) => setLastName(text)}
                        style={styles.input} />
                </View>

                <TextInput
                    placeholder="Adresse"
                    value={address}
                    onChangeText={(text) => setAddress(text)}
                    style={styles.input} />
                <TextInput
                    placeholder="Code Postal"
                    value={postCode}
                    onChangeText={(text) => setPostCode(text)}
                    style={styles.input}
                    keyboardType="numeric"
                    onBlur={() => {
                        if (!validatePostCode(postCode)) {
                            alert('Veuillez entrer un code postal valide (5 chiffres).');
                        }
                    }} />

                {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
                <View style={styles.inputView}>
                    <TextInput
                        placeholder="Email"
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                        style={styles.input}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                        onBlur={() => {
                            if (!validateEmail(email)) {
                                alert('Veuillez entrer une adresse e-mail valide.');
                            }
                        }} />
                </View>

                {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
                <View style={styles.inputView}>
                    <TextInput
                        placeholder="Mot de passe"
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        secureTextEntry
                        style={styles.input} />
                </View>

                {confirmPasswordError ? <Text style={styles.errorText}>{confirmPasswordError}</Text> : null}
                <View style={styles.inputView}>
                    <TextInput
                        style={styles.input}
                        placeholder="Confirmer mot de passe"
                        onChangeText={setConfirmPassword}
                        value={confirmPassword}
                        secureTextEntry
                    />
                </View>
                <TouchableOpacity style={styles.button} onPress={handleCreateUser}>
                    <Text style={styles.buttonText}>S'inscrire</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    containerScroll: {
        backgroundColor: '#fff',
    },
    iconContainer: {
        backgroundColor: '#fff',
        padding: 10,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    icon: {
        alignSelf: 'flex-start',
    },
    image: {
        width: 100,
        height: 100,
        marginTop: 30,
        marginBottom: 15,
    },
    TextInput: {
        width: "100%",
        padding: 10,
        color: "gray",
    },
    inputView: {
        width: "100%",
        justifyContent: "center",
        flexDirection: "row",
    },
    errorText: {
        color: 'red',
        fontSize: 12,
        marginBottom: 5,
        marginTop: 5,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 30,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginVertical: 10,
        width: '85%',
        borderRadius: 5,
    },
    button: {
        width: "85%",
        marginTop: 10,
        marginBottom: 30,
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
        fontSize: 18,
    },
});

export default Signup;