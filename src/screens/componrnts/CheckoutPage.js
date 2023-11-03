import React, {useState} from 'react';
import {View, Button, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {CardField, useConfirmPayment} from '@stripe/stripe-react-native';

function CheckoutPage() {
  const [loading, setLoading] = useState(false);
  const {confirmPayment} = useConfirmPayment();
  const [amount, setAmount] = useState('10');
  const [currency, setCurrency] = useState('usd');

  const fetchPaymentIntentClientSecret = async () => {
    try {
      const token = await AsyncStorage.getItem('access_token');

      if (!token) {
        throw new Error('Access token not found');
      }

      const payload = {
        amount: Math.floor(amount * 100),
        currency: currency,
      };

      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.post(
        'https://app.srninfotech.com/compass/api/check-out',
        payload,
        {headers},
      );

      console.log(response, 'success');
      // if (response.data.status !== 200) {
      //   throw new Error('Failed to create payment intent');
      // }

      // const data = response.data;

      // if (!data.paymentIntent) {
      //   throw new Error('Payment intent not found in the response');
      // }

      return data.paymentIntent;
    } catch (error) {
      console.error('An error occurred:', error);
      Alert.alert('Error', error.message);
      return null; // Handle the error gracefully
    }
  };

  const handlePayPress = async () => {
    setLoading(true);

    try {
      // Fetch the intent client secret from the backend.
      const clientSecret = await fetchPaymentIntentClientSecret();

      if (clientSecret) {
        // Confirm the payment with the card details
        const {paymentIntent, error} = await confirmPayment(clientSecret);

        if (error) {
          console.log('Payment confirmation error', error);
          Alert.alert('Payment Error', error.message);
        } else if (paymentIntent) {
          console.log('Payment successful', paymentIntent);
          Alert.alert('Success', 'Payment successful!');
        }
      }
    } catch (error) {
      console.error('An error occurred:', error);
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View>
      <View>
        <CardField
          postalCodeEnabled={false}
          placeholders={{
            number: '4242 4242 4242 4242',
          }}
          cardStyle={{
            backgroundColor: '#FFFFFF',
            textColor: '#000000',
          }}
          style={{
            width: '100%',
            height: 50,
            marginVertical: 30,
          }}
          onCardChange={cardDetails => {
            console.log('cardDetails', cardDetails);
          }}
          onFocus={focusedField => {
            console.log('focusField', focusedField);
          }}
        />
      </View>
      <Button onPress={handlePayPress} title="Pay" disabled={loading} />
    </View>
  );
}

export default CheckoutPage;
