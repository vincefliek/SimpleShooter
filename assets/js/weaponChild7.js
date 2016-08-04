"use strict";

var inherits = require('inherits');
var Weapon = require('./weapon');

module.exports = WeaponStormPSR;

function WeaponStormPSR() {
  var _this = this;

  _this.FIRE_DURATION = 250;
}

 inherits(WeaponStormPSR, Weapon);