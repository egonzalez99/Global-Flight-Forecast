import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { fetchDataAndAddMarkers } from './utils.js'; // Import marker
import { fetchDataTrends } from './trendsdata.js'; //import trend data

// create the template for the scenary and variables
let scene, camera, renderer, globe, controls;

theScene();
animate();

function theScene() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // create the globe visuals
  const textureLoader = new THREE.TextureLoader();
  const earthTexture = textureLoader.load('assets/earthdark.jpg');
  const globeGeometry = new THREE.SphereGeometry(5, 32, 32);
  const globeMaterial = new THREE.MeshBasicMaterial( { map: earthTexture });
  globe = new THREE.Mesh(globeGeometry, globeMaterial);
  scene.add(globe);

  // camera oosition
  camera.position.z = 10;

  // camera controls
  controls = new OrbitControls(camera, renderer.domElement);
  controls.update();

  fetchDataAndAddMarkers(scene);

  fetchDataTrends((data) => {
    data.forEach((item) => {
        console.log(data);
        const date = item.date; // Assuming 'date' exists in your JSON
        const interest = item.boots; // Assuming 'boots' is the keyword

        // create a marker for the trend data
        const markerGeometry = new THREE.SphereGeometry(0.1, 8, 8); 
        const markerMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
        const marker = new THREE.Mesh(markerGeometry, markerMaterial);

        // NY coordinates
        const nyLatitude = 40.7128;
        const nyLongitude = -74.0060;

        // Florida coordinates
        const flLatitude = 27.994402;
        const flLongitude = -81.760254;

        // For New York
        const nyPhi = (90 - nyLatitude) * (Math.PI / 180);
        const nyTheta = (nyLongitude + 125) * (Math.PI / 125);
        const radius = 5; // Adjust radius if needed

        // For Florida
        const flPhi = (90 - flLatitude) * (Math.PI / 180);
        const flTheta = (flLongitude + 125) * (Math.PI / 125);

        // Create a marker for New York
        const nyMarker = new THREE.Mesh(markerGeometry, markerMaterial);
        nyMarker.position.set(
            radius * Math.sin(nyPhi) * Math.cos(nyTheta),
            radius * Math.cos(nyPhi),
            radius * Math.sin(nyPhi) * Math.sin(nyTheta)
        );

        // Create a marker for Florida
        const flMarker = new THREE.Mesh(markerGeometry, markerMaterial);
        flMarker.position.set(
            radius * Math.sin(flPhi) * Math.cos(flTheta),
            radius * Math.cos(flPhi),
            radius * Math.sin(flPhi) * Math.sin(flTheta)
        );

        // Add markers to the scene
        scene.add(nyMarker); // Add NY marker
        scene.add(flMarker); // Add Florida marker
    });
  });
}

// animation
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

// scale the globe with the window size
window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});
