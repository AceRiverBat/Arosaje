import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import ModalForgotPwd from "../components/ModalForgotPwd";

const Logo = require('../assets/image/Logo.png');

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleLogin = async () => {
    const isValid = validate();
    if (isValid) {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password,
          }),
        });
        const data = await response.json();

        if (response.ok) {
          navigation.navigate('Main', { token: data.access_token });
        } else {
          alert('Email ou Mot de passe invalide');
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handleSignup = () => {
    navigation.navigate('Signup');
  };

  const validate = () => {
    let emailError = '';
    let passwordError = '';

    if (!email) {
      emailError = 'Veuillez entrer votre email';
    }

    if (!password) {
      passwordError = 'Veuillez entrer votre mot de passe';
    }

    if (emailError || passwordError) {
      setEmailError(emailError);
      setPasswordError(passwordError);
      return false;
    }

    return true;
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <View style={styles.container}>
      <Image source={Logo} style={styles.image} />

      {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
      <View style={styles.inputView}>
        <MaterialIcons style={styles.icon} name={"mail-outline"} size={30} color="gray" />
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
        />
      </View>

      {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
      <View style={styles.inputView}>
        <MaterialIcons style={styles.icon} name={"vpn-key"} size={20} color="gray" />
        <TextInput
          placeholder="Mot de passe"
          value={password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
          style={styles.input}
        />
      </View>

      <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
        <Text style={styles.loginText}>Connexion</Text>
      </TouchableOpacity>
      <View style={styles.forgot_button_container}>
        <TouchableOpacity onPress={handleShowModal} >
          <Text style={styles.forgot_button} onClick={handleShowModal}>Mot de passe oublié ?</Text>
          {showModal && <ModalForgotPwd onClose={handleCloseModal} />}
        </TouchableOpacity>
      </View>

      <View style={styles.logoContainer}>
        <Ionicons style={styles.iconS} name='logo-instagram' size={40} color="black" />
        <MaterialIcons style={styles.iconS} name={"facebook"} size={40} color="black" />
        <Ionicons style={styles.iconS} name='logo-twitter' size={40} color="black" />
        <Ionicons style={styles.iconS} name='logo-google' size={40} color="black" />
      </View>

      <View style={styles.socialContainer}>
        <Text style={styles.noAccount}>Pas de compte ? </Text>
        <TouchableOpacity onPress={handleSignup}>
          <Text style={styles.create}>S'inscrire</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.PolCon}>
        <View style={styles.policyContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('Politique')}>
            <Text style={styles.policyText}>Politique de confidentialité</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.policyContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('TermsAndConditionsPage')}>
            <Text style={styles.policyText}>Conditions générales d'utilisation</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  PolCon: {
    marginTop: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  policyContainer: {
    marginTop: 20,
  },
  policyText: {
    color: 'gray',
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 40,
  },
  icon: {
    flex: 1,
    margin: 10,
  },
  iconS: {
    margin: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 5,
    marginTop: 5,
  },
  loginBtn: {
    width: "80%",
    borderRadius: 5,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#0B7143"
  },
  loginText: {
    color: "#fff",
  },
  forgot_button_container: {
    width: "80%",
    alignItems: "flex-end",
  },
  forgot_button: {
    height: 30,
    opacity: 0.5,
    textDecorationLine: "underline",
    marginTop: 15,
    color: "gray",
    fontWeight: "bold",
  },
  logoContainer: {
    flexDirection: "row",
    marginTop: 30,
  },
  socialContainer: {
    flexDirection: "row",
  },
  noAccount: {
    fontWeight: "bold",
    marginTop: 10,
    color: "gray",
  },
  create: {
    fontWeight: "bold",
    opacity: 0.5,
    textDecorationLine: "underline",
    marginTop: 10,
    color: "gray",
  },
  inputView: {
    width: "80%",
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    alignItems: "center",
    flexDirection: "row",
  },
  input: {
    width: "100%",
    flex: 2,
  },
});

export default Login;
