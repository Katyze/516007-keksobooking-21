'use strict';

(function () {
  const PIN_WIDTH = 25;
  const PIN_HEIGHT = 70;
  const MAIN_PIN_TAIL = 22;

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
      fragment.appendChild(createPin(offers[i]));
    }
    window.map.pinsElement.appendChild(fragment);
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
    if (!isPageActive) {
      window.map.element.classList.remove('map--faded');
      window.load(onSuccess, window.onError);
      isPageActive = true;
    }
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
      window.activatePage();
    }
  });

  window.pin = {
    activate: activateMap,
    activeX: mainPinActiveX,
    activeY: mainPinActiveY,
    inactiveX: mainPinInActiveX,
    inactiveY: mainPinInActiveY,
  };
})();
