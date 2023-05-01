import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
} from "react-native";

const Logo = require('../assets/image/Logo.png');

const AccountNav = ({ token, onPressinfo, onPressplante, onPresshisto }) => {
    const [isInfoClicked, setIsInfoClicked] = useState(true);
    const [isAdsClicked, setIsAdsClicked] = useState(false);
    const [isHistoClicked, setIsHistoClicked] = useState(false);
    const [user, setUser] = useState(null);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [id, setId] = useState(null);
    const [userRole, setUserRole] = useState(null);

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
                setId(data.id);
            } catch (error) {
                console.error(error);
            }
        };
        fetchUser();
    }, [token]);

    useEffect(() => {
        const fetchUserRole = async () => {
            const response = await fetch(`http://127.0.0.1:8000/api/users/${id}/role`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            const data = await response.json();
            setUserRole(data.role);
        };

        if (id) { // check if id is not null before making the request
            fetchUserRole();
        }
    }, [id, token]);
    return (
        <View style={styles.container}>
            <View style={styles.headContainer}>
                <View style={styles.nameAccount_container}>
                    <Text style={styles.nameAccount}>{firstName}  {lastName}</Text>
                </View>
                <Image source={Logo} style={styles.image} />
            </View>

            <View style={styles.bodyContainer}>
                <TouchableOpacity onPress={() => {
                    setIsInfoClicked(true);
                    setIsAdsClicked(false);
                    setIsHistoClicked(false);
                    onPressinfo();
                }}>
                    <Text style={[styles.menuItem, isInfoClicked && styles.focusText]} >Informations</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {
                    setIsAdsClicked(true);
                    setIsInfoClicked(false);
                    setIsHistoClicked(false);
                    onPressplante();
                }}>
                    <Text style={[styles.menuItem, isAdsClicked && styles.focusText]}>Mes annonces</Text>

                </TouchableOpacity>
                {userRole !== 'botaniste' && (
                    <>
                        <TouchableOpacity onPress={() => {
                            setIsHistoClicked(true);
                            setIsAdsClicked(false);
                            setIsInfoClicked(false);
                            onPresshisto();
                        }}>
                            <Text style={[styles.menuItem, isHistoClicked && styles.focusText]}>Historique</Text>
                        </TouchableOpacity>
                    </>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
    },
    headContainer: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    image: {
        width: 100,
        height: 100,
        margin: 10,
    },
    nameAccount: {
        fontWeight: "bold",
        fontSize: 25,
        textDecorationLine: "underline",
        marginTop: '70%',
        marginLeft: 10,
    },
    bodyContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
        backgroundColor: '#fff',
    },
    menuItem: {
        fontWeight: 'bold',
        color: 'gray',
        margin: 15,
        textDecorationLine: "underline",
    },
    focusText: {
        fontWeight: 'bold',
        color: "#0B7143",
        margin: 15,
        textDecorationLine: "underline",
    },
});
export default AccountNav;