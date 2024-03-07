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
// import {TextInput} from 'react-native-gesture-handler';c
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ForgotPasswordOtp = ({navigation}) => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const forgotPass = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('access_token');
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };
      const Payload = {
        otp: otp,
      };
      const res = await axios.post(
        'https://smartluopan.com/api/otp-verify',
        Payload,
        {headers},
      );
      console.log(res.data);
      const result = res.data;
      if (result.status === 200) {
        const accessToken = result.token;
        console.log('token2', accessToken);
        await AsyncStorage.setItem('access_token2', accessToken);
        setTimeout(() => {
          setLoading(false);
          navigation.navigate('ForgotNewPassword');
        }, 2000);
      }
    } catch (error) {
      console.log(error.response.data);
      if (error.response.data.status === 401) {
        const errorMessage = error.response.data.message;
        setError(errorMessage);
      } else if (error.response.data.status === 400) {
        const otp = error.response.data.errors.otp[0];
        setError(otp);
        setLoading(false);
      }
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#ffff'}}>
      <View style={{flex: 0.3}}>
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
            height: responsiveHeight(20),
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
          Enter Your Otp Here.
        </Text>

        <TextInput
          placeholder="Enter Otp"
          placeholderTextColor="gray"
          value={otp}
          onChangeText={text => setOtp(text)}
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
            marginVertical: responsiveHeight(1),
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
              Submit Otp
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ForgotPasswordOtp;

const styles = StyleSheet.create({
  radiusContainer: {
    borderTopLeftRadius: responsiveWidth(8),
    borderTopRightRadius: responsiveWidth(8),
    flex: 0.7,
    backgroundColor: '#0a2240',
    paddingHorizontal: responsiveWidth(3),
    // justifyContent: 'center',
  },
});
