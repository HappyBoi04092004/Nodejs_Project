/// <reference path="./types/index.d.ts" />
import { Express } from 'express';// su dung kieu Express
import 'dotenv/config';//import dotenv tu dong load file .env
//require('dotenv').config();
import webrouters from './routers/app1';//import router tu file app1.ts
import initDatabase from "./config/seed";//import ham khoi tao database tu file seed.ts
import passport from 'passport';
import configPassportLocal from 'src/middleware/passport.local';
import session from 'express-session';
const { PrismaSessionStore } = require('@quixo3/prisma-session-store');
const { PrismaClient } = require('@prisma/client');

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

//config session
app.use(session({
    cookie: {
     maxAge: 7 * 24 * 60 * 60 * 1000 // ms
    },
    secret: 'a santa at nasa',
    resave: true,
    saveUninitialized: true,
    store: new PrismaSessionStore(
      new PrismaClient(),
      {
        checkPeriod: 2 * 60 * 1000,  //ms
        dbRecordIdIsSessionId: true,
        dbRecordIdFunction: undefined,
      }
    )
}));
//config passport
app.use(passport.initialize());
app.use(passport.authenticate('session'));
configPassportLocal();

//config global variables for views
app.use((req, res, next) => {
    res.locals.user = req.user || null;//pass user object to all views
    next();
});

//router
webrouters(app);

//seed database
initDatabase();

//handle 404 - Not Found
// app.use((req, res) => {
//     res.status(404).send("404 - Not Found");
// });

app.listen(PORT, () => {
    console.log(`App is running on port : ${PORT} `);
    console.log(`Link vao thang web: http://localhost:${PORT}`);
    console.log('ENV PORT:', process.env.PORT);
})

