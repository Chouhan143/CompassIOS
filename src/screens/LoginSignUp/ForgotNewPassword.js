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
import Toast from 'react-native-toast-message';
// import {TextInput} from 'react-native-gesture-handler';c
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ForgotNewPassword = ({navigation}) => {
  const [password, setPassword] = useState('');
  const [cPassword, setCPassword] = useState('');
  const [error, setError] = useState('');
  const [newPaasError, setNewPassError] = useState('');
  const [ConfPassError, setConfPassError] = useState('');
  const [loading, setLoading] = useState(false);

  const forgotPass = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('access_token2');
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };
      const Payload = {
        new_password: password,
        confirm_password: cPassword,
      };
      const res = await axios.post(
        'https://smartluopan.com/api/password-change',
        Payload,
        {headers},
      );

      console.log(res.data);
      if (res.data.status === 200) {
        const successMsg = res.data.message;

        setTimeout(() => {
          Toast.show({
            type: 'success',
            text1: successMsg,
          });

          navigation.navigate('Login');
        }, 2000);
      }
    } catch (error) {
      console.log(error.response.data, 'error');
      if (error.response.data.status === 400) {
        const new_password = error.response.data.errors.new_password[0];
        const confirm_password = error.response.data.errors.confirm_password[0];
        setNewPassError(new_password);
        setConfPassError(confirm_password);
      } else if (error.response.data.message === 'Validation Failed!') {
        const confirm_password = error.response.data.errors.confirm_password[0];
        setConfPassError(confirm_password);
      } else if (error.response.data.status === 401) {
        const errorMessage = error.response.data.message;
        setConfPassError(errorMessage);
      }
    } finally {
      setLoading(false); // Set loading to false in both success and error cases
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
          Enter Your old password and new passowrd Here.
        </Text>

        <TextInput
          placeholder="New Password"
          placeholderTextColor="gray"
          value={password}
          onChangeText={text => setPassword(text)}
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
          style={
            {
              // marginTop: responsiveHeight(1),
            }
          }>
          <Text
            style={{
              color: 'red',
              fontSize: responsiveFontSize(2),
              alignSelf: 'center',
            }}>
            {newPaasError}
          </Text>
        </View>
        <TextInput
          placeholder="Confirm Password"
          placeholderTextColor="gray"
          value={cPassword}
          onChangeText={text => setCPassword(text)}
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
          style={
            {
              // marginTop: responsiveHeight(1),
            }
          }>
          <Text
            style={{
              color: 'red',
              fontSize: responsiveFontSize(2),
              alignSelf: 'center',
            }}>
            {ConfPassError}
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
              Reset Password
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ForgotNewPassword;

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
