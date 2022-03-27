import React from 'react';
import {dummyData, icons} from '../../../constants';
import {HeaderContainer} from '../../../components';

const Header = () => {
  const {initialCurrentLocation} = dummyData;

  return (
    <HeaderContainer
      leftIcon={icons.nearby}
      rightIcon={icons.basket}
      title={initialCurrentLocation.streetName}
    />
  );
};

export default Header;
