const express = require('express');
const app = express();
require('./config/db');
require('dotenv').config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('API Portal');
});

const apiRoutes = require('./routes/api.routes');
app.use('/api', apiRoutes);

const port  = process.env.PORT || 5000;

app.listen(port, ()=>{
    console.log(`server is running at http://localhost:${port}`);
})



