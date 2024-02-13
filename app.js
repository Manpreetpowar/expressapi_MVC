const express = require('express');
const app = express();
const url = require('url');

require('./config/db');
require('dotenv').config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const admin = require('firebase-admin');
const path = require('path');

// const cronJob = require('./cronJobs'); 

// Resolve the path to the serviceAccountKey.json file
const serviceAccount = require(path.resolve(__dirname, 'aio-sports-c870a-firebase-adminsdk-4g0ql-b59bbed7a9.json'));

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});


app.get('/', (req, res) => {
    res.send('API Portal');
});

const apiRoutes = require('./routes/api.routes');
app.use('/api', apiRoutes);

const port  = process.env.PORT || 5000;

app.listen(port, ()=>{
 console.log(`server is running at http://localhost:${port}`);
})



