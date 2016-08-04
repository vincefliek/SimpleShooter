"use strict";

var inherits = require('inherits');
var Weapon = require('./weapon');

module.exports = WeaponG36C;

function WeaponG36C() {
  var _this = this;

  _this.FIRE_DURATION = 150;
}

inherits(WeaponG36C, Weapon);