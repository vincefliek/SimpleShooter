"use strict";

var inherits = require('inherits');
var Target = require('./target');

module.exports = TargetTerr8;

function TargetTerr8() {
  var _this = this;

  _this.newPosition = function () {
    _this.generate('terr8.png');
  };
}

inherits(TargetTerr8, Target);