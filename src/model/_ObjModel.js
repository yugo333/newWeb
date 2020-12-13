import { load } from "../loadThree/Load";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Text } from "../shaders/_text";

import {
  BloomEffect,
  EffectComposer,
  EffectPass,
  RenderPass,
} from "postprocessing";

import textJson from "three/examples/fonts/helvetiker_regular.typeface.json";
import { SoftParticlesShader } from "../shaders/_SoftParticlesShader";

export class ObjModel extends load {
  constructor(scene) {
    super(scene);
    //gltf
    let GLoader = new GLTFLoader(); //３Dモデル表示
    // const GLB = require("../assets/images/RollSecond.glb");
    // const GLB2 = require("../assets/images/stThaad.glb");
    // const GLB3 = require("../assets/images/tamaSecond.glb");
    GLoader.load("../assets/images/RollSecond.glb", (gltf) => {
      this.toy = gltf.scene;
      this.toy.scale.set(2, 2, 2);
      // toy.scale.set(200, 200, 200); //toyのサイズ
      this.toy.position.z = -2.5;
      this.toy.position.x = -1.2;
      // toy.rotation.y = (180 / 180) * Math.PI;
      this.toy.rotation.y = (180 / 180) * Math.PI;
      scene.add(this.toy);
    });
    GLoader.load("../assets/images/stThaad.glb", (gltf) => {
      this.st = gltf.scene;
      this.st.scale.set(2, 2, 2);
      this.st.position.z = -2.5;
      this.st.position.x = -1.2;
      this.st.rotation.y = (180 / 180) * Math.PI;
      scene.add(this.st);
    });
    GLoader.load("../assets/images/tamaSecond.glb", (gltf) => {
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
    // let planeGeometry2 = new THREE.PlaneGeometry(4, 2);
    let planeMaterial2 = new THREE.MeshBasicMaterial({
      map: texture2,
      transparent: true,
      opacity: 0.7,
    });
    const planeMesh2 = new THREE.Mesh(planeGeometry, planeMaterial2);
    planeMesh2.rotation.y = (90 / 180) * Math.PI;
    planeMesh2.position.z = textPositionZ;
    planeMesh2.position.y = -2.5 + textPositionY;
    planeMesh2.position.x = textPositionX;
    scene.add(planeMesh2);

    // テキスト２
    const text2 = texLoader.load("../assets/images/text.png");
    // let txtGeometry2 = new THREE.PlaneGeometry(3, 0.6);
    let txtMaterial2 = new THREE.MeshBasicMaterial({
      map: text2,
      transparent: true,
      opacity: 0.8,
    });
    const txtMesh2 = new THREE.Mesh(txtGeometry, txtMaterial2);
    txtMesh2.rotation.y = (90 / 180) * Math.PI;
    txtMesh2.position.z = textPositionZ;
    txtMesh2.position.y = -2.88 + textPositionY;
    txtMesh2.position.x = textPositionX + 1;
    scene.add(txtMesh2);

    // タイトル2
    const title2 = texLoader.load("../assets/images/coolTextW.png");
    // let title2Geometry = new THREE.PlaneGeometry(1.5, 0.4);
    let title2Material = new THREE.MeshBasicMaterial({
      map: title2,
      transparent: true,
      opacity: 0.9,
    });
    const title2Mesh = new THREE.Mesh(titleGeometry, title2Material);
    title2Mesh.rotation.y = (90 / 180) * Math.PI;
    title2Mesh.position.z = textPositionZ + 0.8;
    title2Mesh.position.y = -2.1 + textPositionY;
    title2Mesh.position.x = textPositionX + 1;
    scene.add(title2Mesh);

    // タイトル3
    const title3 = texLoader.load("../assets/images/coolTextL.png");
    // let title3Geometry = new THREE.PlaneGeometry(1.5, 0.4);
    let title3Material = new THREE.MeshBasicMaterial({
      map: title3,
      transparent: true,
      opacity: 0.9,
    });
    const title3Mesh = new THREE.Mesh(titleGeometry, title3Material);
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
    // let instGeometry = new THREE.PlaneGeometry(1.5, 0.4);
    let instMaterial = new THREE.MeshBasicMaterial({
      map: inst,
      transparent: true,
      opacity: 0.9,
    });
    this.instMesh = new THREE.Mesh(youTubeGeometry, instMaterial);
    this.instMesh.name = "instMesh";
    this.instMesh.rotation.y = (90 / 180) * Math.PI;
    this.instMesh.position.z = textPositionZ;
    this.instMesh.position.y = -5.5 + textPositionY;
    this.instMesh.position.x = textPositionX + 1;
    scene.add(this.instMesh);
    //twe
    const twe = texLoader.load("../assets/images/l3.png");
    // let tweGeometry = new THREE.PlaneGeometry(1.5, 0.4);
    let tweMaterial = new THREE.MeshBasicMaterial({
      map: twe,
      transparent: true,
      opacity: 0.9,
    });
    this.tweMesh = new THREE.Mesh(youTubeGeometry, tweMaterial);
    this.tweMesh.name = "tweMesh";
    this.tweMesh.rotation.y = (90 / 180) * Math.PI;
    this.tweMesh.position.z = textPositionZ;
    this.tweMesh.position.y = -6 + textPositionY;
    this.tweMesh.position.x = textPositionX + 1;
    scene.add(this.tweMesh);
    //git
    const git = texLoader.load("../assets/images/l2.png");
    // let gitGeometry = new THREE.PlaneGeometry(1.5, 0.4);
    let gitMaterial = new THREE.MeshBasicMaterial({
      map: git,
      transparent: true,
      opacity: 0.9,
    });
    this.gitMesh = new THREE.Mesh(youTubeGeometry, gitMaterial);
    this.gitMesh.name = "gitMesh";
    this.gitMesh.rotation.y = (90 / 180) * Math.PI;
    this.gitMesh.position.z = textPositionZ;
    this.gitMesh.position.y = -6.5 + textPositionY;
    this.gitMesh.position.x = textPositionX + 1;
    scene.add(this.gitMesh);

    // タイトル4
    const title4 = texLoader.load("../assets/images/coolTextC.png");
    // let title4Geometry = new THREE.PlaneGeometry(1.5, 0.4);
    let title4Material = new THREE.MeshBasicMaterial({
      map: title4,
      transparent: true,
      opacity: 0.9,
    });
    this.title4Mesh = new THREE.Mesh(titleGeometry, title4Material);
    this.title4Mesh.rotation.y = (90 / 180) * Math.PI;
    this.title4Mesh.position.z = textPositionZ;
    this.title4Mesh.position.y = -8.5 + textPositionY;
    this.title4Mesh.position.x = textPositionX + 1;
    this.title4Mesh.name = "contact";
    scene.add(this.title4Mesh);

    // 背景8
    const texture8 = texLoader.load("../assets/images/yugo.jpg");
    // let planeGeometry8 = new THREE.PlaneGeometry(4, 2);
    let planeMaterial8 = new THREE.MeshBasicMaterial({
      map: texture8,
      transparent: true,
      opacity: 0.7,
    });
    const planeMesh8 = new THREE.Mesh(planeGeometry, planeMaterial8);
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
      // opacity: 0.8, //不透明度で反射具合を調整
      opacity: 0, //不透明度で反射具合を調整
      transparent: true, //透明を有効に
    });
    this.diamMaterial2 = new THREE.MeshLambertMaterial({
      color: 0xcccccc,
      envMap: cubeTexture, //反射マッピングのcubeCameraで作成した環境マッピングを適用
      reflectivity: 1, //反射率
      // opacity: 0.6, //不透明度で反射具合を調整
      opacity: 0, //不透明度で反射具合を調整
      transparent: true, //透明を有効に
    });
    // const GLB4 = require("../assets/images/diamond.glb");
    GLoader.load("../assets/images/diamond.glb", (gltf) => {
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
    // const GLB5 = require("../assets/images/skullUp.glb");
    // const GLB6 = require("../assets/images/skullDown.glb");
    GLoader.load("../assets/images/skullUp.glb", (gltf) => {
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
    GLoader.load("../assets/images/skullDown.glb", (gltf) => {
      this.skull2 = gltf.scene;
      this.skull2.scale.set(0.6, 0.6, 0.6);
      this.skull2.rotation.y = (120 / 180) * Math.PI;
      this.skull2.position.z = textPositionZ + 1.3;
      this.skull2.position.y = -9.3 + textPositionY;
      this.skull2.position.x = textPositionX + 1;
      this.skullBone = this.skull2.children[0].children[0];
      scene.add(this.skull2);
    });
    GLoader.load("../assets/images/skullDown.glb", (gltf) => {
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
      "../assets/images/cloud.png"
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
