'use strict';

const AVATAR_NUMBERS = ['01', '02', '03', '04', '05', '06', '07', '08'];
const ROOMS_TYPE = ['palace', 'flat', 'house', 'bungalow'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
const PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
const PIN_WIDTH = 20;
const PIN_HEIGHT = 40;
const OFFERS_QUANTITY = 8;
const PIN_LOCATION_Y_MIN = 130;
const PIN_LOCATION_Y_MAX = 630;
const PIN_LOCATION_X_MIN = 0;
const PIN_LOCATION_X_MAX = 1000;
const MIN_PRICE = 1000;
const MAX_PRICE = 100000;
const MIN_ROOMS = 1;
const MAX_ROOMS = 5;
const MIN_GUESTS = 1;
const MAX_GUESTS = 10;
const TIME_CHECK_IN_OUT = ['12:00', '13:00', '14:00'];

const mapElement = document.querySelector('.map');
const mapPinsElement = mapElement.querySelector('.map__pins');
const pinTemplateElement = document.querySelector('#pin').content.querySelector('.map__pin');

const pins = [];


mapElement.classList.remove('map--faded');

// одно рандомное значение
function getRandomNumber(max) {
  return Math.floor(Math.random() * (max));
}

// два рандомных значения
function getRandomNumberRange(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

// создаем массив пинов
const createPin = function (offersQuantity) {
  for (let i = 0; i < offersQuantity; i++) {
    const location = {
      x: getRandomNumberRange(PIN_LOCATION_X_MIN, PIN_LOCATION_X_MAX),
      y: getRandomNumberRange(PIN_LOCATION_Y_MIN, PIN_LOCATION_Y_MAX),
    };
    pins[i] = {
      author: {
        avatar: 'img/avatars/user' + AVATAR_NUMBERS[getRandomNumber(AVATAR_NUMBERS.length)] + '.png',
      },
      offer: {
        title: TITLES[getRandomNumber(TITLES.length)],
        address: location.x + ', ' + location.y,
        price: getRandomNumberRange(MIN_PRICE, MAX_PRICE),
        type: ROOMS_TYPE[getRandomNumber(ROOMS_TYPE.length)],
        rooms: getRandomNumberRange(MIN_ROOMS, MAX_ROOMS),
        guests: getRandomNumberRange(MIN_GUESTS, MAX_GUESTS),
        checkin: TIME_CHECK_IN_OUT[getRandomNumber(TIME_CHECK_IN_OUT.length)],
        checkout: TIME_CHECK_IN_OUT[getRandomNumber(TIME_CHECK_IN_OUT.length)],
        features: FEATURES[getRandomNumber(FEATURES.length)],
        description: 'Здесь будет ваше описание...',
        photos: PHOTOS[getRandomNumber(PHOTOS.length)],
      },
      location: {
        x: location.x,
        y: location.y,
      },
    };
  }
};

// создаем пин
const renderPin = function (offer) {
  const pinElement = pinTemplateElement.cloneNode(true);
  const img = pinElement.querySelector('img');

  pinElement.style.left = offer.location.x + PIN_WIDTH + 'px';
  pinElement.style.top = offer.location.y + PIN_HEIGHT + 'px';
  img.src = offer.author.avatar;
  img.alt = offer.offer.title;

  return pinElement;
};

const fragment = document.createDocumentFragment();
createPin(OFFERS_QUANTITY);
pins.forEach((item) => {
  fragment.appendChild(renderPin(item));
});

mapPinsElement.appendChild(fragment);
