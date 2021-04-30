window.onload = function() {
    createPostEvent();
}    

function createPostEvent() {
    const form = document.getElementById('create-post-form');
    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        // console.log(e.target); // The submitted form
        
        // Suggestion 1: Turning in the form data to a JSON string
        // let formDataObj = {
        //     content: document.getElementById('content-textarea').value
        // }
        // console.log(formDataObj);
        // console.log(JSON.stringify(formDataObj));

        // Suggestion 2: Turning in the form data to a JSON string
        // let formData = new FormData(e.target)
        // console.log(formData);
        // let formDataObj = {
        //     content: formData.get('content')
        // }
        // console.log(formDataObj);
        // console.log(JSON.stringify(formDataObj));


        // Suggestion 3: Turning in the form data to a JSON string
        console.log(serializeFormToJSON(e.target));


        try {
            await fetch('http://localhost:5000/posts', {
                method: 'POST', // *GET, POST, PATCH, DELETE, etc.
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
    });
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