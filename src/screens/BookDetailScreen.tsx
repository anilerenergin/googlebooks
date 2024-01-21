import {
  ParamListBase,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {
  View,
  ScrollView,
  Text,
  Image,
  StyleSheet,
  Linking,
  TouchableOpacity,
  ViewBase,
} from 'react-native';
import {ScreenHeight} from 'react-native-elements/dist/helpers';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/AntDesign';
const BookDetailScreen: React.FC<{route: any}> = ({route}) => {
  const {book}: {book: Book} = route.params;
  const openLink = (link: string) => {
    Linking.openURL(link);
  };
  const navigation =
    useNavigation<StackNavigationProp<ParamListBase, string>>();
  const goBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={goBack}>
        <View style={styles.appBar}>
          <Icon name="arrowleft" style={styles.backIcon} />
        </View>
      </TouchableOpacity>

      <ScrollView style={styles.container}>
        <View style={styles.header}>
          {book.volumeInfo.imageLinks?.thumbnail && (
            <Image
              source={{
                uri: book.volumeInfo.imageLinks?.thumbnail.replace(
                  'http://',
                  'https://',
                ),
              }}
              style={styles.bookImage}
            />
          )}
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{book.volumeInfo.title}</Text>
            {book.volumeInfo.subtitle && (
              <Text style={styles.subtitle}>{book.volumeInfo.subtitle}</Text>
            )}
            {book.volumeInfo.authors && (
              <Text style={styles.authors}>
                {book.volumeInfo.authors.join(', ')}
              </Text>
            )}
          </View>
        </View>

        <View style={styles.details}>
          <Text style={styles.description}>{book.volumeInfo.description}</Text>

          <Text style={styles.label}>Publisher:</Text>
          <Text>{book.volumeInfo.publisher}</Text>

          <Text style={styles.label}>Published Date:</Text>
          <Text>{book.volumeInfo.publishedDate}</Text>

          <Text style={styles.label}>Page Count:</Text>
          <Text>{book.volumeInfo.pageCount}</Text>

          {book.volumeInfo.categories && (
            <Text style={styles.label}>Categories:</Text>
          )}
          {<Text>{book.volumeInfo.categories?.join(', ')}</Text>}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  appBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  container: {
    height: ScreenHeight,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  header: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  backIcon: {
    fontSize: 28,
    paddingLeft: 10,
  },
  bookImage: {
    width: 120,
    height: 180,
    borderRadius: 8,
  },
  titleContainer: {
    marginLeft: 16,
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 4,
  },
  authors: {
    fontSize: 16,
    color: 'darkgray',
  },
  details: {
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    marginBottom: 8,
  },
  label: {
    fontWeight: 'bold',
    paddingVertical: 4,
  },
  actions: {
    marginBottom: 16,
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default BookDetailScreen;
