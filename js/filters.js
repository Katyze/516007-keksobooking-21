'use strict';

(function () {
  const ANY_VALUE = 'any';
  const mapForm = document.querySelector('.map__filters');
  const housingType = document.querySelector('#housing-type');
  const housingPrice = document.querySelector('#housing-price');
  const housingRooms = document.querySelector('#housing-rooms');
  const housingGuests = document.querySelector('#housing-guests');

  const PriceToRoom = {
    low: {
      min: 0,
      max: 9999
    },
    middle: {
      min: 10000,
      max: 49999
    },
    high: {
      min: 50000,
      max: Infinity
    }
  };


  mapForm.addEventListener('change', function () {
    window.pin.remove();
    window.card.remove();
    window.debounce(updateData(window.offers));
  });

  const checkHousingType = function (pin) {
    if (housingType.value === ANY_VALUE) {
      return true;
    } else {
      return pin.offer.type === housingType.value;
    }
  };

  const checkHousingRooms = function (pin) {
    if (housingRooms.value === ANY_VALUE) {
      return true;
    } else {
      return pin.offer.rooms.toString() === housingRooms.value;
    }
  };

  const checkHousingGuests = function (pin) {
    if (housingGuests.value === ANY_VALUE) {
      return true;
    } else {
      return pin.offer.guests.toString() === housingGuests.value;
    }
  };

  const checkHousingPrice = function (pin) {
    if (housingPrice.value === ANY_VALUE) {
      return true;
    }
    return pin.offer.price >= PriceToRoom[housingPrice.value].min && pin.offer.price <= PriceToRoom[housingPrice.value].max;
  };

  const checkHousingFeatures = function (pin) {
    let housingCheckbox = document.querySelectorAll('.map__checkbox:checked');

    return Array.from(housingCheckbox).every(function (feature) {
      return pin.offer.features.indexOf(feature.value) >= 0;
    });
  };

  const updateData = function (hotels) {
    const hotelsFilter = hotels.filter(function (hotel) {
      return checkHousingType(hotel) &
        checkHousingRooms(hotel) &
        checkHousingGuests(hotel) &
        checkHousingPrice(hotel) &
        checkHousingFeatures(hotel);
    });

    window.pin.render(hotelsFilter);
  };
})();
