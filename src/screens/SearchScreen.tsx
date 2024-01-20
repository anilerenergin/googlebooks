import React, { useEffect, useReducer, useRef, useState } from 'react';
import { Text, SafeAreaView, StyleSheet, View, FlatList } from 'react-native';
import { ScreenWidth, ScreenHeight } from 'react-native-elements/dist/helpers';
import LoadMoreButton from '../components/loadMoreButton';
import SearchBar from '../components/searchBar';
import BookCard from '../components/bookCard';
import { searchBooks } from '../api/searchBooks';
import { ActivityIndicator } from 'react-native';
import { setBooks } from '../store/actions';
import bookReducer from '../store/reducers';
const initialState = {
  books: [],
  loading: false,
};
const SearchScreen: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [startIndex, setStartIndex] = useState(0);
  const [maxResults, setMaxResult] = useState(10);
  const [state, dispatch] = useReducer(bookReducer,initialState);
  const handleSearch = async () => {
    setLoading(true);
    setStartIndex(0);
    setMaxResult(10);
    try {
      const data = await searchBooks(searchTerm, 0, 10);
      dispatch(setBooks(data.items));
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setLoading(false);
    }
  };
  const handleLoadMore = async () => {
    setLoading(true);
    setMaxResult(maxResults + 10);
    try {
      const data = await searchBooks(searchTerm, startIndex, maxResults+10);
      dispatch(setBooks(data.items));
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setLoading(false);
    }

  };
  const bookList = ({ item }: { item: Book }) => <BookCard book={item}></BookCard>;
  const flatListRef = useRef<FlatList>(null);
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Google Books</Text>
      <View style={styles.searchContainer}>
        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} onSearchPress={handleSearch} />
      </View>
      <FlatList
        ref={flatListRef}
        data={state.books}
        keyExtractor={(item) => item.id}
        renderItem={bookList}
        numColumns={1}
        ListFooterComponent={
          loading ? (
            <ActivityIndicator size="small" color="#007bff" />
          ) : state.books.length > 0 ? (
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

export default SearchScreen;
