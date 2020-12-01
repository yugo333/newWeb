"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.load = void 0;

var THREE = _interopRequireWildcard(require("three"));

var controls = _interopRequireWildcard(require("three-orbit-controls"));

var _BackGroundShader = require("../shaders/_BackGroundShader");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var load = function load(scene) {
  _classCallCheck(this, load);

  this.OrbitControls = controls(THREE);
  scene.background = new THREE.Color(0x000000);
  this.camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 1, 10000);
  this.camera.rotation.y = 45 / 180 * Math.IP;
  this.camera.position.x = 0;
  this.camera.position.y = 0;
  this.camera.position.z = 3;
  this.hiLight = new THREE.AmbientLight(0x808080, 10);
  scene.add(this.hiLight);
  this.light1 = new THREE.PointLight(0xc4c4c4, 70);
  this.light1.position.set(0, 36, 135); // this.light1.target =toy

  scene.add(this.light1); // バックグラウンド shader GLSL

  this.BackGroundShader = new _BackGroundShader.BackGroundShader();
  this.uniforms = this.BackGroundShader.uniforms();
  var geometryBackGroundShader = new THREE.PlaneBufferGeometry(2, 2);
  var materialBackGroundShader = new THREE.ShaderMaterial({
    uniforms: this.uniforms,
    vertexShader: document.getElementById("vertexShaderBG").textContent,
    fragmentShader: document.getElementById("fragmentShaderBG").textContent,
    depthTest: false,
    depthWrite: false,
    transparent: true,
    blending: THREE.AdditiveBlending
  });
  var meshBackGroundShader = new THREE.Mesh(geometryBackGroundShader, materialBackGroundShader); // ここが重要設定地道にするしかない

  meshBackGroundShader.position.x = -220;
  meshBackGroundShader.position.z = -100;
  scene.add(meshBackGroundShader);
  this.renderer = new THREE.WebGLRenderer({
    antialias: true
  });
  this.renderer.setSize(window.innerWidth, window.innerHeight);
  this.renderer.autoClear = false;
  this.renderer.setPixelRatio(window.devicePixelRatio);
  document.getElementById("objLoader").appendChild(this.renderer.domElement);
  this.Controls = new this.OrbitControls(this.camera, this.renderer.domElement);
  this.Controls.enableZoom = false;
  this.Controls.enablePan = false;
  this.Controls.enabled = false;
  this.Controls.update();
};

exports.load = load;