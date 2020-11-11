'use strict';

(function () {
  const DEBOUNCE_INTERVAL = 500;

  const debounce = function (cb) {
    let lastTimeout = null;

    return function (...parameters) {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb(...parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };

  const disableFormElements = function (formElements) {
    for (let i = 0; i < formElements.length; i++) {
      formElements[i].setAttribute('disabled', '');
    }
  };

  const enableFormElements = function (formElements) {
    for (let i = 0; i < formElements.length; i++) {
      formElements[i].removeAttribute('disabled');
    }
  };

  window.util = {
    debounce: debounce,
    disable: disableFormElements,
    enable: enableFormElements,
  };
})();
