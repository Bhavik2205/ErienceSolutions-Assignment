import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import './node_modules/dotenv/config.js';
import DataRoutes from './route.js';

const app = express();

//Middleware
app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}));
app.use(cors());

app.use('/data', DataRoutes);

//Port
app.listen(process.env.PORT);

//DB Connection
mongoose.connect(process.env.DB_CONNECTION, {useUnifiedTopology: true, useNewUrlParser: true})
    .then(() => {
        console.log(`Server Started successfully on PORT: ${process.env.PORT}`)
    })
    .catch((error) => {
        console.error({message: error.message})
    })