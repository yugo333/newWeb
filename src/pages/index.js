import "./style.scss";
import * as THREE from "three";
import * as controls from "three-orbit-controls";
import { GUI } from "dat.gui";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
// import model from "../assets/images/gunRoll.obj";
// import tex from "../assets/images/gunRoll.mtl";
import { Text } from "./_text";

let scene = new THREE.Scene();
window.addEventListener("DOMContentLoaded", () => {
  // モバイルのスクロール停止
  document.addEventListener(
    "touchmove",
    function (e) {
      e.preventDefault();
    },
    { passive: false }
  );
  //hoverイベント
  const item = document.querySelector("#container");
  let onmouseenter = false;
  item.addEventListener("mouseover", () => {
    onmouseenter = true;
  });

  // clickイベント
  const about = document.querySelector("#about");
  let hasRolling = false;
  let hasMoving = false;
  about.addEventListener("click", () => {
    hasRolling = true;
    hasMoving = true;
    item.classList.add("animate__animated");
    item.classList.add("animate__lightSpeedOutRight");
  });

  let loader = new objModel();
  // クロックはラジアンと同じ効力をもたらす// let theta = clock.getElapsedTime(); loader.camera.position.x = 5 * Math.sin(theta);
  // const clock = new THREE.Clock();
  // console.log(loader);
  let hasBoolPos = true;
  let mouseCount = 0;
  let nextMoveCount = 0;
  let nextMoveCount2 = 0;
  let hasMoveCamera = false;
  let timeoutId;
  let hasShot = false;
  let hasRollingCamera = false;
  let orbitSpin = 0;
  let hasStopLight = false;
  let destroy = false;
  let changePage = false;
  let resetAnimation = false;
  let cameraPositionDownY = 0;

  function render() {
    // モデル変数
    let roll = loader.toy;
    let stick = loader.st;
    let bullet = loader.tm;
    // click時camera,model動かす
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
      }
      // カメラ画角調整
      if (loader.camera.fov > 20) {
        loader.camera.fov -= 0.4;
        loader.camera.updateProjectionMatrix();
      } else if (hasRolling == false && loader.camera.fov <= 30) {
        // rollの回転が終了し画角調整が終わり次第cameraをz軸方向に動かす
        hasMoveCamera = true;
      }
    }
    if (hasRolling) {
      onmouseenter = false;
      // toy回転戻す
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
        timeoutId = setTimeout(() => {
          hasShot = true;
        }, 300);
      }
      // カメラ発射追っかけで弾発射
      if (hasShot) {
        if (loader.camera.position.z > -30) {
          loader.camera.position.z -= 0.4;
          bullet.position.z -= 0.42;
        } else {
          if (bullet.position.z > -37) {
            bullet.position.z -= 0.2;
            //カメラ(オービットにて)のターゲットを弾にする
            loader.Controls.target.set(0, 0, bullet.position.z + 0.5);
            loader.Controls.update();
            //ここで弾と同時に風を少し表示させる
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
        orbitSpin++;
        // オービットでカメラ回転
        if (destroy == false) {
          loader.Controls.autoRotate = true;
          loader.camera.position.y = 2;
        }
        //カメラ回転スピード調整、その後移動ブーリアン
        if (orbitSpin < 50) {
          loader.Controls.autoRotateSpeed = 50;
        } else if (orbitSpin > 50 && orbitSpin < 150) {
          loader.Controls.autoRotateSpeed = 5;
        } else {
          loader.Controls.autoRotateSpeed = 60;
          timeoutId = setTimeout(() => {
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
          bullet.position.z -= 0.4;
          // ネスト深いが、段階的にテキストモデルを破壊してるだけ
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
                                  resetAnimation = true;
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
    }
    // リセット処理 初期状態に戻す
    if (resetAnimation) {
    }

    // アニメーション後のページ表示
    if (changePage) {
      if (loader.camera.position.y >= -7) {
        cameraPositionDownY -= 0.05;
        // カメラの向く方向
        loader.camera.position.y = cameraPositionDownY;
        loader.Controls.target.y = cameraPositionDownY;
        loader.Controls.update();
      }
    }

    // hover時の回転処理
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
    }

    // ライトの動き
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
    }

    // れんだりんぐ
    loader.renderer.render(scene, loader.camera);
    requestAnimationFrame(render);
  }
  render();
});

class load {
  constructor() {
    this.OrbitControls = controls(THREE);

    scene.background = new THREE.Color(0x000000);

    this.camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      1,
      10000
    );
    this.camera.rotation.y = (45 / 180) * Math.IP;
    this.camera.position.x = 0;
    this.camera.position.y = 0;
    this.camera.position.z = 3;

    this.hiLight = new THREE.AmbientLight(0x808080, 10);
    scene.add(this.hiLight);

    this.light1 = new THREE.PointLight(0xc4c4c4, 70);
    this.light1.position.set(0, 36, 135);
    // this.light1.target =toy
    scene.add(this.light1);

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById("objLoader").appendChild(this.renderer.domElement);

    this.Controls = new this.OrbitControls(
      this.camera,
      this.renderer.domElement
    );

    // // GUIパラメータ
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
  }
}

//

