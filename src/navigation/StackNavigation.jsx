import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {ApolloProvider, client} from '../context/AppoloClient';
import {StackScreens} from './Screen';

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          {StackScreens.map(screen => (
            <Stack.Screen
              key={screen.name}
              name={screen.name}
              component={screen.component}
            />
          ))}
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
};

export default StackNavigation;
