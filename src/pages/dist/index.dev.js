"use strict";

require("./style.scss");

var THREE = _interopRequireWildcard(require("three"));

var controls = _interopRequireWildcard(require("three-orbit-controls"));

var _dat = require("dat.gui");

var _GLTFLoader = require("three/examples/jsm/loaders/GLTFLoader");

var _text = require("./_text");

var _postprocessing = require("postprocessing");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var firstLoading = document.getElementById("loading");
var scene = new THREE.Scene();
window.addEventListener("DOMContentLoaded", function () {
  // ローティング画面
  firstLoading.style.zIndex = 10;
  new into();
  setTimeout(function () {
    // ローティング画面
    firstLoading.style.zIndex = 0;
  }, 5000);
});

function into() {
  // モバイルのスクロール停止
  var mainScroll = document.querySelector("body");
  scrollTo(0, 1000);
  setTimeout(function () {
    mainScroll.style.overflow = "hidden";
  }, 1000); // document.addEventListener(
  //   "touchmove",
  //   function (e) {
  //     e.preventDefault();
  //   },
  //   { passive: false }
  // );
  //hoverイベント 初期画面

  var item = document.querySelector("#container");
  var onmouseenter = false;
  item.addEventListener("mouseover", function () {
    onmouseenter = true;
  }); // clickイベント 初期画面

  var about = document.querySelector("#about");
  var hasRolling = false;
  var hasMoving = false;
  about.addEventListener("click", function () {
    hasRolling = true;
    hasMoving = true;
    item.classList.add("animate__animated");
    item.classList.add("animate__lightSpeedOutRight");
  });
  var loader = new objModel(); // hoverイベント ページ画面
  // canvas 要素の参照を取得する

  var canvas = document.querySelector("#objLoader canvas"); // マウス座標管理用のベクトルを作成

  var mouse = new THREE.Vector2(); // マウスイベントを登録

  canvas.addEventListener("mousemove", function (event) {
    var element = event.currentTarget; // canvas要素上のXY座標

    var x = event.clientX - element.offsetLeft;
    var y = event.clientY - element.offsetTop; // canvas要素の幅・高さ

    var w = element.offsetWidth;
    var h = element.offsetHeight; // -1〜+1の範囲で現在のマウス座標を登録する

    mouse.x = x / w * 2 - 1;
    mouse.y = -(y / h) * 2 + 1;
  }); // レイキャストを作成

  var raycaster = new THREE.Raycaster(); // clickイベント ページ画面
  // クロックはラジアンと同じ効力をもたらす// let theta = clock.getElapsedTime(); loader.camera.position.x = 5 * Math.sin(theta);
  // const clock = new THREE.Clock();
  // console.log(loader);

  var hasBoolPos = true;
  var mouseCount = 0;
  var nextMoveCount = 0;
  var nextMoveCount2 = 0;
  var hasMoveCamera = false;
  var timeoutId;
  var hasShot = false;
  var hasRollingCamera = false;
  var orbitSpin = 0;
  var hasStopLight = false;
  var destroy = false;
  var changePage = false;
  var resetAnimation = false;
  var cameraPositionDownY = 0; //スクロール

  var scrollPage = false; //オブジェクトのホバーイベント

  var hasObjHover = false;

  function render() {
    // モデル変数
    var roll = loader.toy;
    var stick = loader.st;
    var bullet = loader.tm; // click時camera,model動かす

    if (hasMoving) {
      // モデルセンターに動かす
      if (roll.position.z < -1.3) {
        roll.position.z += 0.025;
        stick.position.z += 0.025;
        bullet.position.z += 0.025;
      }

      if (roll.position.x < 0) {
        roll.position.x += 0.025;
        stick.position.x += 0.025;
        bullet.position.x += 0.025;
      }

      if (roll.position.y > -1.4) {
        roll.position.y -= 0.025;
        stick.position.y -= 0.025;
        bullet.position.y -= 0.025;
      } // カメラ画角調整


      if (loader.camera.fov > 20) {
        loader.camera.fov -= 0.4;
        loader.camera.updateProjectionMatrix();
      } else if (hasRolling == false && loader.camera.fov <= 30) {
        // rollの回転が終了し画角調整が終わり次第cameraをz軸方向に動かす
        hasMoveCamera = true;
      }
    }

    if (hasRolling) {
      onmouseenter = false; // toy回転戻す

      if (nextMoveCount > 0) {
        roll.rotation.z -= 0.008;
        nextMoveCount--;
      }

      if (nextMoveCount2 > 0 && nextMoveCount == 0) {
        roll.rotation.z += 0.002;
        nextMoveCount2 -= 0.1;
      }

      if (nextMoveCount == 0 && nextMoveCount2 <= 0.1) {
        nextMoveCount = 0;
        nextMoveCount2 = 0;
        mouseCount = 0;
        hasRolling = false;
      }
    }

    if (hasMoveCamera) {
      //hasMovingの最後の動きが終わった後に発火する作り（カメラをstick内に移動）
      // カメラの映り込む奥行きを狭くし、弾だけ表示させる
      loader.camera.far = 10;
      loader.camera.updateProjectionMatrix();

      if (loader.camera.position.z > -2) {
        loader.camera.position.z -= 0.15;
      } else {
        timeoutId = setTimeout(function () {
          hasShot = true;
        }, 300);
      } // カメラ発射追っかけで弾発射


      if (hasShot) {
        if (loader.camera.position.z > -30) {
          loader.camera.position.z -= 0.4;
          bullet.position.z -= 0.42;
        } else {
          if (bullet.position.z > -37) {
            bullet.position.z -= 0.2; //カメラ(オービットにて)のターゲットを弾にする

            loader.Controls.target.set(0, 0, bullet.position.z + 0.5);
            loader.Controls.update(); //ここで弾と同時に風を少し表示させる

            loader.torus.material.opacity = 0.3;
            loader.torus.position.z += 0.1;
            loader.torus.scale.x += 0.2;
            loader.torus.scale.y += 0.2;
          } else {
            // 風を再現
            if (loader.torus.scale.x < 3) {
              loader.torus.scale.x += 0.2;
              loader.torus.scale.y += 0.2;
            } else {
              loader.torus.scale.x = 1;
              loader.torus.scale.y = 1;
            }

            if (loader.torus.position.z < -35.2) {
              loader.torus.position.z += 0.05;
            } else {
              loader.torus.position.z = -37.2;
            }

            hasRollingCamera = true;
          }
        }
      }

      if (hasRollingCamera) {
        //ライトのターゲットを弾にする,ライトアニメーション止める
        hasStopLight = true;
        loader.light1.target = bullet;
        loader.light1.position.set(100, 50, 0);
        orbitSpin++; // オービットでカメラ回転

        if (destroy == false) {
          loader.Controls.autoRotate = true;
          loader.camera.position.y = 2;
        } //カメラ回転スピード調整、その後移動ブーリアン


        if (orbitSpin < 50) {
          loader.Controls.autoRotateSpeed = 50;
        } else if (orbitSpin > 50 && orbitSpin < 150) {
          loader.Controls.autoRotateSpeed = 5;
        } else {
          loader.Controls.autoRotateSpeed = 60;
          timeoutId = setTimeout(function () {
            destroy = true;
          }, 2000);
        }

        loader.Controls.update();
      }

      if (destroy) {
        // カメラの回転、画角戻してカメラポジション段階的に変更後テキストモデル破壊
        loader.Controls.autoRotate = false;
        loader.camera.far = 50;
        loader.camera.updateProjectionMatrix();

        if (loader.camera.position.z > -49.5) {
          loader.camera.position.z -= 0.35;
          loader.camera.position.x += 0.3;
        } else if (loader.camera.position.z > -52.5) {
          loader.camera.position.z -= 0.1;
          loader.camera.position.x += 1.4;
          loader.Controls.target.set(0, 0, loader.camera.position.z + 0.01);
          loader.Controls.update();
        } else {
          loader.torus.position.z -= 0.45;
          bullet.position.z -= 0.4; // ネスト深いが、段階的にテキストモデルを破壊してるだけ

          if (bullet.position.z <= -45) {
            loader.text.meshArray[10].material.uniforms.amplitude.value += 0.3;
            loader.text.meshArray[10].rotation.y += 0.03;

            if (bullet.position.z <= -47) {
              loader.text.meshArray[9].material.uniforms.amplitude.value += 0.3;
              loader.text.meshArray[9].rotation.y += 0.03;

              if (bullet.position.z <= -49) {
                loader.text.meshArray[8].material.uniforms.amplitude.value += 0.3;
                loader.text.meshArray[8].rotation.y += 0.03;

                if (bullet.position.z <= -50) {
                  loader.text.meshArray[7].material.uniforms.amplitude.value += 0.3;
                  loader.text.meshArray[7].rotation.y += 0.03;

                  if (bullet.position.z <= -52) {
                    loader.text.meshArray[6].material.uniforms.amplitude.value += 0.3;
                    loader.text.meshArray[6].rotation.y += 0.03;

                    if (bullet.position.z <= -54) {
                      loader.text.meshArray[5].material.uniforms.amplitude.value += 0.3;
                      loader.text.meshArray[5].rotation.y += 0.03;

                      if (bullet.position.z <= -56) {
                        loader.text.meshArray[4].material.uniforms.amplitude.value += 0.3;
                        loader.text.meshArray[4].rotation.y += 0.03;

                        if (bullet.position.z <= -58) {
                          loader.text.meshArray[3].material.uniforms.amplitude.value += 0.3;
                          loader.text.meshArray[3].rotation.y += 0.03;

                          if (bullet.position.z <= -60) {
                            loader.text.meshArray[2].material.uniforms.amplitude.value += 0.3;
                            loader.text.meshArray[2].rotation.y += 0.03;

                            if (bullet.position.z <= -61) {
                              loader.text.meshArray[1].material.uniforms.amplitude.value += 0.3;
                              loader.text.meshArray[1].rotation.y += 0.03;

                              if (bullet.position.z <= -62) {
                                loader.text.meshArray[0].material.uniforms.amplitude.value += 0.3;
                                loader.text.meshArray[0].rotation.y += 0.03;

                                if (bullet.position.z < -80) {
                                  // ページ移行処理、リセット処理
                                  changePage = true;
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    } // アニメーション後のページ表示


    if (changePage) {
      // ダイアの反射が強くなるためライト暗くする
      loader.light1.intensity = 3;
      loader.hiLight.intensity = 6;

      if (loader.camera.position.y >= -7.1) {
        cameraPositionDownY -= 0.1; // カメラの向く方向

        loader.camera.position.y = cameraPositionDownY;
        loader.Controls.target.y = cameraPositionDownY;
        loader.Controls.update();
        setTimeout(function () {
          scrollPage = true;
        }, 1000);
      }

      if (scrollPage) {
        //スクロール出来るようにしハイトも大きくする
        mainScroll.style.height = "1900px";
        mainScroll.style.overflowY = "auto"; //カメラが動ききってからスクロールできるようにする

        var y = window.pageYOffset / 100;
        loader.camera.position.y = -y - 7;
        loader.Controls.target.y = -y - 7;
        loader.Controls.update();
        loader.dia.position.y = -7 - y;
        loader.dia2.position.y = -7 - y;
      } // ダイアの回転


      loader.dia.rotation.x += 0.01;
      loader.dia2.rotation.x += 0.01;
      loader.dia.rotation.y += 0.01;
      loader.dia2.rotation.y += 0.01;
      loader.dia.rotation.z += 0.01;
      loader.dia2.rotation.z += 0.01; // ホバー 処理

      hasObjHover = true; // アニメーション処理の停止のタイミングを遅らせる

      setTimeout(function () {
        // ここ不要なアニメーションを止める
        resetAnimation = true; // 3Dテキストも止る為再度、バラバラにしたのを直し回転させる

        for (var i = 0; i < 11; i++) {
          loader.text.meshArray[i].material.uniforms.amplitude.value = 0;
          loader.text.meshArray[i].rotation.y += 0.03;
        }
      }, 3000);
    }

    if (hasObjHover) {
      // hover時のレイキャスターにてオブジェクト取得
      // レイキャスト = マウス位置からまっすぐに伸びる光線ベクトルを生成
      raycaster.setFromCamera(mouse, loader.camera); // その光線とぶつかったオブジェクトを得る

      var intersects = raycaster.intersectObjects(scene.children); // console.log(intersects);

      if (intersects.length > 0) {
        // ぶつかったオブジェクトに対してなんかする
        if (intersects[0].object.name == "youTubeMesh") {
          loader.youTubeMesh.scale.x = 1.5;
        } else {
          loader.youTubeMesh.scale.x = 1;
        }

        if (intersects[0].object.name == "instMesh") {
          loader.instMesh.scale.x = 1.5;
        } else {
          loader.instMesh.scale.x = 1;
        }

        if (intersects[0].object.name == "tweMesh") {
          loader.tweMesh.scale.x = 1.5;
        } else {
          loader.tweMesh.scale.x = 1;
        }

        if (intersects[0].object.name == "gitMesh") {
          loader.gitMesh.scale.x = 1.5;
        } else {
          loader.gitMesh.scale.x = 1;
        }
      }
    } // リセット処理 初期状態に戻す


    if (resetAnimation) {
      //クリック時のBool(回転後のアニメーション)
      hasRolling = false;
      hasMoving = false; //hover時のBool（回転）

      onmouseenter = false; // 発射のアニメーションBool

      hasMoveCamera = false;
      hasShot = false; // 弾の周りのアニメーション

      hasRollingCamera = false; // ３Dテキスト破壊

      destroy = false; // 弾の位置を初期位置

      bullet.position.z = -2.5;
      bullet.position.x = -1.2; // 風も初期位置へ

      loader.torus.position.z = -37.2;
      loader.torus.scale.x = 1;
    } // hover時の回転処理


    if (onmouseenter) {
      if (mouseCount < 68) {
        roll.rotation.z += 0.008;
        mouseCount++;
        nextMoveCount++;
      } else {
        roll.rotation.z -= 0.02;
        mouseCount++;
        nextMoveCount2++;

        if (mouseCount < 95) {
          onmouseenter = false;
          mouseCount = 0;
        }
      }
    } // ライトの動き


    if (hasStopLight == false) {
      if (hasBoolPos) {
        loader.light1.position.x += 8;

        if (loader.light1.position.x > 800) {
          hasBoolPos = false;
        }
      } else {
        loader.light1.position.x -= 8;

        if (loader.light1.position.x < -1000) {
          hasBoolPos = true;
        }
      }
    } // れんだりんぐ
    // loader.renderer.render(scene, loader.camera);
    // loader.cssRenderer.render(CssScene, loader.camera);


    loader.composer.render(); // 本来下記のメソットがこの関数の一番上にくる

    requestAnimationFrame(render);
  }

  render();
}

var load = function load() {
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

  scene.add(this.light1);
  this.renderer = new THREE.WebGLRenderer({
    antialias: true
  });
  this.renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById("objLoader").appendChild(this.renderer.domElement);
  this.Controls = new this.OrbitControls(this.camera, this.renderer.domElement);
  this.Controls.enableZoom = false;
  this.Controls.enablePan = false;
  this.Controls.enabled = false;
  this.Controls.update(); // // GUIパラメータ
  // function guiCtrl() {
  //   this.Camera_x = 0;
  //   this.Camera_y = 0;
  //   this.Camera_z = 100;
  //   this.Message = "";
  //   this.color = "#c2dc94";
  //   this.alert = function () {
  //     alert("サンプル");
  //   };
  // }
  // const gui = new GUI();
  // let folder = gui.addFolder("Folder");
  // let guiObj = new guiCtrl();
  // folder.add(guiObj, "Camera_x", -500, 1000).onChange(() => {
  //   this.new = this.light1.position.set(
  //     guiObj.Camera_x,
  //     guiObj.Camera_y,
  //     guiObj.Camera_z
  //   );
  //   this.light1.position.add(this.new);
  //   scene.add(this.light1);
  // });
  // folder.add(guiObj, "Camera_y", -500, 1000).onChange(() => {
  //   this.new = this.light1.position.set(
  //     guiObj.Camera_x,
  //     guiObj.Camera_y,
  //     guiObj.Camera_z
  //   );
  //   this.light1.position.add(this.new);
  //   scene.add(this.light1);
  // });
  // folder.add(guiObj, "Camera_z", -500, 1000).onChange(() => {
  //   this.new = this.light1.position.set(
  //     guiObj.Camera_x,
  //     guiObj.Camera_y,
  //     guiObj.Camera_z
  //   );
  //   this.light1.position.add(this.new);
  //   scene.add(this.light1);
  // });
  // folder.add(guiObj, "alert");
  // folder.open();
}; //


var objModel =
/*#__PURE__*/
function (_load) {
  _inherits(objModel, _load);

  function objModel() {
    var _this;

    _classCallCheck(this, objModel);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(objModel).call(this)); //gltf

    var GLoader = new _GLTFLoader.GLTFLoader(); //３Dモデル表示

    var GLB = require("../assets/images/RollSecond.glb");

    var GLB2 = require("../assets/images/stThaad.glb");

    var GLB3 = require("../assets/images/tamaSecond.glb");

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
    var texture = texLoader.load("../assets/images/q.jpg");
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

    var text = texLoader.load("../assets/images/txt.png");
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

    var title = texLoader.load("../assets/images/coolTextA.png");
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

    var texture2 = texLoader.load("../assets/images/w.jpg");
    var planeGeometry2 = new THREE.PlaneGeometry(4, 2);
    var planeMaterial2 = new THREE.MeshBasicMaterial({
      map: texture2,
      transparent: true,
      opacity: 0.7
    });
    var planeMesh2 = new THREE.Mesh(planeGeometry2, planeMaterial2);
    planeMesh2.rotation.y = 90 / 180 * Math.PI;
    planeMesh2.position.z = textPositionZ;
    planeMesh2.position.y = -2.5 + textPositionY;
    planeMesh2.position.x = textPositionX;
    scene.add(planeMesh2); // テキスト２

    var text2 = texLoader.load("../assets/images/text.png");
    var txtGeometry2 = new THREE.PlaneGeometry(3, 0.6);
    var txtMaterial2 = new THREE.MeshBasicMaterial({
      map: text2,
      transparent: true,
      opacity: 0.8
    });
    var txtMesh2 = new THREE.Mesh(txtGeometry2, txtMaterial2);
    txtMesh2.rotation.y = 90 / 180 * Math.PI;
    txtMesh2.position.z = textPositionZ;
    txtMesh2.position.y = -2.88 + textPositionY;
    txtMesh2.position.x = textPositionX + 1;
    scene.add(txtMesh2); // タイトル2

    var title2 = texLoader.load("../assets/images/coolTextW.png");
    var title2Geometry = new THREE.PlaneGeometry(1.5, 0.4);
    var title2Material = new THREE.MeshBasicMaterial({
      map: title2,
      transparent: true,
      opacity: 0.9
    });
    var title2Mesh = new THREE.Mesh(title2Geometry, title2Material);
    title2Mesh.rotation.y = 90 / 180 * Math.PI;
    title2Mesh.position.z = textPositionZ + 0.8;
    title2Mesh.position.y = -2.1 + textPositionY;
    title2Mesh.position.x = textPositionX + 1;
    scene.add(title2Mesh); // タイトル3

    var title3 = texLoader.load("../assets/images/coolTextL.png");
    var title3Geometry = new THREE.PlaneGeometry(1.5, 0.4);
    var title3Material = new THREE.MeshBasicMaterial({
      map: title3,
      transparent: true,
      opacity: 0.9
    });
    var title3Mesh = new THREE.Mesh(title3Geometry, title3Material);
    title3Mesh.rotation.y = 90 / 180 * Math.PI;
    title3Mesh.position.z = textPositionZ + 0.8;
    title3Mesh.position.y = -4.5 + textPositionY;
    title3Mesh.position.x = textPositionX + 1;
    scene.add(title3Mesh); // リンク背景

    var textureTable = texLoader.load("../assets/images/ame.jpg");
    var planeGeometryTable = new THREE.PlaneGeometry(4, 3);
    var planeMaterialTable = new THREE.MeshBasicMaterial({
      map: textureTable,
      transparent: true,
      opacity: 0.9
    });
    var planeMeshTable = new THREE.Mesh(planeGeometryTable, planeMaterialTable);
    planeMeshTable.rotation.y = 90 / 180 * Math.PI;
    planeMeshTable.position.z = textPositionZ;
    planeMeshTable.position.y = -5.5 + textPositionY;
    planeMeshTable.position.x = textPositionX;
    scene.add(planeMeshTable); //youTube

    var youTube = texLoader.load("../assets/images/l1.png");
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

    var inst = texLoader.load("../assets/images/l4.png");
    var instGeometry = new THREE.PlaneGeometry(1.5, 0.4);
    var instMaterial = new THREE.MeshBasicMaterial({
      map: inst,
      transparent: true,
      opacity: 0.9
    });
    _this.instMesh = new THREE.Mesh(instGeometry, instMaterial);
    _this.instMesh.name = "instMesh";
    _this.instMesh.rotation.y = 90 / 180 * Math.PI;
    _this.instMesh.position.z = textPositionZ;
    _this.instMesh.position.y = -5.5 + textPositionY;
    _this.instMesh.position.x = textPositionX + 1;
    scene.add(_this.instMesh); //twe

    var twe = texLoader.load("../assets/images/l3.png");
    var tweGeometry = new THREE.PlaneGeometry(1.5, 0.4);
    var tweMaterial = new THREE.MeshBasicMaterial({
      map: twe,
      transparent: true,
      opacity: 0.9
    });
    _this.tweMesh = new THREE.Mesh(tweGeometry, tweMaterial);
    _this.tweMesh.name = "tweMesh";
    _this.tweMesh.rotation.y = 90 / 180 * Math.PI;
    _this.tweMesh.position.z = textPositionZ;
    _this.tweMesh.position.y = -6 + textPositionY;
    _this.tweMesh.position.x = textPositionX + 1;
    scene.add(_this.tweMesh); //git

    var git = texLoader.load("../assets/images/l2.png");
    var gitGeometry = new THREE.PlaneGeometry(1.5, 0.4);
    var gitMaterial = new THREE.MeshBasicMaterial({
      map: git,
      transparent: true,
      opacity: 0.9
    });
    _this.gitMesh = new THREE.Mesh(gitGeometry, gitMaterial);
    _this.gitMesh.name = "gitMesh";
    _this.gitMesh.rotation.y = 90 / 180 * Math.PI;
    _this.gitMesh.position.z = textPositionZ;
    _this.gitMesh.position.y = -6.5 + textPositionY;
    _this.gitMesh.position.x = textPositionX + 1;
    scene.add(_this.gitMesh); // タイトル4

    var title4 = texLoader.load("../assets/images/coolTextC.png");
    var title4Geometry = new THREE.PlaneGeometry(1.5, 0.4);
    var title4Material = new THREE.MeshBasicMaterial({
      map: title4,
      transparent: true,
      opacity: 0.9
    });
    var title4Mesh = new THREE.Mesh(title4Geometry, title4Material);
    title4Mesh.rotation.y = 90 / 180 * Math.PI;
    title4Mesh.position.z = textPositionZ;
    title4Mesh.position.y = -8.5 + textPositionY;
    title4Mesh.position.x = textPositionX + 1;
    scene.add(title4Mesh); // 背景8

    var texture8 = texLoader.load("../assets/images/yugo.jpg");
    var planeGeometry8 = new THREE.PlaneGeometry(4, 2);
    var planeMaterial8 = new THREE.MeshBasicMaterial({
      map: texture8,
      transparent: true,
      opacity: 0.9
    });
    var planeMesh8 = new THREE.Mesh(planeGeometry8, planeMaterial8);
    planeMesh8.rotation.y = 90 / 180 * Math.PI;
    planeMesh8.position.z = textPositionZ;
    planeMesh8.position.y = -8.5 + textPositionY;
    planeMesh8.position.x = textPositionX;
    scene.add(planeMesh8); //ローダーで画像読み込み

    var urls = [//画像配置決まってる
    "../assets/images/posx.jpg", "../assets/images/negx.jpg", "../assets/images/posy.jpg", "../assets/images/negy.jpg", "../assets/images/posz.jpg", "../assets/images/negz.jpg"];
    var loader = new THREE.CubeTextureLoader();
    var cubeTexture = loader.load(urls);
    cubeTexture.mapping = THREE.CubeRefractionMapping;
    _this.diamMaterial = new THREE.MeshLambertMaterial({
      color: 0xf0f0ff,
      envMap: cubeTexture,
      refractionRatio: 0.8,
      //屈折
      opacity: 0.8,
      //不透明度で反射具合を調整
      transparent: true //透明を有効に

    });
    _this.diamMaterial2 = new THREE.MeshLambertMaterial({
      color: 0xcccccc,
      envMap: cubeTexture,
      //反射マッピングのcubeCameraで作成した環境マッピングを適用
      reflectivity: 1,
      //反射率
      opacity: 0.6,
      //不透明度で反射具合を調整
      transparent: true //透明を有効に

    });

    var GLB4 = require("../assets/images/diamond.glb");

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
    }); //プロセシングにthis.rendererを置き換える神々しくなる

    _this.composer = new _postprocessing.EffectComposer(_this.renderer);

    _this.composer.addPass(new _postprocessing.RenderPass(scene, _this.camera));

    _this.composer.addPass(new _postprocessing.EffectPass(_this.camera, new _postprocessing.BloomEffect())); //CSSRendererを使ったURL表示
    // this.cssRenderer = new CSS3DRenderer();
    // this.cssRenderer.setSize(window.innerWidth, window.innerHeight);
    // document
    //   .getElementById("objLoader")
    //   .appendChild(this.cssRenderer.domElement);
    // this.element = document.createElement("#iframe");
    // this.element.src = "https://www.youtube.com/embed/tRdY4s_2D88";
    // this.element.style.width = "300px";
    // this.element.style.height = "400px";
    // this.cssObject = new CSS3DObject(this.element);
    // CssScene.add(this.cssObject);
    //GUI page
    // function guiCtrl() {
    //   this.p_x = textPositionX;
    //   this.p_y = textPositionY;
    //   this.p_z = textPositionZ;
    //   this.w = 0.9;
    //   this.h = 1;
    //   this.r = 0;
    // }
    // const gui = new GUI();
    // let folder = gui.addFolder("Folder");
    // let guiObj = new guiCtrl();
    // folder.add(guiObj, "p_x", -100, 100).onChange(() => {
    //   planeMeshCard4.position.set(guiObj.p_x, guiObj.p_y, guiObj.p_z);
    //   // planeMesh2.position.set(guiObj.p_x, guiObj.p_y, guiObj.p_z);
    //   // txtMesh.position.set(guiObj.p_x, guiObj.p_y, guiObj.p_z);
    //   // txtMesh2.position.set(guiObj.p_x, guiObj.p_y, guiObj.p_z);
    //   // planeGeometry3 = new THREE.PlaneGeometry(
    //   //   window.innerWidth / guiObj.w,
    //   //   window.innerHeight / guiObj.h
    //   // );
    // });
    // folder.add(guiObj, "p_y", -100, 100).onChange(() => {
    //   planeMeshCard4.position.set(guiObj.p_x, guiObj.p_y, guiObj.p_z);
    //   // planeMesh2.position.set(guiObj.p_x, guiObj.p_y, guiObj.p_z);
    //   // txtMesh.position.set(guiObj.p_x, guiObj.p_y, guiObj.p_z);
    //   // txtMesh2.position.set(guiObj.p_x, guiObj.p_y, guiObj.p_z);
    //   // planeGeometry3 = new THREE.PlaneGeometry(
    //   //   window.innerWidth / guiObj.w,
    //   //   window.innerHeight / guiObj.h
    //   // );
    // });
    // folder.add(guiObj, "p_z", -100.0, 100.0).onChange(() => {
    //   planeMeshCard4.position.set(guiObj.p_x, guiObj.p_y, guiObj.p_z);
    // planeMesh2.position.set(guiObj.p_x, guiObj.p_y, guiObj.p_z);
    // txtMesh.position.set(guiObj.p_x, guiObj.p_y, guiObj.p_z);
    // txtMesh2.position.set(guiObj.p_x, guiObj.p_y, guiObj.p_z);
    // planeGeometry3 = new THREE.PlaneGeometry(
    //   window.innerWidth / guiObj.w,
    //   window.innerHeight / guiObj.h
    // );
    // });
    // folder.add(guiObj, "w", 0, 2).onChange(() => {
    //   // planeMeshCard4.position.set(guiObj.p_x, guiObj.p_y, guiObj.p_z);
    //   planeMeshCard4.geometry.dispose();
    //   planeMeshCard4.geometry = new THREE.PlaneGeometry(guiObj.w, guiObj.h);
    // });
    // folder.add(guiObj, "h", 0, 2).onChange(() => {
    //   // planeMeshCard4.position.set(guiObj.p_x, guiObj.p_y, guiObj.p_z);
    //   planeMeshCard4.geometry.dispose();
    //   planeMeshCard4.geometry = new THREE.PlaneGeometry(guiObj.w, guiObj.h);
    // });
    // folder.add(guiObj, "r", -10.0, 10.0).onChange(() => {
    //   planeMeshCard4.rotation.x = guiObj.r;
    // });
    // // GUIパラメータ
    // function guiCtrl() {
    //   this.size_r = 0.0;
    //   this.size_t = 0.0;
    //   this.p_x = 0;
    //   this.p_y = 0;
    //   this.p_z = 0;
    //   this.op = 1;
    //   this.color = "#c2dc94";
    // }
    // const gui = new GUI();
    // let folder = gui.addFolder("Folder");
    // let guiObj = new guiCtrl();
    // folder.add(guiObj, "size_r", 0.0, 5.0).onChange(() => {
    //   this.torus.scale.x = guiObj.size_r;
    //   // this.torus.geometry.dispose();
    //   // this.torus.geometry = new THREE.TorusGeometry(
    //   //   guiObj.size_r,
    //   //   guiObj.size_t,
    //   //   16,
    //   //   100
    //   // );
    // });
    // folder.add(guiObj, "size_t", -1, 5.0).onChange(() => {
    //   this.torus.scale.y = guiObj.size_t;
    //   // this.torus.geometry.dispose();
    //   // this.torus.geometry = new THREE.TorusGeometry(
    //   //   guiObj.size_r,
    //   //   guiObj.size_t,
    //   //   16,
    //   //   100
    //   // );
    // });
    // folder.add(guiObj, "p_x", -10, 10).onChange(() => {
    //   this.torus.position.set(guiObj.p_x, guiObj.p_y, guiObj.p_z);
    // });
    // folder.add(guiObj, "p_y", -10, 10).onChange(() => {
    //   this.torus.position.set(guiObj.p_x, guiObj.p_y, guiObj.p_z);
    // });
    // folder.add(guiObj, "p_z", -50.0, 50.0).onChange(() => {
    //   this.torus.position.set(guiObj.p_x, guiObj.p_y, guiObj.p_z);
    // });
    // folder.add(guiObj, "op", 0, 1).onChange(() => {
    //   this.torus.material.dispose();
    //   this.torus.material = new THREE.MeshBasicMaterial({
    //     color: guiObj.color,
    //     transparent: true,
    //     opacity: guiObj.op,
    //   });
    // });
    // folder.addColor(guiObj, "color").onChange(() => {
    //   this.torus.material.dispose();
    //   this.torus.material = new THREE.MeshBasicMaterial({
    //     color: guiObj.color,
    //     transparent: true,
    //     opacity: guiObj.op,
    //   });
    // });


    return _this;
  }

  return objModel;
}(load);