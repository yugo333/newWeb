import * as THREE from "three";
import textJson from "three/examples/fonts/helvetiker_regular.typeface.json";
// import { TrackballControls } from "three/examples/jsm/controls/TrackballControls";
import { TessellateModifier } from "three/examples/jsm/modifiers/TessellateModifier";

const profileText3D = new THREE.FontLoader().parse(textJson);

export class Text {
  constructor() {
    const textArray = ["L", "A", "I", "C", "I", "F", "F", "O", " ", "5", "U"];
    this.meshArray = [];
    for (let i = 0; i < textArray.length; i++) {
      let geometry = new THREE.TextGeometry(textArray[i], {
        font: profileText3D,
        size: 40,
        height: 5,
        curveSegments: 3,
        bevelThickness: 2,
        bevelSize: 1,
        bevelEnabled: true,
      });
      let z_position = i * 1.75 - 1.6;
      // console.log(X_position);
      this._eachTexts(geometry, z_position);
    }
  }
  _eachTexts(geometry, z_position) {
    geometry.center();
    var tessellateModifier = new TessellateModifier(8);
    for (var i = 0; i < 6; i++) {
      tessellateModifier.modify(geometry);
    }
    geometry = new THREE.BufferGeometry().fromGeometry(geometry);
    var numFaces = geometry.attributes.position.count / 3;
    var colors = new Float32Array(numFaces * 3 * 3);
    var displacement = new Float32Array(numFaces * 3 * 3);
    var color = new THREE.Color();

    for (var f = 0; f < numFaces; f++) {
      var index = 9 * f;
      var h = 1 * Math.random();
      var s = 1 + 0.5 * Math.random();
      var l = 0.05 + 0.5 * Math.random();
      color.setHSL(h, s, l);
      var d = 10 * (0.5 - Math.random());
      for (var i = 0; i < 3; i++) {
        colors[index + 3 * i] = color.r;
        colors[index + 3 * i + 1] = color.g;
        colors[index + 3 * i + 2] = color.b;

        displacement[index + 3 * i] = d;
        displacement[index + 3 * i + 1] = d;
        displacement[index + 3 * i + 2] = d;
      }
    }
    geometry.setAttribute("customColor", new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute(
      "displacement",
      new THREE.BufferAttribute(displacement, 3)
    );
    //
    let uniforms = {
      amplitude: { value: 0.0 },
    };
    var shaderMaterial = new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: document.getElementById("vertexshader").textContent,
      fragmentShader: document.getElementById("fragmentshader").textContent,
    });
    //
    this.mesh = new THREE.Mesh(geometry, shaderMaterial);
    this.mesh.scale.set(0.05, 0.05, 0.05);
    // this.mesh.position.z = ;
    this.mesh.rotation.y = (90 / 180) * Math.PI;
    this.mesh.position.z = z_position - 60;
    this.meshArray.push(this.mesh);
  }
}
