import { Express } from 'express';// su dung kieu Express
import 'dotenv/config';//import dotenv tu dong load file .env
//require('dotenv').config();
import webrouters from './routers/app1';//import router tu file app1.ts
import initDatabase from "./config/seed";//import ham khoi tao database tu file seed.ts

const express = require("express");
const app = express();

const PORT =process.env.PORT || 3000;// Dieu kien hoac neu ko chay thi chay tren 3000

//config view engine
 app.set('view engine', 'ejs');
app.set('views', './views');

//config req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

 //config static files
app.use(express.static('public'));

//router
webrouters(app);

//seed database
initDatabase();

app.listen(PORT, () => {
    console.log(`App is running on port : ${PORT} `);
    console.log(`Link vao thang web: http://localhost:${PORT}`);
    console.log('ENV PORT:', process.env.PORT);
})

