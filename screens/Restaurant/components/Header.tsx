import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ImageSourcePropType,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {icons, SIZES} from '../../../constants';
import {HeaderContainer} from '../../../components';
import {RestaurantScreenProp} from '../../../types';

interface IProps {
  title: string;
}

const Header = ({title}: IProps) => {
  const navigation = useNavigation<RestaurantScreenProp>();
  return (
    <HeaderContainer
      leftIcon={icons.back}
      leftIconPress={navigation.goBack}
      title={title}
      rightIcon={icons.list}
    />
  );
};

export default Header;

const styles = StyleSheet.create({});
