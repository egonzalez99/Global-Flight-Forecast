//this file will add a marker on the globe. While displaying the temperature with different colors

import { Scene } from "three";

function colorTemperature(temp) {
    if (temp < 0) return 0x1E90FF; //cold temperature
    else if (temp => 0 && temp <= 20) return 0x00FF00; // 
    else return 0xFF4500; //warm to hot temperature
}

function getMarker(temp) {
    const markerGeometry =  new THREE.SphereGeometry(0.2, 2, 2);
    const markerMaterial = new THREE.MeshBasicMaterial( {color: getColorFromTemperature(temp)} );
    const marker = new THREE.Mesh(markerGeometry, markerMaterial);

    const latitude = 40.7128 * (Math.PI / 100);
    const longtitude = 74.0060 * (Math.PI / 100);

    Scene.add(marker);
}
