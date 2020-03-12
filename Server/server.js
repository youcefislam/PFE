const express = require('express');
const mysql = require('mysql');

// used for hashing password
const bcrypt = require("bcryptjs");
const saltRounds = 10;

var app = express();
app.use(express.json({ limit: '1mb' }));

// use token 
var jwt = require("jsonwebtoken");
const MySecretKey = 'H43%s#2Bo9PZ#d$X&d6';

//validation for the register requests
const Joi = require('@hapi/joi');
const SignUpSchema = Joi.object({
    username: Joi.string().min(8).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
});

//validation for the login requests
const SignInSchema = Joi.object({
    username: Joi.string().min(8).required(),
    password: Joi.string().min(6).required(),
});

// creating connection with database 
var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'testing'
});
db.connect();




// middleware Verify token
function verifyToken(req, res, next) {
    //get auth header value 
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        //splite the bearerHeaser
        const bearer = bearerHeader.split(" ");
        // take the bearer token
        const bearerToken = bearer[1];
        // set the request token 
        req.token = bearerToken;
        // next middleware
        next();
    } else {
        // forbiden
        res.sendStatus(403);
    }
}


// registre request 
app.post('/users/register', async (req, res) => {

    let Responsemessage = { errors: true, message: '' };
    // validating the data 
    const { error, value } = SignUpSchema.validate(req.body);
    if (error) {
        Responsemessage.message = error.message;
        res.send(JSON.stringify(Responsemessage));
    }
    else {
        bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
            if (err) throw err;
            const sql = 'insert into users (email,password,username) values (?,?,?)';
            try {
                db.query(sql, [req.body.email, hash, req.body.username], (err, result) => {
                    if (err) {
                        if (err.sqlMessage.includes('username')) Responsemessage.message = 'username already in use';
                        else if (err.sqlMessage.includes('email')) Responsemessage.message = 'email already in use';
                    } else {
                        Responsemessage.errors = false;
                        Responsemessage.message = 'Your account has been created !';
                    }
                    res.send(JSON.stringify(Responsemessage));
                })
            } catch (err) {
                console.log(err);
            };
        })

    }
})


//login request 
app.post('/users/login', (req, res) => {

    const { error, value } = SignInSchema.validate(req.body);
    if (error) {
        Responsemessage.message = error.message;
        res.send(JSON.stringify(Responsemessage));
    };
    const username = req.body.username;
    const password = req.body.password;

    if (username && password) {
        const sql = 'SELECT * FROM users where username=?';
        try {
            db.query(sql, req.body.username, (err, result) => {
                var data = { stat: 'failed', message: 'username or password incorect' };
                if (err) throw err;
                if (result[0] !== undefined) {
                    bcrypt.compare(req.body.password, result[0].password, function (err, result) {
                        if (err) throw err;
                        if (result) {
                            jwt.sign({ user: result[0] }, MySecretKey, (err, token) => {
                                if (err) throw err;
                                res.send({ token: token });
                            })
                        } else {
                            data.message = 'password incorrect';
                            res.send(JSON.stringify(data));
                        }
                    });
                }
            })
        } catch (err) { console.log(err); }
    }
    else {
        res.send(JSONstringfy({ message: 'please enter Username and Password' }));
    }

})
app.get('/specialite', verifyToken, (req, res) => {
    console.log(req.body);
    jwt.verify(req.token, MySecretKey, (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            res.send([{ title: "informatique", id: "1" }, { title: "biologie", id: "2" }, { title: "chimie", id: "3" }, { title: "mathematiques", id: "4" }, { title: "phisique", id: "5" }, { title: "genie civil", id: "6" }]);
            // const sql = 'SELECT * FROM specialites';
            // db.query(sql, req.body, (err, result) => {
            //     if (err) throw err;
            //     res.send(result)
            // });
        }
    })
})

app.get('/SousSpecialite', (req, res) => {

    jwt.verify(req.token, MySecretKey, (err, authData) => {
        if (err) {
            res.sendStatus(403);
        } else {
            const sql = 'SELECT * FROM SousSpecialite where specialite=?';
            db.query(sql, req.body, req.body, (err, result) => {
                if (err) throw err;
                res.send(result)
            });
        }
    })
})

app.get('/document', (req, res) => {
    const sql = 'SELECT * from DOCUMENT where sousspecialite=?'
    db.query(sql, req.body, (err, result) => {
        if (err) throw err;
        res.send(result)
    });
})
app.get('/post', (req, res) => {
    const sql = 'SELECT * from Document where id=?'
    db.query(sql, req.body, (err, result) => {
        if (err) throw err;
        res.send(result)
    });
})
app.get('/comment', (req, res) => {
    const sql = 'SELECT * from comment where Post=?'
    db.query(sql, req.body, (err, result) => {
        if (err) throw err;
        res.send(result)
    });
})
app.get('/replies', (req, res) => {
    const sql = 'SELECT * from replies where id=?'
    db.query(sql, req.body, (err, result) => {
        if (err) throw err;
        res.send(result)
    });
})
app.listen(3000, () => {
    console.log("server connected on port 3000");
})