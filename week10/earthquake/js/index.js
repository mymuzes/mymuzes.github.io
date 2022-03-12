import QuakesController from '../controllers/QuakesController.js';
import { getJSON, getLocation } from '../js/utilities.js';

const baseUrl = 'https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson' +
    `&starttime=2020-01-01` +
    `&endtime=2020-06-01` +
    `&latitude=-17.37` +
    `&longitude=-66` +
    `&maxradiuskm=500`

const json = getJSON(baseUrl).then(data => console.log(data));

getLocation().then(data => {
    const latitude = data.coords.latitude;
    const longitude = data.coords.longitude;
    const position = {
        lat: latitude,
        lon: longitude
    }
    console.log(position);
    const quakesController = new QuakesController("#quakeList", position);
    console.log(quakesController);
    quakesController.init();
    quakesController.getQuakesByRadius(500);
});
