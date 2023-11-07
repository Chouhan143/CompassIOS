import React from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import Pdf from 'react-native-pdf';

const Ebook = () => {
  //   const source = require('../assets/pdf/introBook.pdf'); // ios only
  const source = require('./IntroBook.pdf'); // ios only
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor="#0a2240" // Set the status bar background color to match your SafeAreaView
        barStyle="light-content" // Set the status bar text color
      />
      <View style={styles.container}>
        <Pdf
          source={source}
          horizontal={true}
          onLoadComplete={(numberOfPages, filePath) => {
            console.log(`Number of pages: ${numberOfPages}`);
          }}
          onPageChanged={(page, numberOfPages) => {
            console.log(`Current page: ${page}`);
          }}
          onError={error => {
            console.log(error);
          }}
          onPressLink={uri => {
            console.log(`Link pressed: ${uri}`);
          }}
          style={styles.pdf}
        />
      </View>
    </SafeAreaView>
  );
};

export default Ebook;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 25,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
