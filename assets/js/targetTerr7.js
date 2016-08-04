"use strict";

var inherits = require('inherits');
var Target = require('./target');

module.exports = TargetTerr7;

function TargetTerr7() {
  var _this = this;

  _this.newPosition = function () {
    _this.generate('terr7.png');
  };
}

inherits(TargetTerr7, Target);