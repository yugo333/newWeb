"use strict";
import "./style.scss";
import * as THREE from "three";
import * as controls from "three-orbit-controls";
// import { GUI } from "dat.gui";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Text } from "./_text";

import {
  BloomEffect,
  EffectComposer,
  EffectPass,
  RenderPass,
} from "postprocessing";

import { Shader } from "./shader";
import textJson from "three/examples/fonts/helvetiker_regular.typeface.json";
import { SoftParticlesShader } from "./shaders/_SoftParticlesShader";

// ローディング時の処理のタグ
const firstLoading = document.getElementById("loading");
const header = document.getElementById("header");
const mainSide = document.getElementById("mainSide");
// window（携帯）横にさせる
const wsp = document.getElementById("windowSizePic");
let windowWidth = false;
//サイドメニューの親
const item = document.querySelector("#container");

let scene = new THREE.Scene();

window.addEventListener("DOMContentLoaded", () => {
  // スクロールをゼロにしとく
  window.scrollTo(0, 0);
  // メインの関数
  const int = new into();
  int.onload = setTimeout(() => {
    // ローティング画面
    // firstLoading.style.zIndex = 0;
    firstLoading.remove();
    mainSide.style.opacity = 1;
    header.style.opacity = 1;
    //canvasアニメ
    windowWidth = true;
    //sideイン
    item.classList.add("animate__animated");
    item.classList.add("animate__lightSpeedInRight");
  }, 5000);
});

