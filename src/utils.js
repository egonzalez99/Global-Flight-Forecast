//this file will add a marker on the globe. While displaying the temperature with different colors. Using New York as the example here
import * as THREE from 'three';
import { fetchNewYorkData } from './weatherdata.js'; // Import fetch data
import { fetchFloridaData } from './weatherdata.js'; // Import fetch data

// Function to determine the color based on temperature
export function getTemperature(temp) {
  if (temp < 0) return 0x1E90FF; // cold temp (blue)
  else if (temp >= 0 && temp <= 20) return 0x00FF00; // mild temp (green)
  else return 0xFF4500; // warm to hot temp (orange)
}

// Function to add a marker to the globe at a specific latitude and longitude
export function addMarker(temp, scene, latitude, longitude) {
  const markerGeometry = new THREE.SphereGeometry(0.1, 7, 7);
  const markerMaterial = new THREE.MeshBasicMaterial({ color: getTemperature(temp) });
  const marker = new THREE.Mesh(markerGeometry, markerMaterial);

  // Convert latitude and longitude to 3D coordinates
  const phi = (90 - latitude) * (Math.PI / 180);
  const theta = (longitude + 125) * (Math.PI / 125);
  const radius = 5; // Adjust radius if necessary

  const position = new THREE.Vector3(
    radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );

  // Set the position of the marker
  marker.position.set(position.x, position.y, position.z);

  scene.add(marker); // Add the marker to the scene
}

// Function to fetch data and add markers for both New York and Florida
export function fetchDataAndAddMarkers(scene) {
  // Fetch data for both New York and Florida concurrently
  Promise.all([fetchNewYorkData(), fetchFloridaData()])
    .then(([nyData, flData]) => {
      // Add New York and Florida markers to the scene
      addMarker(nyData.temp, scene, nyData.latitude, nyData.longitude); // Add New York marker
      addMarker(flData.temp, scene, flData.latitude, flData.longitude); // Add Florida marker
    })
    .catch(error => {
      console.error('Error fetching weather data for both cities:', error);
    });
}