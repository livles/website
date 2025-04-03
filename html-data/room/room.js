import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js';

const camera = new THREE.PerspectiveCamera(50,window.innerWidth / window.innerHeight,0.1,1000);
camera.position.z = 13;
camera.position.set(5, 5, 13);


const scene = new THREE.Scene();
scene.background = new THREE.Color(0x404040);
const loader = new GLTFLoader();
let room;
loader.load('./room.glb',
    function(gltf) {
        console.log("GLTF:", gltf);
        scene.add(gltf.scene);
    }, function(xhr) {},
    function (error) {}
);

const renderer = new THREE.WebGLRenderer({alpha:true});
renderer.setSize(window.innerWidth,window.innerHeight);
document.getElementById('container3D').appendChild(renderer.domElement);

// const geometry = new THREE.TorusGeometry(10,3,16,100);
// const material =new THREE.MeshBasicMaterial({color: 0xFF6347, wireframe: true});
// const torus = new THREE.Mesh(geometry, material);
// scene.add(torus);

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