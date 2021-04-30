window.onload = function() {
    /**
     * Fetch here the specific pun that is about to be updated.
     * Prefill the textarea with the fetched pun content
     * 
     * 1. Begin with retrieving the punId from the queryString, check out window.location.search (google or console.log()) 
     * 2. Use the built-in JS Object 'URLSearchParams' to extract the queryString  => let urlParams = new URLSearchParams(window.location.search)
     * 3. Use urlParams to retrieve the punId like so => urlParams.get('id'); 
     * 4. Now you can fetch the specific pun by making a "GET" request to: https://puns-app.herokuapp.com/puns/<punId>, where <punId> is the value of urlParams.get('id')
     * 5. Use the fetched pun data to prefill the textarea#content-textarea
     */

    prefillForm();
   


    /**
     * Add here an eventlistener to update the pun, when the form is submitted
     * 
     * 1. Begin with selecting the form, and add an eventlistener on the form, that gets triggered with the 'submit'-event
     * 2. Make sure to use preventDefault(), to prevent the form from reloading the page
     * 3. Update the specific pun by making a "PATCH" request to: https://puns-app.herokuapp.com/puns/<punId>, where <punId> is the value of urlParams.get('id')
     * 4. Make sure the formdata is sent in to the body parameter, when making the request. See how its done with the create pun request in create-pun.js
     * 5. If the form was successfully submitted, then redirect to the index.html with the following code: window.location.replace('index.html');
     */

    updatePostEvent();
}


async function prefillForm() {
    let queryString = window.location.search;
    console.log(queryString);
    let urlParams = new URLSearchParams(window.location.search)
    let postId = urlParams.get('id');
    console.log(postId);


    try {
        const response = await fetch('http://localhost:5000/posts/' + postId);
        const post = await response.json();
        console.log(post);

        document.getElementById('title').innerHTML = post.title;
        document.getElementById('author').innerHTML = post.author;
        document.getElementById('content').innerHTML = post.content;
    } catch (error) {
        console.log(error);
    }
}

function updatePostEvent() {
    let form = document.getElementById('update-post-form');

    let urlParams = new URLSearchParams(window.location.search)
    let postId = urlParams.get('id');
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        console.log(serializeFormToJSON(e.target));

        try {
            await fetch('http://localhost:5000/posts/' + postId, {
                method: 'PATCH', // *GET, POST, PATCH, DELETE, etc.
                headers: {
                  'Content-Type': 'application/json'
                  // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: serializeFormToJSON(e.target) // body data type must match "Content-Type" header
            });

            window.location.replace('index.html');
        } catch (error) {
            console.log(error);
        }
    })
}



function serializeFormToJSON(form) {
    let obj = {};
    let formData = new FormData(form);
    
    for (let key of formData.keys()) {
        // console.log(key);
        let inputData = formData.getAll(key);
        // console.log(inputData);

        if (inputData.length > 1) {
            obj[key] = inputData;
        } else {
            obj[key] = inputData[0];
        }
    }

    // console.log(obj);
    return JSON.stringify(obj);
}