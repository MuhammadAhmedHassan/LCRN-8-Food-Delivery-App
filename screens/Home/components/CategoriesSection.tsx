import {Image, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {COLORS, dummyData, FONTS, SIZES} from '../../../constants';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import {MainCategories} from './';
import {CategoryList} from './';

const CategoriesSection = () => {
  const [categories, setCategories] = useState(dummyData.categoryData);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  const getRestaurant = (category: typeof selectedCategory) => {
    const restaurantList = dummyData.restaurantData.filter(restaurant =>
      restaurant.categories.includes(category.id),
    );
    return restaurantList;
  };

  const [restaurants, setRestaurants] = useState(
    getRestaurant(selectedCategory)!,
  );
  const categoriesLength = categories.length;

  const onSelectCategory = (category: typeof selectedCategory) => {
    //filter restaurant
    const restaurantList = getRestaurant(category)!;
    setRestaurants(restaurantList);
    setSelectedCategory(category);
  };
  const getCategoryNameById = (categoryId: number) => {
    return categories.filter(cat => cat.id === categoryId).map(cat => cat.name);
  };
  return (
    <View style={{flex: 1}}>
      <MainCategories
        categories={categories}
        categoriesLength={categoriesLength}
        selectedCategory={selectedCategory}
        setSelectedCategory={onSelectCategory}
      />
      <CategoryList
        restaurants={restaurants}
        getCategoryNameById={getCategoryNameById}
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
