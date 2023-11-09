import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  BackHandler,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import React, {useEffect} from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {useNavigation} from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const backAction = () => {
      BackHandler.exitApp(); // Exit the app
      return true; // Prevent default behavior (i.e., do not navigate back)
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove(); // Clean up the event listener on unmount
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar
        backgroundColor="#000080" // Set the status bar background color to match your SafeAreaView
        barStyle="dark-content" // Set the status bar text color
      />

      <View style={styles.container}>
        {/* Background Image */}

        {/* Other Components */}
        <View style={styles.content}>
          <Text style={styles.textHeading}>WELCOME BACK</Text>
          <Text style={styles.textSubHeading}>
            Let Your dreams be your compass
          </Text>
          {/* Add more components here */}
        </View>
        <View style={styles.backgroundImage}>
          <Image
            source={require('../assets/images/LuoPanImage.jpeg')}
            resizeMode="stretch" // You can use 'cover' to fill the entire view
            style={{
              width: responsiveWidth(100),
              height: responsiveHeight(100),
              flex: 0.9,
            }}
          />
        </View>
        <View style={styles.content2}>
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

              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => navigation.navigate('Login')}>
            <Text
              style={{
                fontSize: responsiveFontSize(2.5),
                fontWeight: '700',
                color: '#0a2240',
              }}>
              Login
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              borderColor: '#0a2240',
              borderWidth: 2,
              width: responsiveWidth(75),
              height: responsiveHeight(6.5),
              borderRadius: responsiveWidth(50),
              paddingHorizontal: responsiveWidth(5),
              marginTop: responsiveHeight(1),
              shadowColor: '#A69EEC',
              backgroundColor: '#0a2240',
              elevation: 5,

              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => navigation.navigate('SignUp')}>
            <Text
              style={{
                fontSize: responsiveFontSize(2.5),
                fontWeight: '700',
                color: '#fff',
              }}>
              SignUp
            </Text>
          </TouchableOpacity>

          {/* Add more components here */}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',

    // position: 'absolute', // To layer it behind other components
  },
  content: {
    flex: 0.2,
    alignItems: 'center',
    paddingTop: responsiveHeight(5),
    // justifyContent: 'center',
  },
  content2: {
    flex: 0.3,
    alignItems: 'center',
    justifyContent: 'flex-end',
    // marginBottom: responsiveHeight(1),
  },
  textHeading: {
    fontSize: responsiveFontSize(3),
    fontWeight: '800',
    color: '#000',
    letterSpacing: responsiveWidth(1),
  },
  textSubHeading: {
    fontSize: responsiveFontSize(2.5),
    fontWeight: '500',
    color: '#000',
  },
  textSignUp: {
    fontSize: responsiveFontSize(2),
    fontWeight: '700',
    color: '#f57f17',
  },
  text: {
    fontSize: responsiveFontSize(3),
    fontWeight: '800',
    color: '#000',
  },
});
