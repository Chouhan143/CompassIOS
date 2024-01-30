import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import {useStripe, useConfirmPayment} from '@stripe/stripe-react-native';

import {CardField, createToken} from '@stripe/stripe-react-native';
import createPaymentIntent from './stripeApis';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ButtonComp from './ButtonComp';
import SuccessModal from './SuccessModal';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import axios from 'axios';
const PaymentScreen = () => {
  const [amount, setAmount] = useState(0);
  // const [subAmount, setSubAmount] = useState(0);
  const {confirmPayment, loading} = useConfirmPayment();
  const [cardInfo, setCardInfo] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorPayment, setErrorPayment] = useState('');
  const fetchCardDetail = cardDetail => {
    // console.log("my card details",cardDetail)
    if (cardDetail.complete) {
      setCardInfo(cardDetail);
    } else {
      setCardInfo(null);
    }
  };

  const handlePaymentSuccess = () => {
    // Perform payment logic here

    // Open the success modal after payment
    setModalVisible(true);
    setIsLoading(false);
  };

  const closeModal = () => {
    // Close the success modal
    setModalVisible(false);
  };

  // const ondone = async () => {
  //   const rest = await createToken({...cardInfo, type: 'Card'});
  //   console.log('dsdfdsf', rest);
  // };

  useEffect(() => {
    const fetchAmount = async () => {
      try {
        const storedAmount = await AsyncStorage.getItem('amount');
        const subscriptionAmount = parseFloat(storedAmount) || 0;
        setAmount(subscriptionAmount);
      } catch (error) {
        console.error('Error fetching amount:', error);
      }
    };
    fetchAmount();
  }, []);

  const ondone = async () => {
    setIsLoading(true);
    try {
      const apiData = {
        amount: Math.floor(amount * 100),
        currency: 'usd',
      };

      const res = await createPaymentIntent(apiData);

      if (!res?.paymentIntentClient?.client_secret) {
        // Handle the case where no client secret is received
        return;
      }

      const confirmPaymentIntent = await confirmPayment(
        res.paymentIntentClient.client_secret,
        {
          paymentMethodType: 'Card',
        },
      );

      // console.log('dsdfdsf', confirmPaymentIntent);

      if (confirmPaymentIntent?.paymentIntent?.status === 'Succeeded') {
        // Payment succeeded, proceed with further actions
        const payload = {
          transaction_id: confirmPaymentIntent.paymentIntent.paymentMethodId,
          amount: confirmPaymentIntent.paymentIntent.amount,
          currency: confirmPaymentIntent.paymentIntent.currency,
          payment_intent: confirmPaymentIntent.paymentIntent.id,
          transaction_status: confirmPaymentIntent.paymentIntent.status,
        };

        const token = await AsyncStorage.getItem('access_token');

        const headers = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        };

        const transactionStore = await axios.post(
          'https://smartluopan.com/api/transaction-store',
          payload,
          {headers},
        );

        // Handle the success of the transactionStore request here
        console.log('Transaction Store Response:', transactionStore);

        // Call the success handling function
        handlePaymentSuccess();
      } else {
        // Handle the case where payment did not succeed
        console.log(
          'Payment not successful',
          confirmPaymentIntent?.paymentIntent?.status,
        );
        setErrorPayment('Invalid User Card Information');
        setIsLoading(false);
      }
    } catch (error) {
      // Handle any errors that occur during the payment process
      console.error('Error raised during payment intent', error);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        padding: 16,
        backgroundColor: `rgba(255,255,255,0.3)`,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View>
        <Image
          source={require('../assets/images/card.png')}
          resizeMode="contain"
        />
      </View>
      <View style={{justifyContent: 'flex-start', alignSelf: 'flex-start'}}>
        <Text
          style={{
            color: '#000',
            fontSize: responsiveFontSize(2),
            fontWeight: '600',
          }}>
          Enter your Card Details
        </Text>
      </View>

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
          borderRadius: 2,
        }}
        onCardChange={cardDetails => {
          fetchCardDetail(cardDetails);
          console.log(cardDetails, 'cardDetails');
        }}
        onFocus={focusedField => {
          console.log('focusField', focusedField);
        }}
      />
      <View style={{marginVertical: responsiveHeight(2)}}>
        <Text style={{color: 'red', fontSize: responsiveFontSize(1.8)}}>
          {errorPayment}
        </Text>
      </View>
      <ButtonComp onPress={ondone} disabled={!cardInfo} isLoading={isLoading} />
      <SuccessModal visible={isModalVisible} closeModal={closeModal} />
    </View>
  );
};

export default PaymentScreen;
