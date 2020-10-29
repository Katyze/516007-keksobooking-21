'use strict';

(function () {
  const MAIN_PIN_TAIL = 22;
  const mainPin = document.querySelector('.map__pin--main');

  const mainPinWidth = mainPin.offsetWidth;
  const mainPinHeight = mainPin.offsetHeight;
  const maiPinHeightActive = mainPinHeight + MAIN_PIN_TAIL;

  const mainPinActiveX = mainPin.offsetLeft + mainPinWidth / 2;
  const mainPinActiveY = mainPin.offsetTop + maiPinHeightActive;

  const mainPinInActiveX = mainPin.offsetLeft + mainPinWidth / 2;
  const mainPinInActiveY = mainPin.offsetTop + mainPinHeight / 2;

  const addressField = document.querySelector('#address');
  addressField.value = `${Math.round(mainPinInActiveX)}, ${Math.round(mainPinInActiveY)}`;

  const activatePage = function () {
    window.pin.mapElement.classList.remove('map--faded');
    window.pin.renderPins(window.offer.offers);
    window.form.adForm.classList.remove('ad-form--disabled');
    addressField.value = `${Math.round(mainPinActiveX)}, ${Math.round(mainPinActiveY)}`;
    addressField.readOnly = true;
    window.form.enableFormElements(window.form.selects);
    window.form.enableFormElements(window.form.fieldsets);
    window.form.guestsSelect.addEventListener('change', window.form.validateRoomsAngGuests);
    window.form.roomsSelect.addEventListener('change', window.form.validateRoomsAngGuests);
    window.form.typeOfHouse.addEventListener('change', window.form.setPriceAttributes);
    window.form.timeIn.addEventListener('change', window.form.validateTimeIn);
    window.form.timeOut.addEventListener('change', window.form.validateTimeOut);
  };



  mainPin.addEventListener('mousedown', function (evt) {
    if (evt.button === 0) {
      activatePage();

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

        if (newCoordY < 160) {
          newCoordY = 160;
        }

        if (newCoordY > 620) {
          newCoordY = 620;
        }

        mainPin.style.top = newCoordY + 'px';
        mainPin.style.left = newCoordX + 'px';

        const mainPinX = mainPin.offsetLeft + mainPinWidth / 2;
        const mainPinY = mainPin.offsetTop + maiPinHeightActive;

        addressField.value = `${Math.round(mainPinX)}, ${Math.round(mainPinY)}`;
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
      activatePage();
    }
  });
})();
