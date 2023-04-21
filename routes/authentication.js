import express from "express";
const router= express.Router();
import passport from 'passport';;// midleware authentication 
import {isLoggedIn,isNotLoggedIn} from '../lib/auth.js';

// const {isLoggedIn, isNotLoggedIn}= require('../lib/auth');

// router.get('/signup',isNotLoggedIn,(req,res)=>{
//     res.send('false');
// });

router.post('/signup', isNotLoggedIn, passport.authenticate('local.signup',{
    successRedirect:'/passprofile',
    failureRedirect:'/signup',
    // failureFlash:true
}));

router.post('/signin', isNotLoggedIn,(req, res, next )=>{
    passport.authenticate('local.signin', {
            successRedirect:'/passprofile',
            failureRedirect:'/nosignin',
            failureFlash: true
    }) (req, res, next);
    });
//No show button for signin or signup in App Web
router.get('/passprofile',isLoggedIn,(req,res)=>{
res.send("true");
});
//show button for signin or signup in App Web
router.get('/nosignin',isNotLoggedIn, (req,res)=>{
    res.send('false');
});

router.get('/logout',isLoggedIn, (req,res)=>{
    req.logOut(()=>{
        console.log('EXIT')
    });
});
export default router;