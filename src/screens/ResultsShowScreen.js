import React, { useState, useEffect } from 'react';
import { Image, View, Text, StyleSheet, FlatList, Linking, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
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
      <Text style={styles.name}>{result.name}</Text>
      <View style={styles.phone}>
        <FontAwesome name='mobile-phone' style={styles.iconStyle} />
        <Text style={styles.text}>{result.phone}</Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          console.log('add link clicked!!');
          Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${result.coordinates.latitude}+${result.coordinates.longitude}`)
        }
        }>
        <View
          style={styles.phone}
        >
          <FontAwesome name='home' style={styles.iconStyle} />
          <Text style={styles.text}>{result.location.display_address.join(" ")}</Text>
        </View>
      </TouchableOpacity>

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
  iconStyle: {
    fontSize: 35,
    alignSelf: 'center',
    marginHorizontal: 15,
  },
  phone: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    marginTop: 10,
  },
  text: {
    alignSelf: 'flex-end',
    fontSize: 16,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 20,
    alignSelf: 'center',
  },
});

export default ResultsShowScreen;