import {
  Image,
  ImageSourcePropType,
  LogBox,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {
  createBottomTabNavigator,
  BottomTabBar,
  BottomTabBarButtonProps,
  BottomTabBarProps,
} from '@react-navigation/bottom-tabs';
import {Svg, Path} from 'react-native-svg';
import {isIphoneX} from 'react-native-iphone-x-helper';

import {HomeBottomTabParamList} from '../types';
import {COLORS, icons} from '../constants';
import {Home} from '../screens';

const Tab = createBottomTabNavigator<HomeBottomTabParamList>();

interface ITabIcon {
  focused: boolean;
  color: string;
  size: number;
  icon: ImageSourcePropType;
}
const TabIcon = ({focused, icon}: ITabIcon) => {
  return (
    <Image
      source={icon}
      resizeMode="contain"
      style={{
        width: 25,
        height: 25,
        tintColor: focused ? COLORS.primary : COLORS.secondary,
      }}
    />
  );
};
const TabBarButton = ({
  accessibilityState,
  children,
  onPress,
}: BottomTabBarButtonProps) => {
  const isSelected = !!accessibilityState?.selected;

  if (isSelected) {
    return (
      <View style={{flex: 1, alignItems: 'center'}}>
        <View style={{flexDirection: 'row', position: 'absolute', top: 0}}>
          <View style={{flex: 1, backgroundColor: COLORS.white}}></View>
          <Svg width={70} height={61} viewBox="0 0 75 61">
            <Path
              d="M75.2 0v61H0V0c4.1 0 7.4 3.1 7.9 7.1C10 21.7 22.5 33 37.7 33c15.2 0 27.7-11.3 29.7-25.9.5-4 3.9-7.1 7.9-7.1h-.1z"
              fill={COLORS.white}
            />
          </Svg>
          <View style={{flex: 1, backgroundColor: COLORS.white}}></View>
        </View>

        <TouchableOpacity
          style={{
            top: -22.5,
            justifyContent: 'center',
            alignItems: 'center',
            width: 50,
            height: 50,
            borderRadius: 25,
            backgroundColor: COLORS.white,
          }}
          onPress={onPress}>
          {children}
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <TouchableOpacity
      style={{
        flex: 1,
        height: 60,
        backgroundColor: COLORS.white,
      }}
      activeOpacity={1}
      onPress={onPress}>
      {children}
    </TouchableOpacity>
  );
};

const CustomTabBar = (props: BottomTabBarProps) => {
  if (isIphoneX()) {
    return (
      <View>
        <View
          style={{
            // position: 'absolute',
            // bottom: 0,
            // left: 0,
            // right: 0,
            height: 30,
            backgroundColor: COLORS.white,
          }}></View>
        <BottomTabBar {...props} />
      </View>
    );
  } else {
    return (
      <View style={{height: 60}}>
        <BottomTabBar {...props} />
      </View>
    );
  }
};

const Tabs = () => {
  React.useEffect(() => {
    LogBox.ignoreLogs(['Looks like']);
  }, []);
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          // position: 'absolute',
          // left: 0,
          // bottom: 0,
          // right: 0,
          // borderTopWidth: 0,
          backgroundColor: 'transparent',
          elevation: 0,
        },
      }}
      tabBar={CustomTabBar}>
      <Tab.Screen
        name="HomeScreen"
        component={Home}
        options={{
          tabBarIcon: props => <TabIcon {...props} icon={icons.cutlery} />,
          tabBarButton: TabBarButton,
        }}
      />
      <Tab.Screen
        name="Search"
        component={Home}
        options={{
          tabBarIcon: props => <TabIcon {...props} icon={icons.search} />,
          tabBarButton: TabBarButton,
        }}
      />

      <Tab.Screen
        name="Like"
        component={Home}
        options={{
          tabBarIcon: props => <TabIcon {...props} icon={icons.like} />,
          tabBarButton: TabBarButton,
        }}
      />

      <Tab.Screen
        name="User"
        component={Home}
        options={{
          tabBarIcon: props => <TabIcon {...props} icon={icons.user} />,
          tabBarButton: TabBarButton,
        }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;

const styles = StyleSheet.create({});
