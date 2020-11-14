'use strict';

(function () {
  const MAP_SIZE_Y_MIN = 49;
  const MAP_SIZE_Y_MAX = 549;
  const MAP_SIZE_X_MAX = 1199;
  const MAP_SIZE_X_MIN = -1;
  const MAIN_BUTTON = 0;

  const offerTypes = {
    bungalow: {
      label: 'Бунгало',
      minPrice: 0,
    },

    flat: {
      label: 'Квартира',
      minPrice: 1000,
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
    mapTop: MAP_SIZE_Y_MIN,
    mapBottom: MAP_SIZE_Y_MAX,
    mapRight: MAP_SIZE_X_MAX,
    mapLeft: MAP_SIZE_X_MIN,
    mainButton: MAIN_BUTTON
  };
})();
