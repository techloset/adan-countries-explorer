import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import CountryScreen from '../screens/CountryScreen';
import { ApolloProvider,client } from '../context/AppoloClient';

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  return (
    <ApolloProvider client={client}>
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={HomeScreen} /> 
        <Stack.Screen name="Country" component={CountryScreen} /> 
        </Stack.Navigator>
    </NavigationContainer>
    </ApolloProvider>
  );
};

export default StackNavigation;
