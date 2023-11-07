import React, {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';

import axios from 'axios';
import {
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const SignUpApi = async () => {
    setLoading(true);
    try {
      const Url = 'https://smartluopan.com/api/register';
      const Payload = {
        name: name,
        email: email,
        password: password,
      };

      const response = await axios.post(Url, Payload);
      // console.log(response.data);
      if (response.data.status === 201) {
        setStatus(true);
        setSuccess(response.data.message);
        setTimeout(() => {
          setLoading(false);
          setSuccess(null);
          navigation.navigate('Login');
        }, 2000);
      }
    } catch (error) {
      // console.log('register error', error.response.data.errors);
      // console.log(error.data.status);
      setStatus(false);
      if (error.response.data.status === 400) {
        if (
          error.response.data.errors.email[0] ===
          'The email has already been taken.'
        ) {
          setError(error.response.data.errors.email[0]);
          setTimeout(() => {
            setError(null);
            setLoading(false);
          }, 2000);
        } else {
          setError(error.response.data.message);
          setTimeout(() => {
            setError(null);
            setLoading(false);
          }, 2000);
        }
        // setStatus(response.data.status);
      }
    }
  };

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
            placeholder="Name"
            placeholderTextColor="gray"
            value={name}
            onChangeText={text => setName(text)}
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
            }}
          />

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
              marginTop: responsiveHeight(2),
              color: '#fff',
              shadowColor: '#fff',
              elevation: 1,
            }}
          />

          <TextInput
            placeholder="Password"
            placeholderTextColor="gray"
            value={password}
            secureTextEntry
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
            }}
          />

          {status ? (
            <View style={{marginTop: responsiveWidth(5)}}>
              <Text
                style={{
                  fontSize: responsiveFontSize(2),
                  fontWeight: '600',
                  color: 'green',
                  alignSelf: 'center',
                }}>
                {success}
              </Text>
            </View>
          ) : (
            <View style={{marginTop: responsiveWidth(5)}}>
              <Text
                style={{
                  fontSize: responsiveFontSize(2),
                  fontWeight: '600',
                  color: 'red',
                  alignSelf: 'center',
                }}>
                {error}
              </Text>
            </View>
          )}

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
            onPress={SignUpApi}>
            {loading ? (
              <ActivityIndicator size={'large'} color={'#A69EEC'} />
            ) : (
              <Text
                style={{
                  fontSize: responsiveFontSize(2.5),
                  fontWeight: '700',
                  color: '#0a2240',
                }}>
                SignUp
              </Text>
            )}
          </TouchableOpacity>
        </View>

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
            Do You Have Allready account ? {}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text
              style={{
                fontSize: responsiveFontSize(2),
                fontWeight: '500',
                color: '#fff',
                justifyContent: 'flex-end',
              }}>
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};

export default SignUp;
