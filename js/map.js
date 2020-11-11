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

      const onPopupKeydown = function (keyEvent) {
        if (keyEvent.key === 'Escape') {
          closeCard();
        }
      };

      const onPopupMousedown = function (mouseEvent) {
        if (mouseEvent.button === 0) {
          closeCard();
        }
      };

      const closeCard = function () {
        const parentCard = document.querySelector('.map__card');
        parentCard.remove();
        document.removeEventListener('keydown', onPopupKeydown);
        closePopup.removeEventListener('mousedown', onPopupMousedown);
      };

      if (closePopup) {
        closePopup.addEventListener('mousedown', onPopupMousedown);
        document.addEventListener('keydown', onPopupKeydown);
      }
    }
  });

  window.map = {
    element: mapElement,
    pinsElement: mapPinsElement,
  };
})();
