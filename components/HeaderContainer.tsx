import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {COLORS, FONTS, SIZES} from '../constants';

interface IProps {
  leftIcon?: ImageSourcePropType;
  leftIconPress?: () => void;
  rightIcon?: ImageSourcePropType;
  title?: string;
}

const HeaderContainer = ({
  leftIcon,
  rightIcon,
  title,
  leftIconPress,
}: IProps) => {
  const getIcon = (icon: ImageSourcePropType, onPress?: () => void) => (
    <TouchableOpacity onPress={onPress}>
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
      {!!leftIcon && getIcon(leftIcon, leftIconPress)}
      {!!title && (
        <View
          style={{
            padding: SIZES.base,
            paddingHorizontal: SIZES.font,
            minWidth: 150,
            backgroundColor: COLORS.lightGray,
            borderRadius: 20,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{...FONTS.h4, color: COLORS.black}}>{title}</Text>
        </View>
      )}
      {!!rightIcon && getIcon(rightIcon)}
    </View>
  );
};

export default HeaderContainer;

const styles = StyleSheet.create({});
