import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

const Signup = ({ navigation }) => {
const [firstName, setFirstName] = useState('');
const [lastName, setLastName] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [address, setAddress] = useState('');
const [postCode, setPostCode] = useState('');

const handleCreateUser = async () => {
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
<View style={styles.container}>
<TextInput
placeholder="First Name"
value={firstName}
onChangeText={(text) => setFirstName(text)}
style={styles.input}
/>
<TextInput
placeholder="Last Name"
value={lastName}
onChangeText={(text) => setLastName(text)}
style={styles.input}
/>
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
}}
/>
<TextInput
placeholder="Password"
value={password}
onChangeText={(text) => setPassword(text)}
secureTextEntry
style={styles.input}
/>
<TextInput
placeholder="Address"
value={address}
onChangeText={(text) => setAddress(text)}
style={styles.input}
/>
<TextInput
placeholder="Post Code"
value={postCode}
onChangeText={(text) => setPostCode(text)}
style={styles.input}
keyboardType="numeric"
onBlur={() => {
if (!validatePostCode(postCode)) {
alert('Veuillez entrer un code postal valide (5 chiffres).');
}
}}
/>
<Button title="Create User" onPress={handleCreateUser} />
</View>
);
};

const styles = StyleSheet.create({
container: {
flex: 1,
justifyContent: 'center',
padding: 20,
},
input: {
borderWidth: 1,
borderColor: '#ddd',
padding: 10,
marginBottom: 10,
borderRadius: 5,
},
});

export default Signup;