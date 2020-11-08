'use strict';

(function () {
  const filtersContainer = document.querySelector('.map__filters-container');
  const mapElement = document.querySelector('.map');
  const mapPinsElement = document.querySelector('.map__pins');

  mapPinsElement.addEventListener('click', function (evt) {
    const target = evt.target;
    const targetParent = target.closest('.map__pin:not(.map__pin--main)');

    if (targetParent && target) {
      const pinId = Number(targetParent.dataset.id);
      const activeCard = document.querySelector('.map__card');

      if (activeCard) {
        activeCard.remove();
      }

      window.card.add(pinId, mapElement, filtersContainer);

      const closePopup = document.querySelector('.popup__close');

      closePopup.addEventListener('mousedown', function (closeEvent) {
        const parentCard = document.querySelector('.map__card');
        if (closeEvent.button === 0) {
          parentCard.remove();
        }
      });

      closePopup.addEventListener('keydown', function (closeEvent) {
        const parentCard = document.querySelector('.map__card');
        if (closeEvent.key === 'Enter') {
          parentCard.remove();
        }
      });
    }
  });

  window.map = {
    element: mapElement,
    pinsElement: mapPinsElement,
  };
})();
