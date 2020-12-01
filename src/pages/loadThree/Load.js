import * as THREE from "three";
import * as controls from "three-orbit-controls";
import { BackGroundShader } from "../shaders/_BackGroundShader";

export class load {
  constructor(scene) {
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
    this.BackGroundShader = new BackGroundShader();
    this.uniforms = this.BackGroundShader.uniforms();
    var geometryBackGroundShader = new THREE.PlaneBufferGeometry(2, 2);

    var materialBackGroundShader = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: document.getElementById("vertexShaderBG").textContent,
      fragmentShader: document.getElementById("fragmentShaderBG").textContent,
      depthTest: false,
      depthWrite: false,
      transparent: true,
      blending: THREE.AdditiveBlending,
    });
    var meshBackGroundShader = new THREE.Mesh(
      geometryBackGroundShader,
      materialBackGroundShader
    );
    // ここが重要設定地道にするしかない
    meshBackGroundShader.position.x = -220;
    meshBackGroundShader.position.z = -100;
    scene.add(meshBackGroundShader);

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
