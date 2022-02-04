export default class HikesView {
    listElementId
    constructor(listElementId) {
        this.listElementId = listElementId;
        this.imgBasePath = '//byui-cit.github.io/cit261/examples/';
    }
    renderHikeList(hikeList) {
        // loop through our list of hikes building out the appropriate HTML for each and append it to the listElement
        for(let hike in hikeList) {
            document.querySelector(this.listElementId).innerHTML += this.renderOneHikeLight(hikeList[hike]);
        }
    }
    renderOneHikeLight(hike) {
        // this method will be used to create the list of hikes with less detail: name, image, distance, difficulty
        const item = document.createElement("li");
        item.innerHTML = ` <h2>${hike.name}</h2>
        <div class="image"><img src="${this.imgBasePath}${hike.imgSrc}" alt="${hike.imgAlt}"></div>
        <div>
                <div>
                    <h3>Distance</h3>
                    <p>${hike.distance}</p>
                </div>
                <div>
                    <h3>Difficulty</h3>
                    <p>${hike.difficulty}</p>
                </div>
        </div>`;
        return item.innerHTML;
    }
}