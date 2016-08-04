"use strict";

module.exports = Weapon;

function Weapon() {}

Weapon.prototype = {
  constructor: Weapon,
  FIRE_DURATION: 25,
  hits: 0,
  doShot: function (e, tarId, cb) {
    var _this = this;

    e = e || window.event;
    var target = e.target;

    if (target.getAttribute('id') === tarId) {
      _this.hits++;
      /* jshint ignore:start */
      if (typeof cb === 'function') cb();
      /* jshint ignore:end */
    }

    _this.animateFire();
  },
  animateFire: function () {
    var _this = this;

    var gun = document.querySelector('.weapon__item.active');
    var gunFire = document.querySelector('img.fire');

    gun.classList.add('js-push-weapon');
    gunFire.classList.add('js-show-fire');

    setTimeout(function deleteCSSAnimClasses() {
      gun.classList.remove('js-push-weapon');
      gunFire.classList.remove('js-show-fire');
    }, _this.FIRE_DURATION);
  }
};