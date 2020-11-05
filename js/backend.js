'use strict';

(function () {
  const TIMEOUT_IN_MS = 3000;
  const UPLOAD_URL = 'https://21.javascript.pages.academy/keksobooking';
  const LOAD_URL = 'https://21.javascript.pages.academy/keksobooking/data';

  const StatusCode = {
    OK: 200
  };

  const Method = {
    GET: 'GET',
    POST: 'POST'
  };

  const processingRequests = (method, data, url, onSuccess, onError) => {
    let xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = TIMEOUT_IN_MS;

    xhr.open(method, url);

    xhr.addEventListener('load', () => {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
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

  const upload = (data, onSuccess, onError) => {
    processingRequests(Method.POST, data, UPLOAD_URL, onSuccess, onError);
  };

  const load = (onSuccess, onError) => {
    processingRequests(Method.GET, null, LOAD_URL, onSuccess, onError);
  };

  window.backend = {
    upload,
    load
  };

})();
