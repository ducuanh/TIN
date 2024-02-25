const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const db = require('./db');
const mainRoute = require('./routes/mainRoutes'); 
const authRoutes = require('./routes/authRoutes');

const app = express();

const corsOptions = {
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200 
  };

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/', mainRoute);
app.use('/auth', authRoutes);

app.use((req, res, next) => {
    res.status(404).send("Sorry, can't find that!");
});


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

module.exports = app;
