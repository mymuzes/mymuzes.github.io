// array design for a new comment
// const newComment = [{
//     name: hikeName,
//     date: new Date(),
//     content: comment,
//     type: hike
// }];

// MVC layout (from team mate slack) -- model
class CommentModel {
    constructor(type) {
        this.type = type;
        // either instantiate a new array or get it from storage if it is there
        this.comments = readFromLS(this.type) || [];
    }
    getAllComments(query = null) {
        if (query === null) { // if there is no query return all
            return this.comments;
        } else {
            return this.comments.filter(ele => ele.name === query);
        }
    }

    // call method to add a comment
    addComment(postBy, comment) {
        const newComment = {
            name: postBy,
            comment: comment,
            date: new Date()
        };
        this.comments.push(newComment); // push above comments to the array new comment
        writeToLS(this.type, this.comments);
    }

} // ends commentModel class


// read and write functions
// get the comments from the array save to local storage, and to read from storage
function writeToLS(key, data) {
    // we can use JSON.stringify to convert our object to a string that can be stored in localStorage.
    window.localStorage.setItem(key, JSON.stringify(data));
    console.log('saving');
}

function readFromLS(key) {
    // the string we retrieve from localStorage needs to be converted back to an object with JSON.parse
    return JSON.parse(window.localStorage.getItem(key));
}


// the comment VIEW is built with a single function using this variable commentUI 
const commentUI = `<div class="addComment">
<h2>Add a comment</h2>
<input type="text" id="commentEntry" />
<button id="commentSubmit">Comment</button>
</div>
<h2>Comments</h2>
<ul class="comments"></ul>`;

function renderCommentList(element, comments) {
    // clear out any comments that might be listed
    element.innerHTML = '';
    // add the new list of comments
    comments.forEach(ele => {
      let item = document.createElement('li');
      item.innerHTML = `
              ${ele.name}: ${ele.comment}
        `;
  
      element.appendChild(item);
    });
  }



class Comments {
    constructor(type, commentElementId) {
        this.type = type;
        this.commentElementId = commentElementId;
        this.model = new CommentModel(this.type);

        // constructor(name, date, comment = [], type) {
        // this.hikeName = name;
        // this.date = date;
        // this.content = comment;
        // this.parentElement = document.getElementById('comments');
    }
    addCommentListener(postBy) {
        // use element.ontouchend to avoid more than one listener getting attached at a time to the button.
        document.getElementById('commentSubmit').onclick = () => {
          // debugger;
          this.model.addComment(
            postBy,
            document.getElementById('commentEntry').value
          );
          document.getElementById('commentEntry').value = '';
          this.showCommentList(postBy);
        };
      }

    showCommentList(query = null) {
        try {
            const parent = document.getElementById(this.commentElementId);
            if (!parent) throw new Error('comment parent not found');
            // check to see if the commentUI code has been added yet
            if (parent.innerHTML === '') {
              parent.innerHTML = commentUI;
            }
            if (query !== null) {
              // looking at one post, show comments and new comment button
              document.querySelector('.addComment').style.display = 'block';
              this.addCommentListener(query);
            } else {
              // no post name provided, hide comment entry
              document.querySelector('.addComment').style.display = 'none';
            }
            // get the comments from the model
            let comments = this.model.getAllComments(query);
            if (comments === null) {
              // avoid an error if there are no comments yet.
              comments = [];
            }
            renderCommentList(parent.lastChild, comments);
        } catch (error) {
            console.log('Whats going on here?');
        }
    }
} // ends Comment class
export default Comments;
