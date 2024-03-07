import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  FlatList,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Modal,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
// import Icon3 from 'react-native-vector-icons/FontAwesome6Brands';
import Icon4 from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useLogin} from '../utils/context/LoginProvider';
import axios from 'axios';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';

const CustomSideMenu = () => {
  const {setIsLoggedIn} = useLogin();
  const [selectedId, setSelectedId] = useState(null);
  const [showAmount, setShowAmount] = useState('');
  const [showCurrency, setShowCurrency] = useState('');
  const [trxDate, setTrxdate] = useState('');
  const [ExpDate, setExpdate] = useState('');
  const [status, setStatus] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const Home = <Icon name="home" size={responsiveFontSize(2)} color="#000" />;
  const Compass = <Icon2 name="direction" size={20} color="#000" />;
  const [userName, setUserName] = useState('');
  const Profile = <Icon name="profile" size={20} color="#000" />;
  const Subscroptions = <Icon4 name="subscriptions" size={20} color="#000" />;
  const Share = <Icon name="sharealt" size={20} color="#000" />;
  const Logout = <Icon4 name="logout" size={20} color="#000" />;
  const navigation = useNavigation();
  const listArray = [
    {icon: Home, title: 'Home', screenName: 'Home'},

    // {icon: Profile, title: 'Profile', screenName: 'Home'},
    // {
    //   icon: Subscroptions,
    //   title: 'Subscroptions',
    //   screenName: 'SubscriptionScreen',
    // },
    // {icon: myIcon, title: 'Other'},
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
            navigation.navigate('HomeScreen'); // Navigate to your logout screen
          },
        },
      ],
      {cancelable: false}, // Prevent dismissing the dialog by tapping outside of it
    );
  };

  const DeletUserAcount = async () => {
    try {
      const token = await AsyncStorage.getItem('access_token');
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };
      const userDeleteRes = await axios.delete(
        'https://smartluopan.com/api/delete-account',
        {headers},
      );

      Alert.alert(
        'Delete Account Confirmation',
        'Are you sure you want to Delete Your Account?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Delete Account',
            onPress: async () => {
              // Clear the token from AsyncStorage
              if (userDeleteRes.config.data == null) {
                setIsLoggedIn(null);
                navigation.navigate('Login');
              }
            },
          },
        ],
        {cancelable: false}, // Prevent dismissing the dialog by tapping outside of it
      );

      console.log('deleted', userDeleteRes.data.message);
    } catch (error) {
      console.log('error', error);
    }
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

  const SubScriptionGet = async () => {
    try {
      const token = await AsyncStorage.getItem('access_token');
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      };
      const res = await axios.get(
        'https://smartluopan.com/api/user-transactions',
        {headers},
      );
      if (res.data.transactions.length === 0) {
        setShowAmount('N/A');
        setShowCurrency('N/A');
        setTrxdate('N/A');
        setExpdate('N/A');
        setStatus('Subscription Not Found');
        setModalVisible(true);
      } else {
        // Subscription information found, update the state
        const dataSun = res.data.transactions[0];
        setShowAmount(dataSun.amount);
        setShowCurrency(dataSun.amount_currency);
        setTrxdate(dataSun.transaction_date);
        setExpdate(dataSun.transaction_expiry);
        setStatus(dataSun.transaction_status);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    SubScriptionGet();
  }, []);

  const modalClose = () => {
    setModalVisible(false);
  };

  const subscriptionModal = () => {
    navigation.navigate('PaymentScreen');
    setModalVisible(false);
  };

  const Item = ({icon, title, onPress, backgroundColor, color, screenName}) => {
    const navigation = useNavigation();

    return (
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          paddingLeft: responsiveWidth(5),
          // marginBottom: responsiveHeight(2),
          borderBottomColor: '#A69EEC',
          borderWidth: 0.5,
          width: responsiveWidth(100),
          height: responsiveHeight(6.7),
          alignItems: 'center',
          backgroundColor: backgroundColor,
        }}
        onPress={() => {
          navigation.navigate(screenName); // Navigate to the specified screen
          console.log(screenName);
          onPress();
        }}>
        <Text>{icon}</Text>
        <Text
          style={{
            fontSize: responsiveFontSize(2),
            fontWeight: '700',
            color: color,
            paddingLeft: responsiveWidth(5),
          }}>
          {title}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderItem = ({item}) => {
    const backgroundColor = item.title === selectedId ? '#A69EEC' : '#ffff';
    const color = item.title === selectedId ? '#fff' : '#000';

    return (
      <View>
        <Item
          title={item.title}
          icon={item.icon}
          onPress={() => setSelectedId(item.title)}
          backgroundColor={backgroundColor}
          color={color}
          screenName={item.screenName}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar
        backgroundColor="#000080" // Set the status bar background color to match your SafeAreaView
        barStyle="light-content" // Set the status bar text color
      />
      <View style={{flex: 1}}>
        <View style={{flex: 0.3}}>
          <ImageBackground
            style={{flex: 1, justifyContent: 'center', alignItems: 'flex-end'}}
            source={require('../assets/images/bannerImage.jpg')}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                paddingRight: responsiveWidth(5),
              }}>
              <Image
                source={require('../assets/images/user3.png')}
                style={{
                  width: responsiveWidth(20),
                  height: responsiveWidth(20),
                  alignSelf: 'center',
                  // position: 'absolute',
                }}
              />

              <Text
                style={{
                  fontSize: responsiveFontSize(2),
                  fontWeight: '600',
                  color: 'white',
                  alignSelf: 'center',
                  //   paddingTop: responsiveHeight(15),
                }}>
                {userName}
              </Text>
            </View>
          </ImageBackground>
        </View>
        {/*  <View style={{flex: 0.09, backgroundColor: '#fff'}}>
          <FlatList data={listArray} renderItem={renderItem} />
        </View>
              */}

        <View style={{flex: 0.7, backgroundColor: '#fff'}}>
          {/* subscription data */}
          <ScrollView
            style={{
              // justifyContent: 'center',
              // alignItems: 'center',
              padding: responsiveWidth(1),
              width: responsiveWidth(95),
              height: responsiveHeight(44),
              borderRadius: responsiveWidth(3),
              backgroundColor: '#F5F5F5',
              alignSelf: 'center',
              marginTop: responsiveHeight(1),
              elevation: 2,
              shadowColor: '#000',
            }}>
            {/* <View style={{flexDirection: 'row', justifyContent: 'space-between'}}> */}

            <View>
              <View style={styles.subscriptionView}>
                <Text style={styles.subscription}>Amount : $ {showAmount}</Text>
              </View>
              <View style={styles.subscriptionView}>
                <Text style={styles.subscription}>
                  Currency : {showCurrency}
                </Text>
              </View>
              <View style={styles.subscriptionView}>
                <Text style={styles.subscription}>
                  Transaction Date : {trxDate}
                </Text>
              </View>
              <View style={styles.subscriptionView}>
                <Text style={styles.subscription}>
                  Transaction Expiry : {ExpDate}
                </Text>
              </View>

              <View
                style={[
                  status === 'Succeeded'
                    ? styles.succeedBackground
                    : styles.failBackground,
                  {flexDirection: 'row', justifyContent: 'space-between'},
                ]}>
                <Text
                  style={[
                    styles.subscription,
                    {
                      color:
                        status === 'Subscription Not Found'
                          ? '#892A27'
                          : '#2F613B',
                    },
                  ]}>
                  Status : {status}
                </Text>
                <Feather
                  name={
                    status === 'Subscription Not Found'
                      ? 'alert-circle'
                      : 'check-circle'
                  }
                  color={
                    status === 'Subscription Not Found' ? '#892A27' : '#2F613B'
                  }
                  size={responsiveFontSize(3)}
                />
              </View>

              {/* User Account Delete */}

              <TouchableOpacity
                style={[
                  styles.succeedBackground,
                  {
                    backgroundColor: 'red',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: responsiveHeight(1),
                  },
                ]}
                onPress={DeletUserAcount}>
                <Text style={[styles.subscription, {color: '#fff'}]}>
                  Delete Account
                </Text>

                <MaterialCommunityIcons
                  name={'delete-circle'}
                  color="#fff"
                  size={responsiveFontSize(3)}
                />
              </TouchableOpacity>

              {/* User Account Delete */}

              <TouchableOpacity
                style={[
                  styles.succeedBackground,
                  {
                    backgroundColor: 'gray',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: responsiveHeight(1),
                  },
                ]}
                onPress={() => navigation.navigate('ResetPassword')}>
                <Text style={[styles.subscription, {color: '#fff'}]}>
                  Reset Password
                </Text>
                <MaterialCommunityIcons
                  name={'lock-reset'}
                  color="#fff"
                  size={responsiveFontSize(3)}
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  // flex: 0.08,
                  width: responsiveWidth(92.5),
                  height: responsiveHeight(6),
                  borderRadius: responsiveWidth(1),
                  alignSelf: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                  backgroundColor: '#0a2240',
                  paddingLeft: responsiveWidth(5),
                }}
                onPress={handleLogout}>
                {/* <FlatList data={BottomList} renderItem={renderItem} /> */}
                <Icon4
                  name="logout"
                  size={responsiveFontSize(2)}
                  color="#fff"
                />
                <Text
                  style={{
                    fontSize: responsiveFontSize(2),
                    fontWeight: '700',
                    color: '#fff',
                    paddingLeft: responsiveWidth(3),
                  }}>
                  Logout
                </Text>
              </TouchableOpacity>
            </View>
            {/* </View> */}
          </ScrollView>
        </View>
      </View>

      {/* modal here */}
      {status === 'Subscription Not Found' ? (
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TouchableOpacity
                style={{alignSelf: 'flex-end'}}
                onPress={modalClose}>
                <Entypo
                  name={'circle-with-cross'}
                  size={responsiveFontSize(4)}
                  color={'rgba(0,0,0,0.3)'}
                />
              </TouchableOpacity>

              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Text style={styles.modalText}>Subscription Not Found!</Text>
                <Text
                  style={{
                    color: 'rgba(0,0,0,0.6)',
                    fontSize: responsiveFontSize(2),
                    paddingTop: responsiveHeight(0.3),
                  }}>
                  Please take Subscription first
                </Text>
                <TouchableOpacity
                  style={{
                    paddingHorizontal: responsiveWidth(10),
                    paddingVertical: responsiveWidth(3),
                    borderRadius: responsiveWidth(10),
                    backgroundColor: '#4C49FA',
                    marginTop: responsiveHeight(2),
                  }}
                  onPress={subscriptionModal}>
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: responsiveFontSize(2),
                      fontWeight: '600',
                    }}>
                    Subscribe Now
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      ) : null}
    </SafeAreaView>
  );
};

