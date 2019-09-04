import { useEffect, useState } from 'react';
import api from '../services/api';

export default () => {
  const [results, setResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  
  const searchApi = async (searchTerm) => {
    console.log('searched!');
    
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
      console.log(err);
    }
  };

  useEffect(() => {
    searchApi('taco');
  }, []);

  return [searchApi, results, errorMessage];
};