import { Express } from 'express';// su dung kieu Express
import 'dotenv/config';//import dotenv tu dong load file .env
//require('dotenv').config();
import webrouters from './routers/app1';//import router tu file app1.ts

const express = require("express");
const app = express();

const PORT =process.env.PORT || 3000;// Dieu kien hoac neu ko chay thi chay tren 3000

//config view engine
 app.set('view engine', 'ejs');
app.set('views', './views');
 
//router
webrouters(app);

app.listen(PORT, () => {
    console.log(`App is running on port : ${PORT} `);
    console.log(`Link vao thang web: http://localhost:${PORT}`);
    console.log('ENV PORT:', process.env.PORT);
})

