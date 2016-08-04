"use strict";

var inherits = require('inherits');
var Target = require('./target');

module.exports = TargetTerr4;

function TargetTerr4() {
  var _this = this;

  _this.newPosition = function () {
    _this.generate('terr4.png');
  };
}

inherits(TargetTerr4, Target);