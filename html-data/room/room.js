import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js';
import {OrbitControls} from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js';

const canvas = document.getElementById("experience-canvas");
const renderer = new THREE.WebGLRenderer({canvas: canvas,alpha:false, antialias: true});
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
let lighton = true;
const exposureHigh = -3;
const exposureLow = -5;
let modalOpen = 1;
let camera,scene,controls, intersects, intersectObject, hoveredObject;

const modals = {
    about:  document.querySelector(".modal.about"),
    games:  document.querySelector(".modal.games"),
    nlp:    document.querySelector(".modal.nlp")
};


function setupScene() {
    
    renderer.setSize(window.innerWidth,window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.shadowMap.enabled = true;
    renderer.toneMappingExposure = Math.pow(2, -3);
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.setAnimationLoop(animate);
    document.body.appendChild(renderer.domElement);
    
    camera = new THREE.PerspectiveCamera(10,window.innerWidth / window.innerHeight,0.1,1000);
    camera.position.set(-30, 0, 30);
    
    scene = new THREE.Scene();
    scene.castShadow = true;
    scene.background = new THREE.Color( 0x404040 );
    
    
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
    renderer.render ( scene, camera );
    controls.update();
};

function startHoverAnimation(object) {

    gsap.to(object.scale, {
        duration: 0.5,
        x:1.8, y:1.8, z:1.8 ,
        ease: "back.out(1.8)"
    });

}

function endHoverAnimation ( object ) {
    
    gsap.to(object.scale, {
        duration: 0.5,
        x:1, y:1, z:1 ,
        ease: "back.out(1.8)"
    });
 
}

function onPointer( event ) {
    
    pointer.x = ( event.clientX / canvas.clientWidth ) * 2 - 1;
	pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    raycaster.setFromCamera( pointer, camera );
    
    if ( scene.children.length > 6 ) {
        intersects = raycaster.intersectObjects( scene.children[6].children );

        if ( intersects.length ) {
            intersectObject = intersects[0].object;
            
            if ( intersectObject != hoveredObject ) {
                if ( hoveredObject ) {
                    endHoverAnimation(hoveredObject);
                    hoveredObject = null;
                    
                }
                if ( intersectObject.name.includes("Raycaster") ) {
                    document.body.style.cursor = "pointer";
                    startHoverAnimation(intersectObject);            
                    hoveredObject = intersectObject;
                } else {
                    document.body.style.cursor = "default";
                }
            } else {
                document.body.style.cursor = "poimter";
            }

        } else {
            document.body.style.cursor = "default";
        }
        
    }
    
}


function onWindowResize () {
    console.log(modalOpen);
    if (modalOpen > 0) {
        console.log(modalOpen);
        canvas.style.width = "50%";
        canvas.style.overflow ="hidden";
         camera.aspect = canvas.clientWidth / window.innerHeight ;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth /2 ,window.innerHeight );
    
    } else {
        
        canvas.style.width = "100%";
        camera.aspect = window.innerWidth/ window.innerHeight ;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth  ,window.innerHeight );
    
    }
}

function setupButtons () {
    
    document.querySelectorAll( ".exit-modal" )
    .forEach( (button) =>
    button.addEventListener ( "click" , (e) => {
        const modal = e.target.closest ( ".modal" );
        hideModal(modal);
    })
    )
}

function setupTouch () {

    window.addEventListener( "pointermove", onPointer );
    window.addEventListener ( "pointerdown", onPointer);
    window.addEventListener( "pointerup", onClick );

}

function onClick () {
    if (intersects.length > 0) {
        const name = intersects[0].object.name;
        console.log(name);
        if ( name.includes ("schild") ) {
            showModal(modals.about);
        } else if ( name.includes ( "Controller" ) ) {
            showModal(modals.games);
        } else if ( name.includes ( "NLP" ) ) {
            showModal (modals.nlp);
        } else if (name.includes ( "switch" ) ) {
            if (lighton) {
                console.log("lighton");
                renderer.toneMappingExposure = Math.pow(2, exposureLow);
                scene.background = new THREE.Color( 0 );
                lighton = false;
            } else {
                renderer.toneMappingExposure = Math.pow(2,exposureHigh);
                scene.background = new THREE.Color( 0x404040 );
                lighton = true;
            }
        }
    }
}


function showModal ( modal ) {
    modal.style.display = "flex";
    modalOpen += 1 ;
    onWindowResize();    
}; 

function hideModal ( modal ) {
    modal.style.display = "none";
    modalOpen -= 1;
    onWindowResize();
}

function main () {
    setupScene();
    load3DModel();
    setupLight();
    setupButtons ();
    setupControls();
    setupTouch ();
    controls.listenToKeyEvents (renderer.domElement);
    
    window.addEventListener( 'resize', onWindowResize );
    gsap;
}

main();