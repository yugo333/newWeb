"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Particle = void 0;

var THREE = _interopRequireWildcard(require("three"));

var _vertexShader = _interopRequireDefault(require("./vertexShader.vert"));

var _fragmentShader = _interopRequireDefault(require("./fragmentShader.frag"));

var _TouchTexture = _interopRequireDefault(require("./TouchTexture"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var glslify = require("glslify");

var Particle =
/*#__PURE__*/
function () {
  function Particle(src) {
    var _this = this;

    _classCallCheck(this, Particle);

    this.container = new THREE.Object3D();
    var loader = new THREE.TextureLoader();
    loader.load(src, function (texture) {
      _this.texture = texture;
      _this.texture.minFilter = THREE.LinearFilter;
      _this.texture.magFilter = THREE.LinearFilter;
      _this.texture.format = THREE.RGBFormat;
      _this.width = texture.image.width;
      _this.height = texture.image.height;

      _this.initPoints(true);
    });
  }

  _createClass(Particle, [{
    key: "initPoints",
    value: function initPoints(discard) {
      this.numPoints = this.width * this.height;
      var numVisible = this.numPoints;
      var threshold = 0;
      var originalColors;

      if (discard) {
        // discard pixels darker than threshold #22
        numVisible = 0;
        threshold = 34;
        var img = this.texture.image;
        var canvas = document.createElement("canvas");
        var ctx = canvas.getContext("2d");
        canvas.width = this.width;
        canvas.height = this.height;
        ctx.scale(1, -1);
        ctx.drawImage(img, 0, 0, this.width, this.height * -1);
        var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        originalColors = Float32Array.from(imgData.data);

        for (var i = 0; i < this.numPoints; i++) {
          if (originalColors[i * 4 + 0] > threshold) numVisible++;
        } // console.log("numVisible", numVisible, this.numPoints);

      }

      var uniforms = {
        uTime: {
          value: 0
        },
        uRandom: {
          value: 1.0
        },
        uDepth: {
          value: 2.0
        },
        uSize: {
          value: 0.0
        },
        uTextureSize: {
          value: new THREE.Vector2(this.width, this.height)
        },
        uTexture: {
          value: this.texture
        },
        uTouch: {
          value: null
        }
      };
      var material = new THREE.RawShaderMaterial({
        uniforms: uniforms,
        vertexShader: glslify(_vertexShader["default"]),
        fragmentShader: glslify(_fragmentShader["default"]),
        depthTest: false,
        transparent: true // blending: THREE.AdditiveBlending

      });
      var geometry = new THREE.InstancedBufferGeometry(); // positions

      var positions = new THREE.BufferAttribute(new Float32Array(4 * 3), 3);
      positions.setXYZ(0, -0.5, 0.5, 0.0);
      positions.setXYZ(1, 0.5, 0.5, 0.0);
      positions.setXYZ(2, -0.5, -0.5, 0.0);
      positions.setXYZ(3, 0.5, -0.5, 0.0);
      geometry.setAttribute("position", positions); // uvs

      var uvs = new THREE.BufferAttribute(new Float32Array(4 * 2), 2);
      uvs.setXYZ(0, 0.0, 0.0);
      uvs.setXYZ(1, 1.0, 0.0);
      uvs.setXYZ(2, 0.0, 1.0);
      uvs.setXYZ(3, 1.0, 1.0);
      geometry.setAttribute("uv", uvs); // index

      geometry.setIndex(new THREE.BufferAttribute(new Uint16Array([0, 2, 1, 2, 3, 1]), 1));
      var indices = new Uint16Array(numVisible);
      var offsets = new Float32Array(numVisible * 3);
      var angles = new Float32Array(numVisible);

      for (var _i = 0, j = 0; _i < this.numPoints; _i++) {
        if (discard && originalColors[_i * 4 + 0] <= threshold) continue;
        offsets[j * 3 + 0] = _i % this.width;
        offsets[j * 3 + 1] = Math.floor(_i / this.width);
        indices[j] = _i;
        angles[j] = Math.random() * Math.PI;
        j++;
      }

      geometry.setAttribute("pindex", new THREE.InstancedBufferAttribute(indices, 1, false));
      geometry.setAttribute("offset", new THREE.InstancedBufferAttribute(offsets, 3, false));
      geometry.setAttribute("angle", new THREE.InstancedBufferAttribute(angles, 1, false));
      this.object3D = new THREE.Mesh(geometry, material); // console.log(this.object3D);

      this.container.add(this.object3D);
      var geometry2 = new THREE.PlaneGeometry(this.width, this.height, 1, 1);
      var material2 = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        wireframe: true,
        depthTest: false
      });
      material.visible = false;
      this.hitArea = new THREE.Mesh(geometry2, material2);
      this.container.add(this.hitArea);
    }
  }]);

  return Particle;
}();

exports.Particle = Particle;