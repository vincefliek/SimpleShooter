"use strict";

module.exports = Target;

function Target() {}

Target.prototype = {
  constructor: Target,
  elemWidth: function (elem) {
    return Math.floor(elem.offsetWidth);
  },
  elemHeight: function (elem) {
    return Math.floor(elem.offsetHeight);
  },
  random: function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  },
  generate: function (picture) {
    var _this = this;

    var tarArea = document.getElementById('targetArea');
    var tarElem = document.getElementById('targetWrapper');
    var left = _this.random(0, _this.elemWidth(tarArea)) - _this.elemWidth(tarElem);
    var right = _this.random(0, _this.elemHeight(tarArea)) - _this.elemHeight(tarElem);

    /* jshint ignore:start */
    if (left < 0) left = 0;
    if (right < 0) right = 0;
    /* jshint ignore:end */

    tarElem.style.left = left + 'px';
    tarElem.style.top = right + 'px';
    tarElem.style.backgroundImage = 'url("img/' + picture + '")';
  }
};