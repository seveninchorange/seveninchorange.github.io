"use strict";

var scrollId = 0;

var smoothScrollTo = window.smoothScrollTo = function (elId) {
  function increment(y, handlerId) {
    if (scrollId !== handlerId) {
      return;
    }

    if (Math.abs(window.scrollY - y) < 1) {
      window.scrollTo(0, y);
      return;
    }

    var scrollBy = (y - window.scrollY) / 15;

    if (scrollBy < 0) {
      window.scrollBy(0, Math.min(-1, scrollBy));
    } else {
      window.scrollBy(0, Math.max(1, scrollBy));
    }

    setTimeout(function () {
      return increment(y, handlerId);
    }, 10);
  }

  scrollId++;
  var el = document.getElementById(elId);

  if (el) {
    var y = Math.min(el.getBoundingClientRect().y + window.scrollY, document.body.scrollHeight - window.innerHeight);
    console.log(y, window.scrollY);
    increment(y, scrollId);
  }
};

window.addEventListener('load', function () {
  window.addEventListener('wheel', function () {
    scrollId++;
  });
  var navigationElements = document.querySelectorAll('[data-navigate-to]');

  var _loop = function _loop(i) {
    var el = navigationElements[i];
    el.addEventListener('click', function () {
      return smoothScrollTo(el.dataset.navigateTo);
    });
  };

  for (var i = 0; i < navigationElements.length; i++) {
    _loop(i);
  }
});