import React from 'react';
import SearchScreen from './src/screens/SearchScreen';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BookDetailScreen from './src/screens/BookDetailScreen';
import SavedBooksScreen from './src/screens/SavedBooksScreen';
const Stack = createNativeStackNavigator();
const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Search Screen">
        <Stack.Screen
          name="Search Screen"
          component={SearchScreen}
          options={{headerShown: false}}></Stack.Screen>
        <Stack.Screen
          name="Book Detail"
          component={BookDetailScreen}
          options={{headerShown: false}}></Stack.Screen>
        <Stack.Screen
          name="Saved Books"
          component={SavedBooksScreen}
          options={{headerShown: false}}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
