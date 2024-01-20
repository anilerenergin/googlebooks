import React, { useEffect, useState } from 'react';
import { Text, SafeAreaView, StyleSheet, TouchableOpacity, FlatList, View } from 'react-native';
import { ScreenWidth, ScreenHeight } from 'react-native-elements/dist/helpers';
import { useDispatch, useSelector } from 'react-redux';
import { setBooks } from '../store/actions/bookActions';
import { RootState } from '../store/reducers/rootReducer';
import searchBooks from '../api/searchBooks';
import { Book } from '../types/book';
import LoadMoreButton from '../components/loadMoreButton';
import SearchBar from '../components/searchBar';

interface BookRequestProps {}

const BookRequest: React.FC<BookRequestProps> = () => {
  const dispatch = useDispatch();
  const books = useSelector((state: RootState) => state.book.books);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('tolkien');
  const [maxResult, setMaxResult] = useState(1);
  const [startIndex, setStartIndex] = useState(0);

  const fetchBooks = async (term: string, start: number, max: number) => {
    try {
      setLoading(true);
      const result = await searchBooks(term, start, max);
      dispatch(setBooks(result));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks(searchTerm, startIndex,maxResult);
  }, [dispatch, maxResult, searchTerm]);

  const bookList = ({ item }: { item: Book }) => (
    <TouchableOpacity>
      <Text>{item.volumeInfo.title}</Text>
    </TouchableOpacity>
  );

  const handleLoadMore = () => {
    setMaxResult(maxResult+1)

  };

  const handleSearchPress = () => {
    setMaxResult(1)

  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Discover Books</Text>
      <View style={styles.searchContainer}>
      <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} onSearchPress={handleSearchPress} />
      </View>
      <FlatList
        data={books}
        keyExtractor={(item) => item.id}
        renderItem={bookList}
        numColumns={1}
        ListFooterComponent={<LoadMoreButton loading={loading} onPress={handleLoadMore} />}
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
