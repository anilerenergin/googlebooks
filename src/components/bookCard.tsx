import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import {ScreenWidth} from 'react-native-elements/dist/helpers';

interface BookCardProps {
  book: Book;
}

const BookCard: React.FC<BookCardProps> = ({book}) => {
  return (
    <TouchableOpacity>
      <View style={styles.bookContainer}>
        {book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail && (
          <Image
            source={{uri: book.volumeInfo.imageLinks.thumbnail}}
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
});

export default BookCard;
