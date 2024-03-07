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
import {useLogin, useTransactionFlag} from '../utils/context/LoginProvider';
import {ScrollView} from 'react-native-gesture-handler';

const MainScreen = ({navigation}) => {
  const [userName, setUserName] = useState('');
  const {setIsLoggedIn} = useLogin();
  // const {transactionFlag} = useTransactionFlag();
  const [checkUserPayment, setCheckUserPayment] = useState('');
  const [initializing, setInitializing] = useState(true);
  const [paymentStatusChanged, setPaymentStatusChanged] = useState(false);

  const [signUpFlag, setSignUpFlag] = useState(false);

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

  // useEffect(() => {
  //   // Check if a token exists in AsyncStorage
  //   const checkToken = async () => {
  //     try {
  //       const token = await AsyncStorage.getItem('access_token');
  //       const paymentStatus = await AsyncStorage.getItem('paymentStatus');
  //       setCheckUserPayment(JSON.parse(paymentStatus));

  //       if (token) {
  //         setIsLoggedIn(token);
  //       }
  //       setInitializing(false);
  //     } catch (error) {
  //       // Handle AsyncStorage read error
  //       setInitializing(false);
  //     }
  //   };
  //   checkToken();
  // }, [setIsLoggedIn]);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem('access_token');
        const paymentStatus = await AsyncStorage.getItem('paymentStatus');
        console.log('paymentStatus: ', paymentStatus);
        setCheckUserPayment(JSON.parse(paymentStatus));

        if (token) {
          setIsLoggedIn(token);
        }

        if (paymentStatus === true) {
          setSignUpFlag(true);
        }

        // Check if paymentStatus has changed
        const storedPaymentStatus = JSON.parse(paymentStatus);
        if (storedPaymentStatus !== checkUserPayment) {
          setCheckUserPayment(storedPaymentStatus);
          setPaymentStatusChanged(true);
        }

        setInitializing(false);
      } catch (error) {
        setInitializing(false);
      }
    };

    checkToken();
  }, [setIsLoggedIn, checkUserPayment, paymentStatusChanged]);

  useEffect(() => {
    // Reset paymentStatusChanged after re-render
    if (paymentStatusChanged) {
      setPaymentStatusChanged(false);
    }
  }, [paymentStatusChanged]);

  const options = [
    {
      compasId: 1,
      name: '24 Mountains Compass ',
      imageSource: require('../assets/images/1st_White.png'),
      imageSource2: require('../assets/images/1st_Black.png'),
    },
    {
      name: 'Annual Ring 2024 ',
      imageSource: require('../assets/images/LastOne2024.png'),
      imageSource2: require('../assets/images/LastOne2024.png'),
    },
    {
      name: 'Period 8 & Period 9 Flying Star LuoPan',
      imageSource: require('../assets/images/Period8&Period9F.png'),
      imageSource2: require('../assets/images/Period8&Period9F.png'),
    },
    {
      name: 'Xuan Kong Da Gua Rings ',
      imageSource: require('../assets/images/XuangKonDaGuaF.png'),
      imageSource2: require('../assets/images/XuangKonDaGuaF.png'),
    },

    {
      compasId2: 3,
      name: 'Smart LuoPan Transparent Version',
      imageSource: require('../assets/images/SmartLuoPanTransparetVersion.png'),
      imageSource2: require('../assets/images/SmartLuoPanTransparetVersion.png'),
    },

    {
      name: ' 2024 Annual & Monthly Flying Stars',
      imageSource: require('../assets/MonthlyImages/1January2024.png'),
      imageSource2: require('../assets/MonthlyImages/1January2024.png'),
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
            navigation.navigate('Login'); // Navigate to your logout screen
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
      } else {
        setUserName('DemoUser');
      }
    }
    fetchUserName();
  }, [setUserName]);

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
            {/* <Text
              style={{
                fontSize: responsiveFontSize(2),
                color: '#fff',
                marginLeft: responsiveWidth(1),
                paddingLeft: responsiveWidth(2.5),
              }}>
              Hii,
            </Text> */}
            <Text style={styles.name_txt}>{userName} </Text>
          </View>
        </View>
        <View style={styles.name_sec_icon}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Ebook')}
            style={{paddingRight: responsiveWidth(3)}}>
            <SimpleLineIcons
              name="notebook"
              size={responsiveWidth(5)}
              color="#fff"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLogout}>
            <Icon4 name="logout" size={responsiveWidth(5)} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
      {/* top ui */}

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          flex: 1,
          backgroundColor: '#f8f9f5',
          borderTopLeftRadius: responsiveWidth(12),
          borderTopRightRadius: responsiveWidth(12),
          // paddingTop: responsiveHeight(2.5),
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: responsiveWidth(3),
            shadowColor: responsiveHeight(5),
            elevation: 5,
            // paddingTop: responsiveHeight(2),
            backgroundColor: '#eaf4fc',
            marginTop: responsiveWidth(5),
            margin: responsiveWidth(2),
          }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
            }}>
            <TouchableOpacity
              style={{
                flex: 0.5,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() =>
                navigation.navigate(
                  checkUserPayment ? 'CompassOverlay' : 'ModalComponent',
                  {option: options[0]},
                )
              }>
              <View
                style={{
                  elevation: 5,
                  shadowColor: 'black',
                  width: responsiveWidth(42),
                  height: responsiveWidth(42),
                  backgroundColor: 'rgba(255, 255, 255,0.5)',
                  borderRadius: responsiveWidth(21),
                  justifyContt: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={options[0].imageSource2}
                  style={{
                    flex: 1,
                    width: responsiveWidth(50),
                    height: responsiveWidth(50),
                    resizeMode: 'contain',
                  }}
                />
              </View>
            </TouchableOpacity>

            <View style={{flex: 0.5}}>
              <Text
                style={{
                  fontSize: responsiveFontSize(2.2),
                  fontWeight: '800',
                  color: '#000',
                  marginTop: responsiveHeight(1.5),
                  // paddingHorizontal: responsiveWidth(2),
                  textAlign: 'center',
                  letterSpacing: responsiveWidth(0.7),
                }}
                numberOfLines={2}>
                {options[0].name}
              </Text>
              <Text
                style={{
                  fontSize: responsiveFontSize(1.7),
                  fontWeight: '600',
                  color: '#000',
                  // marginTop: responsiveHeight(1.5),

                  paddingHorizontal: responsiveWidth(2),
                  paddingVertical: responsiveWidth(5),
                }}>
                This is a transparent version of the basic 24 Mountain ring to
                find a generic direction and is by far going to be the most used
                ring in your app. This ring has the added advantage of being
                able to view under it, the GPS image of the location you are in.
              </Text>
            </View>
          </View>
        </View>

        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: responsiveWidth(3),
            shadowColor: responsiveHeight(5),
            elevation: 5,
            // paddingTop: responsiveHeight(2),
            backgroundColor: '#eaf4fc',
            marginTop: responsiveWidth(5),
            margin: responsiveWidth(2),
          }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
            }}>
            <TouchableOpacity
              style={{
                flex: 0.5,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() =>
                navigation.navigate(
                  checkUserPayment ? 'CompassOverlay' : 'ModalComponent',
                  {option: options[1]},
                )
              }>
              <View
                style={{
                  elevation: 5,
                  shadowColor: 'black',
                  width: responsiveWidth(42),
                  height: responsiveWidth(42),
                  backgroundColor: 'rgba(255, 255, 255,0.5)',
                  borderRadius: responsiveWidth(21),
                  justifyContt: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={options[1].imageSource2}
                  style={{
                    flex: 1,
                    width: responsiveWidth(50),
                    height: responsiveWidth(50),
                    resizeMode: 'contain',
                  }}
                />
              </View>
            </TouchableOpacity>

            <View style={{flex: 0.5}}>
              <Text
                style={{
                  fontSize: responsiveFontSize(2.2),
                  fontWeight: '800',
                  color: '#000',
                  marginTop: responsiveHeight(1.5),
                  // paddingHorizontal: responsiveWidth(2),
                  textAlign: 'center',
                  letterSpacing: responsiveWidth(0.7),
                }}
                numberOfLines={2}>
                {options[1].name}
              </Text>
              <Text
                style={{
                  fontSize: responsiveFontSize(1.7),
                  fontWeight: '600',
                  color: '#000',
                  // marginTop: responsiveHeight(1.5),
                  paddingHorizontal: responsiveWidth(2),

                  paddingVertical: responsiveWidth(5),
                }}>
                This transparent Annual 2024 template displays annual
                components, including the annual star in each sector, the 4
                Nobles, and Shas like Grand Duke, Year Breaker, 5 Yellows, Three
                Killings. It also features Qi Men Dun Jia-related Doors, Stars,
                and Deity locations for the year, offering comprehensive
                insights.
              </Text>
            </View>
          </View>
        </View>

        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: responsiveWidth(3),
            shadowColor: responsiveHeight(5),
            elevation: 5,
            // paddingTop: responsiveHeight(2),
            backgroundColor: '#eaf4fc',
            marginTop: responsiveWidth(5),
            margin: responsiveWidth(2),
          }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
            }}>
            <TouchableOpacity
              style={{
                flex: 0.5,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() =>
                navigation.navigate(
                  checkUserPayment ? 'CompassOverlay' : 'ModalComponent',
                  {option: options[3]},
                )
              }>
              <View
                style={{
                  elevation: 5,
                  shadowColor: 'black',
                  width: responsiveWidth(42),
                  height: responsiveWidth(42),
                  backgroundColor: 'rgba(255, 255, 255,0.5)',
                  borderRadius: responsiveWidth(21),
                  justifyContt: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={options[3].imageSource2}
                  style={{
                    flex: 1,
                    width: responsiveWidth(50),
                    height: responsiveWidth(50),
                    resizeMode: 'contain',
                  }}
                />
              </View>
            </TouchableOpacity>

            <View style={{flex: 0.5}}>
              <Text
                style={{
                  fontSize: responsiveFontSize(2.2),
                  fontWeight: '800',
                  color: '#000',
                  marginTop: responsiveHeight(1.5),
                  // paddingHorizontal: responsiveWidth(2),
                  textAlign: 'center',
                  letterSpacing: responsiveWidth(0.7),
                }}
                numberOfLines={2}>
                {options[3].name}
              </Text>
              <Text
                style={{
                  fontSize: responsiveFontSize(1.7),
                  fontWeight: '600',
                  color: '#000',
                  // marginTop: responsiveHeight(1.5),
                  paddingHorizontal: responsiveWidth(2),
                  paddingVertical: responsiveWidth(5),
                }}>
                Transparent SmartLuoPan®, tailored for Xuan Kong Da Gua
                assessment, incorporates essential rings. This physical tool
                enhances insights into Xuan Kong Feng Shui, providing a
                comprehensive view for accurate assessments. The included rings
                ensure relevance and practicality in navigating the complexities
                of this ancient Chinese metaphysical practice.
              </Text>
            </View>
          </View>
        </View>

        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: responsiveWidth(3),
            shadowColor: responsiveHeight(5),
            elevation: 5,
            // paddingTop: responsiveHeight(2),
            backgroundColor: '#eaf4fc',
            marginTop: responsiveWidth(5),
            margin: responsiveWidth(2),
          }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
            }}>
            <TouchableOpacity
              style={{
                flex: 0.5,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() =>
                navigation.navigate(
                  checkUserPayment ? 'CompassOverlay' : 'ModalComponent',
                  {option: options[4]},
                )
              }>
              <View
                style={{
                  elevation: 5,
                  shadowColor: 'black',
                  width: responsiveWidth(42),
                  height: responsiveWidth(42),
                  backgroundColor: 'rgba(255, 255, 255,0.5)',
                  borderRadius: responsiveWidth(21),
                  justifyContt: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={options[4].imageSource2}
                  style={{
                    flex: 1,
                    width: responsiveWidth(50),
                    height: responsiveWidth(50),
                    resizeMode: 'contain',
                  }}
                />
              </View>
            </TouchableOpacity>

            <View style={{flex: 0.5}}>
              <Text
                style={{
                  fontSize: responsiveFontSize(2.2),
                  fontWeight: '800',
                  color: '#000',
                  marginTop: responsiveHeight(1.5),
                  // paddingHorizontal: responsiveWidth(2),
                  textAlign: 'center',
                  letterSpacing: responsiveWidth(0.7),
                }}
                numberOfLines={2}>
                {options[4].name}
              </Text>
              <Text
                style={{
                  fontSize: responsiveFontSize(1.7),
                  fontWeight: '600',
                  color: '#000',
                  // marginTop: responsiveHeight(1.5),
                  paddingHorizontal: responsiveWidth(2),
                  paddingVertical: responsiveWidth(5),
                }}>
                This is a transparent version of our physical SmartLuoPan® which
                has the added advantage of being able to view under it, the GPS
                image of the location you are in. Do refer to the SMartLuoPan®
                guide for more information on how to make the most of this item.
              </Text>
            </View>
          </View>
        </View>

        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: responsiveWidth(3),
            shadowColor: responsiveHeight(5),
            elevation: 5,
            // paddingTop: responsiveHeight(2),
            backgroundColor: '#eaf4fc',
            marginTop: responsiveWidth(5),
            margin: responsiveWidth(2),
          }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
            }}>
            <TouchableOpacity
              style={{
                flex: 0.5,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() =>
                navigation.navigate(
                  checkUserPayment ? 'CompassOverlay' : 'ModalComponent',
                  {option: options[2]},
                )
              }>
              <View
                style={{
                  elevation: 5,
                  shadowColor: 'black',
                  width: responsiveWidth(42),
                  height: responsiveWidth(42),
                  backgroundColor: 'rgba(255, 255, 255,0.5)',
                  borderRadius: responsiveWidth(21),
                  justifyContt: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={options[2].imageSource2}
                  style={{
                    flex: 1,
                    width: responsiveWidth(50),
                    height: responsiveWidth(50),
                    resizeMode: 'contain',
                  }}
                />
              </View>
            </TouchableOpacity>

            <View
              style={{
                flex: 0.5,
              }}>
              <Text
                style={{
                  fontSize: responsiveFontSize(2.2),
                  fontWeight: '800',
                  color: '#000',
                  marginTop: responsiveHeight(1.5),
                  // paddingHorizontal: responsiveWidth(2),
                  textAlign: 'center',
                  letterSpacing: responsiveWidth(0.7),
                }}
                numberOfLines={2}>
                {options[2].name}
              </Text>
              <Text
                style={{
                  fontSize: responsiveFontSize(1.7),
                  fontWeight: '600',
                  color: '#000',
                  // marginTop: responsiveHeight(1.5),
                  paddingHorizontal: responsiveWidth(2),
                  paddingVertical: responsiveWidth(5),
                }}>
                This is a transparent version of the Period 8 and Period 9 rings
                that have been extracted from our SMartLuoPan® in order to be
                more visible. It has the added advantage of being able to view
                under it, the GPS image of the location you are in. The 24
                mountains are also in English and color coded as per their Na
                Jia elements.
              </Text>
            </View>
          </View>
        </View>

        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: responsiveWidth(3),
            shadowColor: responsiveHeight(5),
            elevation: 5,
            // paddingTop: responsiveHeight(2),
            backgroundColor: '#eaf4fc',
            marginTop: responsiveWidth(5),
            margin: responsiveWidth(2),
          }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
            }}>
            <TouchableOpacity
              style={{
                flex: 0.5,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() =>
                navigation.navigate(
                  checkUserPayment ? 'MonthlyFlyingStars' : 'ModalComponent',
                  {option: options[5]},
                )
              }>
              <View
                style={{
                  elevation: 5,
                  shadowColor: 'black',
                  width: responsiveWidth(42),
                  height: responsiveWidth(42),
                  backgroundColor: 'rgba(255, 255, 255,0.5)',
                  borderRadius: responsiveWidth(21),
                  justifyContt: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={options[5].imageSource2}
                  style={{
                    flex: 1,
                    width: responsiveWidth(50),
                    height: responsiveWidth(50),
                    resizeMode: 'contain',
                  }}
                />
              </View>
            </TouchableOpacity>

            <View
              style={{
                flex: 0.5,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: responsiveFontSize(2.2),
                  fontWeight: '800',
                  color: '#000',
                  marginTop: responsiveHeight(1.5),
                  // paddingHorizontal: responsiveWidth(2),
                  textAlign: 'center',
                  letterSpacing: responsiveWidth(0.7),
                }}
                numberOfLines={2}>
                {options[5].name}
              </Text>
              <Text
                style={{
                  fontSize: responsiveFontSize(1.7),
                  fontWeight: '600',
                  color: '#000',
                  // marginTop: responsiveHeight(1.5),
                  paddingHorizontal: responsiveWidth(2),
                  paddingVertical: responsiveWidth(5),
                }}>
                By placing this ring on your property you are able to see
                immediately shoch part of the property carries what combination
                of energy. Included are the 24 mountains, annual flying stars,
                the Grand Duke, Year Breaker and Three killings, and the
                noblemen as well as the negative Gods. For the Qi Men Dun Jia
                followers, we have the annual location of the Deities, Stars and
                Doors. So much information all in one place makes your Feng Shui
                assessemt super easy.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
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
