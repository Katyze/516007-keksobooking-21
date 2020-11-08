'use strict';

(function () {
  const ANY_VALUE = 'any';
  const selectType = document.querySelector('#housing-type');

  function updatePins(typeOfHouse) {
    window.pin.remove();

    const sameTypeOfHouse = window.offers.filter(function (pin) {
      return pin.offer.type === typeOfHouse;
    });

    if (typeOfHouse === ANY_VALUE) {
      window.pin.render(window.offers);
    } else {
      window.pin.render(sameTypeOfHouse);
    }
  }

  selectType.addEventListener('change', function (evt) {
    const typeOfHouse = evt.target.value;

    updatePins(typeOfHouse);
    window.card.remove();
  });
})();
