import passport from 'passport';
import LocalStrategy from 'passport-local';
import {pool} from '../db/database.js';
import {encryptPassword,matchPassword} from '../lib/helpers.js';

passport.use('local.signin', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    const rows = await pool.query('SELECT * FROM users WHERE username=?', [username]);
    if (rows.length > 0) {
        const user = rows[0][0];
        console.log(user);
        const validPassword = await matchPassword(password, user.password);
        if (validPassword) {
            done(null, user, console.log('Welcome' + user.username));
        } else {
            done(null, false, console.log('incorrect password'))
        }
    } else { 
        return done(null, false, console.log('The Username does  not exists'));  
    }
}));

passport.use('local.signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    const { fullname } = req.body;
    const { age } = req.body;
    const newUser = {
        username,
        password,
        fullname,
        age
    };
    newUser.password = await encryptPassword(password);
    const result = await pool.query('INSERT INTO users SET?', [newUser]);
    newUser.id = result[0].insertId;
    return done(null, newUser);
})); 
// passport
passport.serializeUser((user, done) => {
    done(null, user.id);

});
passport.deserializeUser(async (id, done) => {
    const rows = await pool.query('SELECT*FROM users Where id=?', [id]);
    done(null, rows[0]);
});