'use strict';

(function () {
  const templateError = document.querySelector('#error').content.querySelector('.error');
  const main = document.querySelector('main');
  const errorMessage = templateError.querySelector('.error__message');

  const onPopupKeydown = function (evt) {
    if (evt.key === 'Escape') {
      closeError();
    }
  };

  const onError = function (errorText) {
    errorMessage.textContent = errorText;
    const error = templateError.cloneNode(true);

    error.addEventListener('click', function () {
      closeError();
    });

    document.addEventListener('keydown', onPopupKeydown);
    main.appendChild(error);
  };

  const closeError = function () {
    const error = main.querySelector('.error');

    error.remove();
    document.removeEventListener('keydown', onPopupKeydown);
  };

  window.onError = onError;
})();
