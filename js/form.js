'use strict';

(function () {
  const MAX_ROOMS_COUNT = 100;
  const NOT_FOR_GUESTS = 0;

  const filterForm = document.querySelector('.map__filters');
  const adForm = document.querySelector('.ad-form');
  const addressField = document.querySelector('#address');
  const selects = filterForm.querySelectorAll('select');
  const fieldsets = adForm.querySelectorAll('fieldset');
  const roomsSelect = document.querySelector('#room_number');
  const guestsSelect = document.querySelector('#capacity');
  const typeOfHouse = document.querySelector('#type');
  const priceForNight = document.querySelector('#price');
  const timeIn = document.querySelector('#timein');
  const timeOut = document.querySelector('#timeout');


  window.util.disable(selects);
  window.util.disable(fieldsets);

  addressField.readOnly = true;

  const validateRoomsAngGuests = function () {
    const roomsValue = Number(roomsSelect.value);
    const guestsValue = Number(guestsSelect.value);
    if (roomsValue < MAX_ROOMS_COUNT && guestsValue === NOT_FOR_GUESTS) {
      guestsSelect.setCustomValidity('Заселите кого-нибудь');
    } else if (roomsValue === MAX_ROOMS_COUNT && guestsValue > NOT_FOR_GUESTS) {
      guestsSelect.setCustomValidity('100 комнат не для гостей');
    } else if (roomsValue < guestsValue) {
      guestsSelect.setCustomValidity('Уменьшите количество гостей, или увеличьте количество комнат');
    } else {
      guestsSelect.setCustomValidity('');
    }
    guestsSelect.reportValidity();
  };

  guestsSelect.addEventListener('change', validateRoomsAngGuests);

  roomsSelect.addEventListener('change', validateRoomsAngGuests);

  typeOfHouse.addEventListener('change', function () {
    const priceForSelectedValue = window.data.apartments[typeOfHouse.value].minPrice;

    priceForNight.setAttribute('min', priceForSelectedValue);
    priceForNight.setAttribute('placeholder', priceForSelectedValue);
  });

  timeIn.addEventListener('change', function () {
    timeOut.value = timeIn.value;
  });

  timeOut.addEventListener('change', function () {
    timeIn.value = timeOut.value;
  });

  const activateForm = function () {
    setAddressValue(false);
    window.util.enable(selects);
    window.util.enable(fieldsets);
    adForm.classList.remove('ad-form--disabled');
  };

  const deactivateForm = function () {
    setAddressValue(true);
    window.util.disable(selects);
    window.util.disable(fieldsets);
    adForm.classList.add('ad-form--disabled');
  };

  const setAddressValue = function (isMainPin) {
    if (isMainPin) {
      addressField.value = `${Math.round(window.pin.inactiveX)}, ${Math.round(window.pin.inactiveY)}`;
    } else {
      addressField.value = `${Math.round(window.pin.activeX)}, ${Math.round(window.pin.activeY)}`;
    }
  };

  setAddressValue(true);

  adForm.addEventListener('submit', function (evt) {
    const data = new FormData(adForm);

    window.upload(data, window.message.success, window.message.error);
    evt.preventDefault();
    adForm.reset();
    window.main.deactivate();
  });


  window.form = {
    addressField: addressField,
    activate: activateForm,
    deactivate: deactivateForm
  };
})();
