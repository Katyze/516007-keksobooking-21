'use strict';

(function () {
  const MAP_SIZE_Y_MIN = 43;
  const MAP_SIZE_Y_MAX = 542;
  const MAP_SIZE_X_MAX = 1200;
  const MAP_SIZE_X_MIN = 0;

  const OfferTypes = {
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
    apartments: OfferTypes,
    mapTop: MAP_SIZE_Y_MIN,
    mapBottom: MAP_SIZE_Y_MAX,
    mapRight: MAP_SIZE_X_MAX,
    mapLeft: MAP_SIZE_X_MIN
  };
})();
