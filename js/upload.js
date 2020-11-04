'use strict';

(function () {
  const TIMEOUT_IN_MS = 3000;
  const URL = 'https://21.javascript.pages.academy/keksobooking';
  const StatusCode = {
    OK: 200
  };

  window.upload = (data, onSuccessUpload, onError) => {
    let xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = TIMEOUT_IN_MS;

    xhr.open('POST', URL);

    xhr.addEventListener('load', () => {
      if (xhr.status === StatusCode.OK) {
        onSuccessUpload(xhr.response);
      } else {
        onError(`Статус ответа: ${xhr.status} - ${xhr.statusText}`);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError(`Запрос не успел выполниться за ${xhr.timeout} мс`);
    });

    xhr.send(data);
  };
})();
