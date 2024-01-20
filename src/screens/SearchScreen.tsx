
import React, { useEffect } from 'react';
import {Text, SafeAreaView, StyleSheet} from 'react-native';
import { ScreenWidth, ScreenHeight } from 'react-native-elements/dist/helpers';
import searchBooks from '../api/searchBooks';


const BookRequest: React.FC = () => {
    useEffect(()=>{
        searchBooks("tolkien",0,10).then((e)=>{
            e.forEach((b)=>{console.log(b.volumeInfo.title)}),[]
        },);
    })
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Discover Books</Text>
    </SafeAreaView>
  );
};

const styles =  StyleSheet.create({
    container: {
        width: ScreenWidth,
        height: ScreenHeight,
        backgroundColor: '#f0f0f0',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'flex-start',
      },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
      },
})
export default BookRequest;
