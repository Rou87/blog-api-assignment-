window.onload = function() {
     fetchAllPosts();
 }    
 
 async function fetchAllPosts() {
     try {
          const response = await fetch('http://localhost:5000/posts');
          const posts = await response.json();
          console.log(posts);
          
          let postsHTML = '';
          for (let post of posts) {
               let dateObj = new Date(post.date);
 
               postsHTML += `
                         <tr>
                              <th scope="col">Title</th>
                              <th scope="col">Author</th>
                              <th scope="col">Content</th>
                              <th scope="col">Date</th>
                              <tbody>
                              <tr>
                                <td scope="row">${post.title}</td>
                                <td>${post.author}</td>
                                <td>${post.content}</td>
                                <td>${formatDate(dateObj)}</td>
                              </tr>
                            </tbody>
                         </tr><br> 
                              <a href="update-post.html?id=${post['_id']}"><button type="button" class="btn btn-success">Update</button></a>
                              <button type="button" class="btn btn-danger delete-link" data-id="${post['_id']}">Delete</button>                           
               `;
          }
 
          document.getElementById('post-list').innerHTML = postsHTML;
     } catch (error) {
          console.log(error);
     }
 
     /**
     * Add here an eventlistener to all delete-links, 
     * that makes a request to delete the chosen pun from DB, 
     * And also deletes the pun from the DOM
     * 
     * 1. Begin with selecting all delete-links with an appropiate element selector
     * 2. Loop through all delete-links and add an eventlistener for each delete-link,
     * 3. The eventlisteners should be triggered on the 'click'-event
     * 4. Make sure to use preventDefault(), to prevent the link from reloading the page
     * 5. When triggered, the eventlistener should make a "DELETE" request to the URL: https://puns-app.herokuapp.com/puns/<punID>, and the <punId> should be retrieved from delete-link data-attribute => 'this.dataset.id'
     * 6. Make sure to remove() the whole pun from DOM.
     */
 
     // Code your solution for the delete-links here
     deletePostEvent();
 }
 
 function formatDate(dateObj) {
     return `${dateObj.getFullYear()}/${dateObj.getMonth()}/${dateObj.getDate()} -Time:${dateObj.getHours()}:${dateObj.getMinutes()}`;
 }
 
 function deletePostEvent () {
     let deletePostLinks = document.getElementsByClassName('delete-link');
 
     for (deleteLink of deletePostLinks) {
          deleteLink.addEventListener('click', async function(e) {
               e.preventDefault();
 
               let theClickedLink = e.target;
               let postId = theClickedLink.dataset.id;
               console.log(postId);
 
               try {
                    await fetch('http://localhost:5000/posts/' + postId, {
                         method: 'DELETE', // *GET, POST, PATCH, DELETE, etc.
                    });
                    
                    theClickedLink.parentNode.parentNode.remove();
                    window.location.replace('index.html');
               } catch (error) {
                    console.log(error);
               }
          })
     }
 }