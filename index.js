import express from "express";
import morgan from 'morgan';
import path from 'path';
import session from 'express-session';
import MySQLStore from 'express-mysql-session';
import passport from 'passport';
import cors from 'cors';
import {
    DB_HOST,
    DB_PORT,
    DB_USER,
    DB_PASSWORD,
    DB_DATABASE,
    PORT

} from './db/config.js';

import { pool } from './db/database.js';

// const express=require("express");
// const morgan=require('morgan');
// const path= require('path');
// const session=require('express-session');
// const MySQLStore=require('express-mysql-session')(session);
// const passport= require('passport');
// const {database} =require('./keys/keys');
// require('dotenv').config({ path: './.env' });

// Initializations express
const app=express();
app.use(express.static('build'));
import './lib/passport.js';
//Settings server
app.set('port',PORT);//the port "port" is used or, failing that, 4000


app.get('/ping', async(req, res)=> {
   const result= await pool.query('SELECT 1+1 AS result');
   res.json(result);
 });
 
 
//Middleware
app.use(session({
    secret:'coffeemysqlnodesession',
    resave:false,
    saveUninitialized:false,
    store:new MySQLStore({
        host: DB_HOST,
        user: DB_USER,
        password: DB_PASSWORD,
        port: DB_PORT,
        database: DB_DATABASE
})
}));
app.use(morgan('dev'));// con dev nos muestra un mensaje por consola
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cors());
app.use(passport.initialize());// passport iniciar
app.use(passport.session());// passport para guardar la sesión

//Global Variab les
app.use((req,res,next)=>{ //middleware  That will run on every incoming request
    app.locals.user=req.user;//set an application variable called "user"
    next();
});

//Routes
import routes from './routes/index.js';
import authentication from './routes/authentication.js';
import topics from './routes/topics.js';

app.use(routes);
app.use(authentication);
app.use('/topics', topics);



//Public
// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(new URL(import.meta.url).pathname, 'public')));
// Starting the server
app.listen(app.get('port'),()=>console.log(`coffe is listening on port ${app.get('port')}!`))
