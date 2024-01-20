import React, { useEffect } from 'react';
import { Text, SafeAreaView, StyleSheet, TouchableOpacity, View, FlatList } from 'react-native';
import { ScreenWidth, ScreenHeight } from 'react-native-elements/dist/helpers';
import { useDispatch, useSelector } from 'react-redux';
import { setBooks } from '../store/actions/bookActions';
import { RootState } from '../store/reducers/rootReducer';
import searchBooks from '../api/searchBooks';
import { Book } from '../types/book';

interface BookRequestProps {}

const BookRequest: React.FC<BookRequestProps> = () => {
  const dispatch = useDispatch();
  const books = useSelector((state: RootState) => state.book.books);
  useEffect(() => {
    searchBooks('tolkien', 0, 10).then((result) => {
      dispatch(setBooks(result)); // Assuming result is an object with 'items' array
    });
  }, [dispatch]);

  const bookList = ({ item }: { item: Book }) => (
    <TouchableOpacity>
      <Text>{item.volumeInfo.title}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Discover Books</Text>
      <FlatList
        data={books}
        keyExtractor={(item) => item.id}
        renderItem={bookList}
        numColumns={1}
      ></FlatList>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
});

export default BookRequest;
