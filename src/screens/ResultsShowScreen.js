import React, { useState, useEffect } from 'react';
import { Image, View, Text, StyleSheet, FlatList } from 'react-native';
import api from '../services/api';

const ResultsShowScreen = ({ navigation }) => {
  const [result, setResult] = useState(null);

  const id = navigation.getParam('id');
  const getResult = async (id) => {
    const resp = await api.get(`/${id}`);
    setResult(resp.data);
  };

  useEffect(() => {
    getResult(id);
  }, []);

  if (!result) {
    return null;
  };


  return (
    <View>
      <Text>{result.name}</Text>
      <FlatList
        data={result.photos}
        keyExtractor={(item) => item}
        renderItem={({ item }) => 
          
          <Image
            style={styles.imageStyle}
            source={{ uri: item }}
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imageStyle: {
    height: 200,
    width: 300,
  },
});

export default ResultsShowScreen;