import React, { useEffect, useState } from 'react';
import { Text, SafeAreaView, StyleSheet, View, FlatList } from 'react-native';
import { ScreenWidth, ScreenHeight } from 'react-native-elements/dist/helpers';
import LoadMoreButton from '../components/loadMoreButton';
import SearchBar from '../components/searchBar';
import BookCard from '../components/bookCard';
import { searchBooks } from '../api/searchBooks';
import { ActivityIndicator } from 'react-native';

interface BookRequestProps {}

const BookRequest: React.FC<BookRequestProps> = () => {
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [startIndex, setStartIndex] = useState(0);
  const [books, setBooks] = useState<Book[]>([]);
  const [maxResult, setMaxResult] = useState(10);


  const bookList = ({ item }: { item: Book }) => <BookCard book={item}></BookCard>;

  const handleLoadMore = async () => {
    setMaxResult(maxResult+10);
    setLoading(true)
    const data = await searchBooks(searchTerm,startIndex,maxResult+10)
    setBooks(data)
    setLoading(false)
  };

  const handleSearchPress = async () => {
    setMaxResult(10);
    setLoading(true)
    const data = await searchBooks(searchTerm,startIndex,10)
    setBooks(data)
    setLoading(false)
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Google Books</Text>
      <View style={styles.searchContainer}>
        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} onSearchPress={handleSearchPress} />
      </View>
      <FlatList
        data={books}
        keyExtractor={(item) => item.id}
        renderItem={bookList}
        numColumns={1}
        ListFooterComponent={
          loading ? (
            <ActivityIndicator size="small" color="#007bff" />
          ) : books.length > 0 ? (
            <LoadMoreButton loading={loading} onPress={handleLoadMore} />
          ) : null
        } 
      />
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
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    padding: 16,
  },
});

export default BookRequest;
