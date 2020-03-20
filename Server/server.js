const express = require('express');
const mysql = require('mysql');
const multer = require('multer');
const path = require('path');
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
    database: 'mydb'
});
db.connect();


// recieving images with multer
//set storage Engine
const storage = multer.diskStorage({
    destination: './public/uploads',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
})
// init upload 
const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 },
    fileFilter: function (res, file, cb) {
        checkFileType(file, cb);
    }
}).single('fileToUpload');



//Check File Type
function checkFileType(file, cb) {
    //extantion accepted 
    const filetype = /jpeg|jpg|png|gif/;
    //check ext
    const extname = filetype.test(path.extname(file.originalname).toLowerCase());
    //check the mimetype
    const mimetype = filetype.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb('Error : Image Only');
    }
}



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
app.post('/users/register', (req, res) => {

    let Responsemessage = { errors: true, message: '' };
    // validating the data 
    const { error, value } = SignUpSchema.validate(req.body);
    if (error) {
        Responsemessage.message = error.message;
        res.send(JSON.stringify(Responsemessage));
    }
    else {
        bcrypt.hash(req.body.password, saltRounds, (err, hash) => {         // hashing the password 
            if (err) throw err;
            const sql = 'insert into users (email,password,username) values (?,?,?)';
            try {
                db.query(sql, [req.body.email, hash, req.body.username], (err, result) => {    // inserting the account 
                    if (err) {
                        if (err.sqlMessage.includes('username')) Responsemessage.message = 'username already in use';
                        else if (err.sqlMessage.includes('email')) Responsemessage.message = 'email already in use';
                        else throw err;
                    } else {
                        Responsemessage.errors = false;
                        Responsemessage.message = 'Your account has been created !';
                    }
                    res.send(JSON.stringify(Responsemessage));
                })
            } catch (err) {
                console.log(err);
                res.json({ message: 'something went wrong to the api server !!' });
            };
        })

    }
})

app.post('/users/info', verifyToken, (req, res) => {
    jwt.verify(req.token, MySecretKey, (err, autData) => {
        if (err) res.sendStatus(403);
        else {
            upload(req, res, (err) => {
                if (err) console.log(err);
                else {
                    let Photo;
                    const Info = JSON.parse(req.body.Info);
                    req.file ? (Photo = req.file.path) : (Photo = 'public/uploads/default.jpg');

                    const sql = 'UPDATE users SET FirstName=? ,SecondName=? ,Sex=? ,BirthDay=? ,Profession=? ,University=? ,Specialty=? ,subspecialty=? ,Photo=? WHERE id_user=?';
                    db.query(sql, [Info.FirstName, Info.SecondName, Info.Sex, Info.BirthDay, Info.Profession, Info.University, Info.Specialty, Info.subspecialty,Photo,autData.id], (err, result) => {
                        if(err) throw err;
                        console.log("Success");
                        res.send(JSON.stringify({success:true}));
                    })
                    console.log(Photo);
                }
            })

        }
    });
})

//login request 
app.post('/users/login', (req, res) => {
    let Responsemessage = { errors: true, message: '' };
    // validating the data 
    const { error, value } = SignInSchema.validate(req.body);
    if (error) {
        Responsemessage.message = error.message;
        res.send(JSON.stringify(Responsemessage));
    } else {

        const sql = 'SELECT * FROM users where username=?';
        try {
            db.query(sql, req.body.username, (err, result) => {
                var data = { stat: 'failed', message: 'username or password incorect' };
                if (err) throw err;
                if (result[0] !== undefined) {

                    const username = result[0].username;
                    const id = result[0].id_user;
                    const password = result[0].password;

                    bcrypt.compare(req.body.password, password, async (err, result) => {
                        if (err) throw err;
                        if (result) {
                            await jwt.sign({ id: id, username: username }, MySecretKey, (err, token) => {
                                if (err) throw err;
                                res.send({ token: token });
                            })
                        } else {
                            data.message = 'password incorrect';
                            res.send(JSON.stringify(data));
                        }
                    });
                } else {
                    res.send(JSON.stringify(data));
                }

            })
        } catch (err) { console.log(err); }
    }
})
app.post('/specialite', verifyToken, (req, res) => {
    jwt.verify(req.token, MySecretKey, (err, autData) => {
        if (err) res.sendStatus(403);
        else {
            const sql = 'SELECT * FROM specialites';
            db.query(sql, req.body, (err, result) => {
                if (err) throw err;
                resultJSON = result.map(v => Object.assign({}, v))
                res.send(resultJSON)
            });
        }
    });
})

app.post('/SousSpecialite', verifyToken, (req, res) => {
    jwt.verify(req.token, MySecretKey, (err, autData) => {
        if (err) res.sendStatus(403);
        else {
            const sql = 'SELECT * FROM sous_specialites WHERE id_specialite= ?';
            db.query(sql, req.body.idSpecialite, (err, result) => {
                if (err) throw err;
                resultJSON = result.map(v => Object.assign({}, v))
                res.send(resultJSON)
            });
        }
    })
})

app.post('/document', verifyToken, (req, res) => {
    jwt.verify(req.token, MySecretKey, (err, autData) => {
        if (err) res.sendStatus(403);
        else {
            const sql = 'SELECT * from document where id_sous_specialite=?'
            db.query(sql, req.body.SousSpecialiteid, (err, result) => {
                if (err) throw err;
                resultJSON = result.map(v => Object.assign({}, v))
                res.send(resultJSON)
            });
        }
    })
})

app.post('/post', verifyToken, (req, res) => {
    jwt.verify(req.token, MySecretKey, (err, autData) => {
        if (err) res.sendStatus(403);
        else {
            const sql = 'SELECT * from Document where id_document=?'
            db.query(sql, req.body.Documentid, (err, result) => {
                if (err) throw err;
                res.send(result)
            });
        }
    })
})

app.post('/commentaires', verifyToken, (req, res) => {
    jwt.verify(req.token, MySecretKey, (err, autData) => {
        if (err) res.sendStatus(403);
        else {
            const sql = 'SELECT * from reponses where id_reponse in (SELECT id_commentaire from commentaires where id_document=?)'
            db.query(sql, req.body.Documentid, (err, result) => {
                if (err) throw err;
                resultJSON = result.map(v => Object.assign({}, v))
                res.send(resultJSON)
            });
        }
    })
})

app.post('/reponses', verifyToken, (req, res) => {

    jwt.verify(req.token, MySecretKey, (err, autData) => {
        if (err) res.sendStatus(403);
        else {
            const sql = 'SELECT * from reponses where id_precedent=?'
            db.query(sql, req.body.comment, (err, result) => {
                if (err) throw err;
                resultJSON = result.map(v => Object.assign({}, v))
                res.send(resultJSON)
            });
        }
    })
})

app.listen(3000, () => {
    console.log("server connected on port 3000");
})