class objModel extends load {
  constructor() {
    super();
    //gltf
    let GLoader = new GLTFLoader(); //３Dモデル表示
    const GLB = require("../assets/images/RollSecond.glb");
    const GLB2 = require("../assets/images/stThaad.glb");
    const GLB3 = require("../assets/images/tamaSecond.glb");
    GLoader.load(GLB, (gltf) => {
      this.toy = gltf.scene;
      this.toy.scale.set(2, 2, 2);
      // toy.scale.set(200, 200, 200); //toyのサイズ
      this.toy.position.z = -2.5;
      this.toy.position.x = -1.2;
      // toy.rotation.y = (180 / 180) * Math.PI;
      this.toy.rotation.y = (180 / 180) * Math.PI;
      scene.add(this.toy);
    });
    GLoader.load(GLB2, (gltf) => {
      this.st = gltf.scene;
      this.st.scale.set(2, 2, 2);
      this.st.position.z = -2.5;
      this.st.position.x = -1.2;
      this.st.rotation.y = (180 / 180) * Math.PI;
      scene.add(this.st);
    });
    GLoader.load(GLB3, (gltf) => {
      this.tm = gltf.scene;
      this.tm.scale.set(2, 2, 2);
      this.tm.position.z = -2.5;
      this.tm.position.x = -1.2;
      this.tm.rotation.y = (180 / 180) * Math.PI;
      scene.add(this.tm);
    });
    //風のメッシュ
    let airGeometry = new THREE.TorusGeometry(0.3, 0.05, 16, 100);
    let airMaterial = new THREE.MeshBasicMaterial({
      color: 0x78c4d9,
      transparent: true,
      opacity: 0.0,
    });
    this.torus = new THREE.Mesh(airGeometry, airMaterial);
    this.torus.position.z = -37.2;
    this.torus.scale.x = 1;
    scene.add(this.torus);

    // テキストモデル
    this.text = new Text();
    this.text.meshArray.forEach((mesh) => {
      scene.add(mesh);
    });

    //ページプレーンモデル
    // 背景１
    const texLoader = new THREE.TextureLoader();
    const texture = texLoader.load("../assets/images/q.jpg");
    let planeGeometry = new THREE.PlaneGeometry(
      window.innerWidth / 400,
      window.innerHeight / 500
    );
    let planeMaterial = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      opacity: 0.7,
    });
    const planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
    scene.add(planeMesh);

    // テキスト
    const text = texLoader.load("../assets/images/txt.png");
    let txtGeometry = new THREE.PlaneGeometry(
      window.innerWidth / 600,
      window.innerHeight / 1600
    );
    let txtMaterial = new THREE.MeshBasicMaterial({
      map: text,
      transparent: true,
      opacity: 0.8,
    });
    const txtMesh = new THREE.Mesh(txtGeometry, txtMaterial);
    txtMesh.position.z = 1;
    txtMesh.position.y = -0.38;
    scene.add(txtMesh);

    // 背景２
    const texture2 = texLoader.load("../assets/images/w.jpg");
    let planeGeometry2 = new THREE.PlaneGeometry(
      window.innerWidth / 400,
      window.innerHeight / 500
    );
    let planeMaterial2 = new THREE.MeshBasicMaterial({
      map: texture2,
      transparent: true,
      opacity: 0.7,
    });
    const planeMesh2 = new THREE.Mesh(planeGeometry2, planeMaterial2);
    planeMesh2.position.y = -3;
    scene.add(planeMesh2);

    // テキスト２
    const text2 = texLoader.load("../assets/images/text.png");
    let txtGeometry2 = new THREE.PlaneGeometry(
      window.innerWidth / 600,
      window.innerHeight / 1600
    );
    let txtMaterial2 = new THREE.MeshBasicMaterial({
      map: text2,
      transparent: true,
      opacity: 0.8,
    });
    const txtMesh2 = new THREE.Mesh(txtGeometry2, txtMaterial2);
    txtMesh2.position.z = 1;
    txtMesh2.position.y = -3.38;
    scene.add(txtMesh2);
    //

    //ローダーで画像読み込み
    let urls = [
      //画像配置決まってる
      "../assets/images/posx.jpg",
      "../assets/images/negx.jpg",
      "../assets/images/posy.jpg",
      "../assets/images/negy.jpg",
      "../assets/images/posz.jpg",
      "../assets/images/negz.jpg",
    ];
    let loader = new THREE.CubeTextureLoader();
    let cubeTexture = loader.load(urls);
    cubeTexture.mapping = THREE.CubeRefractionMapping;

    this.diamMaterial = new THREE.MeshBasicMaterial({
      color: 0xf0f0ff,
      envMap: cubeTexture,
      refractionRatio: 0.75, //屈折
      opacity: 0.5, //不透明度で反射具合を調整
      transparent: true, //透明を有効に
    });
    this.diamMaterial2 = new THREE.MeshBasicMaterial({
      color: 0xcccccc,
      envMap: cubeTexture, //反射マッピングのcubeCameraで作成した環境マッピングを適用
      reflectivity: 1, //反射率
      opacity: 0.5, //不透明度で反射具合を調整
      transparent: true, //透明を有効に
    });

    const GLB4 = require("../assets/images/dia.glb");
    GLoader.load(GLB4, (gltf) => {
      this.dia = gltf.scene;
      this.dia2 = this.dia.clone();

      this.dia.traverse((o) => {
        o.material = this.diamMaterial;
      });
      this.dia2.traverse((o) => {
        o.material = this.diamMaterial2;
      });

      this.dia.scale.set(0.15, 0.15, 0.15);
      this.dia2.scale.set(0.15, 0.15, 0.15);
      // dia.scale.set(200, 200, 200); //diaのサイズ
      this.dia.position.z = 0.5;
      this.dia2.position.z = 0.5;
      this.dia.position.y = -0.3;
      this.dia2.position.y = -0.3;
      scene.add(this.dia);
      scene.add(this.dia2);
    });

    // this.spotLightHelper1 = new THREE.AmbientLightHelper(this.a, 0xff0000);
    // scene.add(this.spotLightHelper1);

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
  }
}
