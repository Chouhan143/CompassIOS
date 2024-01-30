import React, {useRef, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
  responsiveWidth,
  responsiveHeight,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import Modal from 'react-native-modal';
import Video from 'react-native-video';
import axios from 'axios';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  StyleSheet,
  Button,
  StatusBar,
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
  const [isVideoPlaying, setVideoPlaying] = useState(false);
  const [isVideoModalVisible, setVideoModalVisible] = useState(false);
  // const videoRef = useRef(null);
  const navigation = useNavigation();
  const [videoRef, setVideoRef] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  // const handleWatchDemoVideo = () => {
  //   setVideoPlaying(!isVideoPlaying);
  // };

  const handleWatchDemoVideo = () => {
    setModalVisible(true);
    setVideoPlaying(true);
  };

  const handleCloseVideo = () => {
    setModalVisible(false);
  };

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
              fontSize: responsiveFontSize(1.6),
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
              fontSize: responsiveFontSize(1.6),
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
              fontSize: responsiveFontSize(1.6),
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
        <TouchableOpacity
          style={{
            marginTop: responsiveHeight(5),
            borderWidth: responsiveWidth(0.3),
            borderColor: '#fff',
            borderRadius: responsiveWidth(0.3),
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: responsiveWidth(42),
            height: responsiveHeight(4),
            paddingHorizontal: responsiveWidth(2),
          }}
          onPress={handleWatchDemoVideo}>
          <Text style={{color: '#fff'}}>Watch Demo Video</Text>
          <AntDesign name={'arrowright'} color={'#fff'} />
        </TouchableOpacity>
      </View>

      {/* {isVideoPlaying && (
        <Video
          controls={true}
          source={require('../assets/DemoVideo/Demo.mp4')} // Can be a URL or a local file.
          ref={videoRef}
          onBuffer={this.onBuffer} // Callback when remote video is buffering
          onError={this.videoError} // Callback when video cannot be loaded
          style={styles.backgroundVideo}
          // resizeMode={'contain'}
        />
      )} */}

      <View style={{flex: 1}}>
        <Modal isVisible={isModalVisible}>
          <View style={{flex: 1}}>
            <Video
              controls={true}
              source={require('../assets/DemoVideo/Demo.mp4')} // Can be a URL or a local file.
              ref={videoRef}
              onBuffer={this.onBuffer} // Callback when remote video is buffering
              onError={this.videoError} // Callback when video cannot be loaded
              style={styles.backgroundVideo}
              resizeMode={'contain'}
            />
            {/* <Button
              style={styles.closeButton}
              title="Hide modal"
              onPress={handleCloseVideo}
            /> */}

            <TouchableOpacity
              style={{flex: 1, alignSelf: 'flex-end'}}
              onPress={handleCloseVideo}>
              <AntDesign
                name={'closecircle'}
                color={'#fff'}
                size={responsiveFontSize(3)}
              />
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    </LinearGradient>
  );
};

export default SignUp;

var styles = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    width: '100%',
    height: responsiveHeight(80),
    top: 40,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
});
