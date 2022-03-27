import { RouteProp } from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {dummyData} from './constants';

// export type HomeProductType = {
//   productId: number;
//   productName: string;
//   price: number;
//   image: ImageSourcePropType;
// };

export type HomeBottomTabParamList = {
  HomeScreen: undefined;
  Search: undefined;
  Like: undefined;
  User: undefined;
};

export type RootStackParamList = {
  Home: HomeBottomTabParamList;
  Restaurant: {item: typeof dummyData.restaurantData[0]};
  OrderDelivery: undefined;
  // ItemDetail: {
  //   item: HomeProductType;
  // };
};
export type HomeScreenProp = StackNavigationProp<RootStackParamList, 'Home'>;
export type RestaurantScreenProp = StackNavigationProp<
  RootStackParamList,
  'Restaurant'
>;
export type RestaurantRouteProps = RouteProp<RootStackParamList, 'Restaurant'>;
// @react-native-community/masked-view @react-navigation/bottom-tabs @react-navigation/native @react-navigation/stack react-native-gesture-handler react-native-iphone-x-helper react-native-maps react-native-maps-directions react-native-reanimated react-native-safe-area-context react-native-screens react-native-svg
