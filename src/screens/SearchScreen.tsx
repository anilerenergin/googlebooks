
import React, { useEffect, useState } from 'react';
import {Text, SafeAreaView, StyleSheet, TouchableOpacity, View, FlatList} from 'react-native';
import { ScreenWidth, ScreenHeight } from 'react-native-elements/dist/helpers';
import searchBooks from '../api/searchBooks';
import { Book } from '../types/book';

interface BookRequestProps {
    books: Book[];
  }
  
const BookRequest: React.FC<BookRequestProps> = () => {
    const [books, setBooks] = useState<Book[]>([]);
    useEffect(()=>{
     searchBooks("tolkien",0,10).then((e)=>{
        setBooks(e)
            e.forEach((b)=>{console.log(b.volumeInfo.title)}),[]
        },);
    },[])
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Discover Books</Text>
      <FlatList  data={books}
          keyExtractor={item => item.id}
          renderItem={bookList}
          numColumns={1}></FlatList>
    </SafeAreaView>
  );
};
const bookList  = ({item}: {item: any}) => (
    <TouchableOpacity>
          <Text>{item.volumeInfo.title}</Text>
    </TouchableOpacity>
  );
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
