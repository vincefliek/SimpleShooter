"use strict";

var inherits = require('inherits');
var Weapon = require('./weapon');

module.exports = WeaponAK;

function WeaponAK() {
  var _this = this;

  _this.FIRE_DURATION = 180;
}

inherits(WeaponAK, Weapon);