var THREE=require("three"),_GLTFLoader=function(){function e(e){this.manager=void 0!==e?e:THREE.DefaultLoadingManager,this.dracoLoader=null}function a(){var r={};return{get:function(e){return r[e]},add:function(e,t){r[e]=t},remove:function(e){delete r[e]},removeAll:function(){r={}}}}e.prototype={constructor:e,crossOrigin:"anonymous",load:function(t,r,e,a){var n,i=this;n=void 0!==this.resourcePath?this.resourcePath:void 0!==this.path?this.path:THREE.LoaderUtils.extractUrlBase(t),i.manager.itemStart(t);var s=function(e){a?a(e):console.error(e),i.manager.itemError(t),i.manager.itemEnd(t)},o=new THREE.FileLoader(i.manager);o.setPath(this.path),o.setResponseType("arraybuffer"),o.load(t,function(e){try{i.parse(e,n,function(e){r(e),i.manager.itemEnd(t)},s)}catch(e){s(e)}},e,s)},setCrossOrigin:function(e){return this.crossOrigin=e,this},setPath:function(e){return this.path=e,this},setResourcePath:function(e){return this.resourcePath=e,this},setDRACOLoader:function(e){return this.dracoLoader=e,this},parse:function(e,t,s,r){var a,o={};if("string"==typeof e)a=e;else if(THREE.LoaderUtils.decodeText(new Uint8Array(e,0,4))===f){try{o[b.KHR_BINARY_GLTF]=new m(e)}catch(e){return void(r&&r(e))}a=o[b.KHR_BINARY_GLTF].content}else a=THREE.LoaderUtils.decodeText(new Uint8Array(e));var n=JSON.parse(a);if(void 0===n.asset||n.asset.version[0]<2)r&&r(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported. Use LegacyGLTFLoader instead."));else{if(n.extensionsUsed)for(var i=0;i<n.extensionsUsed.length;++i){var l=n.extensionsUsed[i],u=n.extensionsRequired||[];switch(l){case b.KHR_LIGHTS_PUNCTUAL:o[l]=new d(n);break;case b.KHR_MATERIALS_UNLIT:o[l]=new h(n);break;case b.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS:o[l]=new T(n);break;case b.KHR_DRACO_MESH_COMPRESSION:o[l]=new E(n,this.dracoLoader);break;case b.MSFT_TEXTURE_DDS:o[b.MSFT_TEXTURE_DDS]=new c(n);break;case b.KHR_TEXTURE_TRANSFORM:o[b.KHR_TEXTURE_TRANSFORM]=new v(n);break;default:0<=u.indexOf(l)&&console.warn('THREE.GLTFLoader: Unknown extension "'+l+'".')}}var p=new Y(n,o,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,manager:this.manager});p.parse(function(e,t,r,a,n){var i={scene:e,scenes:t,cameras:r,animations:a,asset:n.asset,parser:p,userData:{}};B(o,i,n),s(i)},r)}}};var b={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS:"KHR_materials_pbrSpecularGlossiness",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",MSFT_TEXTURE_DDS:"MSFT_texture_dds"};function c(){if(!THREE.DDSLoader)throw new Error("THREE.GLTFLoader: Attempting to load .dds texture without importing THREE.DDSLoader");this.name=b.MSFT_TEXTURE_DDS,this.ddsLoader=new THREE.DDSLoader}function d(e){this.name=b.KHR_LIGHTS_PUNCTUAL;var t=e.extensions&&e.extensions[b.KHR_LIGHTS_PUNCTUAL]||{};this.lightDefs=t.lights||[]}function h(e){this.name=b.KHR_MATERIALS_UNLIT}d.prototype.loadLight=function(e){var t,r=this.lightDefs[e],a=new THREE.Color(16777215);void 0!==r.color&&a.fromArray(r.color);var n=void 0!==r.range?r.range:0;switch(r.type){case"directional":(t=new THREE.DirectionalLight(a)).target.position.set(0,0,-1),t.add(t.target);break;case"point":(t=new THREE.PointLight(a)).distance=n;break;case"spot":(t=new THREE.SpotLight(a)).distance=n,r.spot=r.spot||{},r.spot.innerConeAngle=void 0!==r.spot.innerConeAngle?r.spot.innerConeAngle:0,r.spot.outerConeAngle=void 0!==r.spot.outerConeAngle?r.spot.outerConeAngle:Math.PI/4,t.angle=r.spot.outerConeAngle,t.penumbra=1-r.spot.innerConeAngle/r.spot.outerConeAngle,t.target.position.set(0,0,-1),t.add(t.target);break;default:throw new Error('THREE.GLTFLoader: Unexpected light type, "'+r.type+'".')}return t.decay=2,void 0!==r.intensity&&(t.intensity=r.intensity),t.name=r.name||"light_"+e,Promise.resolve(t)},h.prototype.getMaterialType=function(e){return THREE.MeshBasicMaterial},h.prototype.extendParams=function(e,t,r){var a=[];e.color=new THREE.Color(1,1,1),e.opacity=1;var n=t.pbrMetallicRoughness;if(n){if(Array.isArray(n.baseColorFactor)){var i=n.baseColorFactor;e.color.fromArray(i),e.opacity=i[3]}void 0!==n.baseColorTexture&&a.push(r.assignTexture(e,"map",n.baseColorTexture))}return Promise.all(a)};var f="glTF",l=12,u={JSON:1313821514,BIN:5130562};function m(e){this.name=b.KHR_BINARY_GLTF,this.content=null,this.body=null;var t=new DataView(e,0,l);if(this.header={magic:THREE.LoaderUtils.decodeText(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==f)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected. Use LegacyGLTFLoader instead.");for(var r=new DataView(e,l),a=0;a<r.byteLength;){var n=r.getUint32(a,!0);a+=4;var i=r.getUint32(a,!0);if(a+=4,i===u.JSON){var s=new Uint8Array(e,l+a,n);this.content=THREE.LoaderUtils.decodeText(s)}else if(i===u.BIN){var o=l+a;this.body=e.slice(o,o+n)}a+=n}if(null===this.content)throw new Error("THREE.GLTFLoader: JSON content not found.")}function E(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=b.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,THREE.DRACOLoader.getDecoderModule()}function v(e){this.name=b.KHR_TEXTURE_TRANSFORM}function T(){return{name:b.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS,specularGlossinessParams:["color","map","lightMap","lightMapIntensity","aoMap","aoMapIntensity","emissive","emissiveIntensity","emissiveMap","bumpMap","bumpScale","normalMap","displacementMap","displacementScale","displacementBias","specularMap","specular","glossinessMap","glossiness","alphaMap","envMap","envMapIntensity","refractionRatio"],getMaterialType:function(){return THREE.ShaderMaterial},extendParams:function(e,t,r){var a=t.extensions[this.name],n=THREE.ShaderLib.standard,i=THREE.UniformsUtils.clone(n.uniforms),s=["#ifdef USE_SPECULARMAP","\tuniform sampler2D specularMap;","#endif"].join("\n"),o=["#ifdef USE_GLOSSINESSMAP","\tuniform sampler2D glossinessMap;","#endif"].join("\n"),l=["vec3 specularFactor = specular;","#ifdef USE_SPECULARMAP","\tvec4 texelSpecular = texture2D( specularMap, vUv );","\ttexelSpecular = sRGBToLinear( texelSpecular );","\t// reads channel RGB, compatible with a glTF Specular-Glossiness (RGBA) texture","\tspecularFactor *= texelSpecular.rgb;","#endif"].join("\n"),u=["float glossinessFactor = glossiness;","#ifdef USE_GLOSSINESSMAP","\tvec4 texelGlossiness = texture2D( glossinessMap, vUv );","\t// reads channel A, compatible with a glTF Specular-Glossiness (RGBA) texture","\tglossinessFactor *= texelGlossiness.a;","#endif"].join("\n"),p=["PhysicalMaterial material;","material.diffuseColor = diffuseColor.rgb;","material.specularRoughness = clamp( 1.0 - glossinessFactor, 0.04, 1.0 );","material.specularColor = specularFactor.rgb;"].join("\n"),c=n.fragmentShader.replace("uniform float roughness;","uniform vec3 specular;").replace("uniform float metalness;","uniform float glossiness;").replace("#include <roughnessmap_pars_fragment>",s).replace("#include <metalnessmap_pars_fragment>",o).replace("#include <roughnessmap_fragment>",l).replace("#include <metalnessmap_fragment>",u).replace("#include <lights_physical_fragment>",p);delete i.roughness,delete i.metalness,delete i.roughnessMap,delete i.metalnessMap,i.specular={value:(new THREE.Color).setHex(1118481)},i.glossiness={value:.5},i.specularMap={value:null},i.glossinessMap={value:null},e.vertexShader=n.vertexShader,e.fragmentShader=c,e.uniforms=i,e.defines={STANDARD:""},e.color=new THREE.Color(1,1,1),e.opacity=1;var d=[];if(Array.isArray(a.diffuseFactor)){var h=a.diffuseFactor;e.color.fromArray(h),e.opacity=h[3]}if(void 0!==a.diffuseTexture&&d.push(r.assignTexture(e,"map",a.diffuseTexture)),e.emissive=new THREE.Color(0,0,0),e.glossiness=void 0!==a.glossinessFactor?a.glossinessFactor:1,e.specular=new THREE.Color(1,1,1),Array.isArray(a.specularFactor)&&e.specular.fromArray(a.specularFactor),void 0!==a.specularGlossinessTexture){var f=a.specularGlossinessTexture;d.push(r.assignTexture(e,"glossinessMap",f)),d.push(r.assignTexture(e,"specularMap",f))}return Promise.all(d)},createMaterial:function(e){var t=new THREE.ShaderMaterial({defines:e.defines,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader,uniforms:e.uniforms,fog:!0,lights:!0,opacity:e.opacity,transparent:e.transparent});return t.isGLTFSpecularGlossinessMaterial=!0,t.color=e.color,t.map=void 0===e.map?null:e.map,t.lightMap=null,t.lightMapIntensity=1,t.aoMap=void 0===e.aoMap?null:e.aoMap,t.aoMapIntensity=1,t.emissive=e.emissive,t.emissiveIntensity=1,t.emissiveMap=void 0===e.emissiveMap?null:e.emissiveMap,t.bumpMap=void 0===e.bumpMap?null:e.bumpMap,t.bumpScale=1,t.normalMap=void 0===e.normalMap?null:e.normalMap,e.normalScale&&(t.normalScale=e.normalScale),t.displacementMap=null,t.displacementScale=1,t.displacementBias=0,t.specularMap=void 0===e.specularMap?null:e.specularMap,t.specular=e.specular,t.glossinessMap=void 0===e.glossinessMap?null:e.glossinessMap,t.glossiness=e.glossiness,t.alphaMap=null,t.envMap=void 0===e.envMap?null:e.envMap,t.envMapIntensity=1,t.refractionRatio=.98,t.extensions.derivatives=!0,t},cloneMaterial:function(e){var t=e.clone();t.isGLTFSpecularGlossinessMaterial=!0;for(var r=this.specularGlossinessParams,a=0,n=r.length;a<n;a++)t[r[a]]=e[r[a]];return t},refreshUniforms:function(e,t,r,a,n,i){if(!0===n.isGLTFSpecularGlossinessMaterial){var s,o=n.uniforms,l=n.defines;o.opacity.value=n.opacity,o.diffuse.value.copy(n.color),o.emissive.value.copy(n.emissive).multiplyScalar(n.emissiveIntensity),o.map.value=n.map,o.specularMap.value=n.specularMap,o.alphaMap.value=n.alphaMap,o.lightMap.value=n.lightMap,o.lightMapIntensity.value=n.lightMapIntensity,o.aoMap.value=n.aoMap,o.aoMapIntensity.value=n.aoMapIntensity,n.map?s=n.map:n.specularMap?s=n.specularMap:n.displacementMap?s=n.displacementMap:n.normalMap?s=n.normalMap:n.bumpMap?s=n.bumpMap:n.glossinessMap?s=n.glossinessMap:n.alphaMap?s=n.alphaMap:n.emissiveMap&&(s=n.emissiveMap),void 0!==s&&(s.isWebGLRenderTarget&&(s=s.texture),!0===s.matrixAutoUpdate&&s.updateMatrix(),o.uvTransform.value.copy(s.matrix)),o.envMap.value=n.envMap,o.envMapIntensity.value=n.envMapIntensity,o.flipEnvMap.value=n.envMap&&n.envMap.isCubeTexture?-1:1,o.refractionRatio.value=n.refractionRatio,o.specular.value.copy(n.specular),o.glossiness.value=n.glossiness,o.glossinessMap.value=n.glossinessMap,o.emissiveMap.value=n.emissiveMap,o.bumpMap.value=n.bumpMap,o.normalMap.value=n.normalMap,o.displacementMap.value=n.displacementMap,o.displacementScale.value=n.displacementScale,o.displacementBias.value=n.displacementBias,null!==o.glossinessMap.value&&void 0===l.USE_GLOSSINESSMAP&&(l.USE_GLOSSINESSMAP="",l.USE_ROUGHNESSMAP=""),null===o.glossinessMap.value&&void 0!==l.USE_GLOSSINESSMAP&&(delete l.USE_GLOSSINESSMAP,delete l.USE_ROUGHNESSMAP)}}}}function H(e,t,r,a){THREE.Interpolant.call(this,e,t,r,a)}E.prototype.decodePrimitive=function(e,t){var r=this.json,a=this.dracoLoader,n=e.extensions[this.name].bufferView,i=e.extensions[this.name].attributes,s={},o={},l={};for(var u in i)u in M&&(s[M[u]]=i[u]);for(u in e.attributes)if(void 0!==M[u]&&void 0!==i[u]){var p=r.accessors[e.attributes[u]],c=L[p.componentType];l[M[u]]=c,o[M[u]]=!0===p.normalized}return t.getDependency("bufferView",n).then(function(e){return new Promise(function(n){a.decodeDracoFile(e,function(e){for(var t in e.attributes){var r=e.attributes[t],a=o[t];void 0!==a&&(r.normalized=a)}n(e)},s,l)})})},v.prototype.extendTexture=function(e,t){return e=e.clone(),void 0!==t.offset&&e.offset.fromArray(t.offset),void 0!==t.rotation&&(e.rotation=t.rotation),void 0!==t.scale&&e.repeat.fromArray(t.scale),void 0!==t.texCoord&&console.warn('THREE.GLTFLoader: Custom UV sets in "'+this.name+'" extension not yet supported.'),e.needsUpdate=!0,e},((H.prototype=Object.create(THREE.Interpolant.prototype)).constructor=H).prototype.beforeStart_=H.prototype.copySampleValue_=function(e){for(var t=this.resultBuffer,r=this.sampleValues,a=this.valueSize,n=e*a*3+a,i=0;i!==a;i++)t[i]=r[n+i];return t},H.prototype.afterEnd_=H.prototype.copySampleValue_,H.prototype.interpolate_=function(e,t,r,a){for(var n=this.resultBuffer,i=this.sampleValues,s=this.valueSize,o=2*s,l=3*s,u=a-t,p=(r-t)/u,c=p*p,d=c*p,h=e*l,f=h-l,m=2*d-3*c+1,E=d-2*c+p,v=-2*d+3*c,T=d-c,g=0;g!==s;g++){var R=i[f+g+s],M=i[f+g+o]*u,S=i[h+g+s],y=i[h+g]*u;n[g]=m*R+E*M+v*S+T*y}return n};var x=0,w=1,P=2,I=3,F=4,U=5,D=6,L=(Number,THREE.Matrix3,THREE.Matrix4,THREE.Vector2,THREE.Vector3,THREE.Vector4,THREE.Texture,{5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array}),g={9728:THREE.NearestFilter,9729:THREE.LinearFilter,9984:THREE.NearestMipMapNearestFilter,9985:THREE.LinearMipMapNearestFilter,9986:THREE.NearestMipMapLinearFilter,9987:THREE.LinearMipMapLinearFilter},R={33071:THREE.ClampToEdgeWrapping,33648:THREE.MirroredRepeatWrapping,10497:THREE.RepeatWrapping},A=(THREE.BackSide,THREE.FrontSide,THREE.NeverDepth,THREE.LessDepth,THREE.EqualDepth,THREE.LessEqualDepth,THREE.GreaterEqualDepth,THREE.NotEqualDepth,THREE.GreaterEqualDepth,THREE.AlwaysDepth,THREE.AddEquation,THREE.SubtractEquation,THREE.ReverseSubtractEquation,THREE.ZeroFactor,THREE.OneFactor,THREE.SrcColorFactor,THREE.OneMinusSrcColorFactor,THREE.SrcAlphaFactor,THREE.OneMinusSrcAlphaFactor,THREE.DstAlphaFactor,THREE.OneMinusDstAlphaFactor,THREE.DstColorFactor,THREE.OneMinusDstColorFactor,THREE.SrcAlphaSaturateFactor,{SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16}),M={POSITION:"position",NORMAL:"normal",TEXCOORD_0:"uv",TEXCOORD_1:"uv2",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},_={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},C={CUBICSPLINE:THREE.InterpolateSmooth,LINEAR:THREE.InterpolateLinear,STEP:THREE.InterpolateDiscrete},S="OPAQUE",y="MASK",O="BLEND",G={"image/png":THREE.RGBAFormat,"image/jpeg":THREE.RGBFormat};function N(e,t){return"string"!=typeof e||""===e?"":/^(https?:)?\/\//i.test(e)?e:/^data:.*,.*$/i.test(e)?e:/^blob:.*$/i.test(e)?e:t+e}function B(e,t,r){for(var a in r.extensions)void 0===e[a]&&(t.userData.gltfExtensions=t.userData.gltfExtensions||{},t.userData.gltfExtensions[a]=r.extensions[a])}function k(e,t){void 0!==t.extras&&("object"==typeof t.extras?e.userData=t.extras:console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+t.extras))}function K(e,t){if(e.updateMorphTargets(),void 0!==t.weights)for(var r=0,a=t.weights.length;r<a;r++)e.morphTargetInfluences[r]=t.weights[r];if(t.extras&&Array.isArray(t.extras.targetNames)){var n=t.extras.targetNames;if(e.morphTargetInfluences.length===n.length){e.morphTargetDictionary={};for(r=0,a=n.length;r<a;r++)e.morphTargetDictionary[n[r]]=r}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function j(e,t){if(Object.keys(e).length!==Object.keys(t).length)return!1;for(var r in e)if(e[r]!==t[r])return!1;return!0}function V(e,t){if(e.length!==t.length)return!1;for(var r=0,a=e.length;r<a;r++)if(e[r]!==t[r])return!1;return!0}function X(e,t){for(var r=0,a=e.length;r<a;r++){var n=e[r];if(i=n.primitive,s=t,void 0,o=i.extensions?i.extensions[b.KHR_DRACO_MESH_COMPRESSION]:void 0,l=s.extensions?s.extensions[b.KHR_DRACO_MESH_COMPRESSION]:void 0,o&&l?o.bufferView===l.bufferView&&j(o.attributes,l.attributes):i.indices===s.indices&&j(i.attributes,s.attributes))return n.promise}var i,s,o,l;return null}function p(e){if(e.isInterleavedBufferAttribute){for(var t=e.count,r=e.itemSize,a=e.array.slice(0,t*r),n=0;n<t;++n)a[n]=e.getX(n),2<=r&&(a[n+1]=e.getY(n)),3<=r&&(a[n+2]=e.getZ(n)),4<=r&&(a[n+3]=e.getW(n));return new THREE.BufferAttribute(a,r,e.normalized)}return e.clone()}function Y(e,t,r){this.json=e||{},this.extensions=t||{},this.options=r||{},this.cache=new a,this.primitiveCache=[],this.multiplePrimitivesCache=[],this.multiPassGeometryCache=[],this.textureLoader=new THREE.TextureLoader(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.fileLoader=new THREE.FileLoader(this.options.manager),this.fileLoader.setResponseType("arraybuffer")}function z(r,e,a){var t=e.attributes,n=[];function i(e,t){return a.getDependency("accessor",e).then(function(e){r.addAttribute(t,e)})}for(var s in t){var o=M[s];o&&(o in r.attributes||n.push(i(t[s],o)))}if(void 0!==e.indices&&!r.index){var l=a.getDependency("accessor",e.indices).then(function(e){r.setIndex(e)});n.push(l)}return k(r,e),Promise.all(n).then(function(){return void 0!==e.targets?function(h,f,e){for(var m=!1,E=!1,t=0,r=f.length;t<r&&(void 0!==(i=f[t]).POSITION&&(m=!0),void 0!==i.NORMAL&&(E=!0),!m||!E);t++);if(!m&&!E)return Promise.resolve(h);var a=[],n=[];for(t=0,r=f.length;t<r;t++){var i=f[t];if(m){var s=void 0!==i.POSITION?e.getDependency("accessor",i.POSITION).then(function(e){return p(e)}):h.attributes.position;a.push(s)}E&&(s=void 0!==i.NORMAL?e.getDependency("accessor",i.NORMAL).then(function(e){return p(e)}):h.attributes.normal,n.push(s))}return Promise.all([Promise.all(a),Promise.all(n)]).then(function(e){for(var t=e[0],r=e[1],a=0,n=f.length;a<n;a++){var i=f[a],s="morphTarget"+a;if(m&&void 0!==i.POSITION){var o=t[a];o.name=s;for(var l=h.attributes.position,u=0,p=o.count;u<p;u++)o.setXYZ(u,o.getX(u)+l.getX(u),o.getY(u)+l.getY(u),o.getZ(u)+l.getZ(u))}if(E&&void 0!==i.NORMAL){var c=r[a];c.name=s;var d=h.attributes.normal;for(u=0,p=c.count;u<p;u++)c.setXYZ(u,c.getX(u)+d.getX(u),c.getY(u)+d.getY(u),c.getZ(u)+d.getZ(u))}}return m&&(h.morphAttributes.position=t),E&&(h.morphAttributes.normal=r),h})}(r,e.targets,a):r})}return Y.prototype.parse=function(i,e){var s=this.json;this.cache.removeAll(),this.markDefs(),this.getMultiDependencies(["scene","animation","camera"]).then(function(e){var t=e.scenes||[],r=t[s.scene||0],a=e.animations||[],n=e.cameras||[];i(r,t,n,a,s)}).catch(e)},Y.prototype.markDefs=function(){for(var e=this.json.nodes||[],t=this.json.skins||[],r=this.json.meshes||[],a={},n={},i=0,s=t.length;i<s;i++)for(var o=t[i].joints,l=0,u=o.length;l<u;l++)e[o[l]].isBone=!0;for(var p=0,c=e.length;p<c;p++){var d=e[p];void 0!==d.mesh&&(void 0===a[d.mesh]&&(a[d.mesh]=n[d.mesh]=0),a[d.mesh]++,void 0!==d.skin&&(r[d.mesh].isSkinnedMesh=!0))}this.json.meshReferences=a,this.json.meshUses=n},Y.prototype.getDependency=function(e,t){var r=e+":"+t,a=this.cache.get(r);if(!a){switch(e){case"scene":a=this.loadScene(t);break;case"node":a=this.loadNode(t);break;case"mesh":a=this.loadMesh(t);break;case"accessor":a=this.loadAccessor(t);break;case"bufferView":a=this.loadBufferView(t);break;case"buffer":a=this.loadBuffer(t);break;case"material":a=this.loadMaterial(t);break;case"texture":a=this.loadTexture(t);break;case"skin":a=this.loadSkin(t);break;case"animation":a=this.loadAnimation(t);break;case"camera":a=this.loadCamera(t);break;case"light":a=this.extensions[b.KHR_LIGHTS_PUNCTUAL].loadLight(t);break;default:throw new Error("Unknown type: "+e)}this.cache.add(r,a)}return a},Y.prototype.getDependencies=function(r){var e=this.cache.get(r);if(!e){var a=this,t=this.json[r+("mesh"===r?"es":"s")]||[];e=Promise.all(t.map(function(e,t){return a.getDependency(r,t)})),this.cache.add(r,e)}return e},Y.prototype.getMultiDependencies=function(e){for(var r={},t=[],a=0,n=e.length;a<n;a++){var i=e[a],s=this.getDependencies(i);s=s.then(function(e,t){r[e]=t}.bind(this,i+("mesh"===i?"es":"s"))),t.push(s)}return Promise.all(t).then(function(){return r})},Y.prototype.loadBuffer=function(e){var r=this.json.buffers[e],a=this.fileLoader;if(r.type&&"arraybuffer"!==r.type)throw new Error("THREE.GLTFLoader: "+r.type+" buffer type is not supported.");if(void 0===r.uri&&0===e)return Promise.resolve(this.extensions[b.KHR_BINARY_GLTF].body);var n=this.options;return new Promise(function(e,t){a.load(N(r.uri,n.path),e,void 0,function(){t(new Error('THREE.GLTFLoader: Failed to load buffer "'+r.uri+'".'))})})},Y.prototype.loadBufferView=function(e){var a=this.json.bufferViews[e];return this.getDependency("buffer",a.buffer).then(function(e){var t=a.byteLength||0,r=a.byteOffset||0;return e.slice(r,r+t)})},Y.prototype.loadAccessor=function(e){var S=this,y=this.json,H=this.json.accessors[e];if(void 0===H.bufferView&&void 0===H.sparse)return Promise.resolve(null);var t=[];return void 0!==H.bufferView?t.push(this.getDependency("bufferView",H.bufferView)):t.push(null),void 0!==H.sparse&&(t.push(this.getDependency("bufferView",H.sparse.indices.bufferView)),t.push(this.getDependency("bufferView",H.sparse.values.bufferView))),Promise.all(t).then(function(e){var t,r,a=e[0],n=A[H.type],i=L[H.componentType],s=i.BYTES_PER_ELEMENT,o=s*n,l=H.byteOffset||0,u=void 0!==H.bufferView?y.bufferViews[H.bufferView].byteStride:void 0,p=!0===H.normalized;if(u&&u!==o){var c="InterleavedBuffer:"+H.bufferView+":"+H.componentType,d=S.cache.get(c);d||(t=new i(a),d=new THREE.InterleavedBuffer(t,u/s),S.cache.add(c,d)),r=new THREE.InterleavedBufferAttribute(d,n,l/s,p)}else t=null===a?new i(H.count*n):new i(a,l,H.count*n),r=new THREE.BufferAttribute(t,n,p);if(void 0!==H.sparse){var h=A.SCALAR,f=L[H.sparse.indices.componentType],m=H.sparse.indices.byteOffset||0,E=H.sparse.values.byteOffset||0,v=new f(e[1],m,H.sparse.count*h),T=new i(e[2],E,H.sparse.count*n);null!==a&&r.setArray(r.array.slice());for(var g=0,R=v.length;g<R;g++){var M=v[g];if(r.setX(M,T[g*n]),2<=n&&r.setY(M,T[g*n+1]),3<=n&&r.setZ(M,T[g*n+2]),4<=n&&r.setW(M,T[g*n+3]),5<=n)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}}return r})},Y.prototype.loadTexture=function(e){var r,t=this,a=this.json,n=this.options,i=this.textureLoader,s=window.URL||window.webkitURL,o=a.textures[e],l=o.extensions||{},u=(r=l[b.MSFT_TEXTURE_DDS]?a.images[l[b.MSFT_TEXTURE_DDS].source]:a.images[o.source]).uri,p=!1;return void 0!==r.bufferView&&(u=t.getDependency("bufferView",r.bufferView).then(function(e){p=!0;var t=new Blob([e],{type:r.mimeType});return u=s.createObjectURL(t)})),Promise.resolve(u).then(function(r){var a=THREE.Loader.Handlers.get(r);return a||(a=l[b.MSFT_TEXTURE_DDS]?t.extensions[b.MSFT_TEXTURE_DDS].ddsLoader:i),new Promise(function(e,t){a.load(N(r,n.path),e,void 0,t)})}).then(function(e){!0===p&&s.revokeObjectURL(u),e.flipY=!1,void 0!==o.name&&(e.name=o.name),r.mimeType in G&&(e.format=G[r.mimeType]);var t=(a.samplers||{})[o.sampler]||{};return e.magFilter=g[t.magFilter]||THREE.LinearFilter,e.minFilter=g[t.minFilter]||THREE.LinearMipMapLinearFilter,e.wrapS=R[t.wrapS]||THREE.RepeatWrapping,e.wrapT=R[t.wrapT]||THREE.RepeatWrapping,e})},Y.prototype.assignTexture=function(r,a,n){var i=this;return this.getDependency("texture",n.index).then(function(e){if(i.extensions[b.KHR_TEXTURE_TRANSFORM]){var t=void 0!==n.extensions?n.extensions[b.KHR_TEXTURE_TRANSFORM]:void 0;t&&(e=i.extensions[b.KHR_TEXTURE_TRANSFORM].extendTexture(e,t))}r[a]=e})},Y.prototype.loadMaterial=function(e){var t,r=this,a=this.json,n=this.extensions,i=a.materials[e],s={},o=i.extensions||{},l=[];if(o[b.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS]){var u=n[b.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS];t=u.getMaterialType(i),l.push(u.extendParams(s,i,r))}else if(o[b.KHR_MATERIALS_UNLIT]){var p=n[b.KHR_MATERIALS_UNLIT];t=p.getMaterialType(i),l.push(p.extendParams(s,i,r))}else{t=THREE.MeshStandardMaterial;var c=i.pbrMetallicRoughness||{};if(s.color=new THREE.Color(1,1,1),s.opacity=1,Array.isArray(c.baseColorFactor)){var d=c.baseColorFactor;s.color.fromArray(d),s.opacity=d[3]}void 0!==c.baseColorTexture&&l.push(r.assignTexture(s,"map",c.baseColorTexture)),s.metalness=void 0!==c.metallicFactor?c.metallicFactor:1,s.roughness=void 0!==c.roughnessFactor?c.roughnessFactor:1,void 0!==c.metallicRoughnessTexture&&(l.push(r.assignTexture(s,"metalnessMap",c.metallicRoughnessTexture)),l.push(r.assignTexture(s,"roughnessMap",c.metallicRoughnessTexture)))}!0===i.doubleSided&&(s.side=THREE.DoubleSide);var h=i.alphaMode||S;return h===O?s.transparent=!0:(s.transparent=!1,h===y&&(s.alphaTest=void 0!==i.alphaCutoff?i.alphaCutoff:.5)),void 0!==i.normalTexture&&t!==THREE.MeshBasicMaterial&&(l.push(r.assignTexture(s,"normalMap",i.normalTexture)),s.normalScale=new THREE.Vector2(1,1),void 0!==i.normalTexture.scale&&s.normalScale.set(i.normalTexture.scale,i.normalTexture.scale)),void 0!==i.occlusionTexture&&t!==THREE.MeshBasicMaterial&&(l.push(r.assignTexture(s,"aoMap",i.occlusionTexture)),void 0!==i.occlusionTexture.strength&&(s.aoMapIntensity=i.occlusionTexture.strength)),void 0!==i.emissiveFactor&&t!==THREE.MeshBasicMaterial&&(s.emissive=(new THREE.Color).fromArray(i.emissiveFactor)),void 0!==i.emissiveTexture&&t!==THREE.MeshBasicMaterial&&l.push(r.assignTexture(s,"emissiveMap",i.emissiveTexture)),Promise.all(l).then(function(){var e;return e=t===THREE.ShaderMaterial?n[b.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS].createMaterial(s):new t(s),void 0!==i.name&&(e.name=i.name),e.normalScale&&(e.normalScale.y=-e.normalScale.y),e.map&&(e.map.encoding=THREE.sRGBEncoding),e.emissiveMap&&(e.emissiveMap.encoding=THREE.sRGBEncoding),e.specularMap&&(e.specularMap.encoding=THREE.sRGBEncoding),k(e,i),i.extensions&&B(n,e,i),e})},Y.prototype.loadGeometries=function(s){var c,o=this,e=this.extensions,t=this.primitiveCache,d=function(e){if(e.length<2)return!1;var t=e[0],r=t.targets||[];if(void 0===t.indices)return!1;for(var a=1,n=e.length;a<n;a++){var i=e[a];if(t.mode!==i.mode)return!1;if(void 0===i.indices)return!1;if(i.extensions&&i.extensions[b.KHR_DRACO_MESH_COMPRESSION])return!1;if(!j(t.attributes,i.attributes))return!1;var s=i.targets||[];if(r.length!==s.length)return!1;for(var o=0,l=r.length;o<l;o++)if(!j(r[o],s[o]))return!1}return!0}(s);function r(t){return e[b.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(t,o).then(function(e){return z(e,t,o)})}d&&(s=[(c=s)[0]]);for(var a=[],n=0,i=s.length;n<i;n++){var l,u=s[n],p=X(t,u);if(p)a.push(p);else l=u.extensions&&u.extensions[b.KHR_DRACO_MESH_COMPRESSION]?r(u):z(new THREE.BufferGeometry,u,o),t.push({primitive:u,promise:l}),a.push(l)}return Promise.all(a).then(function(e){if(d){var l=e[0];if(null!==(i=function(e,t,r){for(var a=0,n=e.length;a<n;a++){var i=e[a];if(t===i.baseGeometry&&V(r,i.primitives))return i.geometry}return null}(p=o.multiPassGeometryCache,l,c)))return[i.geometry];var u=new THREE.BufferGeometry;for(var t in u.name=l.name,u.userData=l.userData,l.attributes)u.addAttribute(t,l.attributes[t]);for(var t in l.morphAttributes)u.morphAttributes[t]=l.morphAttributes[t];for(var r=[],a=0,n=c.length;a<n;a++)r.push(o.getDependency("accessor",c[a].indices));return Promise.all(r).then(function(e){for(var t=[],r=0,a=0,n=c.length;a<n;a++){for(var i=e[a],s=0,o=i.count;s<o;s++)t.push(i.array[s]);u.addGroup(r,i.count,a),r+=i.count}return u.setIndex(t),p.push({geometry:u,baseGeometry:l,primitives:c}),[u]})}if(1<e.length&&void 0!==THREE.BufferGeometryUtils){for(a=1,n=s.length;a<n;a++)if(s[0].mode!==s[a].mode)return e;var p,i;if(i=function(e,t){for(var r=0,a=e.length;r<a;r++){var n=e[r];if(V(t,n.baseGeometries))return n.geometry}return null}(p=o.multiplePrimitivesCache,e)){if(null!==i.geometry)return[i.geometry]}else{u=THREE.BufferGeometryUtils.mergeBufferGeometries(e,!0);if(p.push({geometry:u,baseGeometries:e}),null!==u)return[u]}}return e})},Y.prototype.loadMesh=function(y){for(var H=this,e=this.json,L=this.extensions,A=e.meshes[y],_=A.primitives,t=[],r=0,a=_.length;r<a;r++){var n=void 0===_[r].material?new THREE.MeshStandardMaterial({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:THREE.FrontSide}):this.getDependency("material",_[r].material);t.push(n)}return Promise.all(t).then(function(S){return H.loadGeometries(_).then(function(e){for(var t=1===e.length&&0<e[0].groups.length,r=[],a=0,n=e.length;a<n;a++){var i,s=e[a],o=_[a],l=t?S:S[a];if(o.mode===F||o.mode===U||o.mode===D||void 0===o.mode)i=!0===A.isSkinnedMesh?new THREE.SkinnedMesh(s,l):new THREE.Mesh(s,l),o.mode===U?i.drawMode=THREE.TriangleStripDrawMode:o.mode===D&&(i.drawMode=THREE.TriangleFanDrawMode);else if(o.mode===w)i=new THREE.LineSegments(s,l);else if(o.mode===I)i=new THREE.Line(s,l);else if(o.mode===P)i=new THREE.LineLoop(s,l);else{if(o.mode!==x)throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+o.mode);i=new THREE.Points(s,l)}0<Object.keys(i.geometry.morphAttributes).length&&K(i,A),i.name=A.name||"mesh_"+y,1<e.length&&(i.name+="_"+a),k(i,A),r.push(i);for(var u=t?i.material:[i.material],p=void 0!==s.attributes.color,c=void 0===s.attributes.normal,d=!0===i.isSkinnedMesh,h=0<Object.keys(s.morphAttributes).length,f=h&&void 0!==s.morphAttributes.normal,m=0,E=u.length;m<E;m++){l=u[m];if(i.isPoints){var v="PointsMaterial:"+l.uuid,T=H.cache.get(v);T||(T=new THREE.PointsMaterial,THREE.Material.prototype.copy.call(T,l),T.color.copy(l.color),T.map=l.map,T.lights=!1,H.cache.add(v,T)),l=T}else if(i.isLine){v="LineBasicMaterial:"+l.uuid;var g=H.cache.get(v);g||(g=new THREE.LineBasicMaterial,THREE.Material.prototype.copy.call(g,l),g.color.copy(l.color),g.lights=!1,H.cache.add(v,g)),l=g}if(p||c||d||h){v="ClonedMaterial:"+l.uuid+":";l.isGLTFSpecularGlossinessMaterial&&(v+="specular-glossiness:"),d&&(v+="skinning:"),p&&(v+="vertex-colors:"),c&&(v+="flat-shading:"),h&&(v+="morph-targets:"),f&&(v+="morph-normals:");var R=H.cache.get(v);R||(R=l.isGLTFSpecularGlossinessMaterial?L[b.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS].cloneMaterial(l):l.clone(),d&&(R.skinning=!0),p&&(R.vertexColors=THREE.VertexColors),c&&(R.flatShading=!0),h&&(R.morphTargets=!0),f&&(R.morphNormals=!0),H.cache.add(v,R)),l=R}(u[m]=l).aoMap&&void 0===s.attributes.uv2&&void 0!==s.attributes.uv&&(console.log("THREE.GLTFLoader: Duplicating UVs to support aoMap."),s.addAttribute("uv2",new THREE.BufferAttribute(s.attributes.uv.array,2))),l.isGLTFSpecularGlossinessMaterial&&(i.onBeforeRender=L[b.KHR_MATERIALS_PBR_SPECULAR_GLOSSINESS].refreshUniforms)}i.material=t?u:u[0]}if(1===r.length)return r[0];var M=new THREE.Group;for(a=0,n=r.length;a<n;a++)M.add(r[a]);return M})})},Y.prototype.loadCamera=function(e){var t,r=this.json.cameras[e],a=r[r.type];if(a)return"perspective"===r.type?t=new THREE.PerspectiveCamera(THREE.Math.radToDeg(a.yfov),a.aspectRatio||1,a.znear||1,a.zfar||2e6):"orthographic"===r.type&&(t=new THREE.OrthographicCamera(a.xmag/-2,a.xmag/2,a.ymag/2,a.ymag/-2,a.znear,a.zfar)),void 0!==r.name&&(t.name=r.name),k(t,r),Promise.resolve(t);console.warn("THREE.GLTFLoader: Missing camera parameters.")},Y.prototype.loadSkin=function(e){var t=this.json.skins[e],r={joints:t.joints};return void 0===t.inverseBindMatrices?Promise.resolve(r):this.getDependency("accessor",t.inverseBindMatrices).then(function(e){return r.inverseBindMatrices=e,r})},Y.prototype.loadAnimation=function(S){for(var y=this.json.animations[S],e=[],t=[],r=[],a=[],n=[],i=0,s=y.channels.length;i<s;i++){var o=y.channels[i],l=y.samplers[o.sampler],u=o.target,p=void 0!==u.node?u.node:u.id,c=void 0!==y.parameters?y.parameters[l.input]:l.input,d=void 0!==y.parameters?y.parameters[l.output]:l.output;e.push(this.getDependency("node",p)),t.push(this.getDependency("accessor",c)),r.push(this.getDependency("accessor",d)),a.push(l),n.push(u)}return Promise.all([Promise.all(e),Promise.all(t),Promise.all(r),Promise.all(a),Promise.all(n)]).then(function(e){for(var t=e[0],r=e[1],a=e[2],n=e[3],i=e[4],s=[],o=0,l=t.length;o<l;o++){var u=t[o],p=r[o],c=a[o],d=n[o],h=i[o];if(void 0!==u){var f;switch(u.updateMatrix(),u.matrixAutoUpdate=!0,_[h.path]){case _.weights:f=THREE.NumberKeyframeTrack;break;case _.rotation:f=THREE.QuaternionKeyframeTrack;break;case _.position:case _.scale:default:f=THREE.VectorKeyframeTrack}var m=u.name?u.name:u.uuid,E=void 0!==d.interpolation?C[d.interpolation]:THREE.InterpolateLinear,v=[];_[h.path]===_.weights?u.traverse(function(e){!0===e.isMesh&&e.morphTargetInfluences&&v.push(e.name?e.name:e.uuid)}):v.push(m);for(var T=0,g=v.length;T<g;T++){var R=new f(v[T]+"."+_[h.path],THREE.AnimationUtils.arraySlice(p.array,0),THREE.AnimationUtils.arraySlice(c.array,0),E);"CUBICSPLINE"===d.interpolation&&(R.createInterpolant=function(e){return new H(this.times,this.values,this.getValueSize()/3,e)},R.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0),s.push(R)}}}var M=void 0!==y.name?y.name:"animation_"+S;return new THREE.AnimationClip(M,void 0,s)})},Y.prototype.loadNode=function(e){var t=this.json,r=this.extensions,a=this,s=t.meshReferences,o=t.meshUses,l=t.nodes[e];return new Promise(function(i){!0===l.isBone?i(new THREE.Bone):void 0!==l.mesh?a.getDependency("mesh",l.mesh).then(function(e){var t;if(1<s[l.mesh]){var r=o[l.mesh]++;(t=e.clone()).name+="_instance_"+r,t.onBeforeRender=e.onBeforeRender;for(var a=0,n=t.children.length;a<n;a++)t.children[a].name+="_instance_"+r,t.children[a].onBeforeRender=e.children[a].onBeforeRender}else t=e;i(t)}):void 0!==l.camera?a.getDependency("camera",l.camera).then(i):l.extensions&&l.extensions[b.KHR_LIGHTS_PUNCTUAL]&&void 0!==l.extensions[b.KHR_LIGHTS_PUNCTUAL].light?a.getDependency("light",l.extensions[b.KHR_LIGHTS_PUNCTUAL].light).then(i):i(new THREE.Object3D)}).then(function(e){if(void 0!==l.name&&(e.name=THREE.PropertyBinding.sanitizeNodeName(l.name)),k(e,l),l.extensions&&B(r,e,l),void 0!==l.matrix){var t=new THREE.Matrix4;t.fromArray(l.matrix),e.applyMatrix(t)}else void 0!==l.translation&&e.position.fromArray(l.translation),void 0!==l.rotation&&e.quaternion.fromArray(l.rotation),void 0!==l.scale&&e.scale.fromArray(l.scale);return e})},Y.prototype.loadScene=function(){function p(e,s,o,l){var u=o.nodes[e];return l.getDependency("node",e).then(function(c){return void 0===u.skin?c:l.getDependency("skin",u.skin).then(function(e){for(var t=[],r=0,a=(d=e).joints.length;r<a;r++)t.push(l.getDependency("node",d.joints[r]));return Promise.all(t)}).then(function(e){for(var t=!0===c.isGroup?c.children:[c],r=0,a=t.length;r<a;r++){for(var n=t[r],i=[],s=[],o=0,l=e.length;o<l;o++){var u=e[o];if(u){i.push(u);var p=new THREE.Matrix4;void 0!==d.inverseBindMatrices&&p.fromArray(d.inverseBindMatrices.array,16*o),s.push(p)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',d.joints[o])}n.bind(new THREE.Skeleton(i,s),n.matrixWorld)}return c});var d}).then(function(e){s.add(e);var t=[];if(u.children)for(var r=u.children,a=0,n=r.length;a<n;a++){var i=r[a];t.push(p(i,e,o,l))}return Promise.all(t)})}return function(e){var t=this.json,r=this.extensions,a=this.json.scenes[e],n=new THREE.Scene;void 0!==a.name&&(n.name=a.name),k(n,a),a.extensions&&B(r,n,a);for(var i=a.nodes||[],s=[],o=0,l=i.length;o<l;o++)s.push(p(i[o],n,t,this));return Promise.all(s).then(function(){return n})}}(),e}();exports.default=_GLTFLoader;