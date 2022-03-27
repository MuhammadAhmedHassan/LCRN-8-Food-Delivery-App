import {
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {COLORS, dummyData, FONTS, icons, SIZES} from '../../../constants';
import {useNavigation} from '@react-navigation/native';
import {HomeScreenProp} from '../../../types';

interface IProps {
  restaurants: typeof dummyData.restaurantData;
  getCategoryNameById: (categoryId: number) => string[];
}

const CategoryList = ({restaurants, getCategoryNameById}: IProps) => {
  const navigation = useNavigation<HomeScreenProp>();
  return (
    <FlatList
      data={restaurants}
      showsVerticalScrollIndicator={false}
      keyExtractor={item => `category-list-${item.id}`}
      contentContainerStyle={{
        paddingHorizontal: SIZES.padding * 2,
        paddingBottom: SIZES.padding2,
      }}
      renderItem={({item}) => {
        return (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Restaurant', {
                item,
              })
            }
            key={item.id}
            style={{
              marginBottom: SIZES.padding,
            }}>
            <ImageBackground
              source={item.photo}
              resizeMode="cover"
              style={{
                width: '100%',
                height: 200,
                justifyContent: 'flex-end',
                borderRadius: SIZES.radius,
                ...styles.shadow,
              }}
              imageStyle={{borderRadius: SIZES.radius, overflow: 'hidden'}}>
              <View
                style={{
                  backgroundColor: COLORS.white,
                  width: SIZES.width * 0.35,
                  paddingHorizontal: SIZES.padding,
                  height: 40,
                  borderTopRightRadius: SIZES.radius,
                  borderBottomLeftRadius: SIZES.radius,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{...FONTS.h4, color: COLORS.black, fontWeight: '900'}}>
                  {item.duration}
                </Text>
              </View>
            </ImageBackground>

            <View style={{marginTop: SIZES.padding}}>
              <Text style={{...FONTS.body2, color: COLORS.black}}>
                {item.name}
              </Text>
              <View style={{flexDirection: 'row'}}>
                <Image
                  source={icons.star}
                  resizeMode="contain"
                  style={{
                    height: 20,
                    width: 20,
                    tintColor: COLORS.primary,
                    marginRight: 10,
                  }}
                />
                <Text style={FONTS.body3}>{item.rating}</Text>

                {/* Categories */}
                <View style={{flexDirection: 'row', marginLeft: 10}}>
                  {item.categories.map(categoryId => (
                    <View style={{flexDirection: 'row'}} key={categoryId}>
                      <Text style={{...FONTS.body3}}>
                        {getCategoryNameById(categoryId)}
                      </Text>
                      <Text style={{...FONTS.h3, color: COLORS.darkgray}}>
                        {' '}
                        .{' '}
                      </Text>
                    </View>
                  ))}
                  {/* Price */}
                  {[1, 2, 3].map(priceRating => (
                    <Text
                      key={priceRating}
                      style={{
                        ...FONTS.body3,
                        color:
                          priceRating <= item.priceRating
                            ? COLORS.black
                            : COLORS.darkgray,
                      }}>
                      $
                    </Text>
                  ))}
                </View>
              </View>
            </View>
          </TouchableOpacity>
        );
      }}
    />
  );
};

export default CategoryList;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 1,
  },
});
