const express = require("express");
const app = express();
const cors = require('cors');
const mongoose = require("mongoose");
const config = require('./utils/config');
const menuRouter = require("./routes/menuRoutes");
const paymentRouter = require('./routes/paymentRoutes')

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

// connecting to mongoDB
mongoose.connect(config.MONGO_URL)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.log('Error connecting to MongoDB:', error.message);
    })


// root end point
app.get('/main', (request, response) => {
    response.send('<h1>Welcome to cafe Backend App!</h1>');
});

// routers
app.use('/menu', menuRouter);
app.use('/payment', paymentRouter);

// port for server
const PORT = config.PORT || 8080;

// Listen to the PORT for requests
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
