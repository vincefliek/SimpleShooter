"use strict";

var inherits = require('inherits');
var Weapon = require('./weapon');

module.exports = WeaponBallista;

function WeaponBallista() {
  var _this = this;

  _this.FIRE_DURATION = 380;
}

inherits(WeaponBallista, Weapon);