import React, {useState, useEffect} from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  Image,
  BackHandler,
} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
// import {useStripe} from '@stripe/stripe-react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useBackHandler} from '@react-native-community/hooks';
import {CardField, useStripe} from '@stripe/stripe-react-native';
import CheckoutPage from './CheckoutPage';
import PaymentScreen from './PaymentScreen';
import axios from 'axios';
const ModalComponent = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(true);
  const [amount, setAmount] = useState(10);
  const [currency, setCurrency] = useState('usd');
  // const {initPaymentSheet, presentPaymentSheet, confirmPaymentSheetPayment} =
  //   useStripe();
  const {
    initPaymentSheet,
    presentPaymentSheet,
    confirmPaymentSheetPayment,
    createToken,
  } = useStripe();

  const onCheckout = async () => {
    try {
      // 1. Create a payment intent
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

      const intentResponse = await axios.post(
        'https://smartluopan.com/api/check-out',
        payload,
        {headers},
      );

      console.log('intentResponse', intentResponse);

      if (intentResponse.data.status !== 200) {
        throw new Error(
          `Failed to create payment intent: ${intentResponse.data.message}`,
        );
      }

      // 2. Initialize the Payment Sheet
      // const {error: paymentSheetError} = await initPaymentSheet({
      const paymentStat = await initPaymentSheet({
        merchantDisplayName: 'Example, Inc.',
        customerId: intentResponse.data.customer,
        customerEphemeralKeySecret: intentResponse.data.ephemeralKey,
        paymentIntentClientSecret: intentResponse.data.paymentIntent,
        allowsDelayedPaymentMethods: true,
      });

      console.log('paymentErroraaya', paymentStat);

      // if (paymentSheetError) {
      //   throw new Error(
      //     `Payment Sheet initialization failed: ${paymentSheetError.message}`,
      //   );
      // }

      // 3. Present the Payment Sheet from Stripe
      const {error: paymentError} = await presentPaymentSheet();

      if (paymentError) {
        // throw new Error(
        //   `Payment Sheet presentation failed: ${paymentError.message}`,
        // );
        console.error('Payment Error:', paymentError);
        Alert.alert('Payment Error', paymentError.message);
      }

      // 4. Confirm the Payment
      // const {error: confirmError} = await confirmPaymentSheetPayment(
      //   intentResponse.data.paymentIntent,
      // );

      // if (confirmError) {
      //   throw new Error(`Payment confirmation failed: ${confirmError.message}`);
      // } else {
      //   await AsyncStorage.setItem('Subscription', 'true');
      //   checkSubscriptionStatus();
      //   Alert.alert('Success', 'Your order is confirmed!');
      // }

      const {error, paymentIntent} = await confirmPaymentSheetPayment();

      if (error) {
        // Handle the error
        console.error('Payment confirmation failed:', error.message);
      } else {
        // Handle the successful payment confirmation, and you can access paymentIntent.
        console.log(
          'Payment successfully confirmed. PaymentIntent:',
          paymentIntent,
        );
      }
    } catch (error) {
      console.log('An error occurred:', error.message);
      Alert.alert('Error', error.message);
    }
  };

  // function CheckoutScreen() {
  //   const {initPaymentSheet, presentPaymentSheet} = useStripe();
  //   const [loading, setLoading] = useState(false);

  //   const fetchPaymentSheetParams = async () => {
  //     const token = await AsyncStorage.getItem('access_token');
  //     const payload = {
  //       amount: Math.floor(amount * 100),
  //       currency: currency,
  //     };

  //     const headers = {
  //       'Content-Type': 'application/json',
  //       Authorization: `Bearer ${token}`,
  //     };
  //     const response = await fetch(
  //       'https://smartluopan.com/api/check-out',
  //       {
  //         method: 'POST',
  //         payload,
  //         headers,
  //       },
  //     );
  //     console.log(response, 'res');
  //     const {paymentIntent, ephemeralKey, customer} = await response.json();

  //     return {
  //       paymentIntent,
  //       ephemeralKey,
  //       customer,
  //     };
  //   };

  //   const initializePaymentSheet = async () => {
  //     const {paymentIntent, ephemeralKey, customer, publishableKey} =
  //       await fetchPaymentSheetParams();

  //     const {error} = await initPaymentSheet({
  //       merchantDisplayName: 'Example, Inc.',
  //       customerId: customer,
  //       customerEphemeralKeySecret: ephemeralKey,
  //       paymentIntentClientSecret: paymentIntent,
  //       // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
  //       //methods that complete payment after a delay, like SEPA Debit and Sofort.
  //       allowsDelayedPaymentMethods: true,
  //       defaultBillingDetails: {
  //         name: 'Jane Doe',
  //       },
  //     });
  //     if (!error) {
  //       setLoading(true);
  //     }
  //   };

  //   const openPaymentSheet = async () => {
  //     const {error} = await presentPaymentSheet();

  //     if (error) {
  //       Alert.alert(`Error code: ${error.code}`, error.message);
  //     } else {
  //       Alert.alert('Success', 'Your order is confirmed!');
  //     }
  //   };

  //   useEffect(() => {
  //     initializePaymentSheet();
  //   }, []);

  //   // return (
  //   //   <Screen>
  //   //     <Button
  //   //       variant="primary"
  //   //       disabled={!loading}
  //   //       title="Checkout"
  //   //       onPress={openPaymentSheet}
  //   //     />
  //   //   </Screen>
  //   // );
  // }

  const checkSubscriptionStatus = async () => {
    const hasSubscription = await AsyncStorage.getItem('Subscription');
    if (hasSubscription === 'true') {
      // User has an active subscription, navigate to the main screen
      navigation.navigate('Home');
    } else {
      // User does not have a subscription, show the subscription modal
      setModalVisible(true);
    }
  };

  // Call the checkSubscriptionStatus function when the user logs in
  // useEffect(() => {
  //   checkSubscriptionStatus();
  // }, []);

  // function backActionhandler() {
  //   Alert.alert('', 'Are you sure to exit the app ?', [
  //     {
  //       text: 'No',
  //       onPress: () => null,
  //       style: 'cancel',
  //     },
  //     {
  //       text: 'Yes',
  //       onPress: () => BackHandler.exitApp(),
  //       style: 'cancel',
  //     },
  //   ]);
  //   return true;
  // }

  // useBackHandler(backActionhandler);

  // const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
  //   // Check if you are on the main screen
  //   if (navigation.isFocused()) {
  //     // Display an exit confirmation dialog
  //     Alert.alert('Exit App', 'Are you sure you want to exit?', [
  //       {
  //         text: 'No',
  //         onPress: () => null,
  //         style: 'cancel',
  //       },
  //       {
  //         text: 'Yes',
  //         onPress: () => BackHandler.exitApp(),
  //         style: 'cancel',
  //       },
  //     ]);
  //     return true; // Prevent default back action
  //   }
  //   return false; // Default back action
  // });

  // Remove the back handler when the component unmounts
  //   return () => backHandler.remove();
  // }, [navigation];

  return (
    <View style={styles.centeredView}>
      <Image
        source={require('../assets/images/gradient.jpg')}
        resizeMode="cover"
        style={{width: '100%', height: '100%', flex: 1}}
      />
      <View style={{position: 'absolute'}}>
        <LinearGradient
          start={{x: 0, y: 1}}
          end={{x: 1, y: 0}}
          colors={['#A69EEC', '#EBBFD8', '#A69EEC']}
          style={styles.modalView}>
          <View style={{marginTop: responsiveHeight(6)}}>
            <Text style={styles.modalText}>Your First 3 months free</Text>
            {/* <Text
              style={[styles.modalSubText, {marginTop: responsiveHeight(0.7)}]}>
              No commitment. Cancel anytime{' '}
            </Text> */}
          </View>

          <View
            style={{
              width: responsiveWidth(70),
              height: responsiveHeight(7),
              backgroundColor: 'rgba(255,255,255,0.5)',
              borderRadius: responsiveWidth(2),
              justifyContent: 'space-around',
              flexDirection: 'row',
              marginTop: responsiveHeight(5),
            }}>
            <View
              style={{
                justifyContent: 'center',
                paddingHorizontal: responsiveWidth(3),

                borderRightWidth: 1,
                borderRightColor: '#A69EEC',
              }}>
              <Text style={styles.modalText}>12 Months VIP</Text>
              <Text style={styles.modalSubText}>Subscription</Text>
            </View>

            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                paddingHorizontal: responsiveWidth(3),
                borderRightWidth: 1,
                borderRightColor: '#A69EEC',
              }}>
              <Text
                style={[
                  styles.modalText,
                  {
                    textDecorationLine: 'line-through',
                    textDecorationColor: '#000',
                    color: 'rgba(0, 0, 0,0.5)',
                    fontSize: responsiveFontSize(1.6),
                  },
                ]}>
                $98
              </Text>
              <Text style={styles.modalText}>$68</Text>
            </View>

            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#61D370',
                borderTopRightRadius: responsiveWidth(2),
                borderBottomRightRadius: responsiveWidth(2),
              }}>
              <Text
                style={{
                  color: '#fff',
                  fontWeight: '700',
                  fontSize: responsiveFontSize(2),
                }}>
                30%
              </Text>
              <Text
                style={{
                  color: '#fff',
                  fontWeight: '700',
                  fontSize: responsiveFontSize(2),
                }}>
                OFF
              </Text>
            </View>
          </View>

          <Pressable
            style={{
              width: responsiveWidth(60),
              height: responsiveHeight(6),
              backgroundColor: '#A69EEC',
              borderRadius: responsiveWidth(10),
              marginTop: responsiveHeight(7),
              justifyContent: 'center',
              alignItems: 'center',
              shadowColor: '#000',
              elevation: 5,
            }}
            // onPress={onCheckout}
            onPress={() => navigation.navigate('PaymentScreen')}>
            <Text
              style={{
                color: '#fff',
                fontWeight: '800',
                fontSize: responsiveFontSize(2),
                letterSpacing: 1,
              }}>
              Subscribe
            </Text>
          </Pressable>

          {/* <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable> */}
        </LinearGradient>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    width: responsiveWidth(80),
    height: responsiveHeight(50),
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    fontSize: responsiveFontSize(2),
    textAlign: 'center',
    fontWeight: '700',
    color: '#000',
  },
  modalSubText: {
    fontSize: responsiveFontSize(1.8),
    textAlign: 'center',
    fontWeight: '400',
    color: '#000',
  },
});

export default ModalComponent;
