"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BackGroundShader = void 0;

var THREE = _interopRequireWildcard(require("three"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var BackGroundShader =
/*#__PURE__*/
function () {
  function BackGroundShader() {
    _classCallCheck(this, BackGroundShader);
  }

  _createClass(BackGroundShader, [{
    key: "uniforms",
    value: function uniforms() {
      var uniforms = {
        time: {
          type: "f",
          value: 1.0
        },
        resolution: {
          type: "v2",
          value: new THREE.Vector2()
        },
        mouse: {
          type: "v2",
          value: new THREE.Vector2()
        }
      };
      return uniforms;
    }
  }, {
    key: "vertexShader",
    value: function vertexShader() {
      var vertexShader = [// "attribute vec3 position;",
      "void main(void){", "gl_Position = vec4(position, 1.0);", "}"].join("\n");
      return vertexShader;
    }
  }, {
    key: "fragmentShader",
    value: function fragmentShader() {
      var fragmentShader = [" #ifdef GL_ES", "precision mediump float;", "#endif", "uniform vec2 resolution;", "uniform vec2 mouse;", "uniform float time;", "float random (in vec2 _st) {", "return fract(sin(dot(_st.xy,", "   vec2(12.9898,78.233)))*", "  43758.5453123);", "  }", "// Based on Morgan McGuire @morgan3d", "// https://www.shadertoy.com/view/4dS3Wd", " float noise (in vec2 _st) {", " vec2 i = floor(_st);", " vec2 f = fract(_st);", " // Four corners in 2D of a tile", " float a = random(i);", "float b = random(i + vec2(1.0, 0.0));", "float c = random(i + vec2(0.0, 1.0));", "float d = random(i + vec2(1.0, 1.0));", "vec2 u = f * f * (3.0 - 2.0 * f);", " return mix(a, b, u.x) +", " (c - a)* u.y * (1.0 - u.x) +", "(d - b) * u.x * u.y;", " }", "  #define NUM_OCTAVES 5", "float fbm ( in vec2 _stE) {", "float v = 0.0;", " float a = 0.5;", "vec2 shift = vec2(100.0);", " // Rotate to reduce axial bias", " mat2 rot = mat2(cos(0.5), sin(0.5),", " -sin(0.5), cos(0.50));", " for (int i = 0; i < NUM_OCTAVES; ++i) {", "v += a * noise(_st);", " _st = rot * _st * 2.0 + shift;", " a *= 0.5;", "   }", " return v;", " }", "void main() {", "vec2 st = gl_FragCoord.xy/resolution.xy*3.;", // st += st * abs(sin(time*0.1)*3.0);
      "vec3 color = vec3(0.0);", "vec2 q = vec2(0.);", " q.x = fbm( st + 0.00*time);", " q.y = fbm( st + vec2(1.0));", "  vec2 r = vec2(0.);", "r.x = fbm( st + 1.0*q + vec2(1.7,9.2)+ 0.15*time );", "r.y = fbm( st + 1.0*q + vec2(8.3,2.8)+ 0.126*time);", "float f = fbm(st+r);", "color = mix(vec3(0.101961,0.619608,0.666667),", "vec3(0.666667,0.666667,0.498039),", " clamp((f*f)*4.0,0.0,1.0));", "color = mix(color,", " vec3(0,0,0.164706),", " clamp(length(q),0.0,1.0));", "color = mix(color,", "vec3(0.666667,1,1),", "clamp(length(r.x),0.0,1.0));", "gl_FragColor = vec4((f*f*f+.6*f*f+.5*f)*color,0.5);", " }"].join("\n");
      return fragmentShader;
    }
  }]);

  return BackGroundShader;
}();

exports.BackGroundShader = BackGroundShader;