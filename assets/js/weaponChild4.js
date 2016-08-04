"use strict";

var inherits = require('inherits');
var Weapon = require('./weapon');

module.exports = WeaponBrowning;

function WeaponBrowning() {
  var _this = this;

  _this.FIRE_DURATION = 80;
}

inherits(WeaponBrowning, Weapon);