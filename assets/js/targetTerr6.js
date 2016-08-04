"use strict";

var inherits = require('inherits');
var Target = require('./target');

module.exports = TargetTerr6;

function TargetTerr6() {
  var _this = this;

  _this.newPosition = function () {
    _this.generate('terr6.png');
  };
}

inherits(TargetTerr6, Target);