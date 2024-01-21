import React, {useEffect, useReducer, useRef, useState} from 'react';
import {Text, SafeAreaView, StyleSheet, View, FlatList} from 'react-native';
import {ScreenWidth, ScreenHeight} from 'react-native-elements/dist/helpers';
import LoadMoreButton from '../components/loadMoreButton';
import SearchBar from '../components/searchBar';
import BookCard from '../components/bookCard';
import {searchBooks} from '../api/searchBooks';
import {ActivityIndicator} from 'react-native';
import {setBooks} from '../store/actions';
import bookReducer from '../store/reducers';
import Icon from 'react-native-vector-icons/Ionicons';
import {Provider} from 'react-redux';
import store from '../store/store';
import {ParamListBase, useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
const initialState = {
  books: [],
  loading: false,
};
const SearchScreen: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [startIndex, setStartIndex] = useState(0);
  const [maxResults, setMaxResult] = useState(10);
  const [state, dispatch] = useReducer(bookReducer, initialState);
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
      flatListRef.current?.scrollToIndex({index: 0});
    }
  };
  const handleLoadMore = async () => {
    setLoading(true);
    setMaxResult(maxResults + 10);
    try {
      const data = await searchBooks(searchTerm, startIndex, maxResults + 10);
      dispatch(setBooks(data.items));
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setLoading(false);
    }
  };
  const bookList = ({item}: {item: Book}) => <BookCard book={item}></BookCard>;
  const flatListRef = useRef<FlatList>(null);
  const navigation =
    useNavigation<StackNavigationProp<ParamListBase, string>>();
  const navigateToSavedBooks = () => {
    navigation.navigate('Saved Books', {books: state.books});
  };
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
        <View style={styles.google}>
          <Icon
            name="library"
            style={styles.savedBooks}
            onPress={navigateToSavedBooks}
          />
          <Text
            style={{
              color: '#4285F4',
              fontSize: 24,
              fontWeight: 'bold',
              marginBottom: 16,
            }}>
            G
          </Text>
          <Text
            style={{
              color: '#DB4437',
              fontSize: 24,
              fontWeight: 'bold',
              marginBottom: 16,
            }}>
            o
          </Text>
          <Text
            style={{
              color: '#F4B400',
              fontSize: 24,
              fontWeight: 'bold',
              marginBottom: 16,
            }}>
            o
          </Text>
          <Text
            style={{
              color: '#4285F4',
              fontSize: 24,
              fontWeight: 'bold',
              marginBottom: 16,
            }}>
            g
          </Text>
          <Text
            style={{
              color: '#0F9D58',
              fontSize: 24,
              fontWeight: 'bold',
              marginBottom: 16,
            }}>
            l
          </Text>
          <Text
            style={{
              color: '#DB4437',
              fontSize: 24,
              fontWeight: 'bold',
              marginBottom: 16,
            }}>
            e
          </Text>
          <Text style={styles.header}> Books</Text>
        </View>

        <View style={styles.searchContainer}>
          <SearchBar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            onSearchPress={handleSearch}
          />
        </View>
        <FlatList
          ref={flatListRef}
          data={state.books}
          keyExtractor={item => item.id}
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
    </Provider>
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
  savedBooks: {
    fontSize: 25,
    position: 'absolute',
    right: 10,
    color: '#0F9D58',
  },
  header: {
    color: '#4285F4',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    padding: 16,
  },
  google: {
    width: ScreenWidth,
    alignContent: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
});

export default SearchScreen;
