import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {useNavigation} from '@react-navigation/native';

const MonthlyFlyingStars = () => {
  const navigation = useNavigation();

  const StarDataImg = [
    {
      id: 1,
      compasId3: 4,
      name: 'January 2024 ',
      imageSource: require('../assets/MonthlyImages/1January2024.png'),
      imageSource2: require('../assets/MonthlyImages/1January2024.png'),
    },
    {
      id: 2,
      compasId3: 4,
      name: 'February 2024 ',
      imageSource: require('../assets/MonthlyImages/2Feb2024.png'),
      imageSource2: require('../assets/MonthlyImages/2Feb2024.png'),
    },
    {
      id: 3,
      compasId3: 4,
      name: 'March 2024 ',
      imageSource: require('../assets/MonthlyImages/3March2024.png'),
      imageSource2: require('../assets/MonthlyImages/3March2024.png'),
    },
    {
      id: 4,
      compasId3: 4,
      name: 'April 2024 ',
      imageSource: require('../assets/MonthlyImages/4April2024.png'),
      imageSource2: require('../assets/MonthlyImages/4April2024.png'),
    },
    {
      id: 5,
      compasId3: 4,
      name: 'May 2024',
      imageSource: require('../assets/MonthlyImages/5May2024.png'),
      imageSource2: require('../assets/MonthlyImages/5May2024.png'),
    },
    {
      id: 6,
      compasId3: 4,
      name: 'June 2024 ',
      imageSource: require('../assets/MonthlyImages/6June2024.png'),
      imageSource2: require('../assets/MonthlyImages/6June2024.png'),
    },
    {
      id: 7,
      name: 'July 2024 ',
      imageSource: require('../assets/MonthlyImages/7July2024.png'),
      imageSource2: require('../assets/MonthlyImages/7July2024.png'),
    },
    {
      id: 8,
      compasId3: 4,
      name: 'August 2024 ',
      imageSource: require('../assets/MonthlyImages/8August2024.png'),
      imageSource2: require('../assets/MonthlyImages/8August2024.png'),
    },
    {
      id: 9,
      compasId3: 4,
      name: 'September 2024 ',
      imageSource: require('../assets/MonthlyImages/9September2024.png'),
      imageSource2: require('../assets/MonthlyImages/9September2024.png'),
    },
    {
      id: 10,
      compasId3: 4,
      name: 'October 2024 ',
      imageSource: require('../assets/MonthlyImages/10October2024.png'),
      imageSource2: require('../assets/MonthlyImages/10October2024.png'),
    },
    {
      id: 11,
      compasId3: 4,
      name: 'November 2024',
      imageSource: require('../assets/MonthlyImages/11November2024.png'),
      imageSource2: require('../assets/MonthlyImages/11November2024.png'),
    },
    {
      id: 12,
      compasId3: 4,
      name: 'December2024',
      imageSource: require('../assets/MonthlyImages/12December2024.png'),
      imageSource2: require('../assets/MonthlyImages/12December2024.png'),
    },
  ];

  return (
    <SafeAreaView style={styles.conatainer}>
      <StatusBar
        backgroundColor="#0a2240" // Set the status bar background color to match your SafeAreaView
        barStyle="dark" // Set the status bar text color
      />
      <TouchableOpacity
        style={styles.bottomBorder}
        onPress={() => navigation.goBack()}>
        <Ionicons
          name={'arrow-back-circle'}
          size={responsiveFontSize(4)}
          color={'#E73B77'}
        />
      </TouchableOpacity>
      <View style={{padding: responsiveWidth(3)}}>
        <Text
          style={{
            fontSize: responsiveFontSize(2.2),
            fontWeight: '700',
            color: '#000',
          }}>
          MONTHLY FLYING STARS
        </Text>
      </View>
      {/* main view  box container */}
      <ScrollView
        style={{
          marginHorizontal: responsiveWidth(5),
        }}>
        <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
          <View>
            {StarDataImg.slice(0, 6).map(item => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('CompassOverlay', {
                    option: item,
                  })
                }>
                <BoxUiComponent
                  key={item.id}
                  imageSource={item.imageSource}
                  name={item.name}
                />
              </TouchableOpacity>
            ))}
          </View>
          <View>
            {StarDataImg.slice(6).map(item => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('CompassOverlay', {
                    option: item,
                  })
                }>
                <BoxUiComponent
                  key={item.id}
                  imageSource={item.imageSource}
                  name={item.name}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MonthlyFlyingStars;

const styles = StyleSheet.create({
  conatainer: {
    flex: 1,
    backgroundColor: '#eaf4fc',
  },
  bottomBorder: {
    padding: responsiveWidth(2),
    borderBottomColor: '#E73B77',
    borderBottomWidth: 0.5,
    borderBottomStyle: 'dashed',
  },
});

const BoxUiComponent = ({imageSource, name}) => {
  return (
    <View style={{flex: 1}}>
      <View
        style={{
          width: responsiveWidth(42),
          height: responsiveHeight(20),
          borderColor: '#E73B77',
          borderWidth: 1,
          borderRadius: responsiveWidth(3),
          marginVertical: responsiveHeight(1),
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          source={imageSource}
          style={{
            width: '100%',
            height: '100%',
            borderRadius: responsiveWidth(3),
          }}
          resizeMode="contain"
        />
        <View
          style={{
            position: 'absolute',
            width: responsiveWidth(5),
            height: responsiveWidth(5),
            backgroundColor: '#E73B77',
            borderRadius: responsiveWidth(2.5),
            right: 0,
            justifyContent: 'center',
            alignItems: 'center',
            top: 0,
          }}>
          <AntDesign
            name={'star'}
            size={responsiveFontSize(1.4)}
            color={'#eaf4fc'}
          />
        </View>
      </View>
      <View style={{marginBottom: responsiveHeight(2)}}>
        <Text
          style={{
            fontSize: responsiveFontSize(2.2),
            color: '#000',
            fontWeight: '500',
          }}>
          {name}
        </Text>
      </View>
    </View>
  );
};
