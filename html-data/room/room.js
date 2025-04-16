import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js';
import {OrbitControls} from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js';


const canvas = document.getElementById("experience-canvas");
const renderer = new THREE.WebGLRenderer({canvas: canvas,alpha:false, antialias: true});
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
let camera,scene,controls, intersects;

function setupScene() {
    
    renderer.setSize(window.innerWidth,window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.shadowMap.enabled = true;
    renderer.toneMappingExposure = Math.pow(2, -3);
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.setAnimationLoop(animate);
document.body.appendChild(renderer.domElement);
    
    camera = new THREE.PerspectiveCamera(15,window.innerWidth / window.innerHeight,0.1,1000);
    camera.position.set(-30, 0, 30);
    
    scene = new THREE.Scene();
    scene.castShadow = true;
    // scene.background = new THREE.Color( 0x404040 );
    
    
}

function setupControls() {
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.update();  

}

function setupLight() {

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
    
    const ambientLight = new THREE.AmbientLight(0x404040,2);
    scene.add(ambientLight);
}
    
function load3DModel() {

    const loader = new GLTFLoader();
    loader.load('./room2.glb',
        function(gltf) {
            scene.add(gltf.scene);
        }, function(xhr) {},    
        function (error) {console.log(error	);}
    );       
}



function animate (){
    // camera.updateMatrixWorld();
    renderer.render ( scene, camera );
    controls.update();
};

function onPointer( event ) {
    
    pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    raycaster.setFromCamera( pointer, camera );
    
    if ( scene.children.length > 6 ) {

        intersects = raycaster.intersectObjects( scene.children[6].children );
        if ( 0 != intersects.length && intersects[0].object.name.includes("Raycaster")) {
            document.body.style.cursor = "pointer";
        } else {
            document.body.style.cursor = "default";
        }

    }

}


function onWindowResize () {
    
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
    
}

function onClick () {
    if (intersects.length > 0) {
        intersects[0].object;
    }
}

function main () {
    setupScene();
    load3DModel();
    setupLight();

    setupControls();
    controls.listenToKeyEvents (renderer.domElement);
    
    window.addEventListener( 'mousemove', onPointer );
    window.addEventListener( 'resize', onWindowResize );
    window.addEventListener( 'click', onClick );
}

main();