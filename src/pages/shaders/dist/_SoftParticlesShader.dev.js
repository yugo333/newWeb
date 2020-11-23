"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SoftParticlesShader = void 0;

var THREE = _interopRequireWildcard(require("three"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var SoftParticlesShader =
/*#__PURE__*/
function () {
  function SoftParticlesShader() {
    _classCallCheck(this, SoftParticlesShader);
  }

  _createClass(SoftParticlesShader, [{
    key: "defines",
    value: function defines() {
      var defines = {
        USE_SIZEATTENUATION: true,
        MAP: true
      };
      return defines;
    }
  }, {
    key: "uniforms",
    value: function uniforms() {
      var uniforms = {
        diffuse: {
          value: new THREE.Color(1, 1, 1)
        },
        map: {
          value: null
        },
        opacity: {
          value: 1
        },
        scale: {
          value: 329
        },
        size: {
          value: 1
        },
        uvTransform: {
          value: new THREE.Matrix3().set(1, 0, 0, 0, 1, 0, 0, 0, 1)
        },
        fCamNear: {
          value: 0.1
        },
        fCamFar: {
          value: 1000
        },
        sceneDepthTexture: {
          value: null
        },
        screenSize: {
          value: null
        },
        sizeAttenuation: {
          value: true
        }
      };
      return uniforms;
    }
  }, {
    key: "vertexShader",
    value: function vertexShader() {
      var vertexShader = ["uniform float size;", "uniform float scale;", "void main() {", "#include <begin_vertex>", "#include <project_vertex>", "gl_PointSize = size;", "#ifdef USE_SIZEATTENUATION", "bool isPerspective = ( projectionMatrix[ 2 ][ 3 ] == - 1.0 );", "if ( isPerspective ) gl_PointSize *= ( scale / -mvPosition .z );", "#endif", "}"].join("\n");
      return vertexShader;
    }
  }, {
    key: "fragmentShader",
    value: function fragmentShader() {
      var fragmentShader = ["uniform vec3 diffuse;", "uniform float opacity;", "#include <map_particle_pars_fragment>", "uniform sampler2D sceneDepthTexture;", "uniform vec2 screenSize;", "uniform float fCamNear;", "uniform float fCamFar;", "float fadeEdge( float particleDepth, float sceneDepth ){", // margin makes it blend through the solid objects a little bit more, creating illusion of density
      "float extraMargin = 0.015; ", "float a = ( sceneDepth+extraMargin - particleDepth ) * 120.0;", "if( a <= 0.0 ) return 0.0;", "if( a >= 1.0 ) return 1.0;", "if( a < 0.5 ) a = 2.0 * a * a;", "else a = -2.0 * pow( a - 1.0 , 2.0 ) + 1.0;", "return a;", "}", "#include <packing>", "float getLinearDepth( float fragCoordZ ) {", "float viewZ = perspectiveDepthToViewZ( fragCoordZ, fCamNear, fCamFar );", "return viewZToOrthographicDepth( viewZ, fCamNear, fCamFar );", "}", "void main() {", "vec3 outgoingLight = vec3( 0.0 );", "vec4 diffuseColor = vec4( diffuse, opacity );", "#include <map_particle_fragment>", "outgoingLight = diffuseColor.rgb;", "vec2 screenCoords = gl_FragCoord.xy / screenSize;", "float thisDepth = getLinearDepth( gl_FragCoord.z );", "float solidsDepth = texture2D( sceneDepthTexture , screenCoords ).r;", "solidsDepth = getLinearDepth( solidsDepth );", "float alphaScale = fadeEdge( thisDepth, solidsDepth );", "diffuseColor.a *= alphaScale;", "gl_FragColor = vec4( outgoingLight, diffuseColor.a );", "}"].join("\n");
      return fragmentShader;
    }
  }]);

  return SoftParticlesShader;
}();

exports.SoftParticlesShader = SoftParticlesShader;