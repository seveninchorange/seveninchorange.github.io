"use strict";

window.addEventListener('load', function () {
  var activeSlide = -1;

  function setActiveSlide(n) {
    if (activeSlide === n) {
      return;
    }

    if (activeSlide > -1) {
      document.getElementById("artist-".concat(activeSlide)).classList.remove('active');
      document.getElementById("artist-icon-".concat(activeSlide)).classList.remove('active');
    }

    activeSlide = n;

    if (activeSlide > -1) {
      document.getElementById("artist-".concat(activeSlide)).classList.add('active');
      document.getElementById("artist-icon-".concat(activeSlide)).classList.add('active');
    }
  }

  var icons = document.getElementById('artists').getElementsByClassName('artist-icon');

  var _loop = function _loop(i) {
    var icon = icons[i];
    icon.addEventListener('click', function () {
      setActiveSlide(icon.dataset.artistIndex);
    });
  };

  for (var i = 0; i < icons.length; i++) {
    _loop(i);
  }

  setActiveSlide(0);
});