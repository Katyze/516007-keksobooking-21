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

  validateRoomsAngGuests();

  const setPriceAttributes = function () {
    const priceForSelectedValue = window.data.apartments[typeOfHouse.value].minPrice;

    priceForNight.setAttribute('min', priceForSelectedValue);
    priceForNight.setAttribute('placeholder', priceForSelectedValue);
  };

  const validateTimeIn = function () {
    timeOut.value = timeIn.value;
  };

  const validateTimeOut = function () {
    timeIn.value = timeOut.value;
  };

  const activateForm = function () {
    adForm.classList.remove('ad-form--disabled');
    addressField.readOnly = true;
    guestsSelect.addEventListener('change', validateRoomsAngGuests);
    roomsSelect.addEventListener('change', validateRoomsAngGuests);
    typeOfHouse.addEventListener('change', setPriceAttributes);
    timeIn.addEventListener('change', validateTimeIn);
    timeOut.addEventListener('change', validateTimeOut);
  };

  const setAddressValue = function (isMainPin) {
    if (isMainPin) {
      addressField.value = `${Math.round(window.pin.inactiveX)}, ${Math.round(window.pin.inactiveY)}`;
    } else {
      addressField.value = `${Math.round(window.pin.activeX)}, ${Math.round(window.pin.activeY)}`;
    }
  };

  window.form = {
    selects: selects,
    fieldsets: fieldsets,
    activate: activateForm,
    setAddress: setAddressValue,
    addressField: addressField,
  };
})();
