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

const CustomSideMenu = () => {
  const {setIsLoggedIn} = useLogin();
  const [selectedId, setSelectedId] = useState(null);
  const [showAmount, setShowAmount] = useState('');
  const [showCurrency, setShowCurrency] = useState('');
  const [trxDate, setTrxdate] = useState('');
  const [ExpDate, setExpdate] = useState('');
  const [status, setStatus] = useState('');

  const Home = <Icon name="home" size={20} color="#000" />;
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

  const Item = ({icon, title, onPress, backgroundColor, color, screenName}) => {
    const navigation = useNavigation();

    // const handleLogout = () => {
    //   // Show a confirmation dialog before logging out
    //   Alert.alert(
    //     'Logout Confirmation',
    //     'Are you sure you want to logout?',
    //     [
    //       {
    //         text: 'Cancel',
    //         style: 'cancel',
    //       },
    //       {
    //         text: 'Logout',
    //         onPress: async () => {
    //           // Clear user data and navigate to the logout screen
    //           await AsyncStorage.clear(); // Clear all data stored in AsyncStorage
    //           navigation.navigate('LogoutScreen'); // Navigate to your logout screen
    //         },
    //       },
    //     ],
    //     {cancelable: false}, // Prevent dismissing the dialog by tapping outside of it
    //   );
    // };

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
          'https://app.srninfotech.com/compass/api/user-transactions',
          {headers},
        );
        const dataSun = res.data.transactions[0];
        setShowAmount(dataSun.amount);
        setShowCurrency(dataSun.amount_currency);
        setTrxdate(dataSun.transaction_date);
        setExpdate(dataSun.transaction_expiry);
        setStatus(dataSun.transaction_status);
      } catch (error) {
        console.log('error', error);
      }
    };

    useEffect(() => {
      SubScriptionGet();
    }, []);

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
                  fontSize: responsiveFontSize(2.5),
                  fontWeight: '800',
                  color: 'white',
                  alignSelf: 'center',
                  // paddingTop: responsiveHeight(15),
                }}>
                Hi,
              </Text>
              <Text
                style={{
                  fontSize: responsiveFontSize(2),
                  fontWeight: '600',
                  color: 'white',
                  alignSelf: 'center',
                  //   paddingTop: responsiveHeight(15),
                }}>
                Mr. {userName}
              </Text>
            </View>
          </ImageBackground>
        </View>
        <View style={{flex: 0.09, backgroundColor: '#fff'}}>
          <FlatList data={listArray} renderItem={renderItem} />
        </View>
        <View style={{flex: 0.6, backgroundColor: '#fff'}}>
          <View
            style={{
              justifyContent: 'flex-start',
              flexDirection: 'row',
              marginLeft: responsiveWidth(5),
            }}>
            <Icon4 name="subscriptions" size={20} color="#000" />
            <Text
              style={{
                paddingLeft: responsiveWidth(5),
                color: '#000',
                fontWeight: '700',
                fontSize: responsiveFontSize(2),
              }}>
              Subscription
            </Text>
          </View>
          {/* subscription data */}
          <View
            style={{
              // justifyContent: 'center',
              // alignItems: 'center',
              padding: responsiveWidth(5),
              width: responsiveWidth(90),
              height: responsiveHeight(44),
              borderRadius: responsiveWidth(3),
              backgroundColor: '#F5F5F5',
              alignSelf: 'center',
              marginTop: responsiveHeight(2),
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
                style={
                  status === 'Succeeded'
                    ? styles.succeedBackground
                    : styles.failBackground
                }>
                <Text style={[styles.subscription, {color: '#fff'}]}>
                  Status : {status}
                </Text>
              </View>
            </View>
            {/* </View> */}
          </View>
        </View>

        <TouchableOpacity
          style={{
            // flex: 0.08,
            width: responsiveWidth(80),
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
          <Icon4 name="logout" size={20} color="#fff" />
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
    marginVertical: responsiveHeight(1),
    backgroundColor: '#fff',
    padding: responsiveHeight(1.5),
    borderRadius: responsiveWidth(1),
  },
  succeedBackground: {
    backgroundColor: 'green',
    marginVertical: responsiveHeight(1),
    padding: responsiveHeight(1.5),
    borderRadius: responsiveWidth(1),
  },
  failBackground: {
    backgroundColor: 'red',
    marginVertical: responsiveHeight(1),
    padding: responsiveHeight(1.5),
    borderRadius: responsiveWidth(1),
  },
});