export default CustomSideMenu;

const styles = StyleSheet.create({
  subscription: {
    fontSize: responsiveFontSize(2),
    fontWeight: '600',
    color: '#000',
  },
  subscriptionView: {
    marginVertical: responsiveHeight(0.5),
    backgroundColor: '#fff',
    padding: responsiveHeight(1.5),
    borderRadius: responsiveWidth(1),
  },
  succeedBackground: {
    backgroundColor: '#E2FBE7',
    marginVertical: responsiveHeight(0.2),
    padding: responsiveHeight(1.5),
    borderRadius: responsiveWidth(1),
  },
  failBackground: {
    backgroundColor: '#F7E3E1',
    marginVertical: responsiveHeight(1),
    padding: responsiveHeight(1.5),
    borderRadius: responsiveWidth(1),
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: responsiveHeight(2),
  },
  modalView: {
    width: responsiveWidth(95),
    height: responsiveHeight(28),
    borderColor: 'rgba(0, 0, 0, 0.5)',
    backgroundColor: '#fff',
    borderWidth: responsiveWidth(0.2),
    borderRadius: responsiveHeight(2),
    padding: responsiveWidth(3),
    // alignItems: 'center',
    shadowColor: '#fff',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    textAlign: 'center',
    color: '#000',
    fontSize: responsiveFontSize(2.4),
    fontWeight: '600',
  },
});
