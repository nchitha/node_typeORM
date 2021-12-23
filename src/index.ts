import "reflect-metadata";
import userRouter from "./routes/user.router";
import express = require('express');
import * as bodyParser from "body-parser";
const app = express();
const db = require("./db");
app.use(bodyParser.json());
app.use(userRouter);
app.listen(process.env.PORT, function (){
    console.log("Calling app.listen's callback function.",process.env.PORT);
});



