import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  Platform,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import MapView, {Marker, AnimatedRegion} from 'react-native-maps';
import {GOOGLE_MAP_KEY} from '../constants/googleMapKey';
import imagePath from '../constants/imagePath';
import MapViewDirections from 'react-native-maps-directions';
import Loader from '../componrnts/Loader';
import {locationPermission, getCurrentLocation} from '../helper/helperFunction';
import Modal from 'react-native-modal';
import AddressPickup from '../componrnts/AddressPickup';
import {showError} from '../helper/helperFunction';
import {
  responsiveFontSize,
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';
import {useNavigation} from '@react-navigation/native';

const screen = Dimensions.get('window');
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.04;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const Home = props => {
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const mapRef = useRef();
  const markerRef = useRef();
  const panelRef = useRef(null);

  const [state, setState] = useState({
    curLoc: {
      latitude: 30.7046,
      longitude: 77.1025,
    },
    destinationCords: {},
    isLoading: false,
    coordinate: new AnimatedRegion({
      latitude: 30.7046,
      longitude: 77.1025,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    }),
    time: 0,
    distance: 0,
    heading: 0,
  });

  const {
    curLoc,
    time,
    distance,
    destinationCords,
    isLoading,
    coordinate,
    heading,
  } = state;
  const updateState = data => setState(state => ({...state, ...data}));

  useEffect(() => {
    getLiveLocation();
  }, []);

  const getLiveLocation = async () => {
    const locPermissionDenied = await locationPermission();
    if (locPermissionDenied) {
      const {latitude, longitude, heading} = await getCurrentLocation();
      console.log('get live location after 4 second', heading);
      animate(latitude, longitude);
      updateState({
        heading: heading,
        curLoc: {latitude, longitude},
        coordinate: new AnimatedRegion({
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }),
      });
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      getLiveLocation();
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  //   const onPressLocation = () => {
  //     navigation.navigate('chooseLocation', {getCordinates: fetchValue});
  //   };
  const fetchValue = data => {
    console.log('this is data', data);
    updateState({
      destinationCords: {
        latitude: data.destinationCords.latitude,
        longitude: data.destinationCords.longitude,
      },
    });
  };

  const animate = (latitude, longitude) => {
    const newCoordinate = {latitude, longitude};
    if (Platform.OS == 'android') {
      if (markerRef.current) {
        markerRef.current.animateMarkerToCoordinate(newCoordinate, 7000);
      }
    } else {
      coordinate.timing(newCoordinate).start();
    }
  };

  const onCenter = () => {
    mapRef.current.animateToRegion({
      latitude: curLoc.latitude,
      longitude: curLoc.longitude,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    });
  };

  const fetchTime = (d, t) => {
    updateState({
      distance: d,
      time: t,
    });
  };

  const convertMinutesToHours = minutes => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    const formattedMinutes =
      remainingMinutes < 10 ? `0${remainingMinutes}` : remainingMinutes;
    return `${hours}h ${formattedMinutes.toFixed(0)} Min`;
  };

  // modal functionalty

  const checkValid = () => {
    if (Object.keys(destinationCords).length === 0) {
      showError('Please enter your destination location');
      return false;
    }
    return true;
  };

  const onDone = () => {
    const isValid = checkValid();
    if (isValid) {
      fetchValue({
        destinationCords,
      });
      toggleModal();
      navigation.navigate('Location');
    }
  };

  const fetchDestinationCords = (lat, lng, zipCode, cityText) => {
    console.log('zip code==>>>', zipCode);
    console.log('city texts', cityText);
    setState({
      ...state,
      destinationCords: {
        latitude: lat,
        longitude: lng,
      },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor="#0a2240" // Set the status bar background color to match your SafeAreaView
        barStyle="dark" // Set the status bar text color
      />
      {/* <View> */}
      {distance !== 0 && time !== 0 && (
        <View style={{alignItems: 'center', marginVertical: 16}}>
          <Text>Time left: {convertMinutesToHours(time)} </Text>

          <Text>Distance left: {distance.toFixed(0)} Km</Text>
        </View>
      )}
      <View style={{flex: 1}}>
        <MapView
          ref={mapRef}
          style={StyleSheet.absoluteFill}
          initialRegion={{
            ...curLoc,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}>
          <Marker.Animated ref={markerRef} coordinate={coordinate}>
            <Image
              source={imagePath.icBike}
              style={{
                width: 40,
                height: 40,
                transform: [{rotate: `${heading}deg`}],
              }}
              resizeMode="contain"
            />
          </Marker.Animated>

          {Object.keys(destinationCords).length > 0 && (
            <Marker
              coordinate={destinationCords}
              image={imagePath.icGreenMarker}
            />
          )}

          {Object.keys(destinationCords).length > 0 && (
            <MapViewDirections
              origin={curLoc}
              destination={destinationCords}
              apikey={GOOGLE_MAP_KEY}
              strokeWidth={6}
              strokeColor="red"
              optimizeWaypoints={true}
              onStart={params => {
                console.log(
                  `Started routing between "${params.origin}" and "${params.destination}"`,
                );
              }}
              onReady={result => {
                console.log(`Distance: ${result.distance} km`);
                console.log(`Duration: ${result.duration} min.`);
                fetchTime(result.distance, result.duration),
                  mapRef.current.fitToCoordinates(result.coordinates, {
                    edgePadding: {
                      // right: 30,
                      // bottom: 300,
                      // left: 30,
                      // top: 100,
                    },
                  });
              }}
              onError={errorMessage => {
                // console.log('GOT AN ERROR');
              }}
            />
          )}
        </MapView>
        <TouchableOpacity
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0,
          }}
          onPress={onCenter}>
          <Image source={imagePath.greenIndicator} />
        </TouchableOpacity>
      </View>
      <View style={styles.bottomCard}>
        <Text>Where are you going..?</Text>
        <TouchableOpacity
          //  onPress={onPressLocation}
          onPress={toggleModal}
          style={styles.inpuStyle}>
          <Text>Choose your location</Text>
        </TouchableOpacity>
      </View>
      <Loader isLoading={isLoading} />

      {/* Modal here  */}
      <Modal isVisible={isModalVisible} onModalShow={fetchValue}>
        <View
          style={{
            width: responsiveWidth(90),
            height: responsiveHeight(70),
            backgroundColor: 'white',
            borderWidth: 1,
            borderRadius: responsiveWidth(2),
          }}>
          <AddressPickup
            placheholderText="Enter Destination Location"
            fetchAddress={fetchDestinationCords}
          />
          <TouchableOpacity
            onPress={onDone}
            style={{
              width: responsiveWidth(80),
              height: responsiveHeight(6),
              backgroundColor: 'orange',
              justifyContent: 'center',
              alignSelf: 'center',
              borderRadius: responsiveWidth(1),
              marginBottom: responsiveHeight(1),
            }}>
            <Text
              style={{
                alignSelf: 'center',
                fontSize: responsiveFontSize(2.1),
                fontWeight: '600',
                color: 'white',
              }}>
              Done
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
      {/* </View> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomCard: {
    backgroundColor: 'white',
    width: '100%',
    padding: 30,
    borderTopEndRadius: 24,
    borderTopStartRadius: 24,
  },
  inpuStyle: {
    backgroundColor: 'white',
    borderRadius: 4,
    borderWidth: 1,
    alignItems: 'center',
    height: 48,
    justifyContent: 'center',
    marginTop: 16,
  },
});

export default Home;
