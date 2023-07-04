require("dotenv").config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 5000;

const connectDB = require("./config/dbConn");
const mongoose = require("mongoose");
connectDB();

const registerRoute = require('./routes/registerRoute');
const loginRoute = require('./routes/loginRoute');
const taskRoute = require('./routes/taskRoute');
const priorityRoute = require('./routes/priorityRoute');
const verifyJWT = require("./middleware/verifyJWT");

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use('/register', registerRoute);
app.use('/login', loginRoute);
app.use(verifyJWT);
app.use('/task', taskRoute);
app.use('/priority', priorityRoute);


mongoose.connection.once('open', () => {
    console.log('Connected to MONGO DB');
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    })
})
