//this file will add a marker on the globe. While displaying the temperature with different colors

function colorTemperature(temp) {
    if (temp < 0) return 0x1E90FF; //cold temperature
    else if (temp => 0 && temp <= 20) return 0x00FF00; // 
    else return 0xFF4500; //warm to hot temperature
}

function getMarker(temp) {
    //const marker 
}