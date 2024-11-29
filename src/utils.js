//this file will add a marker on the globe. While displaying the temperature with different colors. Using New York as the example here
import * as THREE from 'three';

export function getTemperature(temp) {
    if (temp < 0) return 0x1E90FF; // cold temp
    else if (temp >= 0 && temp <= 20) return 0x00FF00; // mild temp
    else return 0xFF4500; // warm to hot temp
  }
  
  export function addMarker(temp, scene) {
    // create a marker to represent location
    const markerGeometry = new THREE.SphereGeometry(0.2, 8, 8);
    const markerMaterial = new THREE.MeshBasicMaterial({ color: getTemperature(temp) });
    const marker = new THREE.Mesh(markerGeometry, markerMaterial);
  
    // position the marker in the globe
    const latitude = 40.7128 * (Math.PI / 180); // convert to radians
    const longitude = -74.0060 * (Math.PI / 180);
    const radius = 5;
  
    marker.position.set(
      radius * Math.cos(latitude) * Math.cos(longitude),
      radius * Math.sin(latitude),
      radius * Math.cos(latitude) * Math.sin(longitude)
    );
  
    scene.add(marker);
  }
  