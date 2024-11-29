//this js file is for calling the google trends from the server.py file to then be used in three.js

export function fetchDataTrends(callback) {
fetch('./trend_data.json')
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        callback(data); // data to the callback function
    })
    .catch(err => {
        console.error('Error fetching trends data:', err);
    });
}

