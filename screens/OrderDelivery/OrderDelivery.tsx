import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useMemo, useRef, useState} from 'react';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import {
  COLORS,
  dummyData,
  FONTS,
  GOOGLE_API_KEY,
  icons,
  SIZES,
} from '../../constants';
import {useNavigation, useRoute} from '@react-navigation/native';
import {OrderDeliveryProp, OrderDeliveryRouteProps} from '../../types';

const OrderDelivery = () => {
  const {gps, streetName} = dummyData.initialCurrentLocation;
  const navigation = useNavigation<OrderDeliveryProp>();

  const {restaurant} = useRoute<OrderDeliveryRouteProps>().params;
  const mapView = useRef<MapView>(null);
  const [fromLocation, setFromLocation] = useState(gps);
  const toLoccation = useMemo(() => restaurant.location, []);
  const region = useMemo(
    () => ({
      latitude: (fromLocation.latitude + toLoccation.latitude) / 2,
      longitude: (fromLocation.longitude + toLoccation.longitude) / 2,
      latitudeDelta: Math.abs(fromLocation.latitude - toLoccation.latitude) * 2,
      longitudeDelta:
        Math.abs(fromLocation.longitude - toLoccation.longitude) * 2,
    }),
    [],
  );
  const [duration, setDuration] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [carAngle, setCarAngle] = useState(0);

  const calculateCarAngle = (coordinates: any) => {
    const startLat = coordinates[0]['latitude'];
    const startLng = coordinates[0]['longitude'];
    const endLat = coordinates[1]['latitude'];
    const endLng = coordinates[1]['longitude'];
    const dx = endLat - startLat;
    const dy = endLng - startLng;

    return (Math.atan2(dy, dx) * 180) / Math.PI;
  };

  const destinationMarker = () => (
    <Marker coordinate={toLoccation}>
      <View style={styles.center40}>
        <View style={styles.center30}>
          <Image
            source={icons.pin}
            resizeMode="contain"
            style={{height: 25, width: 25, tintColor: COLORS.white}}
          />
        </View>
      </View>
    </Marker>
  );

  const carIcon = () => (
    <Marker
      coordinate={fromLocation}
      anchor={{x: 0.5, y: 0.5}}
      flat={true}
      rotation={carAngle}>
      <Image
        source={icons.car}
        resizeMode="contain"
        style={{height: 40, width: 40}}
      />
    </Marker>
  );

  const renderDestinationHeader = () => {
    return (
      <View style={styles.absoluteTop50}>
        <View style={styles.header}>
          <Image
            source={icons.red_pin}
            resizeMode="contain"
            style={{width: 30, height: 30, marginRight: SIZES.padding}}
          />
          <Text style={{...FONTS.body3, flex: 1}}>{streetName}</Text>
          <Text style={FONTS.body3}>{Math.ceil(duration)} mins</Text>
        </View>
      </View>
    );
  };

  const renderDeliveryInfo = () => (
    <View
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 10,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <View
        style={{
          width: SIZES.width * 0.9,
          backgroundColor: COLORS.white,
          borderRadius: SIZES.radius,
          paddingVertical: SIZES.padding * 3,
          paddingHorizontal: SIZES.padding * 2,
          justifyContent: 'space-between',
        }}>
        {/* Top row */}
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={restaurant.courier.avatar}
            resizeMode="contain"
            style={{height: 50, width: 50, borderRadius: 25}}
          />
          <View style={{marginLeft: SIZES.font, flex: 1}}>
            <Text style={{...FONTS.h3, color: COLORS.black}}>Bruce Evans</Text>
            <Text style={{...FONTS.body4}}>Burgers Story</Text>
          </View>
          <Image
            source={icons.star}
            resizeMode="contain"
            style={{height: 20, width: 20, tintColor: COLORS.primary}}
          />
          <Text
            style={{
              ...FONTS.body3,
              color: COLORS.black,
              marginLeft: SIZES.base,
            }}>
            4.7
          </Text>
        </View>
        {/* Buttons row */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: SIZES.font,
          }}>
          <TouchableOpacity
            onPress={navigation.goBack}
            style={{
              height: 50,
              backgroundColor: COLORS.primary,
              width: '48%',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 20,
            }}>
            <Text style={{...FONTS.h4, color: COLORS.white}}>Call</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={navigation.goBack}
            style={{
              height: 50,
              backgroundColor: COLORS.secondary,
              width: '48%',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 20,
            }}>
            <Text style={{...FONTS.h4, color: COLORS.black}}>Message</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={{flex: 1}}>
      <MapView
        ref={mapView}
        provider={PROVIDER_GOOGLE}
        initialRegion={region}
        style={{flex: 1}}>
        <MapViewDirections
          origin={fromLocation}
          destination={toLoccation}
          apikey={'GOOGLE_API_KEY'}
          strokeWidth={5}
          strokeColor={COLORS.primary}
          optimizeWaypoints={true}
          onReady={result => {
            setDuration(result.duration);

            if (!isReady) {
              // Fit route into the map
              mapView.current?.fitToCoordinates(result.coordinates, {
                edgePadding: {
                  right: SIZES.width / 20,
                  bottom: SIZES.height / 4,
                  left: SIZES.width / 20,
                  top: SIZES.height / 8,
                },
              });

              const nextLocation = {
                latitude: result.coordinates[0]['latitude'],
                longitude: result.coordinates[0]['longitude'],
              };

              // Reposition the car
              // So, that the car render on the road instead of the building blocks
              if (result.coordinates.length >= 2) {
                const angleOfCar = calculateCarAngle(result.coordinates);
                setCarAngle(angleOfCar);
              }

              setFromLocation(nextLocation);
              setIsReady(true);
            }
          }}
        />
        {destinationMarker()}
        {carIcon()}
      </MapView>
      {renderDestinationHeader()}
      {renderDeliveryInfo()}
    </View>
  );
};

export default OrderDelivery;

const styles = StyleSheet.create({
  center30: {
    height: 30,
    width: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
  },
  center40: {
    height: 40,
    width: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
  },
  absoluteTop50: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    width: SIZES.width * 0.9,
    paddingVertical: SIZES.padding,
    paddingHorizontal: SIZES.padding * 2,
    borderRadius: SIZES.radius,
    backgroundColor: COLORS.white,
  },
});
