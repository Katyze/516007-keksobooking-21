'use strict';

(function () {
  const templateError = document.querySelector('#error').content.querySelector('.error');
  const main = document.querySelector('main');
  const errorMessage = templateError.querySelector('.error__message');
  const templateSuccess = document.querySelector('#success').content.querySelector('.success');

  const onPopupKeydown = function (evt) {
    if (evt.key === 'Escape') {
      closePopup();
    }
  };

  const onError = function (errorText) {
    errorMessage.textContent = errorText;
    const error = templateError.cloneNode(true);

    error.addEventListener('click', function () {
      closePopup();
    });

    document.addEventListener('keydown', onPopupKeydown);
    main.appendChild(error);
  };

  const closePopup = function () {
    const error = main.querySelector('.error');
    const success = main.querySelector('.success');

    if (error) {
      error.remove();
    } else {
      success.remove();
    }

    document.removeEventListener('keydown', onPopupKeydown);
  };

  const onSuccessUpload = function () {
    const success = templateSuccess.cloneNode(true);

    success.addEventListener('click', function () {
      closePopup();
    });

    document.addEventListener('keydown', onPopupKeydown);
    main.appendChild(success);
  };

  window.message = {
    error: onError,
    success: onSuccessUpload
  };
})();
