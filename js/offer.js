'use strict';

(function () {

  const createOffers = function (offersQuantity) {
    const offers = [];

    for (let i = 0; i < offersQuantity; i++) {
      const location = {
        x: window.util.randomRange(window.data.pinLocationXMin, window.data.pinLocationXMax),
        y: window.util.randomRange(window.data.pinLocationYMin, window.data.pinLocationYMax),
      };
      const offer = {
        author: {
          avatar: 'img/avatars/user' + window.data.avatarNumbers[window.util.randomNumber(window.data.avatarNumbers.length)] + '.png',
        },
        offer: {
          title: window.data.titles[window.util.randomNumber(window.data.titles.length)],
          address: location.x + ', ' + location.y,
          price: window.util.randomRange(window.data.minPrice, window.data.maxPrice),
          type: window.data.roomsType[window.util.randomNumber(window.data.roomsType.length)],
          rooms: window.util.randomRange(window.data.minRooms, window.data.maxRooms),
          guests: window.util.randomRange(window.data.minGuests, window.data.maxGuests),
          checkin: window.data.timeCheck[window.util.randomNumber(window.data.timeCheck.length)],
          checkout: window.data.timeCheck[window.util.randomNumber(window.data.timeCheck.length)],
          features: window.util.randomArray(window.data.featureType),
          description: 'Здесь будет ваше описание...',
          photos: window.util.randomArray(window.data.photos),
        },
        location: {
          x: location.x,
          y: location.y,
        },
        id: i + 1,
      };
      offers.push(offer);
    }
    return offers;
  };

  const offers = createOffers(window.data.offerQuantity);

  window.offer = {
    offers: offers,
  };
})();
