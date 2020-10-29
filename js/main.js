'use strict';

(function () {

  window.form.setAddress(true);

  const activatePage = function () {
    window.pin.activate();
    window.form.setAddress(false);
    window.util.enable(window.form.selects);
    window.util.enable(window.form.fieldsets);
    window.form.activate();
  };

  window.activatePage = activatePage;
})();
