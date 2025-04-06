import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js';
import {OrbitControls} from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js';

const renderer = new THREE.WebGLRenderer({alpha:false, antialias: true});
renderer.setSize(window.innerWidth,window.innerHeight);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.setPixelRatio( window.devicePixelRatio );
renderer.shadowMap.enabled = true;
const exposure = -3;
renderer.toneMappingExposure = Math.pow(2, exposure);
// renderer.toneMappingExposure = 1;
renderer.outputEncoding = THREE.sRGBEncoding;
document
.body
// .getElementById('container3D')
.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight,0.1,1000);
camera.position.set(-13, 10, 13);

const scene = new THREE.Scene();
scene.background = new THREE.Color( 0x404040 );
scene.castShadow = true;
const animate = () => {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
};


const controls = new OrbitControls(camera, renderer.domElement);
controls.minDistance = 2;
controls.maxDistance = 10;
controls.target.set( 0, 0, - 0.2 );


const loader = new GLTFLoader();
loader.load('./room.glb',
    function(gltf) {
        console.log("GLTF:", gltf);
        scene.add(gltf.scene);
    }, function(xhr) {},    
    function (error) {console.log(error	);}
);    

const redlight = new THREE.PointLight( 0xff0000,2, 5, 1);
redlight.position.set( 3, 3, 1 );
scene.add( redlight );
const greenlight = new THREE.PointLight( 0xffff,2, 5, 1);
greenlight.position.set(-1, 2,-3.5);
scene.add( greenlight );
const lampLight = new THREE.PointLight( 0xffffff,10, 2, 2);
lampLight.position.set(-1.601, 0.789, -1.741 );
scene.add( lampLight );

const topLight = new THREE.DirectionalLight(0xffffff, 10);
topLight.position.set(0,5,0);
scene.add(topLight);    

const hemisphereLight = new THREE.HemisphereLight(0x004040,0x400000,2);
hemisphereLight.position.set(3,0,3);
scene.add(hemisphereLight);
console.log(hemisphereLight);

const ambientLight = new THREE.AmbientLight(0x404040,2);
scene.add(ambientLight);


controls.update();  
window.addEventListener( 'resize', onWindowResize );

function onWindowResize() {

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

                console.log('rendered!!!');
				animate();

			}
animate();