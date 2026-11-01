require('dotenv').config();
const express = require('express');
const cors = require('cors');

const connectDB = require('./databases/connectDB.js');
const RequestLogger = require("./middlewares/logger.js");
const errorHandler = require("./middlewares/errorHandler.js");

const ArticleRoutes = require('./routes/article.route.js');



const app = express();
const PORT= process.env.PORT;

connectDB();

app.use(express.json());

app.use(cors('*'));

app.use(RequestLogger);

app.use(errorHandler);

app.use('api/', ArticleRoutes);

app.listen(PORT, () =>{
    console.log(`server is listening at ${PORT}`);
});