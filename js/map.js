'use strict';

(function () {
  const addCard = function (offerId) {
    const filtersContainer = document.querySelector('.map__filters-container');
    const fragmentCard = document.createDocumentFragment();
    const targetOffer = window.offer.offers.find((offer) => {
      return offer.id === offerId;
    });
    const card = window.card.createCard(targetOffer);

    fragmentCard.appendChild(card);
    window.pin.mapElement.insertBefore(fragmentCard, filtersContainer);
  };

  window.pin.mapPinsElement.addEventListener('click', function (evt) {
    const target = evt.target;
    const targetParent = target.closest('.map__pin:not(.map__pin--main)');

    if (targetParent && target) {
      const pinId = Number(targetParent.dataset.id);
      const activeCard = document.querySelector('.map__card');

      if (activeCard) {
        activeCard.remove();
      }

      addCard(pinId);

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
})();
