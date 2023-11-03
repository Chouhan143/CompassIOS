import React from 'react';
import {View, Text, Modal, Button, StyleSheet} from 'react-native';

const CancelModal = ({visible, closeModal}) => {
  return (
    <Modal
      visible={visible}
      transparent={true} // Set transparent to make the background transparent
      animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text>Payment Canceled</Text>
          <Button title="Close" onPress={closeModal} />
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
  },
});

export default CancelModal;
