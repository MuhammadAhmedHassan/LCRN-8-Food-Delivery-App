import {StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {CategoriesSection, Header} from './components';
import {SafeAreaView} from 'react-native-safe-area-context';
import {COLORS} from '../../constants';

const Home = () => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
      <StatusBar />
      <Header />
      <CategoriesSection />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({});
