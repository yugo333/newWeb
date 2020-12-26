"use strict";
import "@scss/style.scss";
import * as THREE from "three";
import { ObjModel } from "./model/_ObjModel";

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
  let loader = new ObjModel(scene);

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
      const mp3 = require("./assets/images/webSound.mp3");
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
          loader.camera.position.x += 1.41;
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
      loader.dia.material.opacity = 0.8;
      loader.dia2.material.opacity = 0.6;
      // ダイアの反射が強くなるためライト暗くする
      loader.light1.intensity = 3;
      loader.hiLight.intensity = 6;
      if (loader.camera.position.y >= -6.9) {
        cameraPositionDownY -= 0.1;
        // カメラの向く方向
        loader.camera.position.y = cameraPositionDownY;
        loader.Controls.target.y = cameraPositionDownY;
        loader.Controls.update();
        setTimeout(() => {
          scrollPage = true;
        }, 2000);
      }
      if (scrollPage) {
        //スクロール出来るようにしハイトも大きくする
        // モバイルだとなんか変になるので小ちゃくする
        if (canvas.width < 1000) {
          mainScroll.style.height = "1300px";
        } else if (canvas.width < 1100) {
          mainScroll.style.height = "1690px";
        } else if (canvas.width > 1100 && canvas.height < 1150) {
          mainScroll.style.height = "1560px";
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
