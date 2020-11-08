'use strict';

(function () {
  const TIME_CHECK_IN_OUT = ['12:00', '13:00', '14:00'];
  const MAP_SIZE_Y_MIN = 130;
  const MAP_SIZE_Y_MAX = 630;
  const MAP_SIZE_X_MAX = 1200;
  const MAP_SIZE_X_MIN = 0;

  const offerTypes = {
    flat: {
      label: 'Квартира',
      minPrice: 1000,
    },
    bungalow: {
      label: 'Бунгало',
      minPrice: 0,
    },
    house: {
      label: 'Дом',
      minPrice: 5000,
    },
    palace: {
      label: 'Дворец',
      minPrice: 10000,
    },
  };

  window.data = {
    apartments: offerTypes,
    timeCheck: TIME_CHECK_IN_OUT,
    mapTop: MAP_SIZE_Y_MIN,
    mapBottom: MAP_SIZE_Y_MAX,
    mapRight: MAP_SIZE_X_MAX,
    mapLeft: MAP_SIZE_X_MIN
  };
})();
