import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';
import Login from './screens/Login';
import Home from './screens/Home';
import Signup from './screens/Signup';
import Account from './screens/Account';
import Ad from './screens/Ad';
import Details from './screens/Details';
import Politique from './components/Politique';
import TermsAndConditionsPage from './components/TermsAndConditionsPage'
import { Alert, Button, Text, View, Modal, StyleSheet, TouchableOpacity} from 'react-native';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const handleAcceptTerms = () => {
    setAcceptedTerms(true);
  }

  const renderTermsPopup = () => {
    if (!acceptedTerms) {
      return (
        <View style={styles.container}>
          <Modal
            transparent={true}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>
                  En utilisant cette application, vous acceptez les conditions générales d'utilisation.
                </Text>
                <TouchableOpacity
                  style={styles.button}
                  onPress={handleAcceptTerms}
                >
                  <Text style={styles.buttonText}>Accepter</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      );
    }
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Signup" component={Signup} options={{ headerShown: false }} />
        <Stack.Screen name="Details" component={Details} options={{ headerShown: false }} />
        <Stack.Screen name="Politique" component={Politique} options={{ headerShown: false }} />
        <Stack.Screen name="TermsAndConditionsPage" component={TermsAndConditionsPage} options={{ headerShown: false }} />
        <Stack.Screen name="Main" options={{ headerShown: false }}>
          {({ route }) => (
            <>
              {renderTermsPopup()}
              <Tab.Navigator
                screenOptions={({ route }) => ({
                  tabBarIcon: ({ color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                      iconName = 'home';
                    } else if (route.name === 'Account') {
                      iconName = 'user';
                    } else if (route.name === 'Ad') {
                      iconName = 'plus';
                    }

                    return <FontAwesome name={iconName} size={size} color={color} />;
                  },
                })}
                tabBarOptions={{
                  activeTintColor: "#0B7143",
                  inactiveTintColor: 'gray',
                }}
                initialParams={{ token: route.params }}
              >
                <Tab.Screen name="Home" options={{ headerShown: false }}>
                  {() => <Home token={route.params.token} />}
                </Tab.Screen>
                <Tab.Screen name="Ad" options={{ headerShown: false }}>{() => <Ad token={route.params.token} />}</Tab.Screen>
                <Tab.Screen name="Account" options={{ headerShown: false }}>{() => <Account token={route.params.token} />}</Tab.Screen>

              </Tab.Navigator>
            </>
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  modalView: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    margin:10,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#0B7143',
    borderRadius: 20,
    padding: 10,
    paddingHorizontal:20,
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
export default App;