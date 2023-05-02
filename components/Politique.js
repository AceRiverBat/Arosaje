import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

const Politique = () => {
    const handleBack = () => {
        navigation.navigate('Login');
    };
    return (
        <View style={{ padding: 10 }}>
            <View style={styles.iconContainer}>
                <TouchableOpacity onPress={handleBack}>
                    <Ionicons style={styles.icon} name='arrow-back-circle' size={50} color="#0B7143" />
                </TouchableOpacity>
            </View>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Politique de confidentialité de l'application de gardiennage de plantes</Text>
            <Text style={{ marginTop: 10 }}>
                Introduction :
                Cette politique de confidentialité explique comment nous recueillons, utilisons et protégeons vos informations personnelles lorsque vous utilisez notre application de gardiennage de plantes A-rosa-je. Nous respectons votre vie privée et nous nous engageons à protéger vos informations personnelles.
            </Text>
            <Text style={{ marginTop: 10 }}>
                Les informations que nous recueillons :
                Lorsque vous utilisez notre Application, nous pouvons recueillir les informations suivantes:
            </Text>
            <Text style={{ marginLeft: 10, marginTop: 5 }}>
                - Les informations que vous fournissez en créant un compte, telles que votre nom, votre adresse e-mail et votre mot de passe.
            </Text>
            <Text style={{ marginLeft: 10, marginTop: 5 }}>
                - Les informations sur les plantes que vous ajoutez à votre profil, telles que leur nom, leur espèce, leur âge et leur photo.
            </Text>
            <Text style={{ marginLeft: 10, marginTop: 5 }}>
                - Les informations sur l'utilisation de l'Application, telles que les données de localisation, les statistiques d'utilisation et les informations sur les erreurs.
            </Text>
            <Text style={{ marginLeft: 10, marginTop: 5 }}>
                - Les informations que vous nous fournissez lorsque vous nous contactez pour obtenir de l'aide ou signaler un problème.
            </Text>
            <Text style={{ marginTop: 10 }}>
                Comment nous utilisons vos informations :
                Nous pouvons utiliser les informations que nous recueillons pour:
            </Text>
            <Text style={{ marginLeft: 10, marginTop: 5 }}>
                - Vous permettre d'utiliser l'Application et de gérer votre compte.
            </Text>
            <Text style={{ marginLeft: 10, marginTop: 5 }}>
                - Améliorer l'Application en analysant les statistiques d'utilisation et en corrigeant les erreurs.
            </Text>
            <Text style={{ marginLeft: 10, marginTop: 5 }}>
                - Vous envoyer des notifications relatives à l'entretien de vos plantes.
            </Text>
            <Text style={{ marginLeft: 10, marginTop: 5 }}>
                - Vous contacter si nous avons besoin de plus d'informations pour résoudre un problème que vous avez signalé.
            </Text>
            <Text style={{ marginLeft: 10, marginTop: 5 }}>
                - Respecter nos obligations légales et réglementaires.
            </Text>
            <Text style={{ marginTop: 10 }}>
                Comment nous protégeons vos informations :
                Nous prenons des mesures de sécurité techniques et organisationnelles appropriées pour protéger vos informations personnelles contre toute perte, utilisation abusive ou accès non autorisé. Nous limitons l'accès à vos informations personnelles aux employés qui ont besoin d'y accéder pour fournir les services que vous avez demandés.
            </Text>

            <Text style={{ marginTop: 10 }}>
                Partage de vos informations :
                Nous ne vendons ni ne louons vos informations personnelles à des tiers. Cependant, nous pouvons partager vos informations personnelles avec les tiers suivants:
            </Text>
            <Text style={{ marginLeft: 10, marginTop: 5 }}>
                - Les prestataires de services qui nous aident à fournir l'Application, tels que les hébergeurs, les services de messagerie et les fournisseurs de services d'analyse.
            </Text>
            <Text style={{ marginLeft: 10, marginTop: 5 }}>
                - Les autorités judiciaires ou gouvernementales si nous sommes tenus de divulguer vos informations personnelles en vertu de la loi ou d'une ordonnance judiciaire.
            </Text>
            <Text style={{ marginLeft: 10 }}>
                Vos droits sur vos informations personnelles :
                Vous avez le droit de nous demander d'accéder à vos informations personnelles, de les rectifier, de les supprimer ou de limiter leur traitement. Vous pouvez également vous opposer au traitement de vos informations personnelles ou demander leur portabilité. Pour exercer ces droits, veuillez nous contacter à l'adresse e-mail suivante : [adresse e-mail].
            </Text>
            <Text style={{ marginLeft: 10 }}>
                Modifications de cette politique de confidentialité :
                Nous pouvons modifier cette politique de confidentialité de temps à autre en fonction de l'évolution de la réglementation et de notre pratique en matière de protection de la vie privée. Nous vous informerons de tout changement important de cette politique de confidentialité en affichant un avis sur l'Application.
            </Text>
            <Text style={{ marginLeft: 10 }}>
                Contactez-nous :
                Si vous avez des questions ou des préoccupations concernant cette politique de confidentialité, veuillez nous contacter.
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    iconContainer: {
        padding: 10,
    },
    icon: {
        alignSelf: 'flex-start',
    },
});
export default Politique;