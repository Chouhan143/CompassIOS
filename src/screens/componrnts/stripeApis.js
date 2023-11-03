import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const createPaymentIntent = async data => {
  try {
    // Retrieve the access token from AsyncStorage
    const token = await AsyncStorage.getItem('access_token');

    if (!token) {
      throw new Error('Access token is missing or invalid.');
    }

    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.post(
      'https://app.srninfotech.com/compass/api/check-out',
      data,
      {
        headers,
      },
    );

    return response.data; // Assuming the API response contains the data you need
  } catch (error) {
    throw error;
  }
};

export default createPaymentIntent;
