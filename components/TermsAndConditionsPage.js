import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

const TermsAndConditionsPage = () => {
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
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>Conditions générales d'utilisation</Text>
            <Text style={{ marginTop: 10 }}>
                Merci d'utiliser notre site web.
                En utilisant ce site web, vous acceptez les conditions générales d'utilisation suivantes :
            </Text>
            <Text style={{ marginTop: 10 }}>
                1. Définitions
                Dans ces conditions générales d'utilisation, les termes suivants auront les significations suivantes :
            </Text>
            <Text style={{ marginLeft: 10, marginTop: 5 }}>
                - "Site web" désigne le site web accessible à partir de l'URL Arosaje ;
            </Text>
            <Text style={{ marginLeft: 10, marginTop: 5 }}>
                - "Nous", "notre" et "nos" désignent Arosaje ;
            </Text>
            <Text style={{ marginLeft: 10, marginTop: 5 }}>
                - "Vous" et "votre" désignent l'utilisateur du site web.
            </Text>
            <Text style={{ marginTop: 10 }}>
                2. Acceptation des conditions générales d'utilisation
            </Text>
            <Text style={{ marginLeft: 10, marginTop: 5 }}>
                En accédant à ce site web, vous acceptez d'être lié par ces conditions générales d'utilisation, toutes les lois et règlements applicables, et vous acceptez que vous êtes responsable du respect des lois locales applicables. Si vous n'acceptez pas ces termes, vous ne pouvez pas utiliser ou accéder à ce site web.
            </Text>
            <Text style={{ marginTop: 10 }}>
                3.  Utilisation du site web
            </Text>
            <Text style={{ marginLeft: 10, marginTop: 5 }}>
                Vous pouvez utiliser ce site web pour votre usage personnel et non-commercial. Vous ne pouvez pas utiliser ce site web à des fins illégales ou dans un but frauduleux. Vous ne pouvez pas utiliser ce site web pour copier, stocker, héberger, transmettre, envoyer, utiliser, publier ou distribuer des contenus illégaux, obscènes, diffamatoires, menaçants, harcelants, racistes, offensants, violents ou incitant à la haine, ni porter atteinte à la vie privée ou aux droits de propriété intellectuelle de tiers.
            </Text>
            <Text style={{ marginLeft: 10 }}>
                4. Propriété intellectuelle
            </Text>
            <Text style={{ marginLeft: 10, marginTop: 5 }}>
                Tous les contenus présents sur ce site web, y compris, mais sans s'y limiter, les textes, les graphiques, les images, les logos, les icônes, les sons, les vidéos, les logiciels et les bases de données, sont la propriété exclusive de [insérer le nom de votre entreprise] ou de ses concédants de licence et sont protégés par les lois françaises et internationales relatives à la propriété intellectuelle.
            </Text>
            <Text style={{ marginLeft: 10 }}>
                5. Liens vers d'autres sites web
            </Text>
            <Text style={{ marginLeft: 10, marginTop: 5 }}>
                Notre site web peut contenir des liens vers d'autres sites web qui ne sont pas sous notre contrôle. Nous n'assumons aucune responsabilité quant aux pratiques de confidentialité ou au contenu de ces sites web. Nous vous recommandons de lire les conditions générales d'utilisation et la politique de confidentialité de tout site web que vous visitez.
            </Text>
            <Text style={{ marginLeft: 10 }}>
                6. Modification des conditions générales d'utilisation
            </Text>
            <Text style={{ marginLeft: 10, marginTop: 5 }}>
                Nous nous réservons le droit de modifier ces conditions générales d'utilisation à tout moment et sans préavis. En continuant à utiliser ce site web après la publication de toute modification, vous acceptez ces modifications.
            </Text>
            <Text style={{ marginLeft: 10 }}>
                7. Limitation de responsabilité
            </Text>
            <Text style={{ marginLeft: 10, marginTop: 5 }}>
                Nous ne serons en aucun cas responsables des dommages directs ou indirects résultant de l'utilisation de ce site web, y compris, mais sans s'y limiter, les pertes de bénéfices, les pertes d'opportunités commerciales, la perte de données ou toute autre perte financière.
            </Text>
            <Text style={{ marginLeft: 10 }}>
                8. Loi applicable
            </Text>
            <Text style={{ marginLeft: 10, marginTop: 5 }}>
                Ces conditions générales d'utilisation sont régies et interprétées conformément aux lois françaises. Tout litige découlant de l'utilisation de ce site web sera soumis à la compétence exclusive des tribunaux français.
            </Text>
            <Text style={{ marginLeft: 10 }}>
                9. Divers
            </Text>
            <Text style={{ marginLeft: 10, marginTop: 5 }}>
                Si une disposition de ces conditions générales d'utilisation est jugée invalide ou inapplicable, cette disposition sera supprimée sans affecter les autres dispositions. Notre incapacité à exercer un droit ou une disposition de ces conditions générales d'utilisation ne constitue pas une renonciation à ce droit ou à cette disposition.
            </Text>
            <Text style={{ marginLeft: 10 }}>
                10. Contact
            </Text>
            <Text style={{ marginLeft: 10, marginTop: 5 }}>
                Si vous avez des questions ou des préoccupations concernant ces conditions générales d'utilisation, veuillez nous contacter à l'adresse contact@gmail.com.
            </Text>
            <Text style={{ marginLeft: 10 }}>
                11. Date d'entrée en vigueur
            </Text>
            <Text style={{ marginLeft: 10, marginTop: 5 }}>
                Ces conditions générales d'utilisation entrent en vigueur à partir du 02/05/2023.
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
export default TermsAndConditionsPage;