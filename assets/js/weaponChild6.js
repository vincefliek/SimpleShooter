"use strict";

var inherits = require('inherits');
var Weapon = require('./weapon');

module.exports = WeaponM1897;

function WeaponM1897() {
  var _this = this;

  _this.FIRE_DURATION = 420;
}

inherits(WeaponM1897, Weapon);