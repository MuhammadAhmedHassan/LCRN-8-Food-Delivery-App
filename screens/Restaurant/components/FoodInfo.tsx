import {
  Animated,
  Image,
  ImageBackground,
  ImageSourcePropType,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {RestaurantType} from '../../../types';
import {COLORS, dummyData, FONTS, icons, SIZES} from '../../../constants';

interface IProps {
  scrollX: Animated.Value;
  restaurant: RestaurantType;
}

const FoodInfo = ({scrollX, restaurant}: IProps) => {
  const {menu} = restaurant;
  const currentLocation = dummyData.initialCurrentLocation;

  const renderQuantityButton = (text: '—' | '+') => {
    return (
      <TouchableOpacity style={{flex: 1}}>
        <Text
          style={{
            ...FONTS.h2,
            textAlign: 'center',
            color: COLORS.black,
            fontWeight: '600',
          }}>
          {text}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderIconAndText = (icon: ImageSourcePropType, text: string) => (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Image
        source={icon}
        resizeMode="contain"
        style={{height: 20, width: 20, tintColor: COLORS.darkgray}}
      />
      <Text
        style={{
          ...FONTS.body3,
          color: COLORS.black,
          marginLeft: SIZES.base,
        }}>
        {text}
      </Text>
    </View>
  );

  return (
    <View style={{flex: 1}}>
      <ScrollView style={{flex: 1, marginBottom: 220}}>
        <Animated.ScrollView
          horizontal
          pagingEnabled
          scrollEventThrottle={16}
          snapToAlignment="center"
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {contentOffset: {x: scrollX}},
              },
            ],
            {useNativeDriver: false},
          )}>
          {menu.map((item, index) => (
            <View key={`menu-${index}`} style={{alignItems: 'center'}}>
              <View
                style={{
                  height: 300,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: SIZES.padding3,
                }}>
                <ImageBackground
                  source={item.photo}
                  resizeMode="contain"
                  style={{
                    width: SIZES.width,
                    height: '100%',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                  }}
                  imageStyle={{borderRadius: 140}}>
                  <View
                    style={{
                      backgroundColor: COLORS.white,
                      borderRadius: 25,
                      width: 150,
                      height: 50,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      elevation: 9,
                      marginBottom: -20,
                    }}>
                    {renderQuantityButton('—')}
                    <Text
                      style={{
                        ...FONTS.h3,
                        color: COLORS.black,
                        flex: 1,
                        textAlign: 'center',
                      }}>
                      1
                    </Text>
                    {renderQuantityButton('+')}
                  </View>
                </ImageBackground>
              </View>
              {/* Name & Description */}
              <View
                style={{
                  alignItems: 'center',
                  marginTop: SIZES.padding3 * 1.5,
                  flexWrap: 'wrap',
                  maxWidth: '80%',
                }}>
                <Text
                  style={{
                    ...FONTS.h2,
                    color: COLORS.black,
                    textAlign: 'center',
                    fontWeight: '900',
                  }}>
                  {item.name} — ${item.price.toFixed(2)}
                </Text>
                <Text
                  style={{
                    ...FONTS.body3,
                    color: COLORS.black,
                    marginTop: SIZES.padding,
                    textAlign: 'center',
                    maxWidth: SIZES.width - SIZES.padding3,
                  }}>
                  {item.description}
                </Text>
              </View>

              {/* Calories */}
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: SIZES.padding3,
                }}>
                <Image
                  source={icons.fire}
                  resizeMode="contain"
                  style={{height: 20, width: 20}}
                />
                <Text
                  style={{
                    ...FONTS.body3,
                    color: COLORS.darkgray,
                    marginLeft: SIZES.base,
                  }}>
                  {item.calories.toFixed(2)} cal
                </Text>
              </View>
            </View>
          ))}
        </Animated.ScrollView>

        <View
          style={{
            marginTop: SIZES.padding3,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            height: 10,
            marginBottom: 40,
          }}>
          {menu.map((_, index) => {
            const dotPosition = Animated.divide(scrollX, SIZES.width);

            const dotSize = dotPosition.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [6, 10, 6],
              extrapolate: 'clamp',
            });

            const opacity = dotPosition.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [0.3, 1, 0.3],
              extrapolate: 'clamp',
            });

            const dotColor = dotPosition.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [COLORS.darkgray, COLORS.primary, COLORS.darkgray],
              extrapolate: 'clamp',
            });
            console.log('dotPosition', dotPosition);

            return (
              <Animated.View
                key={index}
                style={{
                  height: dotSize,
                  width: dotSize,
                  backgroundColor: dotColor,
                  marginRight: SIZES.base,
                  opacity: opacity,
                  borderRadius: 5,
                }}
              />
            );
          })}
        </View>
      </ScrollView>

      {/* Order Section */}
      <View
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: COLORS.white,
          elevation: 9,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: SIZES.padding3,
            borderColor: COLORS.lightGray,
            borderBottomWidth: 1,
          }}>
          <Text style={{...FONTS.h4, color: COLORS.black, fontWeight: '700'}}>
            4 Items in Cart
          </Text>
          <Text style={{...FONTS.h4, color: COLORS.black, fontWeight: '700'}}>
            $46.90
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: SIZES.padding3,
          }}>
          {renderIconAndText(icons.pin, currentLocation.streetName)}
          {renderIconAndText(icons.master_card, '•••• 5491')}
        </View>

        <View
          style={{
            paddingHorizontal: SIZES.padding3,
            paddingBottom: SIZES.padding3,
          }}>
          <TouchableOpacity
            style={{
              backgroundColor: COLORS.primary,
              alignItems: 'center',
              justifyContent: 'center',
              height: 60,
              borderRadius: 20,
            }}>
            <Text style={{...FONTS.h4, color: COLORS.white, fontWeight: '700'}}>
              Order
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default FoodInfo;

const styles = StyleSheet.create({});
