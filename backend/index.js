import express, { request, response } from "express";
import { PORT, mongoDBURL } from "./conf.js";
import mongoose from 'mongoose';
import { TODO } from "./models/todoModel.js";
import todoRoute from "./routes/todoRoute.js";
import cors from "cors";
const app = express();
app.use(express.json());
//Middleware for handling cors policy
app.use(cors());
//creating a http route @Rahul
app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('Welcome to my server');
});
app.use('/todoitems',todoRoute);
//mongodb connection @Rahul
mongoose.connect(mongoDBURL).then(() => {
    console.log("Successfully connected to database");
    app.listen(PORT, () => {
        console.log(`App is listening to port: ${PORT}`);
    })
}).catch((error) => {
    console.log(`Error:${error}`);

})
