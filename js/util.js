'use strict';

(function () {
  function getRandomNumber(max) {
    return Math.floor(Math.random() * (max));
  }

  function getRandomNumberRange(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  function getRandomOfArray(array) {
    const newArray = array.slice(getRandomNumber(array.length));
    return newArray;
  }

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
    randomNumber: getRandomNumber,
    randomRange: getRandomNumberRange,
    randomArray: getRandomOfArray,
    disable: disableFormElements,
    enable: enableFormElements,
  };
})();
