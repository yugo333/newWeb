"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Text = void 0;

var THREE = _interopRequireWildcard(require("three"));

var _helvetiker_regularTypeface = _interopRequireDefault(require("three/examples/fonts/helvetiker_regular.typeface.json"));

var _TessellateModifier = require("three/examples/jsm/modifiers/TessellateModifier");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var profileText3D = new THREE.FontLoader().parse(_helvetiker_regularTypeface["default"]);

var Text =
/*#__PURE__*/
function () {
  function Text() {
    _classCallCheck(this, Text);

    var textArray = ["L", "A", "I", "C", "I", "F", "F", "O", " ", "5", "U"];
    this.meshArray = [];

    for (var i = 0; i < textArray.length; i++) {
      var geometry = new THREE.TextGeometry(textArray[i], {
        font: profileText3D,
        size: 40,
        height: 5,
        curveSegments: 3,
        bevelThickness: 2,
        bevelSize: 1,
        bevelEnabled: true
      });
      var z_position = i * 1.75 - 1.6; // console.log(X_position);

      this._eachTexts(geometry, z_position);
    }
  }

  _createClass(Text, [{
    key: "_eachTexts",
    value: function _eachTexts(geometry, z_position) {
      geometry.center();
      var tessellateModifier = new _TessellateModifier.TessellateModifier(8);

      for (var i = 0; i < 6; i++) {
        tessellateModifier.modify(geometry);
      }

      geometry = new THREE.BufferGeometry().fromGeometry(geometry);
      var numFaces = geometry.attributes.position.count / 3;
      var colors = new Float32Array(numFaces * 3 * 3);
      var displacement = new Float32Array(numFaces * 3 * 3);
      var color = new THREE.Color();

      for (var f = 0; f < numFaces; f++) {
        var index = 9 * f;
        var h = 1 * Math.random();
        var s = 1 + 0.5 * Math.random();
        var l = 0.05 + 0.5 * Math.random();
        color.setHSL(h, s, l);
        var d = 10 * (0.5 - Math.random());

        for (var t = 0; t < 3; t++) {
          colors[index + 3 * t] = color.r;
          colors[index + 3 * t + 1] = color.g;
          colors[index + 3 * t + 2] = color.b;
          displacement[index + 3 * t] = d;
          displacement[index + 3 * t + 1] = d;
          displacement[index + 3 * t + 2] = d;
        }
      }

      geometry.setAttribute("customColor", new THREE.BufferAttribute(colors, 3));
      geometry.setAttribute("displacement", new THREE.BufferAttribute(displacement, 3)); //

      var uniforms = {
        amplitude: {
          value: 0.0
        }
      };
      var shaderMaterial = new THREE.ShaderMaterial({
        uniforms: uniforms,
        vertexShader: document.getElementById("vertexshader").textContent,
        fragmentShader: document.getElementById("fragmentshader").textContent
      }); //

      this.mesh = new THREE.Mesh(geometry, shaderMaterial);
      this.mesh.scale.set(0.05, 0.05, 0.05); // this.mesh.position.z = ;

      this.mesh.rotation.y = 90 / 180 * Math.PI;
      this.mesh.position.z = z_position - 60;
      this.meshArray.push(this.mesh);
    }
  }]);

  return Text;
}();

exports.Text = Text;