import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ForgotPassword = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const forgotPass = async () => {
    setLoading(true);
    try {
      const res = await axios.post(
        'https://smartluopan.com/api/forget-password',
        {email: email},
      );
      console.log(res.data);
      const result = res.data;
      if (result.status === 200) {
        setLoading(false);
        const accessToken = result.token;
        console.log(accessToken, 'token1');
        await AsyncStorage.setItem('access_token', accessToken);
        navigation.navigate('ForgotPasswordOtp');
      }
    } catch (error) {
      console.log(error.response.data, 'error');
      const setErr = error.response.data.errors.email[0];
      console.log(setErr, 'dfdf');
      setError(setErr);
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#ffff'}}>
      <View style={{flex: 0.4}}>
        {/* <Text
          style={{
            color: '#000',
            fontSize: responsiveFontSize(2),
            fontWeight: '700',
            margin: responsiveHeight(2),
          }}>
          Enter Your Register Email Address.
        </Text> */}
        <Image
          resizeMode="contain"
          source={require('../assets/images/lock.png')}
          style={{
            width: responsiveWidth(100),
            height: responsiveHeight(30),
            marginTop: responsiveHeight(4),
          }}
        />
      </View>
      <View style={styles.radiusContainer}>
        <Text
          style={{
            color: '#fff',
            fontSize: responsiveFontSize(2),
            fontWeight: '700',
            margin: responsiveHeight(4),
          }}>
          Enter Your Register Email Address.
        </Text>

        <TextInput
          placeholder="Email Address"
          placeholderTextColor="gray"
          value={email}
          onChangeText={text => setEmail(text)}
          style={{
            borderColor: '#fff',
            borderWidth: 2,
            width: responsiveWidth(75),
            height: responsiveHeight(7),
            borderRadius: responsiveWidth(50),
            paddingHorizontal: responsiveWidth(5),
            color: '#fff',
            shadowColor: '#fff',
            elevation: 1,
            fontSize: responsiveFontSize(1.6),
            marginLeft: responsiveHeight(4),
          }}
        />

        <View
          style={{
            marginTop: responsiveHeight(1),
          }}>
          <Text
            style={{
              color: 'red',
              fontSize: responsiveFontSize(2),
              alignSelf: 'center',
            }}>
            {error}
          </Text>
        </View>

        <TouchableOpacity
          style={{
            backgroundColor: '#fff',
            borderWidth: 2,
            width: responsiveWidth(75),
            height: responsiveHeight(7),
            borderRadius: responsiveWidth(50),
            paddingHorizontal: responsiveWidth(5),
            color: '#fff',
            shadowColor: '#fff',
            elevation: 1,
            fontSize: responsiveFontSize(1.6),
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            marginTop: responsiveHeight(5),
          }}
          // onPress={forgotPass}
          onPress={forgotPass}>
          {loading ? (
            <ActivityIndicator size={'large'} color={'#A69EEC'} />
          ) : (
            <Text
              style={{
                fontSize: responsiveFontSize(2),
                fontWeight: '700',
                color: '#000',
              }}>
              Send Otp
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  radiusContainer: {
    borderTopLeftRadius: responsiveWidth(8),
    borderTopRightRadius: responsiveWidth(8),
    flex: 0.6,
    backgroundColor: '#0a2240',
    paddingHorizontal: responsiveWidth(3),
    // justifyContent: 'center',
  },
});
