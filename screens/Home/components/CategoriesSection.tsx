import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {COLORS, dummyData, FONTS, SIZES} from '../../../constants';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';

const CategoriesSection = () => {
  const [categories, setCategories] = useState(dummyData.categoryData);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const categoriesLength = categories.length;
  return (
    <View style={{marginTop: SIZES.padding3}}>
      <View style={{marginHorizontal: SIZES.padding2}}>
        <Text style={{...FONTS.h1, color: COLORS.black}}>Main</Text>
        <Text style={{...FONTS.h1, color: COLORS.black}}>Categories</Text>
      </View>

      <FlatList
        data={categories}
        keyExtractor={item => `main-categories-${item.id}`}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{marginTop: SIZES.padding * 2}}
        renderItem={({item, index}) => {
          const isSelected = item.id === selectedCategory.id;
          const last = index === categoriesLength - 1;
          return (
            <TouchableOpacity
              onPress={() => setSelectedCategory(item)}
              key={item.id}
              style={{
                minHeight: 110,
                width: 70,
                backgroundColor: isSelected ? COLORS.primary : COLORS.white,
                padding: SIZES.base,
                borderRadius: 40,
                alignItems: 'center',
                marginLeft: SIZES.padding2,
                marginRight: last ? SIZES.padding2 : undefined,
                ...styles.shadow,
              }}>
              <View
                style={{
                  height: 50,
                  width: 50,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: isSelected ? COLORS.white : COLORS.lightGray,
                  borderRadius: 25,
                  padding: SIZES.base,
                }}>
                <Image
                  source={item.icon}
                  resizeMode="contain"
                  style={{height: 30, width: 30}}
                />
              </View>
              <Text
                style={{
                  ...FONTS.body5,
                  color: isSelected ? COLORS.white : COLORS.black,
                  textAlign: 'center',
                  marginTop: SIZES.padding,
                  fontWeight: '900',
                }}>
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default CategoriesSection;

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
