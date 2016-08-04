"use strict";

var inherits = require('inherits');
var Target = require('./target');

module.exports = TargetTerr1;

function TargetTerr1() {
  var _this = this;

  _this.newPosition = function () {
    _this.generate('terr1.png');
  };
}

inherits(TargetTerr1, Target);