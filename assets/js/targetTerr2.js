"use strict";

var inherits = require('inherits');
var Target = require('./target');

module.exports = TargetTerr2;

function TargetTerr2() {
  var _this = this;

  _this.newPosition = function () {
    _this.generate('terr2.png');
  };
}

inherits(TargetTerr2, Target);