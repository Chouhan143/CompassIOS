import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
// import { SafeAreaView } from 'react-native-safe-area-context';
import {MagnifyingGlassIcon, XMarkIcon} from 'react-native-heroicons/outline';
import {CalendarDaysIcon, MapPinIcon} from 'react-native-heroicons/solid';
import {debounce} from 'lodash';
import {theme} from '../componrnts/theme/index';
import {
  fetchLocations,
  fetchWeatherForecast,
} from '../componrnts/theme/api/weather';
import * as Progress from 'react-native-progress';
// import { StatusBar } from 'expo-status-bar';
import {weatherImages} from '../componrnts/theme/constants/index';
import {getData, storeData} from '../componrnts/utils/asyncStorage';
import tw, {style} from 'twrnc';
export default function Weather() {
  const [showSearch, toggleSearch] = useState(false);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [weather, setWeather] = useState({});

  const handleSearch = search => {
    // console.log('value: ',search);
    if (search && search.length > 2)
      fetchLocations({cityName: search}).then(data => {
        // console.log('got locations: ',data);
        setLocations(data);
      });
  };

  const handleLocation = loc => {
    setLoading(true);
    toggleSearch(false);
    setLocations([]);
    fetchWeatherForecast({
      cityName: loc.name,
      days: '7',
    }).then(data => {
      setLoading(false);
      setWeather(data);
      storeData('city', loc.name);
    });
  };

  useEffect(() => {
    fetchMyWeatherData();
  }, []);

  const fetchMyWeatherData = async () => {
    let myCity = await getData('city');
    let cityName = 'Islamabad';
    if (myCity) {
      cityName = myCity;
    }
    fetchWeatherForecast({
      cityName,
      days: '7',
    }).then(data => {
      // console.log('got data: ',data.forecast.forecastday);
      setWeather(data);
      setLoading(false);
    });
  };

  const handleTextDebounce = useCallback(debounce(handleSearch, 1200), []);

  const {location, current} = weather;

  return (
    <View style={tw`relative flex-1`}>
      <StatusBar style="light" />
      <Image
        blurRadius={70}
        // source={require('../../screens/assets/images/bg.png')}
        source={require('../../screens/assets/images/bg8.jpg')}
        style={tw`absolute w-full h-full`}
      />
      {loading ? (
        <View style={tw`flex-row items-center justify-center flex-1`}>
          <Progress.CircleSnail thickness={10} size={140} color="#0bb3b2" />
        </View>
      ) : (
        <SafeAreaView style={tw`flex flex-1`}>
          {/* search section */}
          <View style={[{height: '7%'}, tw`relative z-50 mx-4`]}>
            <View
              style={[
                {
                  backgroundColor: showSearch
                    ? theme.bgWhite(0.2)
                    : 'transparent',
                },
                tw`flex-row items-center justify-end rounded-full`,
              ]}>
              {showSearch ? (
                <TextInput
                  onChangeText={handleTextDebounce}
                  placeholder="Search city"
                  placeholderTextColor={'lightgray'}
                  style={tw`flex-1 h-10 pb-1 pl-6 text-base text-white`}
                />
              ) : null}
              <TouchableOpacity
                onPress={() => toggleSearch(!showSearch)}
                style={[
                  {backgroundColor: theme.bgWhite(0.3)},
                  tw`p-3 m-1 rounded-full`,
                ]}>
                {showSearch ? (
                  <XMarkIcon size="25" color="white" />
                ) : (
                  <MagnifyingGlassIcon size="25" color="white" />
                )}
              </TouchableOpacity>
            </View>
            {locations.length > 0 && showSearch ? (
              <View style={tw`absolute w-full bg-gray-300 top-16 rounded-3xl`}>
                {locations.map((loc, index) => {
                  let showBorder = index + 1 != locations.length;
                  let borderClass = showBorder
                    ? tw`border-b-2 border-b-gray-400`
                    : null;
                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={() => handleLocation(loc)}
                      style={{
                        ...tw`flex-row items-center justify-center flex-1 p-3 px-4 mb-1 border-0`,
                        ...borderClass,
                      }}>
                      <MapPinIcon size="20" color="gray" />
                      <Text style={tw`ml-2 text-lg text-black`}>
                        {loc?.name}, {loc?.country}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            ) : null}
          </View>

          {/* forecast section */}
          <View style={tw`flex justify-around flex-1 mx-4 mb-2`}>
            {/* location */}
            <Text style={tw`text-2xl font-bold text-center text-white`}>
              {location?.name},
              <Text style={tw`text-lg font-semibold text-gray-300`}>
                {location?.country}
              </Text>
            </Text>
            {/* weather icon */}
            <View style={tw`flex-row justify-center`}>
              <Image
                // source={{uri: 'https:'+current?.condition?.icon}}
                source={weatherImages[current?.condition?.text || 'other']}
                style={tw`w-52 h-52`}
              />
            </View>
            {/* degree celcius */}
            <View style={tw`space-y-2`}>
              <Text style={tw`ml-5 text-6xl font-bold text-center text-white`}>
                {current?.temp_c}&#176;
              </Text>
              <Text style={tw`text-xl tracking-widest text-center text-white`}>
                {current?.condition?.text}
              </Text>
            </View>

            {/* other stats */}
            <View style={tw`flex-row justify-between mx-4`}>
              <View style={tw`flex-row items-center space-x-2`}>
                <Image
                  source={require('../assets/images/icons/wind.png')}
                  style={tw`w-6 h-6`}
                />
                <Text style={tw`text-base font-semibold text-white`}>
                  {current?.wind_kph}km
                </Text>
              </View>
              <View style={tw`flex-row items-center space-x-2`}>
                <Image
                  // source={require('../assets/icons/drop.png')}
                  source={require('../assets/images/icons/drop.png')}
                  style={tw`w-6 h-6`}
                />
                <Text style={tw`text-base font-semibold text-white`}>
                  {current?.humidity}%
                </Text>
              </View>
              <View style={tw`flex-row items-center space-x-2`}>
                <Image
                  source={require('../assets/images/icons/sun.png')}
                  style={tw`w-6 h-6`}
                />
                <Text style={tw`text-base font-semibold text-white`}>
                  {weather?.forecast?.forecastday[0]?.astro?.sunrise}
                </Text>
              </View>
            </View>
          </View>

          {/* forecast for next days */}
          <View style={tw`mb-2 space-y-3`}>
            <View style={tw`flex-row items-center mx-5 space-x-2`}>
              <CalendarDaysIcon size="22" color="white" />
              <Text style={tw`text-base text-white`}>Daily forecast</Text>
            </View>
            <ScrollView
              horizontal
              contentContainerStyle={{paddingHorizontal: 15}}
              showsHorizontalScrollIndicator={false}>
              {weather?.forecast?.forecastday?.map((item, index) => {
                const date = new Date(item.date);
                const options = {weekday: 'long'};
                let dayName = date.toLocaleDateString('en-US', options);
                dayName = dayName.split(',')[0];

                return (
                  <View
                    key={index}
                    style={[
                      {backgroundColor: theme.bgWhite(0.15)},
                      tw`flex items-center justify-center w-24 py-3 mr-4 space-y-1 rounded-3xl`,
                    ]}>
                    <Image
                      // source={{uri: 'https:'+item?.day?.condition?.icon}}
                      source={
                        weatherImages[item?.day?.condition?.text || 'other']
                      }
                      style={tw`w-11 h-11`}
                    />
                    <Text style={tw`text-white`}>{dayName}</Text>
                    <Text style={tw`text-xl font-semibold text-white`}>
                      {item?.day?.avgtemp_c}&#176;
                    </Text>
                  </View>
                );
              })}
            </ScrollView>
          </View>
        </SafeAreaView>
      )}
    </View>
  );
}
