//node modules import
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';
import path from "path";
import { fileURLToPath } from 'url';


//custom modules importing
import testRouter from './routes/testRouter.js';
import userRouter from './routes/userRouter.js';

// to deploy on heroku
import postMessageRouter from './routes/postMessageRouter.js';
import storyRouter from './routes/storyRouter.js';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);


import { connectSync, connectDB } from './helpers/dbConnect.js';

const server = express();
//loading environment variables
dotenv.config();

// using the middelwares
server.use(cors()); // version 0 : enabling sharing with other servers
server.use(express.json()); // accessing the request body 

server.use(express.static(path.join(__dirname, "../client/build" )))


// using the routes
    // testing route
    server.use('/test', testRouter);
    // users routes
    server.use('/user', userRouter);
    // posts routes
    server.use('/posts', postMessageRouter);
    // story routes
    server.use('/story', storyRouter);

    // To render react build

    server.use("*",(req, res) => {
        res.sendFile(path.join(__dirname, "../client", "build", "index.html"));
    } )


 // connecting to our db
    // connecting syncronesslly
    // connectSync(); : bad practise
    // connecting async
    connectDB(); // best practise
    mongoose.connection.on("open", () => {
        console.log("connected to db");
    });
    mongoose.connection.on("error", (error) => {
    console.log("Connection to MongoDB has faild ", error.message);
        
});
    

// defining a PORT variable
const PORT = process.env.PORT;

// listening to the PORT. and running the server
server.listen(PORT, () => console.log(`Server is listening to port ${PORT} and running`));
