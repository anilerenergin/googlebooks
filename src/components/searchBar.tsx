import React from 'react';
import {TextInput, TouchableOpacity, StyleSheet, Text} from 'react-native';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (text: string) => void;
  onSearchPress: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchTerm,
  onSearchChange,
  onSearchPress,
}) => {
  return (
    <>
      <TextInput
        style={styles.searchInput}
        placeholder="Find a book"
        value={searchTerm}
        onChangeText={onSearchChange}
      />
      <TouchableOpacity style={styles.searchButton} onPress={onSearchPress}>
        <Text style={styles.searchButtonText}>Search</Text>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
    searchInput: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 8,
        borderRadius: 8,
        marginRight: 8,
      },
      searchButton: {
        backgroundColor: '#007bff',
        padding: 8,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
      },
      searchButtonText: {
        color: '#fff',
        fontWeight: 'bold',
      },
});

export default SearchBar;
