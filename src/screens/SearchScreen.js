import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SearchBar from '../components/SearchBar';
import api from '../services/api';

const SearchScreen = () => {
  const [term, setTerm] = useState('');
  const [results, setResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const searchApi = async (searchTerm) => {
    try {
      const resp = await api.get('/search', {
        params: {
          term: searchTerm,
          location: 'New York',
          limit: 50,
        },
      });
      setResults(resp.data.businesses);
    } catch (err) {
      setErrorMessage('not right!!');
    }
  };

  return (
    <View>
      <Text>Search Screen</Text>
      <SearchBar
        term={term}
        onTermChange={setTerm}
        onTermSubmit={()=>searchApi(term)}
      />
      <Text>We have found {results.length} results</Text>
      <Text>{errorMessage}</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export default SearchScreen;