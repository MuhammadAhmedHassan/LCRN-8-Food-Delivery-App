import {Animated, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useRef, useState} from 'react';
import {useRoute} from '@react-navigation/native';
import {RestaurantRouteProps} from '../../types';
import {dummyData} from '../../constants';
import { Header } from './components'

const Restaurant = () => {
  const restaurant = useRoute<RestaurantRouteProps>().params.item;
  const currentLocation = dummyData.initialCurrentLocation;
  const [orderItems, setOrderItems] = useState([]);
  const scrollX = useRef(new Animated.Value(0)).current;
  
  return (
    <SafeAreaView>
      <Header title={restaurant.name} />
      <Text>Restaurant</Text>
    </SafeAreaView>
  );
};

export default Restaurant;

const styles = StyleSheet.create({});
