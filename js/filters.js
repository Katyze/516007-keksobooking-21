'use strict';

(function () {
  let getData = [];
  const selectType = document.querySelector('#housing-type');

  function updatePins(typeOfHouse) {
    window.pin.remove();

    const sameTypeOfHouse = getData.filter(function (pin) {
      return pin.offer.type === typeOfHouse;
    });
    window.pin.render(sameTypeOfHouse);
  }

  selectType.addEventListener('change', function (evt) {
    const typeOfHouse = evt.target.value;

    updatePins(typeOfHouse);
    window.card.remove();
  });

})();
