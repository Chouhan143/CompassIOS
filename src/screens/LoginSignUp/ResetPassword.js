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
import Toast from 'react-native-toast-message';
import {useLogin} from '../utils/context/LoginProvider';

const ResetPassword = ({navigation}) => {
  const {setIsLoggedIn} = useLogin();
  const [password, setPassword] = useState('');

  const [cPassword, setCPassword] = useState('');

  const [oldPassword, setOldPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState('');

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('access_token');
      setIsLoggedIn(null);
      navigation.navigate('HomeScreen'); // Navigate to your logout screen
    } catch (error) {
      console.error('Error during logout:', error);
      // Handle error during logout, if necessary
    }
  };

  const resetPass = async () => {
    setLoading(true);
    try {
      const token = await AsyncStorage.getItem('access_token');
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };
      const Payload = {
        new_password: password,
        confirm_password: cPassword,
        old_password: oldPassword,
      };
      const res = await axios.post(
        'https://smartluopan.com/api/change-password',
        Payload,
        {headers},
      );

      if (res.data.message === 'Password updated successfully') {
        setLoading(false);
        const successMsg = res.data.message;
        handleLogout();
        Toast.show({
          type: 'success',
          text1: successMsg,
        });
      }
    } catch (error) {
      console.log(error.response, 'error');
      if (error.response && error.response.data && error.response.data.errors) {
        const validationErrors = error.response.data.errors;
        const errorMessages = Object.values(validationErrors).flat().join('\n');
        setError(errorMessages);
        Toast.show({
          type: 'error',
          text1: errorMessages,
        });
      } else {
        // Handle other types of errors
        console.error('An unexpected error occurred:', error.response);
        // const elseMessage = error.message;
        Toast.show({
          type: 'error',
          text1: 'An unexpected error occurred. Please try again.',
        });
      }
    } finally {
      setLoading(false);
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
          placeholder="Old Password"
          placeholderTextColor="gray"
          value={oldPassword}
          onChangeText={text => setOldPassword(text)}
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
          onPress={resetPass}>
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

export default ResetPassword;

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
