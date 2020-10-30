'use strict';

(function () {
  const PIN_WIDTH = 25;
  const PIN_HEIGHT = 70;
  const MAIN_PIN_TAIL = 22;
  const mapElement = document.querySelector('.map');
  const mapPinsElement = document.querySelector('.map__pins');

  const mainPin = document.querySelector('.map__pin--main');

  const mainPinWidth = mainPin.offsetWidth;
  const mainPinHeight = mainPin.offsetHeight;
  const maiPinHeightActive = mainPinHeight + MAIN_PIN_TAIL;

  const mainPinActiveX = mainPin.offsetLeft + mainPinWidth / 2;
  const mainPinActiveY = mainPin.offsetTop + maiPinHeightActive;

  const mainPinInActiveX = mainPin.offsetLeft + mainPinWidth / 2;
  const mainPinInActiveY = mainPin.offsetTop + mainPinHeight / 2;

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

  const activateMap = function () {
    mapElement.classList.remove('map--faded');
    renderPins(window.offer.offers);
  };

  mainPin.addEventListener('mousedown', function (evt) {
    if (evt.button === 0) {
      window.activatePage();

      let startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      const onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();

        let shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        let newCoordY = mainPin.offsetTop - shift.y;
        let newCoordX = mainPin.offsetLeft - shift.x;

        if (newCoordX < 20) {
          newCoordX = 20;
        }

        if (newCoordX > 1120) {
          newCoordX = 1120;
        }

        if (newCoordY < 100) {
          newCoordY = 100;
        }

        if (newCoordY > 620) {
          newCoordY = 620;
        }

        mainPin.style.top = newCoordY + 'px';
        mainPin.style.left = newCoordX + 'px';

        const mainPinX = mainPin.offsetLeft + mainPinWidth / 2;
        const mainPinY = mainPin.offsetTop + maiPinHeightActive;

        window.form.addressField.value = `${Math.round(mainPinX)}, ${Math.round(mainPinY)}`;
      };

      const onMouseUp = function (upEvt) {
        upEvt.preventDefault();

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    }
  });

  mainPin.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      window.activatePage();
    }
  });

  window.pin = {
    activate: activateMap,
    mapPinsElement: mapPinsElement,
    mapElement: mapElement,
    activeX: mainPinActiveX,
    activeY: mainPinActiveY,
    inactiveX: mainPinInActiveX,
    inactiveY: mainPinInActiveY,
  };
})();
