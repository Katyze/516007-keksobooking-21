'use strict';

(function () {
  const AVATAR_NUMBERS = ['01', '02', '03', '04', '05', '06', '07', '08'];
  const ROOMS_TYPE = ['palace', 'flat', 'house', 'bungalow'];
  const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  const TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  const PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  const PIN_LOCATION_Y_MIN = 130;
  const PIN_LOCATION_Y_MAX = 600;
  const PIN_LOCATION_X_MIN = 0;
  const PIN_LOCATION_X_MAX = 1000;
  const MIN_PRICE = 1000;
  const MAX_PRICE = 100000;
  const MIN_ROOMS = 1;
  const MAX_ROOMS = 5;
  const MIN_GUESTS = 1;
  const MAX_GUESTS = 10;
  const TIME_CHECK_IN_OUT = ['12:00', '13:00', '14:00'];
  const OFFERS_QUANTITY = 8;

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
    avatarNumbers: AVATAR_NUMBERS,
    roomsType: ROOMS_TYPE,
    featureType: FEATURES,
    titles: TITLES,
    photos: PHOTOS,
    pinLocationYMin: PIN_LOCATION_Y_MIN,
    pinLocationYMax: PIN_LOCATION_Y_MAX,
    pinLocationXMin: PIN_LOCATION_X_MIN,
    pinLocationXMax: PIN_LOCATION_X_MAX,
    minPrice: MIN_PRICE,
    maxPrice: MAX_PRICE,
    minRooms: MIN_ROOMS,
    maxRooms: MAX_ROOMS,
    minGuests: MIN_GUESTS,
    maxGuests: MAX_GUESTS,
    timeCheck: TIME_CHECK_IN_OUT,
    offerQuantity: OFFERS_QUANTITY
  };
})();
