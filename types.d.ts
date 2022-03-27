import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {ImageSourcePropType} from 'react-native';
import {dummyData} from './constants';

export type HomeBottomTabParamList = {
  HomeScreen: undefined;
  Search: undefined;
  Like: undefined;
  User: undefined;
};

export type RootStackParamList = {
  Home: HomeBottomTabParamList;
  Restaurant: {item: RestaurantType};
  OrderDelivery: {restaurant: RestaurantType};
};
export type HomeScreenProp = StackNavigationProp<RootStackParamList, 'Home'>;
export type RestaurantScreenProp = StackNavigationProp<
  RootStackParamList,
  'Restaurant'
>;
export type OrderDeliveryProp = StackNavigationProp<RootStackParamList, 'OrderDelivery'>;
export type RestaurantRouteProps = RouteProp<RootStackParamList, 'Restaurant'>;
export type OrderDeliveryRouteProps = RouteProp<RootStackParamList, 'OrderDelivery'>;

export type RestaurantType = typeof dummyData.restaurantData[0];
export type MenuItemType = {
  menuId: number;
  name: string;
  photo: ImageSourcePropType;
  description: string;
  calories: number;
  price: number;
};
