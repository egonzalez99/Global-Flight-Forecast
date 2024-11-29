import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { fetchData } from './weatherdata.js'; // import fetchdata
import { addMarker } from './utils.js'; // Import marker
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
  const globeGeometry = new THREE.SphereGeometry(5, 32, 32);
  const globeMaterial = new THREE.MeshBasicMaterial({ color: 0x003366, wireframe: true });
  globe = new THREE.Mesh(globeGeometry, globeMaterial);
  scene.add(globe);

  // camera oosition
  camera.position.z = 10;

  // camera controls
  controls = new OrbitControls(camera, renderer.domElement);
  controls.update();

  fetchData((temp) => addMarker(temp, scene));  // passing the addMarker function with fetchData
  
  fetchDataTrends((data) => {
    data.forEach((item) => {
        const date = item.date; // Assuming 'date' exists in your JSON
        const interest = item.boots; // Assuming 'boots' is the keyword

        // Create a marker for the trend interest
        const markerGeometry = new THREE.SphereGeometry(0.1, 8, 8); // Small sphere
        const markerMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
        const marker = new THREE.Mesh(markerGeometry, markerMaterial);

        // Map data to the globe (adjust as needed)
        const latitude = 40.7128;
        const longitude = -74.0060;

        // Convert lat/lon to Cartesian coordinates
        const phi = (90 - latitude) * (Math.PI / 180);
        const theta = (longitude + 180) * (Math.PI / 180);
        const radius = 5; // Match the globe radius

        marker.position.set(
            radius * Math.sin(phi) * Math.cos(theta),
            radius * Math.cos(phi),
            radius * Math.sin(phi) * Math.sin(theta)
        );

      scene.add(bar); // Add to your Three.js scene
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
