import React from 'react';
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

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
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
            <Tab.Navigator
              screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                  let iconName;

                  if (route.name === 'Home') {
                    iconName = 'home';
                  } else if (route.name === 'Account') {
                    iconName = 'user';
                  }else if(route.name === 'Ad'){
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
              <Tab.Screen name="Account" options={{ headerShown: false }}>{() => <Account token={route.params.token}/>}
              </Tab.Screen>

            </Tab.Navigator>
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;