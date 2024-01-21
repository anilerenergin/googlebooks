import React, { useState } from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet, Button} from 'react-native';
import {ScreenWidth} from 'react-native-elements/dist/helpers';
import Icon from 'react-native-vector-icons/FontAwesome';

interface BookCardProps {
  book: Book;
}

const BookCard: React.FC<BookCardProps> = ({book}) => {
  const [saved, setSaved] = useState(false);
  const toggleSaved = () => {
    setSaved((prevSaved) => !prevSaved);
  };
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


         <TouchableOpacity  style={styles.saveIcon} onPress={toggleSaved}>
           {saved?<Icon name='bookmark' style={styles.saveIcon} />:<Icon name='bookmark-o' style={styles.saveIcon} />}
         </TouchableOpacity>


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
  saveIcon: {
    position:'absolute',
    top:10,
    right:10,
    fontSize:20,
    color:"#0F9D58"
  },
});

export default BookCard;
