"use strict";

var inherits = require('inherits');
var Target = require('./target');

module.exports = TargetTerr5;

function TargetTerr5() {
  var _this = this;

  _this.newPosition = function () {
    _this.generate('terr5.png');
  };
}

inherits(TargetTerr5, Target);