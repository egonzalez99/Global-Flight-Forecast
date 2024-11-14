import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer();

renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( animate );
document.body.appendChild( renderer.domElement );

const textureLoader = new THREE.TextureLoader();
const earthTexture = textureLoader.load('assets/earthdark.jpg');

const sphereGeometry = new THREE.SphereGeometry( 3, 32, 32 );
const sphereMaterial = new THREE.MeshBasicMaterial( { map: earthTexture } );
const globe = new THREE.Mesh( sphereGeometry, sphereMaterial );

fetch('http://127.0.0.1:5000/api/air-quality/New%20York')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        // Process and display the data on your globe
    })
    .catch(error => console.error('Error fetching air quality data:', error));

scene.add( globe);

camera.position.z = 7;

function animate() {

  
	globe.rotation.y += 0.01;

	renderer.render( scene, camera );

}

// handle any window screen that is resizing
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});