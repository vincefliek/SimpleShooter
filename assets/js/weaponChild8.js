"use strict";

var inherits = require('inherits');
var Weapon = require('./weapon');

module.exports = WeaponUMP45;

function WeaponUMP45() {
  var _this = this;

  _this.FIRE_DURATION = 230;
}

inherits(WeaponUMP45, Weapon);