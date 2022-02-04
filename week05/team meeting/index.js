import HikesController from "./HikesController.js";

const hikesControl = new HikesController('#hikeList');

setTimeout(() => {
    hikesControl.showHikeList();
}, 100);