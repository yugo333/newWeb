"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ObjModel = void 0;

var _Load = require("../loadThree/Load");

var THREE = _interopRequireWildcard(require("three"));

var _GLTFLoader = require("three/examples/jsm/loaders/GLTFLoader");

var _text = require("../shaders/_text");

var _postprocessing = require("postprocessing");

var _helvetiker_regularTypeface = _interopRequireDefault(require("three/examples/fonts/helvetiker_regular.typeface.json"));

var _SoftParticlesShader = require("../shaders/_SoftParticlesShader");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var ObjModel =
/*#__PURE__*/
function (_load) {
  _inherits(ObjModel, _load);

  function ObjModel(scene) {
    var _this;

    _classCallCheck(this, ObjModel);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ObjModel).call(this, scene)); //gltf

    var GLoader = new _GLTFLoader.GLTFLoader(); //３Dモデル表示

    var GLB = require("../../assets/images/RollSecond.glb");

    var GLB2 = require("../../assets/images/stThaad.glb");

    var GLB3 = require("../../assets/images/tamaSecond.glb");

    GLoader.load(GLB, function (gltf) {
      _this.toy = gltf.scene;

      _this.toy.scale.set(2, 2, 2); // toy.scale.set(200, 200, 200); //toyのサイズ


      _this.toy.position.z = -2.5;
      _this.toy.position.x = -1.2; // toy.rotation.y = (180 / 180) * Math.PI;

      _this.toy.rotation.y = 180 / 180 * Math.PI;
      scene.add(_this.toy);
    });
    GLoader.load(GLB2, function (gltf) {
      _this.st = gltf.scene;

      _this.st.scale.set(2, 2, 2);

      _this.st.position.z = -2.5;
      _this.st.position.x = -1.2;
      _this.st.rotation.y = 180 / 180 * Math.PI;
      scene.add(_this.st);
    });
    GLoader.load(GLB3, function (gltf) {
      _this.tm = gltf.scene;

      _this.tm.scale.set(2, 2, 2);

      _this.tm.position.z = -2.5;
      _this.tm.position.x = -1.2;
      _this.tm.rotation.y = 180 / 180 * Math.PI;
      scene.add(_this.tm);
    }); //風のメッシュ

    var airGeometry = new THREE.TorusGeometry(0.3, 0.05, 16, 100);
    var airMaterial = new THREE.MeshBasicMaterial({
      color: 0x78c4d9,
      transparent: true,
      opacity: 0.0
    });
    _this.torus = new THREE.Mesh(airGeometry, airMaterial);
    _this.torus.position.z = -37.2;
    _this.torus.scale.x = 1;
    scene.add(_this.torus); // テキストモデル

    _this.text = new _text.Text();

    _this.text.meshArray.forEach(function (mesh) {
      scene.add(mesh);
    }); //ページプレーンモデル


    var textPositionZ = -52.6;
    var textPositionX = 40;
    var textPositionY = -7; // w:1792 h:1009 MAC15
    // console.log(window.innerWidth, window.innerHeight);
    // 背景１

    var texLoader = new THREE.TextureLoader();
    var texture = texLoader.load("../../assets/images/q.jpg");
    var planeGeometry = new THREE.PlaneGeometry(4, 2);
    var planeMaterial = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      opacity: 0.7
    });
    _this.planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
    _this.planeMesh.rotation.y = 90 / 180 * Math.PI;
    _this.planeMesh.position.z = textPositionZ;
    _this.planeMesh.position.x = textPositionX;
    _this.planeMesh.position.y = textPositionY;
    scene.add(_this.planeMesh); // テキスト

    var text = texLoader.load("../../assets/images/txt.png");
    var txtGeometry = new THREE.PlaneGeometry(3, 0.6);
    var txtMaterial = new THREE.MeshBasicMaterial({
      map: text,
      transparent: true,
      opacity: 0.8
    });
    var txtMesh = new THREE.Mesh(txtGeometry, txtMaterial);
    txtMesh.rotation.y = 90 / 180 * Math.PI;
    txtMesh.position.z = textPositionZ;
    txtMesh.position.y = -0.38 + textPositionY;
    txtMesh.position.x = textPositionX + 1;
    scene.add(txtMesh); // タイトル

    var title = texLoader.load("../../assets/images/coolTextA.png");
    var titleGeometry = new THREE.PlaneGeometry(1.5, 0.4);
    var titleMaterial = new THREE.MeshBasicMaterial({
      map: title,
      transparent: true,
      opacity: 0.9
    });
    var titleMesh = new THREE.Mesh(titleGeometry, titleMaterial);
    titleMesh.rotation.y = 90 / 180 * Math.PI;
    titleMesh.position.z = textPositionZ + 0.8;
    titleMesh.position.y = 0.4 + textPositionY;
    titleMesh.position.x = textPositionX + 1;
    scene.add(titleMesh); // 背景２

    var texture2 = texLoader.load("../../assets/images/w.jpg"); // let planeGeometry2 = new THREE.PlaneGeometry(4, 2);

    var planeMaterial2 = new THREE.MeshBasicMaterial({
      map: texture2,
      transparent: true,
      opacity: 0.7
    });
    var planeMesh2 = new THREE.Mesh(planeGeometry, planeMaterial2);
    planeMesh2.rotation.y = 90 / 180 * Math.PI;
    planeMesh2.position.z = textPositionZ;
    planeMesh2.position.y = -2.5 + textPositionY;
    planeMesh2.position.x = textPositionX;
    scene.add(planeMesh2); // テキスト２

    var text2 = texLoader.load("../../assets/images/text.png"); // let txtGeometry2 = new THREE.PlaneGeometry(3, 0.6);

    var txtMaterial2 = new THREE.MeshBasicMaterial({
      map: text2,
      transparent: true,
      opacity: 0.8
    });
    var txtMesh2 = new THREE.Mesh(txtGeometry, txtMaterial2);
    txtMesh2.rotation.y = 90 / 180 * Math.PI;
    txtMesh2.position.z = textPositionZ;
    txtMesh2.position.y = -2.88 + textPositionY;
    txtMesh2.position.x = textPositionX + 1;
    scene.add(txtMesh2); // タイトル2

    var title2 = texLoader.load("../../assets/images/coolTextW.png"); // let title2Geometry = new THREE.PlaneGeometry(1.5, 0.4);

    var title2Material = new THREE.MeshBasicMaterial({
      map: title2,
      transparent: true,
      opacity: 0.9
    });
    var title2Mesh = new THREE.Mesh(titleGeometry, title2Material);
    title2Mesh.rotation.y = 90 / 180 * Math.PI;
    title2Mesh.position.z = textPositionZ + 0.8;
    title2Mesh.position.y = -2.1 + textPositionY;
    title2Mesh.position.x = textPositionX + 1;
    scene.add(title2Mesh); // タイトル3

    var title3 = texLoader.load("../../assets/images/coolTextL.png"); // let title3Geometry = new THREE.PlaneGeometry(1.5, 0.4);

    var title3Material = new THREE.MeshBasicMaterial({
      map: title3,
      transparent: true,
      opacity: 0.9
    });
    var title3Mesh = new THREE.Mesh(titleGeometry, title3Material);
    title3Mesh.rotation.y = 90 / 180 * Math.PI;
    title3Mesh.position.z = textPositionZ + 0.8;
    title3Mesh.position.y = -4.5 + textPositionY;
    title3Mesh.position.x = textPositionX + 1;
    scene.add(title3Mesh); // リンク背景

    var textureTable = texLoader.load("../../assets/images/ame.jpg");
    var planeGeometryTable = new THREE.PlaneGeometry(4, 3);
    var planeMaterialTable = new THREE.MeshBasicMaterial({
      map: textureTable,
      transparent: true,
      opacity: 0.7
    });
    var planeMeshTable = new THREE.Mesh(planeGeometryTable, planeMaterialTable);
    planeMeshTable.rotation.y = 90 / 180 * Math.PI;
    planeMeshTable.position.z = textPositionZ;
    planeMeshTable.position.y = -5.5 + textPositionY;
    planeMeshTable.position.x = textPositionX;
    scene.add(planeMeshTable); //youTube

    var youTube = texLoader.load("../../assets/images/l1.png");
    var youTubeGeometry = new THREE.PlaneGeometry(1.5, 0.4);
    var youTubeMaterial = new THREE.MeshBasicMaterial({
      map: youTube,
      transparent: true,
      opacity: 0.9
    });
    _this.youTubeMesh = new THREE.Mesh(youTubeGeometry, youTubeMaterial);
    _this.youTubeMesh.name = "youTubeMesh";
    _this.youTubeMesh.rotation.y = 90 / 180 * Math.PI;
    _this.youTubeMesh.position.z = textPositionZ;
    _this.youTubeMesh.position.y = -5 + textPositionY;
    _this.youTubeMesh.position.x = textPositionX + 1;
    scene.add(_this.youTubeMesh); //inst

    var inst = texLoader.load("../../assets/images/l4.png"); // let instGeometry = new THREE.PlaneGeometry(1.5, 0.4);

    var instMaterial = new THREE.MeshBasicMaterial({
      map: inst,
      transparent: true,
      opacity: 0.9
    });
    _this.instMesh = new THREE.Mesh(youTubeGeometry, instMaterial);
    _this.instMesh.name = "instMesh";
    _this.instMesh.rotation.y = 90 / 180 * Math.PI;
    _this.instMesh.position.z = textPositionZ;
    _this.instMesh.position.y = -5.5 + textPositionY;
    _this.instMesh.position.x = textPositionX + 1;
    scene.add(_this.instMesh); //twe

    var twe = texLoader.load("../../assets/images/l3.png"); // let tweGeometry = new THREE.PlaneGeometry(1.5, 0.4);

    var tweMaterial = new THREE.MeshBasicMaterial({
      map: twe,
      transparent: true,
      opacity: 0.9
    });
    _this.tweMesh = new THREE.Mesh(youTubeGeometry, tweMaterial);
    _this.tweMesh.name = "tweMesh";
    _this.tweMesh.rotation.y = 90 / 180 * Math.PI;
    _this.tweMesh.position.z = textPositionZ;
    _this.tweMesh.position.y = -6 + textPositionY;
    _this.tweMesh.position.x = textPositionX + 1;
    scene.add(_this.tweMesh); //git

    var git = texLoader.load("../../assets/images/l2.png"); // let gitGeometry = new THREE.PlaneGeometry(1.5, 0.4);

    var gitMaterial = new THREE.MeshBasicMaterial({
      map: git,
      transparent: true,
      opacity: 0.9
    });
    _this.gitMesh = new THREE.Mesh(youTubeGeometry, gitMaterial);
    _this.gitMesh.name = "gitMesh";
    _this.gitMesh.rotation.y = 90 / 180 * Math.PI;
    _this.gitMesh.position.z = textPositionZ;
    _this.gitMesh.position.y = -6.5 + textPositionY;
    _this.gitMesh.position.x = textPositionX + 1;
    scene.add(_this.gitMesh); // タイトル4

    var title4 = texLoader.load("../../assets/images/coolTextC.png"); // let title4Geometry = new THREE.PlaneGeometry(1.5, 0.4);

    var title4Material = new THREE.MeshBasicMaterial({
      map: title4,
      transparent: true,
      opacity: 0.9
    });
    _this.title4Mesh = new THREE.Mesh(titleGeometry, title4Material);
    _this.title4Mesh.rotation.y = 90 / 180 * Math.PI;
    _this.title4Mesh.position.z = textPositionZ;
    _this.title4Mesh.position.y = -8.5 + textPositionY;
    _this.title4Mesh.position.x = textPositionX + 1;
    _this.title4Mesh.name = "contact";
    scene.add(_this.title4Mesh); // 背景8

    var texture8 = texLoader.load("../../assets/images/yugo.jpg"); // let planeGeometry8 = new THREE.PlaneGeometry(4, 2);

    var planeMaterial8 = new THREE.MeshBasicMaterial({
      map: texture8,
      transparent: true,
      opacity: 0.7
    });
    var planeMesh8 = new THREE.Mesh(planeGeometry, planeMaterial8);
    planeMesh8.rotation.y = 90 / 180 * Math.PI;
    planeMesh8.position.z = textPositionZ;
    planeMesh8.position.y = -8.5 + textPositionY;
    planeMesh8.position.x = textPositionX;
    scene.add(planeMesh8); // フッター的なやつ

    var profileText3D = new THREE.FontLoader().parse(_helvetiker_regularTypeface["default"]);
    var zTextGeometry = new THREE.TextGeometry("U5 official MUSIC x IT 2020", {
      font: profileText3D,
      size: 0.05,
      height: 0.05,
      curveSegments: 3,
      bevelSize: 0.1
    }); // テキストの中央を原点に合わせる

    zTextGeometry.center();
    _this.fMesh = new THREE.Mesh(zTextGeometry, new THREE.MeshBasicMaterial({
      color: 0xffffff
    }));
    _this.fMesh.rotation.y = 90 / 180 * Math.PI;
    _this.fMesh.position.z = textPositionZ;
    _this.fMesh.position.y = -10 + textPositionY;
    _this.fMesh.position.x = textPositionX;
    scene.add(_this.fMesh); //ローダーで画像読み込み

    var urls = [//画像配置決まってる
    "../../assets/images/posx.jpg", "../../assets/images/negx.jpg", "../../assets/images/posy.jpg", "../../assets/images/negy.jpg", "../../assets/images/posz.jpg", "../../assets/images/negz.jpg"];
    var loader = new THREE.CubeTextureLoader();
    var cubeTexture = loader.load(urls); // cubeTexture.mapping = THREE.CubeRefractionMapping;
    //メインのダイヤ

    _this.diamMaterial = new THREE.MeshLambertMaterial({
      color: 0xf0f0ff,
      envMap: cubeTexture,
      refractionRatio: 0.8,
      //屈折
      // opacity: 0.8, //不透明度で反射具合を調整
      opacity: 0,
      //不透明度で反射具合を調整
      transparent: true //透明を有効に

    });
    _this.diamMaterial2 = new THREE.MeshLambertMaterial({
      color: 0xcccccc,
      envMap: cubeTexture,
      //反射マッピングのcubeCameraで作成した環境マッピングを適用
      reflectivity: 1,
      //反射率
      // opacity: 0.6, //不透明度で反射具合を調整
      opacity: 0,
      //不透明度で反射具合を調整
      transparent: true //透明を有効に

    });

    var GLB4 = require("../../assets/images/diamond.glb");

    GLoader.load(GLB4, function (gltf) {
      _this.dia = gltf.scene;
      _this.dia2 = _this.dia.clone();

      _this.dia.traverse(function (o) {
        o.material = _this.diamMaterial;
      });

      _this.dia2.traverse(function (o) {
        o.material = _this.diamMaterial2;
      });

      _this.dia.scale.set(0.2, 0.2, 0.2);

      _this.dia2.scale.set(0.2, 0.2, 0.2); // dia.scale.set(200, 200, 200); //diaのサイズ


      _this.dia.position.z = textPositionZ;
      _this.dia2.position.z = textPositionZ;
      _this.dia.position.y = -0.1 + textPositionY;
      _this.dia2.position.y = -0.1 + textPositionY;
      _this.dia.position.x = textPositionX + 0.5;
      _this.dia2.position.x = textPositionX + 0.5;
      scene.add(_this.dia);
      scene.add(_this.dia2);
    }); //便利板

    var geometryPlane = new THREE.PlaneGeometry(80, 80, 32);
    var materialPlane = new THREE.MeshBasicMaterial({
      color: 0x000000,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 1
    });
    _this.plane = new THREE.Mesh(geometryPlane, materialPlane);

    _this.plane.position.set(38, 0, 1); // this.plane.position.set(41, 0, 1);


    scene.add(_this.plane); // skull

    var GLB5 = require("../../assets/images/skullUp.glb");

    var GLB6 = require("../../assets/images/skullDown.glb");

    GLoader.load(GLB5, function (gltf) {
      _this.skull = gltf.scene;
      _this.skullClone = _this.skull.clone();

      _this.skull.scale.set(0.6, 0.6, 0.6);

      _this.skull.rotation.y = 120 / 180 * Math.PI;
      _this.skull.position.z = textPositionZ + 1.3;
      _this.skull.position.y = -9.3 + textPositionY;
      _this.skull.position.x = textPositionX + 1;

      _this.skullClone.scale.set(0.6, 0.6, 0.6);

      _this.skullClone.rotation.y = 60 / 180 * Math.PI;
      _this.skullClone.position.z = textPositionZ - 1.3;
      _this.skullClone.position.y = -9.3 + textPositionY;
      _this.skullClone.position.x = textPositionX + 1;
      scene.add(_this.skull);
      scene.add(_this.skullClone);
    });
    GLoader.load(GLB6, function (gltf) {
      _this.skull2 = gltf.scene;

      _this.skull2.scale.set(0.6, 0.6, 0.6);

      _this.skull2.rotation.y = 120 / 180 * Math.PI;
      _this.skull2.position.z = textPositionZ + 1.3;
      _this.skull2.position.y = -9.3 + textPositionY;
      _this.skull2.position.x = textPositionX + 1;
      _this.skullBone = _this.skull2.children[0].children[0];
      scene.add(_this.skull2);
    });
    GLoader.load(GLB6, function (gltf) {
      _this.skull2Clone = gltf.scene;

      _this.skull2Clone.scale.set(0.6, 0.6, 0.6);

      _this.skull2Clone.rotation.y = 60 / 180 * Math.PI;
      _this.skull2Clone.position.z = textPositionZ - 1.3;
      _this.skull2Clone.position.y = -9.3 + textPositionY;
      _this.skull2Clone.position.x = textPositionX + 1;
      _this.skullBone2 = _this.skull2Clone.children[0].children[0];
      scene.add(_this.skull2Clone);
    }); // SMOKE
    // Textures

    _this.smokeTexture = new THREE.TextureLoader().load("../../assets/images/cloud.png");
    var smokeGeo = new THREE.BufferGeometry();
    var numOfParticles = 10; // 20

    var spreadX = 5,
        spreadY = -0.5,
        spreadZ = 1; // 18 4 18

    var origin = new THREE.Vector3(0, 1, 0); // 0 1 0

    var posArr = [];

    for (var i = 0; i < numOfParticles; i++) {
      var x = Math.random() * spreadX - spreadX / 2.0 + origin.x;
      var y = Math.random() * spreadY - spreadY / 2.0 - origin.y;
      var z = spreadZ;
      posArr.push(x, y, z);
    }

    smokeGeo.setAttribute("position", new THREE.Float32BufferAttribute(posArr, 3));
    var softParticlesMaterial = new THREE.ShaderMaterial({
      defines: Object.assign({}, new _SoftParticlesShader.SoftParticlesShader().defines()),
      uniforms: THREE.UniformsUtils.clone(new _SoftParticlesShader.SoftParticlesShader().uniforms()),
      vertexShader: new _SoftParticlesShader.SoftParticlesShader().vertexShader(),
      fragmentShader: new _SoftParticlesShader.SoftParticlesShader().fragmentShader(),
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthTest: false,
      depthWrite: false
    });
    softParticlesMaterial.map = _this.smokeTexture;
    var uniforms = softParticlesMaterial.uniforms;
    uniforms.map.value = _this.smokeTexture;
    uniforms.diffuse.value = new THREE.Color(1, 1, 1);
    uniforms.size.value = 15;
    uniforms.opacity.value = 0.3;
    uniforms.sizeAttenuation.value = true;
    uniforms.fCamNear.value = _this.camera.near;
    uniforms.fCamFar.value = _this.camera.far;
    uniforms.screenSize.value = new THREE.Vector2(window.innerWidth, window.innerHeight);
    _this.smokeParticles = new THREE.Points(smokeGeo, softParticlesMaterial);
    _this.smokeParticles.frustumCulled = false;
    scene.add(_this.smokeParticles);
    var depthTexture = new THREE.DepthTexture();
    depthTexture.type = THREE.UnsignedShortType;
    depthTexture.minFilter = THREE.NearestFilter;
    depthTexture.maxFilter = THREE.NearestFilter;
    _this.renderTarget = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight, {
      format: THREE.RGBAFormat,
      depthTexture: depthTexture
    });
    _this.smokeParticles.material.uniforms.sceneDepthTexture.value = depthTexture; //プロセシングにthis.rendererを置き換える神々しくなる

    _this.composer = new _postprocessing.EffectComposer(_this.renderer);

    _this.composer.addPass(new _postprocessing.RenderPass(scene, _this.camera));

    _this.composer.addPass(new _postprocessing.EffectPass(_this.camera, new _postprocessing.BloomEffect()));

    return _this;
  }

  return ObjModel;
}(_Load.load);

exports.ObjModel = ObjModel;