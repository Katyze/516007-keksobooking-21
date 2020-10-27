'use strict';

(function () {
  const PIN_WIDTH = 25;
  const PIN_HEIGHT = 70;
  const mapElement = document.querySelector('.map');
  const mapPinsElement = document.querySelector('.map__pins');

  const createPin = function (offer) {
    const pinTemplateElement = document.querySelector('#pin').content.querySelector('.map__pin');
    const pinElement = pinTemplateElement.cloneNode(true);
    const img = pinElement.querySelector('img');

    pinElement.style.left = offer.location.x + PIN_WIDTH + 'px';
    pinElement.style.top = offer.location.y + PIN_HEIGHT + 'px';
    img.src = offer.author.avatar;
    img.alt = offer.offer.title;
    pinElement.dataset.id = offer.id;

    return pinElement;
  };

  const renderPins = function (offers) {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < offers.length; i++) {
      fragment.appendChild(createPin(window.offer.offers[i]));
    }
    mapPinsElement.appendChild(fragment);
  };

  window.pin = {
    mapElement: mapElement,
    mapPinsElement: mapPinsElement,
    renderPins: renderPins,
  };
})();
