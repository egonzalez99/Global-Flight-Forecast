import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { fetchData } from './weatherdata.js'; // import fetchdata
import { addMarker } from './utils.js'; // Import marker

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
