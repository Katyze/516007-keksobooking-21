'use strict';

(function () {
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
    disable: disableFormElements,
    enable: enableFormElements,
  };
})();
