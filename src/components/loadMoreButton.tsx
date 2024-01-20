import React from 'react';
import {
  TouchableOpacity,
  ActivityIndicator,
  Text,
  StyleSheet,
} from 'react-native';

interface LoadMoreButtonProps {
  loading: boolean;
  onPress: () => void;
}

const LoadMoreButton: React.FC<LoadMoreButtonProps> = ({loading, onPress}) => {
  return (
    <TouchableOpacity style={styles.loadMoreButton} onPress={onPress}>
      {loading ? (
        <ActivityIndicator style={styles.loadMoreButtonText} />
      ) : (
        <Text style={styles.loadMoreButtonText}>Load More</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  loadMoreButton: {
    backgroundColor: '#007bff',
    width: 300,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  loadMoreButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    padding: 12,
    justifyContent: 'center',
  },
});

export default LoadMoreButton;
