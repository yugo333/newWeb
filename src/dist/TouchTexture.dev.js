"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var THREE = _interopRequireWildcard(require("three"));

var _easing = require("./utils/easing.utils");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var TouchTexture =
/*#__PURE__*/
function () {
  function TouchTexture(parent) {
    _classCallCheck(this, TouchTexture);

    this.parent = parent;
    this.size = 64;
    this.maxAge = 120;
    this.radius = 0.15;
    this.trail = [];
    this.initTexture();
  }

  _createClass(TouchTexture, [{
    key: "initTexture",
    value: function initTexture() {
      this.canvas = document.createElement("canvas");
      this.canvas.width = this.canvas.height = this.size;
      this.ctx = this.canvas.getContext("2d");
      this.ctx.fillStyle = "black";
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      this.texture = new THREE.Texture(this.canvas);
      this.canvas.id = "touchTexture";
      this.canvas.style.width = this.canvas.style.height = "".concat(this.canvas.width, "px");
    }
  }, {
    key: "update",
    value: function update(delta) {
      var _this = this;

      this.clear(); // age points

      this.trail.forEach(function (point, i) {
        point.age++; // remove old

        if (point.age > _this.maxAge) {
          _this.trail.splice(i, 1);
        }
      });
      this.trail.forEach(function (point, i) {
        _this.drawTouch(point);
      });
      this.texture.needsUpdate = true;
    }
  }, {
    key: "clear",
    value: function clear() {
      this.ctx.fillStyle = "black";
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }, {
    key: "addTouch",
    value: function addTouch(point) {
      var force = 0;
      var last = this.trail[this.trail.length - 1];

      if (last) {
        var dx = last.x - point.x;
        var dy = last.y - point.y;
        var dd = dx * dx + dy * dy;
        force = Math.min(dd * 10000, 1);
      }

      this.trail.push({
        x: point.x,
        y: point.y,
        age: 0,
        force: force
      });
    }
  }, {
    key: "drawTouch",
    value: function drawTouch(point) {
      var pos = {
        x: point.x * this.size,
        y: (1 - point.y) * this.size
      };
      var intensity = 1;

      if (point.age < this.maxAge * 0.3) {
        intensity = (0, _easing.easeOutSine)(point.age / (this.maxAge * 0.3), 0, 1, 1);
      } else {
        intensity = (0, _easing.easeOutSine)(1 - (point.age - this.maxAge * 0.3) / (this.maxAge * 0.7), 0, 1, 1);
      }

      intensity *= point.force;
      var radius = this.size * this.radius * intensity;
      var grd = this.ctx.createRadialGradient(pos.x, pos.y, radius * 0.25, pos.x, pos.y, radius);
      grd.addColorStop(0, "rgba(255, 255, 255, 0.2)");
      grd.addColorStop(1, "rgba(0, 0, 0, 0.0)");
      this.ctx.beginPath();
      this.ctx.fillStyle = grd;
      this.ctx.arc(pos.x, pos.y, radius, 0, Math.PI * 2);
      this.ctx.fill();
    }
  }]);

  return TouchTexture;
}();

exports["default"] = TouchTexture;