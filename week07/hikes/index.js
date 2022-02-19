import HikesController from "./HikesController.js";

const hikesControl = new HikesController('#hikeList');

setTimeout(() => {
    hikesControl.getComments();
    hikesControl.showHikeList();
    hikesControl.addHikeCommentsListener();
}, 100);