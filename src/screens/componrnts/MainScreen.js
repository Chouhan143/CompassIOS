import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  BackHandler,
  StyleSheet,
  Alert,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Font5 from 'react-native-vector-icons/FontAwesome5';
import Icon4 from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import LinearGradient from 'react-native-linear-gradient';
import SubscriptionModal from './SubscriptionModal';
import CustomSideMenu from './CustomSideMenu';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useLogin} from '../utils/context/LoginProvider';

const MainScreen = ({navigation}) => {
  const [userName, setUserName] = useState('');
  const {setIsLoggedIn} = useLogin();
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

  // console.log()

  const options = [
    {
      compasId: 1,
      name: '24 Mountains Compass ',
      imageSource: require('../assets/images/1st_White.png'),
      imageSource2: require('../assets/images/1st_Black.png'),
    },
    {
      name: 'Annual Ring 2024',
      imageSource: require('../assets/images/Basic.png'),
      imageSource2: require('../assets/images/Basic.png'),
    },
    {
      name: 'Period 8 & Period 9 Flying Star LuoPan',
      imageSource: require('../assets/images/amit2.png'),
      imageSource2: require('../assets/images/amit2.png'),
    },
    {
      compasId2: 3,
      name: 'Xuan Kong Da Gua Rings ',
      imageSource: require('../assets/images/KongDaB.png'),
      imageSource2: require('../assets/images/KongDaB.png'),
    },

    {
      name: 'Transparent version',
      imageSource: require('../assets/images/kigi.png'),
      imageSource2: require('../assets/images/kigi.png'),
    },

    {
      name: 'Annual Ring 2023',
      imageSource: require('../assets/images/AnnualRing2023.png'),
      imageSource2: require('../assets/images/AnnualRing2023.png'),
    },
  ];

  const handleLogout = async () => {
    // Show a confirmation dialog before logging out
    Alert.alert(
      'Logout Confirmation',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          onPress: async () => {
            // Clear the token from AsyncStorage
            await AsyncStorage.removeItem('access_token');
            setIsLoggedIn(null);
            // navigation.navigate('HomeScreen'); // Navigate to your logout screen
            navigation.navigate('HomeScreen'); // Navigate to your logout screen
          },
        },
      ],
      {cancelable: false}, // Prevent dismissing the dialog by tapping outside of it
    );
  };

  useEffect(() => {
    async function fetchUserName() {
      const storedUserName = await AsyncStorage.getItem('Name');
      if (storedUserName) {
        setUserName(storedUserName);
      }
    }
    fetchUserName();
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#0a2240',
      }}>
      <StatusBar
        backgroundColor="#0a2240" // Set the status bar background color to match your SafeAreaView
        barStyle="light-content" // Set the status bar text color
      />
      <View style={styles.name_sec}>
        <View
          style={{flex: 1, justifyContent: 'center', alignItems: 'flex-end'}}>
          <TouchableOpacity
            style={styles.name_sec_user}
            onPress={() => navigation.navigate('CustomSideMenu')}>
            <Font5
              name="user-alt"
              size={responsiveWidth(5)}
              color="#000"
              solid
            />
          </TouchableOpacity>
        </View>
        <View style={{flex: 4.5, flexDirection: 'row'}}>
          <View
            style={{
              flex: 1.2,
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: responsiveFontSize(2),
                color: '#fff',
                marginLeft: responsiveWidth(1),
                paddingLeft: responsiveWidth(2.5),
              }}>
              Hii,
            </Text>
            <Text style={styles.name_txt}>{userName}</Text>
          </View>
        </View>
        <View style={styles.name_sec_icon}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Ebook')}
            style={{paddingRight: responsiveWidth(3)}}>
            <SimpleLineIcons name="notebook" size={20} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLogout}>
            <Icon4 name="logout" size={25} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      <View
        style={{
          flex: 1,
          backgroundColor: '#f8f9f5',
          borderTopLeftRadius: responsiveWidth(12),
          borderTopRightRadius: responsiveWidth(12),
          paddingTop: responsiveHeight(2.5),
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              gap: 10,
            }}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('CompassOverlay', {option: options[0]})
              }>
              <LinearGradient
                start={{x: 0, y: 1}}
                end={{x: 1, y: 0}}
                colors={['#eaf4fc', '#eaf4fc', '#eaf4fc']}
                style={{
                  width: responsiveWidth(45),
                  height: responsiveHeight(25),
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: responsiveWidth(3),
                  shadowColor: responsiveHeight(5),
                  elevation: 5,
                }}>
                <Image
                  source={options[0].imageSource2}
                  style={{
                    flex: 1,
                    width: responsiveWidth(100),
                    height: responsiveWidth(100),
                    resizeMode: 'contain',
                  }}
                />

                <View style={{flex: 0.5}}>
                  <Text
                    style={{
                      fontSize: responsiveFontSize(1.7),
                      fontWeight: '600',
                      color: '#000',
                      marginTop: responsiveHeight(1.5),
                      paddingHorizontal: responsiveWidth(2),
                    }}
                    numberOfLines={2}>
                    {options[0].name}
                  </Text>
                  {/* <Text
                  style={{
                    fontSize: responsiveFontSize(1.5),
                    fontWeight: '400',
                    color: '#000',
                    marginTop: responsiveHeight(1),
                    paddingHorizontal: responsiveWidth(2),
                  }}
                  numberOfLines={3}>
                  {options[0].description}
                </Text> */}
                </View>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                navigation.navigate('CompassOverlay', {option: options[1]})
              }>
              <LinearGradient
                start={{x: 0, y: 1}}
                end={{x: 1, y: 0}}
                colors={['#eaf4fc', '#eaf4fc', '#eaf4fc']}
                style={{
                  width: responsiveWidth(45),
                  height: responsiveHeight(25),
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: responsiveWidth(3),
                  shadowColor: responsiveHeight(5),
                  elevation: 5,
                }}>
                <Image
                  source={options[1].imageSource}
                  style={{
                    width: responsiveWidth(100),
                    height: responsiveWidth(100),
                    resizeMode: 'contain',
                    flex: 1,
                  }}
                />

                <View style={{flex: 0.5}}>
                  <Text
                    style={{
                      fontSize: responsiveFontSize(1.7),
                      fontWeight: '600',
                      color: '#000',
                      marginTop: responsiveHeight(1.5),
                      paddingHorizontal: responsiveWidth(2),
                    }}
                    numberOfLines={2}>
                    {options[1].name}
                  </Text>
                  {/* <Text
                  style={{
                    fontSize: responsiveFontSize(1.5),
                    fontWeight: '400',
                    color: '#000',
                    marginTop: responsiveHeight(1),
                    paddingHorizontal: responsiveWidth(2),
                  }}
                  numberOfLines={3}>
                  {options[1].description}
                </Text> */}
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
        {/* frist Ui View  */}

        <View
          style={{
            flex: 1,

            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              gap: 10,
            }}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('CompassOverlay', {option: options[2]})
              }>
              <LinearGradient
                start={{x: 0, y: 1}}
                end={{x: 1, y: 0}}
                colors={['#eaf4fc', '#eaf4fc', '#eaf4fc']}
                style={{
                  width: responsiveWidth(45),
                  height: responsiveHeight(25),
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: responsiveWidth(3),
                  shadowColor: responsiveHeight(5),
                  elevation: 5,
                }}>
                <Image
                  source={options[3].imageSource}
                  style={{
                    flex: 1,
                    width: responsiveWidth(100),
                    height: responsiveWidth(100),
                    resizeMode: 'contain',
                    paddingTop: responsiveHeight(2),
                  }}
                />

                <View style={{flex: 0.5}}>
                  <Text
                    style={{
                      fontSize: responsiveFontSize(1.7),
                      fontWeight: '600',
                      color: '#000',
                      marginTop: responsiveHeight(1.5),
                      paddingHorizontal: responsiveWidth(2),
                    }}
                    numberOfLines={3}>
                    {options[3].name}
                  </Text>
                  <Text
                    style={{
                      fontSize: responsiveFontSize(1.5),
                      fontWeight: '400',
                      color: '#000',
                      marginTop: responsiveHeight(1),
                      paddingHorizontal: responsiveWidth(2),
                    }}
                    numberOfLines={3}>
                    {options[3].description}
                  </Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                navigation.navigate('CompassOverlay', {option: options[3]})
              }>
              <LinearGradient
                start={{x: 0, y: 1}}
                end={{x: 1, y: 0}}
                colors={['#eaf4fc', '#eaf4fc', '#eaf4fc']}
                style={{
                  width: responsiveWidth(45),
                  height: responsiveHeight(25),
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: responsiveWidth(3),
                  shadowColor: responsiveHeight(5),
                  elevation: 5,
                }}>
                <Image
                  source={options[4].imageSource}
                  style={{
                    width: responsiveWidth(100),
                    height: responsiveWidth(100),
                    resizeMode: 'contain',
                    flex: 1,
                  }}
                />

                <View style={{flex: 0.5}}>
                  <Text
                    style={{
                      fontSize: responsiveFontSize(1.7),
                      fontWeight: '600',
                      color: '#000',
                      marginTop: responsiveHeight(1.5),
                      paddingHorizontal: responsiveWidth(2),
                    }}
                    numberOfLines={2}>
                    {options[4].name}
                  </Text>
                  <Text
                    style={{
                      fontSize: responsiveFontSize(1.5),
                      fontWeight: '400',
                      color: '#fff',
                      marginTop: responsiveHeight(1),
                      paddingHorizontal: responsiveWidth(2),
                    }}
                    numberOfLines={3}>
                    {options[4].description}
                  </Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
        {/* second View ui  */}

        <View
          style={{
            flex: 1,

            justifyContent: 'center',
            alignItems: 'flex-start',
            paddingHorizontal: responsiveWidth(4),
          }}>
          <View
            style={{
              flexDirection: 'row',
              gap: 10,
            }}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('CompassOverlay', {option: options[4]})
              }>
              <LinearGradient
                start={{x: 0, y: 1}}
                end={{x: 1, y: 0}}
                colors={['#eaf4fc', '#eaf4fc', '#eaf4fc']}
                style={{
                  width: responsiveWidth(45),
                  height: responsiveHeight(25),
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: responsiveWidth(3),
                  shadowColor: responsiveHeight(5),
                  elevation: 5,
                }}>
                <Image
                  source={options[2].imageSource}
                  style={{
                    flex: 1,
                    width: responsiveWidth(100),
                    height: responsiveWidth(100),
                    resizeMode: 'contain',
                  }}
                />

                <View style={{flex: 0.5}}>
                  <Text
                    style={{
                      fontSize: responsiveFontSize(1.7),
                      fontWeight: '600',
                      color: '#000',
                      marginTop: responsiveHeight(1.5),
                      paddingHorizontal: responsiveWidth(2),
                    }}
                    numberOfLines={3}>
                    {options[2].name}
                  </Text>
                  <Text
                    style={{
                      fontSize: responsiveFontSize(1.5),
                      fontWeight: '400',
                      color: '#000',
                      marginTop: responsiveHeight(1),
                      paddingHorizontal: responsiveWidth(2),
                    }}
                    numberOfLines={3}>
                    {options[2].description}
                  </Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('CompassOverlay', {option: options[5]})
              }>
              <LinearGradient
                start={{x: 0, y: 1}}
                end={{x: 1, y: 0}}
                colors={['#eaf4fc', '#eaf4fc', '#eaf4fc']}
                style={{
                  width: responsiveWidth(45),
                  height: responsiveHeight(25),
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: responsiveWidth(3),
                  shadowColor: responsiveHeight(5),
                  elevation: 5,
                }}>
                <Image
                  source={options[5].imageSource}
                  style={{
                    flex: 1,
                    width: responsiveWidth(45),
                    height: responsiveWidth(45),
                    resizeMode: 'contain',
                  }}
                />

                <View style={{flex: 0.5}}>
                  <Text
                    style={{
                      fontSize: responsiveFontSize(1.7),
                      fontWeight: '600',
                      color: '#000',
                      marginTop: responsiveHeight(1.5),
                      paddingHorizontal: responsiveWidth(2),
                    }}
                    numberOfLines={2}>
                    {options[5].name}
                  </Text>
                  <Text
                    style={{
                      fontSize: responsiveFontSize(1.5),
                      fontWeight: '400',
                      color: '#000',
                      marginTop: responsiveHeight(1),
                      paddingHorizontal: responsiveWidth(2),
                    }}
                    numberOfLines={3}>
                    {options[5].description}
                  </Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  name_sec: {
    width: responsiveWidth(100),
    height: responsiveHeight(10),
    flexDirection: 'row',
    // backgroundColor: '#000080',
  },
  name_sec_user: {
    width: responsiveWidth(10),
    height: responsiveWidth(10),
    borderRadius: responsiveWidth(5),
    backgroundColor: '#eaf4fc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  name_txt: {
    fontSize: responsiveFontSize(2.2),
    color: '#fff',
    fontWeight: '500',
    marginHorizontal: responsiveWidth(1),
  },
  name_sec_icon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    paddingRight: responsiveWidth(2),
  },
});
