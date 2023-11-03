import * as React from 'react';
import {View, Text, Image, TouchableOpacity, Button} from 'react-native';
import ModalComponent from '../componrnts/ModalComponent';
import PaymentScreen from '../componrnts/PaymentScreen';
import CompassOverlay from '../componrnts/CompassOverlay';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import CustomSideMenu from '../componrnts/CustomSideMenu';

const Drawer = createDrawerNavigator();

// const CustomDrawer = props => {
//   return (
//     <View style={{ flex: 1 }}>
//       <DrawerContentScrollView {...props}>
//         <View
//           style={{
//             flexDirection: 'row',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//             padding: 20,
//             backgroundColor: '#f6f6f6',
//             marginBottom: 20,
//           }}
//         >
//           <View>
//             <Text>John Doe</Text>
//             <Text>example@email.com</Text>
//           </View>
//           <Image
//             source={{
//               uri: 'https://images.unsplash.com/photo-1624243225303-261cc3cd2fbc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80',
//             }}
//             style={{ width: 60, height: 60, borderRadius: 30 }}
//           />
//         </View>
//         <DrawerItemList {...props} />
//       </DrawerContentScrollView>
//       <TouchableOpacity
//         style={{
//           position: 'absolute',
//           right: 0,
//           left: 0,
//           bottom: 50,
//           backgroundColor: '#f6f6f6',
//           padding: 20,
//         }}
//       >
//         <Text>Log Out</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: 'transparent',
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTitle: '',
      }}
      drawerContent={props => <CustomSideMenu {...props} />}>
      <Drawer.Screen
        name="Home"
        component={MainScreen}
        options={{
          title: 'Compass',
          headerStyle: {
            backgroundColor: '#000080',
          },
          headerTitleStyle: {
            alignSelf: 'center',
            fontSize: responsiveFontSize(2.5),
            fontWeight: '700',
          },
          headerTintColor: 'white',
        }}
      />
      <Stack.Screen
        name="ModalComponent"
        component={ModalComponent}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="PaymentScreen"
        component={PaymentScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CompassOverlay"
        component={CompassOverlay}
        options={{
          header: () => <GradientHeader2 />,
          headerTitleStyle: {alignSelf: 'center'},
          headerTintColor: 'white',
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
