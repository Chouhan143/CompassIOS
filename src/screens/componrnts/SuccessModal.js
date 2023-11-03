import React from 'react';
import {
  View,
  Text,
  Modal,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

const SuccessModal = ({visible, closeModal}) => {
  const navigation = useNavigation();
  const handleOkPress = () => {
    // Close the modal
    closeModal();
    // Navigate to the home screen
    navigation.navigate('Home'); // Adjust the screen name as needed
  };

  return (
    <Modal
      visible={visible}
      transparent={true} // Set transparent to make the background transparent
      animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Image
            source={require('../assets/images/done.png')}
            style={{
              width: responsiveWidth(25),
              height: responsiveWidth(25),
            }}
          />
          <Text
            style={{
              fontSize: responsiveFontSize(2.5),
              color: 'green',
              fontWeight: '500',
              marginBottom: 10,
            }}>
            Payment Successful !
          </Text>

          {/* <View
            style={[
              {
                width: '90%',
                margin: 10,
                backgroundColor: 'green',
                borderRadius: responsiveWidth(3),
              },
            ]}> */}
          <TouchableOpacity
            style={[
              {
                width: responsiveWidth(65),
                height: responsiveHeight(6),
                margin: 10,
                backgroundColor: 'green',
                borderRadius: responsiveWidth(3),
                justifyContent: 'center',
                alignItems: 'center',
              },
            ]}
            onPress={handleOkPress}>
            <Text
              style={{
                fontSize: responsiveFontSize(3),
                color: '#fff',
                fontWeight: '700',
              }}>
              Ok
            </Text>
          </TouchableOpacity>
          {/* </View> */}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Background with 0.5 opacity
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: responsiveWidth(80),
    height: responsiveHeight(35),
    justifyContent: 'center',
  },
});

export default SuccessModal;
