'use strict';

(function () {

  const activatePage = function () {
    window.pin.activate();
    window.form.activate();
  };

  const deactivatePage = function () {
    window.pin.deactivate();
    window.form.deactivate();
  };

  window.main = {
    activate: activatePage,
    deactivate: deactivatePage
  };
})();
