import {Animated, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useRef, useState} from 'react';
import {useRoute} from '@react-navigation/native';
import {RestaurantRouteProps} from '../../types';
import {COLORS, dummyData} from '../../constants';
import {FoodInfo, Header} from './components';

const Restaurant = () => {
  const restaurant = useRoute<RestaurantRouteProps>().params.item;
  const currentLocation = dummyData.initialCurrentLocation;
  const [orderItems, setOrderItems] = useState([]);
  const scrollX = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    scrollX.addListener(state => {
      console.log(state);
    });
    return () => {
      scrollX.removeAllListeners();
    };
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
      <Header title={restaurant.name} />
      <FoodInfo scrollX={scrollX} restaurant={restaurant} />
    </SafeAreaView>
  );
};

export default Restaurant;

const styles = StyleSheet.create({});
