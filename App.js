import * as React from 'react';
import 'react-native-gesture-handler';
import {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import MainScreen from './src/screens/componrnts/MainScreen';
import CompassOverlay from './src/screens/componrnts/CompassOverlay';
import {PaperProvider} from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';
import HomeScreen from './src/screens/componrnts/HomeScreen';
import CheckoutPage from './src/screens/componrnts/CheckoutPage';
import Ebook from './src/screens/componrnts/Ebook';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import LinearGradient from 'react-native-linear-gradient';
import {responsiveWidth} from 'react-native-responsive-dimensions';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CustomSideMenu from './src/screens/componrnts/CustomSideMenu';
import Login from './src/screens/LoginSignUp/Login';
import SignUp from './src/screens/LoginSignUp/SignUp';
import ModalComponent from './src/screens/componrnts/ModalComponent';
import PaymentScreen from './src/screens/componrnts/PaymentScreen';
import {StripeProvider} from '@stripe/stripe-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {createStackNavigator} from '@react-navigation/stack';
import LoginProvider from './src/screens/utils/context/LoginProvider';
import MainNavigator from './src/screens/utils/MainNavigator';
import {useLogin} from './src/screens/utils/context/LoginProvider';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import Weather from './src/screens/componrnts/Weather';
// import Location from './src/screens/componrnts/Location';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MonthlyFlyingStars from './src/screens/componrnts/MonthlyFlyingStars';
import Location from './src/screens/componrnts/LocationTrack';
import Toast from 'react-native-toast-message';
const Stack = createStackNavigator();
const Tab = createMaterialBottomTabNavigator();

function BottomTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#0a2240"
      inactiveColor="#505050"
      // barStyle={{backgroundColor: '#0a2240'}}
      barStyle={{backgroundColor: 'transparent'}}>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarLabel: 'Compass',
          tabBarIcon: ({focused}) => (
            <MaterialCommunityIcons
              name={focused ? 'compass' : 'compass-outline'}
              color={focused ? '#0a2240' : '#505050'}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Weather"
        component={Weather}
        options={{
          tabBarLabel: 'Weather',
          tabBarIcon: ({focused}) => (
            <MaterialCommunityIcons
              name={focused ? 'weather-partly-rainy' : 'weather-partly-rainy'}
              color={focused ? '#0a2240' : '#505050'}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Location"
        component={Location}
        options={{
          tabBarLabel: 'Location',
          tabBarIcon: ({focused}) => (
            <MaterialIcons
              name={focused ? 'location-on' : 'location-on'}
              color={focused ? '#0a2240' : '#505050'}
              size={26}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={MainScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ModalComponent"
        component={ModalComponent}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="CustomSideMenu"
        component={CustomSideMenu}
        options={{headerShown: true}}
      />
      <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
      <Stack.Screen
        name="CompassOverlay"
        component={CompassOverlay}
        options={{headerShown: true}}
      />
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MonthlyFlyingStars"
        component={MonthlyFlyingStars}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="Ebook"
        component={Ebook}
        options={{headerShown: true}}
      />
    </Stack.Navigator>
  );
}

function AuthStack() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

function App() {
  const publishableKey =
    'pk_live_51O1ruqGeHhuFbcSto0o2KGgUJ8Rzq2ZgTbR0KvZv39sx9mFmEqJQV3dM3HPmdHuEPrt71NU1CnGRohrv98aayuot00IQGDaawF';

  const {isLoggedIn, setIsLoggedIn} = useLogin();
  const [initializing, setInitializing] = useState(true);
  const [checkUserPayment, setCheckUserPayment] = useState('');
  console.log('isLoggedIn', isLoggedIn);

  useEffect(() => {
    // Check if a token exists in AsyncStorage
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem('access_token');
        const paymentStatus = await AsyncStorage.getItem('paymentStatus');
        setCheckUserPayment(JSON.parse(paymentStatus));

        if (token) {
          setIsLoggedIn(token);
        }
        setInitializing(false);
      } catch (error) {
        // Handle AsyncStorage read error
        setInitializing(false);
      }
    };

    checkToken();
  }, [setIsLoggedIn]);

  if (initializing) {
    return null; // Render a loading screen while initializing
  }

  // all stack screens here

  // function HomeStack() {
  //   return (
  //     <Stack.Navigator
  //       initialRouteName={
  //         isLoggedIn
  //           ? 'Home'
  //           : // checkUserPayment
  //             //   ? 'Home'
  //             //   : 'HomeScreen'
  //             'HomeScreen'
  //       }
  //       // drawerContent={props => <CustomSideMenu {...props} />}
  //     >
  //       <Stack.Screen
  //         name="Home"
  //         component={MainScreen}
  //         options={{
  //           title: 'Compass',
  //           headerStyle: {
  //             backgroundColor: '#0a2240',
  //           },
  //           headerTitleStyle: {
  //             alignSelf: 'center',
  //             fontSize: responsiveFontSize(2.5),
  //             fontWeight: '700',
  //           },
  //           headerShown: false,
  //           headerTintColor: 'white',
  //         }}
  //       />
  //       <Stack.Screen
  //         name="ModalComponent"
  //         component={ModalComponent}
  //         options={{
  //           headerShown: false,
  //         }}
  //       />
  //       <Stack.Screen
  //         name="CustomSideMenu"
  //         component={CustomSideMenu}
  //         options={{
  //           // header: () => <GradientHeader1 />,
  //           headerTitleStyle: {alignSelf: 'center'},
  //           headerTintColor: 'white',
  //           headerShown: true,
  //           headerStyle: {backgroundColor: '#0a2240'},
  //         }}
  //       />
  //       <Stack.Screen
  //         name="PaymentScreen"
  //         component={PaymentScreen}
  //         options={{
  //           headerTitleStyle: {alignSelf: 'center'},
  //           headerTintColor: 'white',
  //           headerShown: true,
  //           headerStyle: {backgroundColor: '#0a2240'},
  //         }}
  //       />
  //       <Stack.Screen
  //         name="CompassOverlay"
  //         component={CompassOverlay}
  //         options={{
  //           // header: () => <GradientHeader2 />,
  //           headerTitleStyle: {alignSelf: 'center'},
  //           headerTintColor: 'white',
  //           headerShown: true,
  //           headerStyle: {backgroundColor: '#0a2240'},
  //         }}
  //       />

  //       <Stack.Screen
  //         name="HomeScreen"
  //         component={HomeScreen}
  //         options={{
  //           headerShown: false,
  //         }}
  //       />

  //       <Stack.Screen
  //         name="Ebook"
  //         component={Ebook}
  //         options={{
  //           // header: () => <GradientHeader3 />,
  //           headerTitleStyle: {alignSelf: 'center'},
  //           headerTintColor: 'white',
  //           headerShown: true,
  //           headerStyle: {backgroundColor: '#0a2240'},
  //         }}
  //       />

  //       <Stack.Screen
  //         name="Login"
  //         component={Login}
  //         options={{
  //           headerShown: false,
  //         }}
  //       />
  //       <Stack.Screen
  //         name="SignUp"
  //         component={SignUp}
  //         options={{
  //           headerShown: false,
  //         }}
  //       />
  //     </Stack.Navigator>
  //   );
  // }

  // return (
  //   <NavigationContainer>
  //     <StripeProvider publishableKey={publishableKey}>
  //       {/* <Stack.Navigator
  //         initialRouteName={
  //           isLoggedIn
  //             ? 'Home'
  //             : // checkUserPayment
  //               //   ? 'Home'
  //               //   : 'HomeScreen'
  //               'HomeScreen'
  //         }
  //         // drawerContent={props => <CustomSideMenu {...props} />}
  //       >
  //         <Stack.Screen
  //           name="Home"
  //           component={MainScreen}
  //           options={{
  //             title: 'Compass',
  //             headerStyle: {
  //               backgroundColor: '#0a2240',
  //             },
  //             headerTitleStyle: {
  //               alignSelf: 'center',
  //               fontSize: responsiveFontSize(2.5),
  //               fontWeight: '700',
  //             },
  //             headerShown: false,
  //             headerTintColor: 'white',
  //           }}
  //         />
  //         <Stack.Screen
  //           name="ModalComponent"
  //           component={ModalComponent}
  //           options={{
  //             headerShown: false,
  //           }}
  //         />
  //         <Stack.Screen
  //           name="CustomSideMenu"
  //           component={CustomSideMenu}
  //           options={{
  //             // header: () => <GradientHeader1 />,
  //             headerTitleStyle: {alignSelf: 'center'},
  //             headerTintColor: 'white',
  //             headerShown: true,
  //             headerStyle: {backgroundColor: '#0a2240'},
  //           }}
  //         />
  //         <Stack.Screen
  //           name="PaymentScreen"
  //           component={PaymentScreen}
  //           options={{
  //             headerTitleStyle: {alignSelf: 'center'},
  //             headerTintColor: 'white',
  //             headerShown: true,
  //             headerStyle: {backgroundColor: '#0a2240'},
  //           }}
  //         />
  //         <Stack.Screen
  //           name="CompassOverlay"
  //           component={CompassOverlay}
  //           options={{
  //             // header: () => <GradientHeader2 />,
  //             headerTitleStyle: {alignSelf: 'center'},
  //             headerTintColor: 'white',
  //             headerShown: true,
  //             headerStyle: {backgroundColor: '#0a2240'},
  //           }}
  //         />

  //         <Stack.Screen
  //           name="HomeScreen"
  //           component={HomeScreen}
  //           options={{
  //             headerShown: false,
  //           }}
  //         />

  //         <Stack.Screen
  //           name="Ebook"
  //           component={Ebook}
  //           options={{
  //             // header: () => <GradientHeader3 />,
  //             headerTitleStyle: {alignSelf: 'center'},
  //             headerTintColor: 'white',
  //             headerShown: true,
  //             headerStyle: {backgroundColor: '#0a2240'},
  //           }}
  //         />

  //         <Stack.Screen
  //           name="Login"
  //           component={Login}
  //           options={{
  //             headerShown: false,
  //           }}
  //         />
  //         <Stack.Screen
  //           name="SignUp"
  //           component={SignUp}
  //           options={{
  //             headerShown: false,
  //           }}
  //         />
  //       </Stack.Navigator> */}

  //       {/* Tab Navigator */}

  //       <Tab.Navigator
  //         initialRouteName="Home"
  //         activeColor="#f0edf6"
  //         // activeColor="#000"
  //         inactiveColor="#505050"
  //         barStyle={{backgroundColor: '#0a2240'}}>
  //         <Tab.Screen
  //           name="Home"
  //           component={HomeStack}
  //           options={{
  //             tabBarLabel: 'Compass',
  //             tabBarIcon: ({focused}) => (
  //               <MaterialCommunityIcons
  //                 name={focused ? 'compass' : 'compass-outline'}
  //                 color={focused ? '#0a2240' : '#505050'}
  //                 size={26}
  //               />
  //             ),
  //           }}
  //         />
  //         <Tab.Screen
  //           name="Weather"
  //           component={Weather}
  //           options={{
  //             tabBarLabel: 'Weather',
  //             tabBarIcon: ({focused}) => (
  //               <MaterialCommunityIcons
  //                 name={
  //                   focused ? 'weather-partly-rainy' : 'weather-partly-rainy'
  //                 }
  //                 color={focused ? '#0a2240' : '#505050'}
  //                 size={26}
  //               />
  //             ),
  //           }}
  //         />
  //         <Tab.Screen
  //           name="Location"
  //           component={Location}
  //           options={{
  //             tabBarLabel: 'Location',
  //             tabBarIcon: ({focused}) => (
  //               <MaterialIcons
  //                 name={focused ? 'location-on' : 'location-on'}
  //                 color={focused ? '#0a2240' : '#505050'}
  //                 size={26}
  //               />
  //             ),
  //           }}
  //         />
  //       </Tab.Navigator>

  //       {/* {/ <MainNavigator /> /} */}
  //     </StripeProvider>
  //   </NavigationContainer>
  // );

  return (
    <NavigationContainer>
      <StripeProvider publishableKey={publishableKey}>
        {isLoggedIn ? <BottomTabNavigator /> : <AuthStack />}
        <Toast />
      </StripeProvider>
    </NavigationContainer>
  );
}

export default App;
