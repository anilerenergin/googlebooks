import React, {useState, useEffect} from 'react';
import {
  View,
  FlatList,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/AntDesign';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScreenHeight, ScreenWidth} from 'react-native-elements/dist/helpers';

interface SavedBooksScreenProps {
  navigation: any;
}

const SavedBooksScreen: React.FC<SavedBooksScreenProps> = ({navigation}) => {
  const [savedBooks, setSavedBooks] = useState<Book[]>([]);
  useEffect(() => {
    fetchSavedBooksDetails();
  }, []);
  const fetchSavedBooksDetails = async () => {
    try {
      const savedBooksIds = (await AsyncStorage.getItem('savedBooks')) || '[]';
      const savedBooksList: string[] = JSON.parse(savedBooksIds);
      const booksDetails = await Promise.all(
        savedBooksList.map(async id => {
          const response = await fetch(
            `https://www.googleapis.com/books/v1/volumes/${id}`,
          );
          const data = await response.json();
          return data;
        }),
      );
      const validBooksDetails = booksDetails.filter(book => book);

      setSavedBooks(validBooksDetails);
    } catch (error) {
      console.error('Error fetching saved books details:', error);
    }
  };
  const removeBook = async (bookId: string) => {
    try {
      const updatedSavedBooks = savedBooks.filter(book => book.id !== bookId);
      await AsyncStorage.setItem(
        'savedBooks',
        JSON.stringify(updatedSavedBooks.map(book => book.id)),
      );
      setSavedBooks(updatedSavedBooks);
    } catch (error) {
      console.error('Error removing book:', error);
    }
  };
  const renderItem = ({item}: {item: Book}) => (
    <TouchableOpacity
      style={styles.bookContainer}
      onPress={() => navigation.navigate('Book Detail', {book: item})}>
      <View style={styles.bookImageContainer}>
        <TouchableOpacity
          style={styles.closeIcon}
          onPress={() => removeBook(item.id)}>
          <Icon name="close" style={styles.closeIcon}></Icon>
        </TouchableOpacity>
        <Image
          source={{
            uri: item.volumeInfo.imageLinks?.thumbnail.replace(
              'http://',
              'https://',
            ),
          }}
          style={styles.bookImage}
        />
      </View>
      <Text style={styles.bookTitle}>{item.volumeInfo.title}</Text>
    </TouchableOpacity>
  );
  const goBack = () => {
    navigation.goBack();
  };
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <TouchableOpacity onPress={goBack}>
          <View style={styles.appBar}>
            <Icon name="arrowleft" style={styles.backIcon} />
            <Text style={styles.title}>Bookshelf</Text>
          </View>
        </TouchableOpacity>
        <FlatList
          data={savedBooks}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          numColumns={1}
          contentContainerStyle={styles.shelfContainer}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  appBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  backIcon: {
    fontSize: 28,
    position: 'absolute',
    left: 0,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  closeIcon: {
    fontSize: 20,
    position: 'absolute',
    top: 0,
    right: 0,
    color: '#DB4437',
  },
  container: {
    backgroundColor: '#F4F4F4',
    height: ScreenHeight,
    paddingBottom: 50,
  },
  shelfContainer: {
    justifyContent: 'space-around',
  },
  bookContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
    marginHorizontal: 30,
  },
  bookImageContainer: {
    alignItems: 'center',
    marginBottom: 8,
  },
  bookImage: {
    width: 80,
    height: 120,
    borderRadius: 8,
  },
  bookTitle: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default SavedBooksScreen;
