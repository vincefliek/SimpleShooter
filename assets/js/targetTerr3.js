"use strict";

var inherits = require('inherits');
var Target = require('./target');

module.exports = TargetTerr3;

function TargetTerr3() {
  var _this = this;

  _this.newPosition = function () {
    _this.generate('terr3.png');
  };
}

inherits(TargetTerr3, Target);