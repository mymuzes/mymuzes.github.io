
import HikeModel from './HikesModel.js';
import HikesView from './HikesView.js';

export default class HikesController {
    constructor(parentId) {
      console.log(parentId)
      this.parentElement = document.querySelector(parentId); 
      // this is how our controller will know about the model and view...we add them right into the class as members.
      this.hikeModel = new HikeModel();
      this.hikesView = new HikesView(parentId);
    }
    
    showHikeList() {
      //  this will get called each time we need to display our full hike list. It should grab the list of hikes from the Model, and then send them to the view.
      this.hikesView.renderHikeList(this.hikeModel.getAllHikes(), this.hikeModel.comments);
    }
  
    showOneHike(hikeName) {
      // use this when you need to show just one hike...with full details
      
    }
    addHikeListener() {
      // for the stretch you will need to attach a listener to each of the listed hikes to watch for a touchend. 
    }
    addHikeCommentsListener() {
      const list = this.parentElement.childNodes;

      list.forEach(li => {
          if(li.innerText) {
            let button = li.querySelector('button');
            let input = li.querySelector('input');

            button.addEventListener('click', () => {

              const newComment = {
                name: li.querySelector('h2').innerText,
                date: new Date(),
                content: input.value
              };

              this.saveComment(newComment);
              input.value = '';
              this.hikesView.renderComments(li, this.hikeModel.comments);
            })
          }
      });
    }
    getComments() {
      let comments = JSON.parse(localStorage.getItem('comments'));
      this.hikeModel.comments = comments || [];
      console.log(this.hikeModel.comments);
    }
    saveComment(comment) {
      this.hikeModel.comments.push(comment);
      localStorage.setItem('comments',  JSON.stringify(this.hikeModel.comments))
    }
}