import express from "express";
const router= express.Router();
import {pool} from '../db/database.js';
import {isLoggedIn} from '../lib/auth.js';
//CRUD OF TOPICS
// router.get('/add', (req,res)=>{
//     res.send('Mostrar formulario');
// });

router.post('/add', isLoggedIn, async (req, res) => {
    const { topic, rango, language } = req.body;
    const newTopic = {
        topic,
        rango,
        language,
        user_id:req.user[0].id 
    };
    await pool.query('INSERT INTO topics set?', [newTopic]);// peticion asincrona
    res.send('true');
});


router.get('/',isLoggedIn, async (req, res) => {   // querythe DATABASE for topics saved 
    // console.log('passs midleware')
    const topics = await pool.query('SELECT *FROM topics WHERE user_id=?',[req.user[0].id]);
    res.send(topics[0]);
});

router.get('/delete/:id',isLoggedIn, async (req, res) => {
    const {id} = req.params;
    // console.log(id);
    await pool.query('DELETE FROM topics WHERE id = ?', [id]);
    res.send('true');
}); 

router.get('/edit/:id',isLoggedIn, async (req, res) => {
    const { id } = req.params;
    const topic = await pool.query('SELECT * FROM topics WHERE id=?', [id]);
    res.send(topic[0]);
});
   
router.post('/edit/:id',isLoggedIn, async (req, res) => { 
    const { id } = req.params;
    const { topic, rango, language } = req.body; 
    const newTopic = {
        topic,
        rango, 
        language
    };
    await pool.query('UPDATE topics set ? WHERE id = ?', [newTopic, id]);
    res.send('true');
});

export default router;


 