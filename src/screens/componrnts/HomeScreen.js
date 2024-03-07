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
import AntDesign from 'react-native-vector-icons/AntDesign';

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

  const DemoScreen = () => {
    navigation.navigate('DemoBottomTabNavigator');
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar
        backgroundColor="#000080" // Set the status bar background color to match your SafeAreaView
        barStyle="dark-content" // Set the status bar text color
      />

      <View style={styles.container}>
        {/* Background Image */}

        {/* Other Components */}
        {/* <View style={styles.content}>
          <Text style={styles.textHeading}>WELCOME BACK</Text>
          <Text style={styles.textSubHeading}>
            Navigate Your Dreams with SmartLuoPan
          </Text>
          <Text style={styles.textSubHeading}>
            Where Ambitions Find Direction
          </Text>
        </View> */}
        {/* Add more components here */}
        <View style={styles.content}>
          <TouchableOpacity
            style={{
              marginTop: responsiveHeight(2),
              borderWidth: responsiveWidth(0.5),
              borderColor: '#FFD700',
              borderRadius: responsiveWidth(0.3),
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              alignSelf: 'flex-end',
              width: responsiveWidth(35),
              height: responsiveHeight(6),
              paddingHorizontal: responsiveWidth(2),
              marginRight: responsiveWidth(5),
              borderRadius: responsiveWidth(1),
            }}
            onPress={DemoScreen}>
            <Text
              style={{
                color: '#000',
                fontSize: responsiveFontSize(2.4),
                fontWeight: '600',
              }}>
              Try Demo
            </Text>
            <AntDesign
              name={'arrowright'}
              color={'#000'}
              size={responsiveFontSize(3)}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.backgroundImage}>
          <Image
            source={require('../assets/images/LuoPanImage.jpeg')}
            resizeMode="stretch" // You can use 'cover' to fill the entire view
            style={{
              width: responsiveWidth(100),
              height: responsiveHeight(100),
              flex: 1,
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
    paddingTop: responsiveHeight(3),
    // justifyContent: 'center',
  },
  content2: {
    flex: 0.3,
    alignItems: 'center',
    justifyContent: 'flex-end',
    // marginBottom: responsiveHeight(1),
  },
  textHeading: {
    fontSize: responsiveFontSize(2.5),
    fontWeight: '800',
    color: '#000',
    letterSpacing: responsiveWidth(0.8),
  },
  textSubHeading: {
    fontSize: responsiveFontSize(1.8),
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
