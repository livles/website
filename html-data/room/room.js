import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js';
import {OrbitControls} from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js';
const camera = new THREE.PerspectiveCamera(75,window.innerWidth / window.innerHeight,0.1,1000);
camera.position.set(5, 3, 13);


const scene = new THREE.Scene();
// scene.background = new THREE.Color(0x404040);
const loader = new GLTFLoader();
let room;
loader.load('./room.glb',
    function(gltf) {
        console.log("GLTF:", gltf);
        scene.add(gltf.scene);
    }, function(xhr) {},
    function (error) {}
);

const ambientLight = new THREE.AmbientLight(0x404040, 3);
scene.add(ambientLight);

// const spotLight = new THREE.SpotLight(0xffffff, 2, 100, Math.PI / 6, 0.3);
// spotLight.castShadow = true;
// spotLight.position.set(5, 10, 6);

// const topLight = new THREE.DirectionalLight(0x404040, 0.5);
// topLight.position.set(0, 10, 0);
// topLight.castShadow = true;
// scene.add(topLight);

const renderer = new THREE.WebGLRenderer({alpha:false, antialias: true});
renderer.setSize(window.innerWidth,window.innerHeight);
document.getElementById('container3D').appendChild(renderer.domElement);


const animate = () => {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
};
animate();

// var loader = new GLTFLoader();
// loader.load('3droom.glb', function (gltf) {
//         room = gltf.scene;
//         room.scale.set(2,2,2);
//         room.position.y = 4;
//         scene.add(room);
// });