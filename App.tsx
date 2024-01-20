import React from 'react';
import {View, StyleSheet} from 'react-native';
import BookRequest from './src/screens/SearchScreen';
import { Provider } from 'react-redux';

const App: React.FC = () => {
  return (
       <View>
        <BookRequest />
      </View>
  );
};


export default App;
