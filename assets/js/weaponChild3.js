"use strict";

var inherits = require('inherits');
var Weapon = require('./weapon');

module.exports = WeaponBallista2;

function WeaponBallista2() {
  var _this = this;

  _this.FIRE_DURATION = 380;
}

inherits(WeaponBallista2, Weapon);