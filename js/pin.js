'use strict';

(function () {
  const MAIN_PIN_TAIL = 22;
  const DEFAULT_PIN_X = 570;
  const DEFAULT_PIN_Y = 350;
  const MAX_PIN_ON_MAP = 5;

  const mainPin = document.querySelector('.map__pin--main');

  const mainPinWidth = mainPin.offsetWidth;
  const mainPinHeight = mainPin.offsetHeight;
  const maiPinHeightActive = mainPinHeight + MAIN_PIN_TAIL;

  const mainPinActiveX = mainPin.offsetLeft + mainPinWidth / 2;
  const mainPinActiveY = mainPin.offsetTop + maiPinHeightActive;

  const mainPinInActiveX = mainPin.offsetLeft + mainPinWidth / 2;
  const mainPinInActiveY = mainPin.offsetTop + mainPinHeight / 2;

  const pinTemplateElement = document.querySelector('#pin').content.querySelector('.map__pin');

  const createPin = function (offer) {
    const pinElement = pinTemplateElement.cloneNode(true);
    const img = pinElement.querySelector('img');

    pinElement.style.left = offer.location.x + 'px';
    pinElement.style.top = offer.location.y + 'px';
    img.src = offer.author.avatar;
    img.alt = offer.offer.title;
    pinElement.dataset.id = offer.id;

    return pinElement;
  };

  const renderPins = function (offers) {
    const fragment = document.createDocumentFragment();
    const array = offers.slice(0, MAX_PIN_ON_MAP);

    for (let i = 0; i < array.length; i++) {
      fragment.appendChild(createPin(offers[i]));
    }
    window.map.pinsElement.appendChild(fragment);
  };

  const removePins = function () {
    const pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');

    for (let i = 0; i < pins.length; i++) {
      pins[i].remove();
    }
  };

  const onSuccess = function (result) {
    for (let i = 0; i < result.length; i++) {
      const offer = result[i];
      offer.id = i + 1;
    }

    renderPins(result);

    window.offers = result;
  };

  let isPageActive = false;

  const activateMap = function () {
      window.map.element.classList.remove('map--faded');
      window.backend.load(onSuccess, window.message.error);
      isPageActive = true;
  };

  const deactivateMap = function () {
    window.map.element.classList.add('map--faded');
    window.card.remove();
    removePins();
    isPageActive = false;
  };

  mainPin.addEventListener('mousedown', function (evt) {
    if (evt.button === 0) {
      if (!isPageActive) {
        window.main.activate();
      }

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
        const halfPin = mainPinWidth / 2;

        if (newCoordX < (window.data.mapLeft - halfPin)) {
          newCoordX = window.data.mapLeft - halfPin;
        }

        if (newCoordX > (window.data.mapRight - halfPin)) {
          newCoordX = window.data.mapRight - halfPin;
        }

        if (newCoordY < window.data.mapTop) {
          newCoordY = window.data.mapTop;
        }

        if (newCoordY > window.data.mapBottom) {
          newCoordY = window.data.mapBottom;
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
      window.main.activate();
    }
  });

  const setDefaultCoords = function () {
    mainPin.style.top = DEFAULT_PIN_Y + 'px';
    mainPin.style.left = DEFAULT_PIN_X + 'px';
  };

  window.pin = {
    render: renderPins,
    remove: removePins,
    activate: activateMap,
    deactivate: deactivateMap,
    activeX: mainPinActiveX,
    activeY: mainPinActiveY,
    inactiveX: mainPinInActiveX,
    inactiveY: mainPinInActiveY,
    default: setDefaultCoords,
  };
})();
