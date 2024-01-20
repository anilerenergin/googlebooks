import React from 'react';
import {View, StyleSheet} from 'react-native';
import BookRequest from './src/screens/SearchScreen';
import { Provider } from 'react-redux';
import store from './src/store';

const App: React.FC = () => {
  return (
     <Provider store={store}>
       <View>
        <BookRequest />
      </View>
     </Provider>
  );
};


export default App;
