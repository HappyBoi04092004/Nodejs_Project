//const express = require("express");
import express from "express";
const app = express();

const PORT =8080;
app.get('/', (req,res) => {
    res.send ('App is running');
    }
)
app.get('/1', (req,res) => {
    res.send ('Hello world');
    }
)

app.listen(PORT, () => {
    console.log(`App is running on port : ${PORT} `);
})

