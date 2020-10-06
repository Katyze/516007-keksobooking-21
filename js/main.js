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

function getRandomNumberOfArray(array) {
  return Math.floor(Math.random() * array.length);
}

function getRandomOfArray(arr) {
  const newArr = arr.slice(getRandomNumberOfArray(arr));
  return newArr;
}

// создаем массив пинов
const createPins = function (offersQuantity) {
  const pins = [];

  for (let i = 0; i < offersQuantity; i++) {
    const location = {
      x: getRandomNumberRange(PIN_LOCATION_X_MIN, PIN_LOCATION_X_MAX),
      y: getRandomNumberRange(PIN_LOCATION_Y_MIN, PIN_LOCATION_Y_MAX),
    };
    const createElement = {
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
        features: getRandomOfArray(FEATURES),
        description: 'Здесь будет ваше описание...',
        photos: PHOTOS[getRandomNumber(PHOTOS.length)],
      },
      location: {
        x: location.x,
        y: location.y,
      },
    };
    pins.push(createElement);
  }
  return pins;
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
const pins = createPins(OFFERS_QUANTITY);
pins.forEach((item) => {
  fragment.appendChild(renderPin(item));
});

mapPinsElement.appendChild(fragment);


// module3-task2
const cardTemplateElement = document.querySelector('#card').content.querySelector('.map__card');
const beforeBlock = document.querySelector('.map__filters-container');

// создаем карточку
const renderCard = function (card) {
  const cardElement = cardTemplateElement.cloneNode(true);
  const titleElement = cardElement.querySelector('.popup__title');
  const addressElement = cardElement.querySelector('.popup__text--address');
  const priceElement = cardElement.querySelector('.popup__text--price');
  const typeElement = cardElement.querySelector('.popup__type');
  const capacityElement = cardElement.querySelector('.popup__text--capacity');
  const timeElement = cardElement.querySelector('.popup__text--time');
  const featuresElement = cardElement.querySelector('.popup__features');
  const descriptionElement = cardElement.querySelector('.popup__description');
  const avatarElement = cardElement.querySelector('.popup__avatar');
  const photosElement = cardElement.querySelector('.popup__photos');
  const photoCloneElement = cardElement.querySelector('.popup__photo');
  const offerTypes = {
    flat: 'Квартира',
    bungalow: 'Бунгало',
    house: 'Дом',
    palace: 'Дворец',
  };

  titleElement.textContent = card.offer.title;
  addressElement.textContent = card.offer.carddress;
  priceElement.textContent = card.offer.price + '₽/ночь';
  typeElement.textContent = offerTypes[card.offer.type];
  capacityElement.textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
  timeElement.textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
  descriptionElement.textContent = card.offer.description;
  avatarElement.src = card.author.avatar;


  photosElement.innerHTML = '';

  for (let i = 0; i < card.offer.photos.length; i++) {
    let newPhoto = photoCloneElement.cloneNode(true);
    newPhoto.setAttribute('src', card.offer.photos[i]);
    photosElement.appendChild(newPhoto);
  }


  featuresElement.innerHTML = '';

  for (let i = 0; i < card.offer.features.length; i++) {
    let newFeature = document.createElement('li');
    newFeature.classList.add('popup__feature', 'popup__feature--${card.offer.features[i]}');
    featuresElement.appendChild(newFeature);
  }


  return cardElement;
};


const renderCards = function (card) {
  const fragmentCard = document.createDocumentFragment();
  fragmentCard.appendChild(renderCard(card));

  return fragmentCard;
};

mapElement.insertBefore(renderCards, beforeBlock);
