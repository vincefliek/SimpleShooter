"use strict";

var TargetTerr1 = require('./targetTerr1'),
    TargetTerr2 = require('./targetTerr2'),
    TargetTerr3 = require('./targetTerr3'),
    TargetTerr4 = require('./targetTerr4'),
    TargetTerr5 = require('./targetTerr5'),
    TargetTerr6 = require('./targetTerr6'),
    TargetTerr7 = require('./targetTerr7'),
    TargetTerr8 = require('./targetTerr8');

var WeaponAK = require('./weaponChild1'),
    WeaponBallista = require('./weaponChild2'),
    WeaponBallista2 = require('./weaponChild3'),
    WeaponBrowning = require('./weaponChild4'),
    WeaponG36C = require('./weaponChild5'),
    WeaponM1897 = require('./weaponChild6'),
    WeaponStormPSR = require('./weaponChild7'),
    WeaponUMP45 = require('./weaponChild8');

module.exports = Game;

function Game() {
  var _this = this;

  _this.init = function () {
    _this.chooseWeapon();
    _this.mouseParallax(document.getElementsByClassName('weapon')[0]);
  };

  _this.reset = function (hits) {
    var _this = this;

    document.addEventListener('keyup', doWhenEnterPressed, false);

    function doWhenEnterPressed(event) {
      if ( event.keyCode === 13 ) {
        hits = 0;

        document.querySelector('.endBlock').classList.add('hidden');
        document.querySelector('.beginBlock').classList.remove('hidden');

        document.removeEventListener('keyup', doWhenEnterPressed, false);
      }
    }
  };

  _this.chooseWeapon = function () {
    var weapons = document.querySelectorAll('.beginBlock__image');
    var wpn, terror;

    for( var i = 0; i < weapons.length; i++ ) {
      weapons[i].addEventListener('click', chooseOnClick, false);
    }

    document.getElementById('targetArea').addEventListener('click', function (e) {
      wpn.doShot(e, document.getElementById('targetItem').getAttribute('id'), function () {
        terror.newPosition();
      });
    }, false);

    function chooseOnClick() {
      /*jshint validthis: true */
      var active = document.querySelector('.weapon__item.active'),
          rightSrc = this.getElementsByTagName('img')[0].getAttribute('src'),
          elem;

      /* jshint ignore:start */
      if (active) active.classList.remove('active');
      /* jshint ignore:end */

      document.querySelector('.beginBlock').classList.add('hidden');

      elem = document.querySelector('.weapon__item[src="' + rightSrc + '"]');
      elem.classList.add('active');

      document.querySelector('.fire').dataset.fire = elem.dataset.weapon;

      switch (this.dataset.weaponClass) {
        case 'WeaponAK':
          wpn = new WeaponAK();
          terror = new TargetTerr1();
          break;
        case 'WeaponBallista':
          wpn = new WeaponBallista();
          terror = new TargetTerr2();
          break;
        case 'WeaponBallista2':
          wpn = new WeaponBallista2();
          terror = new TargetTerr3();
          break;
        case 'WeaponBrowning':
          wpn = new WeaponBrowning();
          terror = new TargetTerr4();
          break;
        case 'WeaponG36C':
          wpn = new WeaponG36C();
          terror = new TargetTerr5();
          break;
        case 'WeaponM1897':
          wpn = new WeaponM1897();
          terror = new TargetTerr6();
          break;
        case 'WeaponStormPSR':
          wpn = new WeaponStormPSR();
          terror = new TargetTerr7();
          break;
        case 'WeaponUMP45':
          wpn = new WeaponUMP45();
          terror = new TargetTerr8();
          break;
        default:
          break;
      }

      terror.newPosition();

      _this.timerFunc(_this.TIMER_DURATION, document.querySelector('.time__numbers'), function () {
        document.querySelector('.endBlock').classList.remove('hidden');
        document.getElementById('finalScore').textContent = wpn.hits;
        _this.reset(wpn.hits);
      });
    }
  };

  _this.TIMER_DURATION = 5;

  _this.timerFunc = function (duration, display, cb) {
    var timer = duration,
        minutes,
        seconds,
        intrv;

    creatorTimer();

    intrv = setInterval(function () {
      creatorTimer();

      if ( timer < 0 ) {
        clear(intrv);
        /* jshint ignore:start */
        if ( typeof cb === 'function' ) cb();
        /* jshint ignore:end */
      }
    }, 1000);

    function creatorTimer() {
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);

      minutes = minutes < 10 ? '0' + minutes : minutes;
      seconds = seconds < 10 ? '0' + seconds : seconds;

      display.textContent = minutes + ':' + seconds;

      --timer;
    }

    function clear(name) {
      clearInterval(name);
    }
  };

  _this.mouseParallax = function (elem) {
    var elem = elem,
      elemWid = elem.offsetWidth,
      winWid = document.body.offsetWidth;

    document.addEventListener('mousemove', function (e) {
      e = e || window.event;
      var x = ((winWid - elemWid) / 2 - (e.pageX - (winWid / 2))) / 8;
      elem.style.right = x + 'px';
    }, false);
  };
}