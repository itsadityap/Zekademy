require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const fileUpload = require('express-fileupload')

const port = process.env.SERVER_PORT || 8080;

// Default Middlewares
app.use(express.json());
app.use(cors());
app.use(fileUpload())

// Importing Routes
const authRoutes = require('./routes/auth');
const uploadRoute = require('./routes/upload')
const getImage = require('./routes/getImage')

// MongoDB Configuration.
mongoose.connect(process.env.MONGO_DB_URL, {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
})
.then(() => {
    console.log("Database Connected");
})
.catch((err) => {
    console.log(err);
});

// Implementing Routes.
app.use('/api/v1', authRoutes);
app.use('/api/v1', uploadRoute)
app.use('/api/v1', getImage)

// Starting the server.
app.listen(port, () => {
  console.log(`Server is listening on PORT: ${port}`);
});
