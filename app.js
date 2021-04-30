const express = require('express')    // Import exrepss, a light-weight framework
const app = express()                 // Init exrpess, and save it in "app" variable
const mongoose = require('mongoose'); // Import mongoose, a tool that gives NoSQL DB (such as Mongodb), the ablilities of a relational DB (such MySQL)
const bodyParser = require('body-parser'); 
const corse = require('cors');

app.use(corse());           // Allow cross-origin requests 
app.use(bodyParser.json()); // Formats data to Json
//middleware

const postRouter = require('./routes/posts');
app.use('/posts', postRouter);

// Connect to DB
// Replace <username>, <password> and <databasName> with you DB credentials, before uncommenting the line below
mongoose.connect(
   'mongodb+srv://new_user:12345@cluster0.2hnk8.mongodb.net/Cluster0?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
        console.log('DB connected');
    }
)


// Listen to server
app.listen(5000); //Listen through port 5000