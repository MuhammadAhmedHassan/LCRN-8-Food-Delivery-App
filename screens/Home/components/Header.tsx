import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {COLORS, dummyData, FONTS, icons, SIZES} from '../../../constants';

const Header = () => {
  const {initialCurrentLocation} = dummyData;
  const getIcon = (icon: ImageSourcePropType, onPress?: () => void) => (
    <TouchableOpacity onPress={() => onPress && onPress()}>
      <Image
        source={icon}
        resizeMode="contain"
        style={{height: 30, width: 30, tintColor: COLORS.black}}
      />
    </TouchableOpacity>
  );

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: SIZES.padding2,
        marginTop: SIZES.padding2,
      }}>
      {getIcon(icons.nearby)}
      <View
        style={{
          padding: SIZES.base,
          minWidth: 150,
          backgroundColor: COLORS.lightGray,
          borderRadius: 20,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{...FONTS.h3}}>{initialCurrentLocation.streetName}</Text>
      </View>
      {getIcon(icons.basket)}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({});
