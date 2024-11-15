import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Load and apply Earth texture
const textureLoader = new THREE.TextureLoader();
const earthTexture = textureLoader.load('assets/earthdark.jpg');
const sphereGeometry = new THREE.SphereGeometry(3, 32, 32);
const sphereMaterial = new THREE.MeshBasicMaterial({ map: earthTexture });
const globe = new THREE.Mesh(sphereGeometry, sphereMaterial);
scene.add(globe);

camera.position.z = 7;

// Fetch and process data
const city = 'NewDelhi'; // Or any other city value you want to use
fetch(`http://127.0.0.1:5000/api/air-quality/${city}`)
    .then(response => response.json())
    .then(data => {
        data.locations.forEach(point => {
 
            // Create a small sphere for each data point
            const pointGeometry = new THREE.SphereGeometry(0.05, 8, 8);
            const pointMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
            const pointMesh = new THREE.Mesh(pointGeometry, pointMaterial);

            // Position the data point on the globe
            pointMesh.position.set(x, y, z);
            globe.add(pointMesh);
        });
    })
    .catch(error => console.error('Error fetching air quality data:', error));

// Animation loop
function animate() {
    globe.rotation.y += 0.01;
    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

// Handle window resize
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});