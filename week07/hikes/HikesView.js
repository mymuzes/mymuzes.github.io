export default class HikesView {
    listElementId
    constructor(listElementId) {
        this.listElementId = listElementId;
        this.imgBasePath = '//byui-cit.github.io/cit261/examples/';
    }
    renderHikeList(hikeList, comments) {
        // loop through our list of hikes building out the appropriate HTML for each and append it to the listElement
        for(let hike in hikeList) {
            document.querySelector(this.listElementId).innerHTML += this.renderOneHikeLight(hikeList[hike], comments);
        }
    }
    renderOneHikeLight(hike, comments) {
        // this method will be used to create the list of hikes with less detail: name, image, distance, difficulty
        const item = document.createElement("li");

        item.innerHTML = `<li> <h2>${hike.name}</h2>
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
        </div>
        <ul>
        </ul>
        <input type="text" placeholder="Comment">
        <button>Send</button>
        </li>
        `;
        
        this.renderComments(item, comments);

        return item.innerHTML;
    }
    renderComments(item, comments) {
        let filteredComments = comments.filter(i => i.name == item.querySelector('h2').innerText);
        let ul = item.querySelector('ul');
        ul.innerHTML = '';

        filteredComments.forEach(i => {
            ul.innerHTML += `
            <li>
            <h4>Comment: ${i.content}</h4>
            <p>date: ${i.date}</p>
            </li>
            `
        }) 
    }
}