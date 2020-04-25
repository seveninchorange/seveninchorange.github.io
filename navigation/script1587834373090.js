"use strict";

var makeId = function makeId(str) {
  return str.toLowerCase().replace(/\s/g, '-');
};

window.addEventListener('load', function () {
  var navEl = document.getElementsByTagName('nav')[0];
  var currentNav = null;

  function setCurrentNav(id) {
    if (currentNav) {
      document.getElementById(currentNav).classList.remove('active');
    }

    currentNav = id;

    if (currentNav) {
      document.getElementById(currentNav).classList.add('active');
    }
  }

  function navigateTo(headerId, liId) {
    window.smoothScrollTo(headerId);
    setCurrentNav(liId);
  }

  var headers = document.getElementsByTagName('h2');
  var navList = navEl.getElementsByTagName('ul')[0];

  function onScroll() {
    if (window.scrollY > window.innerHeight * 0.8) {
      navEl.classList.add('active');
    } else {
      navEl.classList.remove('active');
    }

    var currentEl = null;

    for (var i = 0; i < headers.length; i++) {
      var headerEl = headers[i];
      var y = headers[i].getBoundingClientRect().y;

      if (y < window.innerHeight * 0.6) {
        currentEl = headerEl;
      }
    }

    setCurrentNav(currentEl ? currentEl.dataset.navId : null);
  }

  var _loop = function _loop(i) {
    var headerEl = headers[i];
    var headerText = headerEl.innerText;
    var headerId = makeId(headerText);
    var liId = "nav-".concat(headerId);
    var li = document.createElement('li');
    li.appendChild(document.createTextNode(headerText));
    li.setAttribute('id', liId);
    li.addEventListener('click', function () {
      return navigateTo(headerId, liId);
    });
    navList.appendChild(li);
    headerEl.setAttribute('id', headerId);
    headerEl.setAttribute('data-nav-id', liId);
  };

  for (var i = 0; i < headers.length; i++) {
    _loop(i);
  }

  window.addEventListener('scroll', onScroll);
  onScroll();
});