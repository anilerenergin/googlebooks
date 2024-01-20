import React from 'react';
import {View, StyleSheet} from 'react-native';
import SearchScreen from './src/screens/SearchScreen';
import { Provider } from 'react-redux';
import store from './src/store/store';

const App: React.FC = () => {
  return (
       <Provider store={store} >
        <SearchScreen />
      </Provider>
  );
};


export default App;
