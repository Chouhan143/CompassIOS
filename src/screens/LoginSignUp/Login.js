import React, {useState, useEffect} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import useNetInfo from '../componrnts/useNetInfo';
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import {
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Text,
  BackHandler,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useLogin} from '../utils/context/LoginProvider';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailErr, setEmailErr] = useState(null);
  const [loading, setLoading] = useState(false);
  const netInfo = useNetInfo();
  //Login Api here
  const {setIsLoggedIn} = useLogin();
  // const {transactionFlag, setTransactionFlag} = useTransactionFlag();
  const LoginApi = async () => {
    setLoading(true);
    try {
      const Url = 'https://smartluopan.com/api/login';
      const Payload = {
        email: email,
        password: password,
      };
      const response = await axios.post(Url, Payload);
      if (response.status === 200) {
        const accessToken = response.data.access_token;
        const username = response.data.Name;
        const lastTransaction = response.data.last_transaction_status;
        await AsyncStorage.setItem('access_token', accessToken);
        await AsyncStorage.setItem('Name', username);
        setIsLoggedIn(accessToken);

        if (lastTransaction === 'No Transaction Found') {
          AsyncStorage.setItem('paymentStatus', JSON.stringify(false));
          navigation.navigate('ModalComponent');
        } else if (lastTransaction === 'Transaction is still valid') {
          // setTransactionFlag(true);
          AsyncStorage.setItem('paymentStatus', JSON.stringify(true));
          setTimeout(() => {
            setLoading(false);
            navigation.navigate('Home');
          }, 2000);
        } else if (lastTransaction === 'Transaction has expired') {
          AsyncStorage.setItem('paymentStatus', JSON.stringify(false));
          navigation.navigate('ModalComponent');
        }
      }
    } catch (error) {
      // console.log('error', error.response.data.errors);
      if (error.response.data.message === 'All Fields required!') {
        if (
          error.response.data.errors.password[0] ===
          'The password must be at least 8 characters.'
        ) {
          setEmailErr(error.response.data.errors.password[0]);
          setTimeout(() => {
            setEmailErr(null);
            setLoading(false);
          }, 2000);
        } else {
          setEmailErr(error.response.data.message);
          setTimeout(() => {
            setEmailErr(null);
            setLoading(false);
          }, 2000);
        }
      }
      if (error.response.data.message === 'Invalid Credentails') {
        setEmailErr(error.response.data.message);
        setTimeout(() => {
          setEmailErr(null);
          setLoading(false);
        }, 2000);
      }
    }
  };

  // useEffect(() => {
  //   // You can use the transactionFlag here
  //   if (transactionFlag) {
  //     // Do something when transactionFlag is true
  //     console.log('Transaction is valid');
  //     navigation.navigate('Home');
  //   } else {
  //     // Do something when transactionFlag is false
  //     console.log('Transaction is not valid');
  //     navigation.navigate('Login');
  //   }
  // }, [transactionFlag]);

  return (
    <LinearGradient
      start={{x: 1, y: 0}}
      end={{x: 0, y: 1}}
      colors={['#0a2240', '#0a2240']}
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'orange',
      }}>
      {netInfo ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
          }}>
          <Image
            source={require('../assets/images/LeoPanWhiteLogo.png')}
            style={{
              width: responsiveWidth(20),
              height: responsiveWidth(20),
              borderRadius: responsiveWidth(2),
            }}
          />

          <View style={{flex: 0.8, marginTop: responsiveHeight(12)}}>
            <TextInput
              placeholder="Email Address"
              placeholderTextColor="gray"
              value={email}
              onChangeText={text => setEmail(text)}
              style={{
                borderColor: '#fff',
                borderWidth: 2,
                width: responsiveWidth(75),
                height: responsiveHeight(6.5),
                borderRadius: responsiveWidth(50),
                paddingHorizontal: responsiveWidth(5),
                color: '#fff',
                shadowColor: '#fff',
                elevation: 1,
                fontSize: responsiveFontSize(1.6),
              }}
            />

            <TextInput
              placeholder="Password"
              placeholderTextColor="gray"
              value={password}
              secureTextEntry={true}
              onChangeText={text => setPassword(text)}
              style={{
                borderColor: '#fff',
                borderWidth: 2,
                width: responsiveWidth(75),
                height: responsiveHeight(6.5),
                borderRadius: responsiveWidth(50),
                paddingHorizontal: responsiveWidth(5),
                shadowColor: '#fff',
                elevation: 1,
                marginTop: responsiveHeight(2),
                color: '#fff',
                fontSize: responsiveFontSize(1.6),
              }}
            />

            <View
              style={{
                marginTop: responsiveWidth(5),
                // flexWrap: 'wrap',
                // alignItems: 'center', // Center the content horizontally
              }}>
              <Text
                style={{
                  fontSize: responsiveFontSize(1.8),
                  fontWeight: '600',
                  color: 'red',
                  alignSelf: 'center', // Center the text within the parent View
                }}>
                {emailErr}
              </Text>
            </View>

            <TouchableOpacity
              style={{
                borderColor: '#0a2240',
                borderWidth: 2,
                width: responsiveWidth(75),
                height: responsiveHeight(6.5),
                borderRadius: responsiveWidth(50),
                paddingHorizontal: responsiveWidth(5),
                shadowColor: '#A69EEC',
                backgroundColor: '#fff',
                elevation: 5,
                marginTop: responsiveHeight(4),
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={LoginApi}>
              {loading ? (
                <ActivityIndicator size={'large'} color={'#A69EEC'} />
              ) : (
                <Text
                  style={{
                    fontSize: responsiveFontSize(2.5),
                    fontWeight: '700',
                    color: '#0a2240',
                  }}>
                  Login
                </Text>
              )}
            </TouchableOpacity>

            <View
              style={{
                flex: 0.2,
                marginTop: responsiveHeight(3),
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
              }}>
              <Text
                style={{
                  fontSize: responsiveFontSize(2),
                  fontWeight: '500',
                  color: 'gray',
                }}>
                account Create first ? {}
              </Text>
              <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                <Text
                  style={{
                    fontSize: responsiveFontSize(2),
                    fontWeight: '500',
                    color: '#fff',
                    justifyContent: 'flex-end',
                  }}>
                  SignUp
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <MaterialCommunityIcons
            name="wifi-off"
            color="white"
            size={responsiveWidth(10)}
          />
          <Text style={{color: 'white'}}>No Connection Found ...</Text>
        </View>
      )}
    </LinearGradient>
  );
};

export default Login;
