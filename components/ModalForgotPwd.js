import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  Image,
  TextInput,
  Pressable,
  TouchableOpacity,
} from "react-native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const Logo = require('../assets/image/Logo.png');

export default function ForgotPasswordModal({ visible, onClose }) {
    const [email, setEmail] = useState('');
   
    const handleEmail = () => {
        
    }

    return (
        <Modal visible={visible} animationType='slide' transparent={true}>
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={onClose}>
                            <MaterialIcons name="close" size={30} color="#333" />
                        </TouchableOpacity>
                        <Image source={Logo} style={styles.image} />
                        <View style={{ width: 30 }}></View>
                    </View>

                    <View style={styles.body}>
                        <Text style={styles.title}>Mot de passe oublié ?</Text>

                        <Text style={styles.text}>
                            Entrez votre adresse e-mail et nous vous enverrons un lien pour réinitialiser votre mot de passe.
                        </Text>

                        <View style={styles.inputView}>
                            <MaterialIcons style={styles.icon} name={"mail-outline"} size={20} color="gray" />
                            <TextInput
                                style={styles.TextInput}
                                placeholder="Adresse mail"
                                onChangeText={(email) => setEmail(email)}
                            />
                        </View>

                        <TouchableOpacity style={styles.submitButton} onPress={handleEmail}>
                            <Pressable onPress={onClose}>
                                <Text style={styles.submitButtonText}>Envoyer</Text>
                            </Pressable>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 10,
        width: '80%',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    image: {
        width: 100,
        height: 100,
    },
    body: {
        padding: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    text: {
        fontSize: 14,
        marginBottom: 20,
    },
    inputView: {
        width: "100%",
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 15,
        alignItems: "center",
        flexDirection: "row",
    },
    TextInput: {
        width: "100%",
        padding: 10,
        color: "gray",
    },
    submitButton: {
        backgroundColor: "#0B7143",
        borderRadius: 5,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 20,
    },
    submitButtonText: {
        color: "#fff",
        fontWeight: 'bold',
        fontSize: 16,
    },
    icon:{
        margin: 10,
      },
});
