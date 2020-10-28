'use strict';

(function () {
  const MAX_ROOMS_COUNT = 100;
  const NOT_FOR_GUESTS = 0;

  const filterForm = document.querySelector('.map__filters');
  const adForm = document.querySelector('.ad-form');
  const selects = filterForm.querySelectorAll('select');
  const fieldsets = adForm.querySelectorAll('fieldset');
  const roomsSelect = document.querySelector('#room_number');
  const guestsSelect = document.querySelector('#capacity');
  const typeOfHouse = document.querySelector('#type');
  const priceForNight = document.querySelector('#price');
  const timeIn = document.querySelector('#timein');
  const timeOut = document.querySelector('#timeout');

  const disableFormElements = function (formElements) {
    for (let i = 0; i < formElements.length; i++) {
      formElements[i].setAttribute('disabled', '');
    }
  };

  const enableFormElements = function (formElements) {
    for (let i = 0; i < formElements.length; i++) {
      formElements[i].removeAttribute('disabled');
    }
  };

  disableFormElements(selects);
  disableFormElements(fieldsets);

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
    const priceForSelectedValue = window.card.offerTypes[typeOfHouse.value].minPrice;

    priceForNight.setAttribute('min', priceForSelectedValue);
    priceForNight.setAttribute('placeholder', priceForSelectedValue);
  };

  const validateTimeIn = function () {
    timeOut.value = timeIn.value;
  };

  const validateTimeOut = function () {
    timeIn.value = timeOut.value;
  };

  window.form = {
    adForm: adForm,
    selects: selects,
    fieldsets: fieldsets,
    roomsSelect: roomsSelect,
    guestsSelect: guestsSelect,
    typeOfHouse: typeOfHouse,
    timeIn: timeIn,
    timeOut: timeOut,
    enableFormElements,
    validateRoomsAngGuests: validateRoomsAngGuests,
    setPriceAttributes: setPriceAttributes,
    validateTimeIn: validateTimeIn,
    validateTimeOut: validateTimeOut,
  };
})();
