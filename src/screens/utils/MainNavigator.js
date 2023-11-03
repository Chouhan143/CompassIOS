import React, {useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../componrnts/HomeScreen';
import Login from '../LoginSignUp/Login';
import SignUp from '../LoginSignUp/SignUp';

import {useLogin} from './context/LoginProvider';
import DrawerNavigator from './DrawerNavigator';
const Stack = createStackNavigator();

const GradientHeader2 = () => {
  const navigation = useNavigation();
  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      colors={['#000080', '#000080']}
      style={{
        padding: responsiveWidth(3),
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <Icon
        name="arrowleft"
        size={responsiveFontSize(3)}
        color="#fff"
        style={{marginLeft: responsiveWidth(3)}}
        onPress={() => navigation.navigate('Home')}
      />
      <Text
        style={{
          color: '#fff',
          fontSize: responsiveFontSize(2.5),
          fontWeight: '700',
          paddingLeft: responsiveWidth(3),
        }}>
        Compass Overlay
      </Text>
    </LinearGradient>
  );
};

// const StackNavigator = () => {
//   return (
//     // <Stack.Navigator initialRouteName="HomeScreen">
//     //   <Stack.Screen
//     //     name="HomeScreen"
//     //     component={HomeScreen}
//     //     options={{
//     //       headerShown: false,
//     //     }}
//     //   />
//     //   <Stack.Screen
//     //     name="Login"
//     //     component={Login}
//     //     options={{
//     //       headerShown: false,
//     //     }}
//     //   />
//     //   <Stack.Screen
//     //     name="SignUp"
//     //     component={SignUp}
//     //     options={{
//     //       headerShown: false,
//     //     }}
//     //   />
//     //   <Stack.Screen
//     //     name="ModalComponent"
//     //     component={ModalComponent}
//     //     options={{
//     //       headerShown: false,
//     //     }}
//     //   />
//     //   <Stack.Screen
//     //     name="PaymentScreen"
//     //     component={PaymentScreen}
//     //     options={{
//     //       headerShown: false,
//     //     }}
//     //   />
//     //   <Stack.Screen
//     //     name="CompassOverlay"
//     //     component={CompassOverlay}
//     //     options={{
//     //       header: () => <GradientHeader2 />,
//     //       headerTitleStyle: {alignSelf: 'center'},
//     //       headerTintColor: 'white',
//     //     }}
//     //   />
//     // </Stack.Navigator>
// //   );
// };

const MainNavigator = () => {
  const {isLoggedIn} = useLogin();
  console.log(isLoggedIn);
  return isLoggedIn ? (
    <DrawerNavigator />
  ) : (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
export default MainNavigator;
