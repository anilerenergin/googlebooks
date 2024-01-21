import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  ParamListBase,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useState, useEffect} from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {ScreenWidth} from 'react-native-elements/dist/helpers';
import Icon from 'react-native-vector-icons/FontAwesome';
interface BookCardProps {
  book: Book;
}

const BookCard: React.FC<BookCardProps> = ({book}) => {
  const [saved, setSaved] = useState(false);

  const navigation =
    useNavigation<StackNavigationProp<ParamListBase, string>>();
  useFocusEffect(
    React.useCallback(() => {
      loadSavedBooks();
    }, []),
  );

  const loadSavedBooks = async () => {
    try {
      const savedBooks = await AsyncStorage.getItem('savedBooks');
      if (savedBooks) {
        const savedBooksList = JSON.parse(savedBooks);

        setSaved(savedBooksList.includes(book.id));
      }
    } catch (error) {
      console.error('Error loading saved books:', error);
    }
  };

  const saveBook = async () => {
    try {
      const savedBooks = (await AsyncStorage.getItem('savedBooks')) || '[]';
      const savedBooksList = JSON.parse(savedBooks);

      setSaved(prevSaved => !prevSaved);

      if (saved) {
        const updatedSavedBooks = savedBooksList.filter(
          (id: string) => id !== book.id,
        );
        await AsyncStorage.setItem(
          'savedBooks',
          JSON.stringify(updatedSavedBooks),
        );
      } else {
        await AsyncStorage.setItem(
          'savedBooks',
          JSON.stringify([...savedBooksList, book.id]),
        );
      }
    } catch (error) {
      console.error('Error saving book:', error);
    }
  };
  const navigateToSingleBook = () => {
    navigation.navigate('Book Detail', {book: book});
  };
  return (
    <TouchableOpacity onPress={navigateToSingleBook}>
      <View style={styles.bookContainer}>
        {book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail && (
          <Image
            source={{
              uri: book.volumeInfo.imageLinks?.thumbnail.replace(
                'http://',
                'https://',
              ),
            }}
            style={styles.bookImage}
            onError={error =>
              console.error('Error loading image:', error.nativeEvent.error)
            }
          />
        )}

        <View style={styles.bookDetails}>
          <Text style={styles.bookTitle}>{book.volumeInfo.title}</Text>
          {book.volumeInfo.authors && (
            <Text style={styles.bookAuthors}>
              {book.volumeInfo.authors.join(', ')}
            </Text>
          )}

          <Text style={styles.bookPublishedDate}>
            {book.volumeInfo.publishedDate}
          </Text>
        </View>
      </View>
      <TouchableOpacity style={styles.saveIcon} onPress={saveBook}>
        {saved ? (
          <Icon name="bookmark" style={styles.saveIcon} />
        ) : (
          <Icon name="bookmark-o" style={styles.saveIcon} />
        )}
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  bookContainer: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    width: ScreenWidth * 0.9,
    justifyContent: 'center',
  },
  bookTitle: {
    width: ScreenWidth * 0.7,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    marginTop: 4,
  },
  bookAuthors: {
    marginBottom: 4,
  },
  bookPublishedDate: {
    marginBottom: 0,
  },
  bookImage: {
    width: 100,
    height: 150,
    borderRadius: 8,
  },
  bookDetails: {
    flex: 1,
  },
  saveIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    fontSize: 25,
    color: '#0F9D58',
  },
});

export default BookCard;
