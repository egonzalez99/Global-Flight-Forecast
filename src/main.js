import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

camera.position.z = 4;

// create a globe 
const radius = 2;
const globeGeometry = new THREE.SphereGeometry(radius, 32, 32);
const globeMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff, wireframe: true });
const globe = new THREE.Mesh(globeGeometry, globeMaterial);
scene.add(globe);

// Fetch Ozone Data from Flask server
async function fetchOzoneData() {
    const response = await fetch('http://127.0.0.1:5000/api/ozone-data');
    const data = await response.json();
    plotOzoneData(data);
}

// Plot Ozone Data onto the Globe
function plotOzoneData(data) {
    data.forEach(({ lat, lon, ozone }) => {
        // basic 3D lat/lon 
        const phi = (90 - lat) * (Math.PI / 180);
        const theta = (lon + 180) * (Math.PI / 180);

        const x = radius * Math.sin(phi) * Math.cos(theta);
        const y = radius * Math.cos(phi);
        const z = radius * Math.sin(phi) * Math.sin(theta);

        // creat a marker to represent ozone 
        const pointGeometry = new THREE.SphereGeometry(0.02, 5, 5);
        const pointMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000  });
        const point = new THREE.Mesh(pointGeometry, pointMaterial);
        point.position.set(x, y, z);
        scene.add(point);
    });
}

fetchOzoneData();

// animation loop
function animate() {
    requestAnimationFrame(animate);
    globe.rotation.y += 0.001;  
    renderer.render(scene, camera);
}
animate();

// Handle window resize
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

