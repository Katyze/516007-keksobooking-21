'use strict';

(function () {

  const createCard = function (card) {
    const cardTemplateElement = document.querySelector('#card').content.querySelector('.map__card');
    const cardElement = cardTemplateElement.cloneNode(true);
    const titleElement = cardElement.querySelector('.popup__title');
    const addressElement = cardElement.querySelector('.popup__text--address');
    const priceElement = cardElement.querySelector('.popup__text--price');
    const typeElement = cardElement.querySelector('.popup__type');
    const capacityElement = cardElement.querySelector('.popup__text--capacity');
    const timeElement = cardElement.querySelector('.popup__text--time');
    const featuresElement = cardElement.querySelector('.popup__features');
    const descriptionElement = cardElement.querySelector('.popup__description');
    const avatarElement = cardElement.querySelector('.popup__avatar');
    const photosElement = cardElement.querySelector('.popup__photos');
    const photoCloneElement = cardElement.querySelector('.popup__photo');

    titleElement.textContent = card.offer.title;
    addressElement.textContent = card.offer.address;
    priceElement.textContent = `${card.offer.price} ₽/ночь`;
    typeElement.textContent = window.data.apartments[card.offer.type].label;
    capacityElement.textContent = `${card.offer.rooms} комнаты для ${card.offer.guests} гостей`;
    timeElement.textContent = `Заезд после ${card.offer.checkin} выезд до ${card.offer.checkout}`;
    descriptionElement.textContent = card.offer.description;
    avatarElement.src = card.author.avatar;


    photosElement.innerHTML = '';

    for (let i = 0; i < card.offer.photos.length; i++) {
      let newPhoto = photoCloneElement.cloneNode(true);
      newPhoto.setAttribute('src', card.offer.photos[i]);
      photosElement.appendChild(newPhoto);
    }


    featuresElement.innerHTML = '';

    for (let i = 0; i < card.offer.features.length; i++) {
      let newFeature = document.createElement('li');
      newFeature.classList.add('popup__feature', `popup__feature--${card.offer.features[i]}`);
      featuresElement.appendChild(newFeature);
    }

    return cardElement;
  };

  const addCard = function (offerId, parentContainer, insertBeforeContainer) {
    const fragmentCard = document.createDocumentFragment();
    const targetOffer = window.offer.offers.find((offer) => {
      return offer.id === offerId;
    });
    const card = createCard(targetOffer);

    fragmentCard.appendChild(card);
    parentContainer.insertBefore(fragmentCard, insertBeforeContainer);
  };

  window.addCard = addCard;
})();
