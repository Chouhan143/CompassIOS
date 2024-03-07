import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {useNavigation} from '@react-navigation/native';
import {useTryDemo} from '../utils/context/LoginProvider';
const CompassModal = ({closeModal}) => {
  const navigation = useNavigation();
  const {setDemoClicked} = useTryDemo();
  const Login = () => {
    setDemoClicked(false);
    // navigation.navigate('Login');
    closeModal();
  };

  const SignUp = () => {
    setDemoClicked(false);
    navigation.navigate('SignUp');
    closeModal();
  };

  return (
    <View style={styles.modalContainer}>
      {/* Display compass information */}
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>Premium Features</Text>

        <Text style={styles.modalSubTitle}>
          Access Compass in a Geographical view and Direction please Login or
          SignUp
        </Text>
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: responsiveHeight(4),
          }}>
          <TouchableOpacity
            style={{
              padding: responsiveWidth(2),
              backgroundColor: '#21AAE1',
              borderRadius: responsiveWidth(1),
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={Login}>
            <Text
              style={{
                color: '#fff',
                fontSize: responsiveFontSize(2),
                fontWeight: '600',
              }}>
              Login or Sign Up
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.modalDescription}>
          {/* Add description here */}
        </Text>
      </View>

      {/* Close button */}
      {/* <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
        <Text style={styles.closeButtonText}>Close</Text>
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: responsiveFontSize(2),
    fontWeight: '700',
    marginBottom: 10,
  },
  modalSubTitle: {
    fontSize: responsiveFontSize(1.8),
    fontWeight: '500',
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 16,
    textAlign: 'center',
  },
  closeButton: {
    // marginTop: responsiveHeight(2),
    padding: responsiveWidth(2),
    backgroundColor: 'red',
    marginLeft: responsiveWidth(5),
    borderRadius: responsiveWidth(1),
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: responsiveFontSize(2),
  },
});

export default CompassModal;