function into() {
  // スクロールをゼロにしとく
  scrollTo(0, 0);
  // モバイルのスクロール停止
  let mainScroll = document.querySelector("body");

  setTimeout(() => {
    mainScroll.style.overflow = "hidden";
  }, 1000);
  //モバイルhoverイベント
  document.addEventListener(
    "touchmove",
    function (e) {
      e.preventDefault();
    },
    { passive: false }
  );
  //hoverイベント 初期画面
  let onmouseenter = false;
  item.addEventListener("mouseover", () => {
    onmouseenter = true;
  });

  // clickイベント 初期画面
  const about = document.querySelector("#about");
  const works = document.querySelector("#works");
  const link = document.querySelector("#link");
  const contact = document.querySelector("#contact");
  let hasRolling = false;
  let hasMoving = false;
  let pageScrollPosition = 0;
  let hasScrollRock = true;
  about.addEventListener("click", () => {
    hasRolling = true;
    hasMoving = true;
    item.classList.add("animate__animated");
    item.classList.add("animate__lightSpeedOutRight");
    pageScrollPosition = 0;
    hasScrollRock = false;
  });
  works.addEventListener("click", () => {
    hasRolling = true;
    hasMoving = true;
    item.classList.add("animate__animated");
    item.classList.add("animate__lightSpeedOutRight");
    //245
    pageScrollPosition = 245;
    hasScrollRock = false;
  });
  link.addEventListener("click", () => {
    hasRolling = true;
    hasMoving = true;
    item.classList.add("animate__animated");
    item.classList.add("animate__lightSpeedOutRight");
    //510
    pageScrollPosition = 510;
    hasScrollRock = false;
  });
  contact.addEventListener("click", () => {
    hasRolling = true;
    hasMoving = true;
    item.classList.add("animate__animated");
    item.classList.add("animate__lightSpeedOutRight");
    //845
    pageScrollPosition = 845;
    hasScrollRock = false;
  });

  // ホーム戻るclickイベント
  let hasGoBackHome = false;
  const goHome = document.querySelector("#home");
  const goHomeLog = document.querySelector("#logHome");
  goHome.addEventListener("click", () => {
    hasGoBackHome = true;
  });
  goHomeLog.addEventListener("click", () => {
    hasGoBackHome = true;
  });

  // 一番重要なやつ
  let loader = new objModel();

  // hoverイベント ページ画面
  // canvas 要素の参照を取得する
  let canvas = document.querySelector("#objLoader canvas");
  // マウス座標管理用のベクトルを作成
  const mouse = new THREE.Vector2();
  // マウスイベントを登録
  canvas.addEventListener("mousemove", (event) => {
    const element = event.currentTarget;
    // canvas要素上のXY座標
    const x = event.clientX - element.offsetLeft;
    const y = event.clientY - element.offsetTop;
    // canvas要素の幅・高さ
    const w = element.offsetWidth;
    const h = element.offsetHeight;
    // -1〜+1の範囲で現在のマウス座標を登録する
    mouse.x = (x / w) * 2 - 1;
    mouse.y = -(y / h) * 2 + 1;
    // shaderGLSLのマウスイベント
    loader.uniforms.mouse.value.x = event.pageX;
    loader.uniforms.mouse.value.y = event.pageY;
  });
  // レイキャストを作成
  const rayCaster = new THREE.Raycaster();

  // clickイベント ページ画面
  // マウス座標管理用のベクトルを作成
  const mouseClick = new THREE.Vector2();
  const rayCasterClick = rayCaster;
  // マウスイベントを登録
  canvas.addEventListener("click", (event) => {
    const element = event.currentTarget;
    // canvas要素上のXY座標
    const x = event.clientX - element.offsetLeft;
    const y = event.clientY - element.offsetTop;
    // canvas要素の幅・高さ
    const w = element.offsetWidth;
    const h = element.offsetHeight;
    // -1〜+1の範囲で現在のマウス座標を登録する
    mouseClick.x = (x / w) * 2 - 1;
    mouseClick.y = -(y / h) * 2 + 1;
    rayCasterClick.setFromCamera(mouseClick, loader.camera);
    // その光線とぶつかったオブジェクトを得る
    const intersectsClick = rayCasterClick.intersectObjects(scene.children);
    if (intersectsClick.length > 0) {
      if (intersectsClick[0].object.name == "youTubeMesh") {
        window.open("https://www.youtube.com/watch?v=rGspsil3dn0", "_blank");
      }
      if (intersectsClick[0].object.name == "instMesh") {
        window.open("https://www.instagram.com/___u5____/", "_blank");
      }
      if (intersectsClick[0].object.name == "tweMesh") {
        window.open("https://twitter.com/u5musicxit", "_blank");
      }
      if (intersectsClick[0].object.name == "gitMesh") {
        window.open("https://github.com/yugo333", "_blank");
      }
      if (intersectsClick[0].object.name == "contact") {
        location.href =
          "mailto:" +
          "soundyg0312@gmail.com" +
          "?subject=" +
          "お問い合わせホーム" +
          "&body=" +
          "内容を記載してください";
      }
    }
  });

  // レスポンシブ
  function canvas_resize() {
    // サイズを取得
    const width = window.innerWidth;
    const height = window.innerHeight;
    // レンダラーのサイズを調整する
    loader.renderer.setPixelRatio(window.devicePixelRatio);
    loader.renderer.setSize(width, height);
    // カメラのアスペクト比を正す
    loader.camera.aspect = width / height;
    loader.camera.updateProjectionMatrix();
    // shaderGLSLのPXサイズ
    loader.uniforms.resolution.value.x = loader.renderer.domElement.width / 2;
    loader.uniforms.resolution.value.y = loader.renderer.domElement.height / 2;
  }
  window.addEventListener("resize", canvas_resize, false);
  canvas_resize();

  // オーディオ
  const Btn = document.querySelector("#icon");
  let sound;
  let uniformsAudio;
  let analyser;
  let hasFirstOn = true;
  Btn.addEventListener("click", () => {
    if (hasFirstOn) {
      //オーディオ
      const listener = new THREE.AudioListener();
      loader.camera.add(listener);
      let fftSize = 128;
      // create a global audio source
      sound = new THREE.Audio(listener);
      // load a sound and set it as the Audio object's buffer
      const mp3 = require("../assets/images/The-sound-of-rain.mp3");
      const audioLoader = new THREE.AudioLoader();
      audioLoader.load(mp3, (buffer) => {
        sound.setBuffer(buffer);
        sound.setLoop(true);
        sound.setVolume(0.3);
        sound.play();
      });
      analyser = new THREE.AudioAnalyser(sound, fftSize);

      uniformsAudio = {
        tAudioData: {
          value: new THREE.DataTexture(
            analyser.data,
            fftSize / 2,
            1,
            THREE.LuminanceFormat
          ),
        },
      };
      // listener.play();
      hasFirstOn = false;
    } else {
      // ここで切り替え（上は一番最初にクリックしたとき、生成からplayする）
      if (sound.isPlaying) {
        // フェードアウトの処理がほしい //
        sound.stop();
      } else {
        // フェードインの処理がほしい //
        sound.play();
      }
    }
  });

  // クロックはラジアンと同じ効力をもたらす// let theta = clock.getElapsedTime(); loader.camera.position.x = 5 * Math.sin(theta);
  // const clock = new THREE.Clock();
  // console.log(loader);
  let hasBoolPos = true;
  let mouseCount = 0;
  let nextMoveCount = 0;
  let nextMoveCount2 = 0;
  let hasMoveCamera = false;
  let hasShot = false;
  let hasRollingCamera = false;
  let orbitSpin = 0;
  let hasStopLight = false;
  let destroy = false;
  let changePage = false;
  let resetAnimation = false;
  let cameraPositionDownY = 0;
  //スクロール
  let scrollPage = false;
  //オブジェクトのホバーイベント
  let hasObjHover = false;
  //初期画面雲
  let hasSmoke = false;

  function render() {
    if (windowWidth) {
      // 携帯でみたとき画面横にさせる表示(パワープレー)
      if (window.innerWidth < 560 && window.innerHeight < 560) {
        wsp.style.position = "fixed";
        wsp.style.zIndex = 9;
        wsp.style.top = 0;
        wsp.style.width = "100vw";
        wsp.style.height = "100vh";
        wsp.style.opacity = 1;
      }
      if (window.innerWidth < window.innerHeight) {
        wsp.style.position = "fixed";
        wsp.style.zIndex = 9;
        wsp.style.top = 0;
        wsp.style.width = "100vw";
        wsp.style.height = "100vh";
        wsp.style.opacity = 1;
      }
      if (window.innerWidth > window.innerHeight) {
        wsp.style.position = "fixed";
        wsp.style.zIndex = 0;
        wsp.style.top = 0;
        wsp.style.width = "1px";
        wsp.style.height = "1px";
        wsp.style.opacity = 0;
      }

      // ロード時に左側から現れる演出
      if (loader.plane.position.x < 41) {
        loader.plane.position.x += 0.05;
        loader.plane.position.z -= 0.01;
        if (loader.plane.position.x > 40.5) {
          hasSmoke = true;
        }
      }
      if (hasSmoke) {
        if (loader.plane.position.z > -1) {
          loader.plane.position.z -= 0.03;
        } else {
          hasSmoke = false;
        }
      }
    }

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
        setTimeout(() => {
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
          setTimeout(() => {
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

    // アニメーション後のページ表示
    if (changePage) {
      // ダイアの反射が強くなるためライト暗くする
      loader.light1.intensity = 3;
      loader.hiLight.intensity = 6;
      if (loader.camera.position.y >= -7) {
        cameraPositionDownY -= 0.1;
        // カメラの向く方向
        loader.camera.position.y = cameraPositionDownY;
        loader.Controls.target.y = cameraPositionDownY;
        loader.Controls.update();
        setTimeout(() => {
          scrollPage = true;
        }, 1000);
      }
      if (scrollPage) {
        //スクロール出来るようにしハイトも大きくする
        // モバイルだとなんか変になるので小ちゃくする
        if (window.innerWidth < 1000) {
          mainScroll.style.height = "1300px";
        } else if (window.innerWidth > 1000 && window.innerWidth < 1700) {
          mainScroll.style.height = "1800px";
        } else {
          mainScroll.style.height = "1900px";
        }
        mainScroll.style.overflowY = "auto";

        //カメラが動ききってからスクロールできるようにする
        let y = window.pageYOffset / 100;
        loader.camera.position.y = -y - 7;
        loader.Controls.target.y = -y - 7;
        loader.Controls.update();
        loader.dia.position.y = -7 - y;
        loader.dia2.position.y = -7 - y;
        //サイドメニューのボタンのいちに強制スクロール
        if (hasScrollRock === false) {
          window.scrollTo(0, pageScrollPosition);
          hasScrollRock = true;
        }
      }
      // ダイアの回転
      loader.dia.rotation.x += 0.01;
      loader.dia2.rotation.x += 0.01;
      loader.dia.rotation.y += 0.01;
      loader.dia2.rotation.y += 0.01;
      loader.dia.rotation.z += 0.01;
      loader.dia2.rotation.z += 0.01;
      // ホバー 処理
      hasObjHover = true;

      //ここのプレートは初期画面の写り込みの隠しとページ表示時のオパシティーの役割(glslをフワッと表示させる)
      loader.plane.position.set(-10, 0, -52.6);
      loader.plane.rotation.y = Math.PI / 2;
      if (loader.plane.material.opacity > 0) {
        loader.plane.material.opacity -= 0.01;
      }

      // glslをカメラのfarで表示させる
      loader.camera.far = 10000;
      loader.camera.updateProjectionMatrix();

      // アニメーション処理の停止のタイミングを遅らせる
      setTimeout(() => {
        // ここ不要なアニメーションを止める
        resetAnimation = true;
        // 3Dテキストも止る為再度、バラバラにしたのを直し回転させる
        for (let i = 0; i < 11; i++) {
          loader.text.meshArray[i].material.uniforms.amplitude.value = 0;
          loader.text.meshArray[i].rotation.y += 0.03;
        }
      }, 3000);
    }

    if (hasObjHover) {
      // hover時のレイキャスターにてオブジェクト取得
      // レイキャスト = マウス位置からまっすぐに伸びる光線ベクトルを生成
      rayCaster.setFromCamera(mouse, loader.camera);
      // その光線とぶつかったオブジェクトを得る
      const intersects = rayCaster.intersectObjects(scene.children);
      // console.log(intersects);
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
        if (intersects[0].object.name == "contact") {
          loader.title4Mesh.scale.x = 1.5;
        } else {
          loader.title4Mesh.scale.x = 1;
        }
      }
    }

    // リセット処理 初期状態に戻す
    if (resetAnimation) {
      //クリック時のBool(回転後のアニメーション)
      hasRolling = false;
      hasMoving = false;
      //hover時のBool（回転）
      onmouseenter = false;
      // 発射のアニメーションBool
      hasMoveCamera = false;
      hasShot = false;
      // 弾の周りのアニメーション
      hasRollingCamera = false;
      // ３Dテキスト破壊
      destroy = false;
      // 弾の位置を初期位置
      bullet.position.z = -2.5;
      bullet.position.x = -1.2;
      // 風も初期位置へ
      loader.torus.position.z = -37.2;
      loader.torus.scale.x = 1;

      resetAnimation = false;
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

    // オーディオ
    if (!hasFirstOn) {
      // audio設定
      let data = analyser.getFrequencyData();
      uniformsAudio.tAudioData.value.needsUpdate = true;

      let addSize = 0.2 + data[0] * 0.00025;
      let addSize2 = 0.2 + data[0] * 0.0025;

      //ダイア
      loader.dia.scale.set(addSize, addSize, addSize);
      loader.dia2.scale.set(addSize, addSize, addSize);
      // スカル
      const defaultSkull = 1;
      loader.skullBone.rotation.x = defaultSkull + addSize2;
      loader.skullBone2.rotation.x = defaultSkull + addSize2;
    }
    // 雲
    loader.smokeParticles.rotation.z += 0.0004;

    // shaderGLSLのタイム
    loader.uniforms.time.value += 0.05;

    // ホーム戻る
    if (hasGoBackHome) {
      //むしろリロード
      location.reload();
    }

    // れんだりんぐ
    // loader.renderer.render(scene, loader.camera);
    loader.composer.render();
    // 本来下記のメソットがこの関数の一番上にくる
    requestAnimationFrame(render);
  }
  render();
}

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

    // バックグラウンド shader GLSL
    this.shader = new Shader();
    this.uniforms = this.shader.uniforms();
    var geometryShader = new THREE.PlaneBufferGeometry(2, 2);

    var materialShader = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: document.getElementById("vertexShaderBG").textContent,
      fragmentShader: document.getElementById("fragmentShaderBG").textContent,
      depthTest: false,
      depthWrite: false,
      transparent: true,
      blending: THREE.AdditiveBlending,
    });
    var meshShader = new THREE.Mesh(geometryShader, materialShader);
    // ここが重要設定地道にするしかない
    meshShader.position.x = -220;
    meshShader.position.z = -100;
    scene.add(meshShader);

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.autoClear = false;
    this.renderer.setPixelRatio(window.devicePixelRatio);
    document.getElementById("objLoader").appendChild(this.renderer.domElement);

    this.Controls = new this.OrbitControls(
      this.camera,
      this.renderer.domElement
    );
    this.Controls.enableZoom = false;
    this.Controls.enablePan = false;
    this.Controls.enabled = false;
    this.Controls.update();
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
    let textPositionZ = -52.6;
    let textPositionX = 40;
    let textPositionY = -7;
    // w:1792 h:1009 MAC15
    // console.log(window.innerWidth, window.innerHeight);
    // 背景１
    const texLoader = new THREE.TextureLoader();
    const texture = texLoader.load("../assets/images/q.jpg");
    let planeGeometry = new THREE.PlaneGeometry(4, 2);
    let planeMaterial = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      opacity: 0.7,
    });
    this.planeMesh = new THREE.Mesh(planeGeometry, planeMaterial);
    this.planeMesh.rotation.y = (90 / 180) * Math.PI;
    this.planeMesh.position.z = textPositionZ;
    this.planeMesh.position.x = textPositionX;
    this.planeMesh.position.y = textPositionY;
    scene.add(this.planeMesh);

    // テキスト
    const text = texLoader.load("../assets/images/txt.png");
    let txtGeometry = new THREE.PlaneGeometry(3, 0.6);
    let txtMaterial = new THREE.MeshBasicMaterial({
      map: text,
      transparent: true,
      opacity: 0.8,
    });
    const txtMesh = new THREE.Mesh(txtGeometry, txtMaterial);
    txtMesh.rotation.y = (90 / 180) * Math.PI;
    txtMesh.position.z = textPositionZ;
    txtMesh.position.y = -0.38 + textPositionY;
    txtMesh.position.x = textPositionX + 1;
    scene.add(txtMesh);

    // タイトル
    const title = texLoader.load("../assets/images/coolTextA.png");
    let titleGeometry = new THREE.PlaneGeometry(1.5, 0.4);
    let titleMaterial = new THREE.MeshBasicMaterial({
      map: title,
      transparent: true,
      opacity: 0.9,
    });
    const titleMesh = new THREE.Mesh(titleGeometry, titleMaterial);
    titleMesh.rotation.y = (90 / 180) * Math.PI;
    titleMesh.position.z = textPositionZ + 0.8;
    titleMesh.position.y = 0.4 + textPositionY;
    titleMesh.position.x = textPositionX + 1;
    scene.add(titleMesh);

    // 背景２
    const texture2 = texLoader.load("../assets/images/w.jpg");
    let planeGeometry2 = new THREE.PlaneGeometry(4, 2);
    let planeMaterial2 = new THREE.MeshBasicMaterial({
      map: texture2,
      transparent: true,
      opacity: 0.7,
    });
    const planeMesh2 = new THREE.Mesh(planeGeometry2, planeMaterial2);
    planeMesh2.rotation.y = (90 / 180) * Math.PI;
    planeMesh2.position.z = textPositionZ;
    planeMesh2.position.y = -2.5 + textPositionY;
    planeMesh2.position.x = textPositionX;
    scene.add(planeMesh2);

    // テキスト２
    const text2 = texLoader.load("../assets/images/text.png");
    let txtGeometry2 = new THREE.PlaneGeometry(3, 0.6);
    let txtMaterial2 = new THREE.MeshBasicMaterial({
      map: text2,
      transparent: true,
      opacity: 0.8,
    });
    const txtMesh2 = new THREE.Mesh(txtGeometry2, txtMaterial2);
    txtMesh2.rotation.y = (90 / 180) * Math.PI;
    txtMesh2.position.z = textPositionZ;
    txtMesh2.position.y = -2.88 + textPositionY;
    txtMesh2.position.x = textPositionX + 1;
    scene.add(txtMesh2);

    // タイトル2
    const title2 = texLoader.load("../assets/images/coolTextW.png");
    let title2Geometry = new THREE.PlaneGeometry(1.5, 0.4);
    let title2Material = new THREE.MeshBasicMaterial({
      map: title2,
      transparent: true,
      opacity: 0.9,
    });
    const title2Mesh = new THREE.Mesh(title2Geometry, title2Material);
    title2Mesh.rotation.y = (90 / 180) * Math.PI;
    title2Mesh.position.z = textPositionZ + 0.8;
    title2Mesh.position.y = -2.1 + textPositionY;
    title2Mesh.position.x = textPositionX + 1;
    scene.add(title2Mesh);

    // タイトル3
    const title3 = texLoader.load("../assets/images/coolTextL.png");
    let title3Geometry = new THREE.PlaneGeometry(1.5, 0.4);
    let title3Material = new THREE.MeshBasicMaterial({
      map: title3,
      transparent: true,
      opacity: 0.9,
    });
    const title3Mesh = new THREE.Mesh(title3Geometry, title3Material);
    title3Mesh.rotation.y = (90 / 180) * Math.PI;
    title3Mesh.position.z = textPositionZ + 0.8;
    title3Mesh.position.y = -4.5 + textPositionY;
    title3Mesh.position.x = textPositionX + 1;
    scene.add(title3Mesh);

    // リンク背景
    const textureTable = texLoader.load("../assets/images/ame.jpg");
    let planeGeometryTable = new THREE.PlaneGeometry(4, 3);
    let planeMaterialTable = new THREE.MeshBasicMaterial({
      map: textureTable,
      transparent: true,
      opacity: 0.7,
    });
    const planeMeshTable = new THREE.Mesh(
      planeGeometryTable,
      planeMaterialTable
    );
    planeMeshTable.rotation.y = (90 / 180) * Math.PI;
    planeMeshTable.position.z = textPositionZ;
    planeMeshTable.position.y = -5.5 + textPositionY;
    planeMeshTable.position.x = textPositionX;
    scene.add(planeMeshTable);

    //youTube
    const youTube = texLoader.load("../assets/images/l1.png");
    let youTubeGeometry = new THREE.PlaneGeometry(1.5, 0.4);
    let youTubeMaterial = new THREE.MeshBasicMaterial({
      map: youTube,
      transparent: true,
      opacity: 0.9,
    });
    this.youTubeMesh = new THREE.Mesh(youTubeGeometry, youTubeMaterial);
    this.youTubeMesh.name = "youTubeMesh";
    this.youTubeMesh.rotation.y = (90 / 180) * Math.PI;
    this.youTubeMesh.position.z = textPositionZ;
    this.youTubeMesh.position.y = -5 + textPositionY;
    this.youTubeMesh.position.x = textPositionX + 1;
    scene.add(this.youTubeMesh);
    //inst
    const inst = texLoader.load("../assets/images/l4.png");
    let instGeometry = new THREE.PlaneGeometry(1.5, 0.4);
    let instMaterial = new THREE.MeshBasicMaterial({
      map: inst,
      transparent: true,
      opacity: 0.9,
    });
    this.instMesh = new THREE.Mesh(instGeometry, instMaterial);
    this.instMesh.name = "instMesh";
    this.instMesh.rotation.y = (90 / 180) * Math.PI;
    this.instMesh.position.z = textPositionZ;
    this.instMesh.position.y = -5.5 + textPositionY;
    this.instMesh.position.x = textPositionX + 1;
    scene.add(this.instMesh);
    //twe
    const twe = texLoader.load("../assets/images/l3.png");
    let tweGeometry = new THREE.PlaneGeometry(1.5, 0.4);
    let tweMaterial = new THREE.MeshBasicMaterial({
      map: twe,
      transparent: true,
      opacity: 0.9,
    });
    this.tweMesh = new THREE.Mesh(tweGeometry, tweMaterial);
    this.tweMesh.name = "tweMesh";
    this.tweMesh.rotation.y = (90 / 180) * Math.PI;
    this.tweMesh.position.z = textPositionZ;
    this.tweMesh.position.y = -6 + textPositionY;
    this.tweMesh.position.x = textPositionX + 1;
    scene.add(this.tweMesh);
    //git
    const git = texLoader.load("../assets/images/l2.png");
    let gitGeometry = new THREE.PlaneGeometry(1.5, 0.4);
    let gitMaterial = new THREE.MeshBasicMaterial({
      map: git,
      transparent: true,
      opacity: 0.9,
    });
    this.gitMesh = new THREE.Mesh(gitGeometry, gitMaterial);
    this.gitMesh.name = "gitMesh";
    this.gitMesh.rotation.y = (90 / 180) * Math.PI;
    this.gitMesh.position.z = textPositionZ;
    this.gitMesh.position.y = -6.5 + textPositionY;
    this.gitMesh.position.x = textPositionX + 1;
    scene.add(this.gitMesh);

    // タイトル4
    const title4 = texLoader.load("../assets/images/coolTextC.png");
    let title4Geometry = new THREE.PlaneGeometry(1.5, 0.4);
    let title4Material = new THREE.MeshBasicMaterial({
      map: title4,
      transparent: true,
      opacity: 0.9,
    });
    this.title4Mesh = new THREE.Mesh(title4Geometry, title4Material);
    this.title4Mesh.rotation.y = (90 / 180) * Math.PI;
    this.title4Mesh.position.z = textPositionZ;
    this.title4Mesh.position.y = -8.5 + textPositionY;
    this.title4Mesh.position.x = textPositionX + 1;
    this.title4Mesh.name = "contact";
    scene.add(this.title4Mesh);

    // 背景8
    const texture8 = texLoader.load("../assets/images/yugo.jpg");
    let planeGeometry8 = new THREE.PlaneGeometry(4, 2);
    let planeMaterial8 = new THREE.MeshBasicMaterial({
      map: texture8,
      transparent: true,
      opacity: 0.7,
    });
    const planeMesh8 = new THREE.Mesh(planeGeometry8, planeMaterial8);
    planeMesh8.rotation.y = (90 / 180) * Math.PI;
    planeMesh8.position.z = textPositionZ;
    planeMesh8.position.y = -8.5 + textPositionY;
    planeMesh8.position.x = textPositionX;
    scene.add(planeMesh8);

    // フッター的なやつ
    const profileText3D = new THREE.FontLoader().parse(textJson);
    const zTextGeometry = new THREE.TextGeometry(
      "U5 official MUSIC x IT 2020",
      {
        font: profileText3D,
        size: 0.05,
        height: 0.05,
        curveSegments: 3,
        bevelSize: 0.1,
      }
    );
    // テキストの中央を原点に合わせる
    zTextGeometry.center();
    this.fMesh = new THREE.Mesh(
      zTextGeometry,
      new THREE.MeshBasicMaterial({
        color: 0xffffff,
      })
    );
    this.fMesh.rotation.y = (90 / 180) * Math.PI;
    this.fMesh.position.z = textPositionZ;
    this.fMesh.position.y = -10 + textPositionY;
    this.fMesh.position.x = textPositionX;
    scene.add(this.fMesh);

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
    // cubeTexture.mapping = THREE.CubeRefractionMapping;

    //メインのダイヤ
    this.diamMaterial = new THREE.MeshLambertMaterial({
      color: 0xf0f0ff,
      envMap: cubeTexture,
      refractionRatio: 0.8, //屈折
      opacity: 0.8, //不透明度で反射具合を調整
      transparent: true, //透明を有効に
    });
    this.diamMaterial2 = new THREE.MeshLambertMaterial({
      color: 0xcccccc,
      envMap: cubeTexture, //反射マッピングのcubeCameraで作成した環境マッピングを適用
      reflectivity: 1, //反射率
      opacity: 0.6, //不透明度で反射具合を調整
      transparent: true, //透明を有効に
    });
    const GLB4 = require("../assets/images/diamond.glb");
    GLoader.load(GLB4, (gltf) => {
      this.dia = gltf.scene;
      this.dia2 = this.dia.clone();

      this.dia.traverse((o) => {
        o.material = this.diamMaterial;
      });
      this.dia2.traverse((o) => {
        o.material = this.diamMaterial2;
      });

      this.dia.scale.set(0.2, 0.2, 0.2);
      this.dia2.scale.set(0.2, 0.2, 0.2);
      // dia.scale.set(200, 200, 200); //diaのサイズ
      this.dia.position.z = textPositionZ;
      this.dia2.position.z = textPositionZ;
      this.dia.position.y = -0.1 + textPositionY;
      this.dia2.position.y = -0.1 + textPositionY;
      this.dia.position.x = textPositionX + 0.5;
      this.dia2.position.x = textPositionX + 0.5;
      scene.add(this.dia);
      scene.add(this.dia2);
    });

    //便利板
    const geometryPlane = new THREE.PlaneGeometry(80, 80, 32);
    const materialPlane = new THREE.MeshBasicMaterial({
      color: 0x000000,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 1,
    });
    this.plane = new THREE.Mesh(geometryPlane, materialPlane);
    this.plane.position.set(38, 0, 1);
    // this.plane.position.set(41, 0, 1);
    scene.add(this.plane);

    // skull
    const GLB5 = require("../assets/images/skullUp.glb");
    const GLB6 = require("../assets/images/skullDown.glb");
    GLoader.load(GLB5, (gltf) => {
      this.skull = gltf.scene;
      this.skullClone = this.skull.clone();
      this.skull.scale.set(0.6, 0.6, 0.6);
      this.skull.rotation.y = (120 / 180) * Math.PI;
      this.skull.position.z = textPositionZ + 1.3;
      this.skull.position.y = -9.3 + textPositionY;
      this.skull.position.x = textPositionX + 1;
      this.skullClone.scale.set(0.6, 0.6, 0.6);
      this.skullClone.rotation.y = (60 / 180) * Math.PI;
      this.skullClone.position.z = textPositionZ - 1.3;
      this.skullClone.position.y = -9.3 + textPositionY;
      this.skullClone.position.x = textPositionX + 1;
      scene.add(this.skull);
      scene.add(this.skullClone);
    });
    GLoader.load(GLB6, (gltf) => {
      this.skull2 = gltf.scene;
      this.skull2.scale.set(0.6, 0.6, 0.6);
      this.skull2.rotation.y = (120 / 180) * Math.PI;
      this.skull2.position.z = textPositionZ + 1.3;
      this.skull2.position.y = -9.3 + textPositionY;
      this.skull2.position.x = textPositionX + 1;
      this.skullBone = this.skull2.children[0].children[0];
      scene.add(this.skull2);
    });
    GLoader.load(GLB6, (gltf) => {
      this.skull2Clone = gltf.scene;
      this.skull2Clone.scale.set(0.6, 0.6, 0.6);
      this.skull2Clone.rotation.y = (60 / 180) * Math.PI;
      this.skull2Clone.position.z = textPositionZ - 1.3;
      this.skull2Clone.position.y = -9.3 + textPositionY;
      this.skull2Clone.position.x = textPositionX + 1;
      this.skullBone2 = this.skull2Clone.children[0].children[0];
      scene.add(this.skull2Clone);
    });

    // SMOKE
    // Textures
    this.smokeTexture = new THREE.TextureLoader().load(
      "../../assets/images/cloud.png"
    );

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

    smokeGeo.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(posArr, 3)
    );

    var softParticlesMaterial = new THREE.ShaderMaterial({
      defines: Object.assign({}, new SoftParticlesShader().defines()),
      uniforms: THREE.UniformsUtils.clone(new SoftParticlesShader().uniforms()),
      vertexShader: new SoftParticlesShader().vertexShader(),
      fragmentShader: new SoftParticlesShader().fragmentShader(),

      transparent: true,
      blending: THREE.AdditiveBlending,
      depthTest: false,
      depthWrite: false,
    });

    softParticlesMaterial.map = this.smokeTexture;

    var uniforms = softParticlesMaterial.uniforms;

    uniforms.map.value = this.smokeTexture;
    uniforms.diffuse.value = new THREE.Color(1, 1, 1);
    uniforms.size.value = 15;
    uniforms.opacity.value = 0.3;
    uniforms.sizeAttenuation.value = true;
    uniforms.fCamNear.value = this.camera.near;
    uniforms.fCamFar.value = this.camera.far;
    uniforms.screenSize.value = new THREE.Vector2(
      window.innerWidth,
      window.innerHeight
    );

    this.smokeParticles = new THREE.Points(smokeGeo, softParticlesMaterial);
    this.smokeParticles.frustumCulled = false;
    scene.add(this.smokeParticles);

    var depthTexture = new THREE.DepthTexture();
    depthTexture.type = THREE.UnsignedShortType;
    depthTexture.minFilter = THREE.NearestFilter;
    depthTexture.maxFilter = THREE.NearestFilter;

    this.renderTarget = new THREE.WebGLRenderTarget(
      window.innerWidth,
      window.innerHeight,
      {
        format: THREE.RGBAFormat,
        depthTexture: depthTexture,
      }
    );

    this.smokeParticles.material.uniforms.sceneDepthTexture.value = depthTexture;

    //プロセシングにthis.rendererを置き換える神々しくなる
    this.composer = new EffectComposer(this.renderer);
    this.composer.addPass(new RenderPass(scene, this.camera));
    this.composer.addPass(new EffectPass(this.camera, new BloomEffect()));
  }
}
