import {StackNavigationProp} from '@react-navigation/stack';

export type HomeProductType = {
  productId: number;
  productName: string;
  price: number;
  image: ImageSourcePropType;
};
export type RootStackParamList = {
  Home: undefined;
  ItemDetail: {
    item: HomeProductType;
  };
};
export type HomeScreenProp = StackNavigationProp<RootStackParamList, 'Home'>;
export type ItemDetailsScreenProp = StackNavigationProp<
  RootStackParamList,
  'ItemDetail'
>;

// @react-native-community/masked-view @react-navigation/bottom-tabs @react-navigation/native @react-navigation/stack react-native-gesture-handler react-native-iphone-x-helper react-native-maps react-native-maps-directions react-native-reanimated react-native-safe-area-context react-native-screens react-native-svg