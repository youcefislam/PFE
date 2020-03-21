const express = require('express');
const mysql = require('mysql');
const multer = require('multer');       // user for handling multipart/form-data
const path = require('path');       // user to work with file and directory path
const bcrypt = require("bcryptjs");     // used for hashing password
var jwt = require("jsonwebtoken");          // used to create/verify token 
const Joi = require('@hapi/joi');           // used to validate the form of the recieved data

// initialization of expressJs
var app = express();
app.use(express.json({ limit: '1mb' }));


// token's secret key
const MySecretKey = 'H43%s#2Bo9PZ#d$X&d6';

// validation for the register requests
const SignUpSchema = Joi.object({
    username: Joi.string().min(8).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
});

// validation for the login requests
const SignInSchema = Joi.object({
    username: Joi.string().min(8).required(),
    password: Joi.string().min(6).required(),
});

// Validation for the Reset Password requests
const ResetPasswordSchema = Joi.object({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
});

// Validation for the Forgot Password requests
const ForgotPasswordSchema = Joi.object({
    email: Joi.string().min(6).required().email(),
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
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));      // the construction of the name of each file
    }
})

// init upload
const upload = multer({
    storage: storage,           // where we are storing photos
    limits: { fileSize: 1000000 },          // set the limit of the recieved picture
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

// route for Sign In
app.post('/users/login', (req, res) => {

    let Responsemessage = { errors: true, message: '' };
    const { error, value } = SignInSchema.validate(req.body);  // validating the data's form

    if (error) {
        Responsemessage.message = error.message;
        res.send(JSON.stringify(Responsemessage));
    } else {
        const sql = 'SELECT * FROM users where username=?';

        try {
            db.query(sql, req.body.username, (err, result) => {         // select the user with the request's username
                if (err) throw err;

                var reponses = { stat: 'failed', message: 'username or password incorect' };

                if (result[0] !== undefined) {      // if the username exist in our database

                    const username = result[0].username;
                    const id = result[0].id_user;
                    const password = result[0].password;

                    bcrypt.compare(req.body.password, password, async (err, result) => {        // we compare the request's password with our password
                        if (err) throw err;
                        if (result) {       // if the both passwords match
                            await jwt.sign({ id: id, username: username }, MySecretKey, (err, token) => {   // create a token for the user & send it
                                if (err) throw err;
                                res.send({ token: token });
                            })
                        } else {            // request's password is wrong
                            reponses.message = 'password incorrect';
                            res.send(JSON.stringify(reponses));
                        }
                    });
                } else {        // if the username does not exist in our database
                    res.send(JSON.stringify(reponses));
                }
            })
        } catch (err) { console.log(err); }
    }
})

// route for the registration
app.post('/users/register', (req, res) => {

    let Responsemessage = { errors: true, message: 'Something Went Wrong' };
    const { error, value } = SignUpSchema.validate(req.body);   // validating the data's form


    if (error) {
        Responsemessage.message = error.message;
        res.send(JSON.stringify(Responsemessage));
    }
    else {
        const saltRounds = 10;
        bcrypt.hash(req.body.password, saltRounds, (err, hash) => {         // hashing the password 
            if (err) throw err;
            const sql = 'insert into users (email,password,username) values (?,?,?)';
            try {
                db.query(sql, [req.body.email, hash, req.body.username], (err, result) => {    // inserting the account to the datebase
                    if (err) {
                        if (err.sqlMessage.includes('username')) Responsemessage.message = 'username already in use';
                        else if (err.sqlMessage.includes('email')) Responsemessage.message = 'email already in use';
                        else throw err;
                    } else {
                        await jwt.sign({ id: id, username: username }, MySecretKey, (err, token) => {   // create a token for the user & send it
                            if (err) throw err;
                            Responsemessage.token=token;
                        })
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

// route to send Validation code for rseting passwords
app.post('/users/ForgotPoassword', (req, res) => {

    let Responsemessage = { errors: true, message: 'Something Is Wrong' };
    // validate the recieved data
    const { error, value } = ForgotPasswordSchema.validate(req.body);
    if (error) {
        Responsemessage.message = error.message;
        res.send(JSON.stringify(Responsemessage));
    } else {
        const sql = 'SELECT email from users WHERE email=?';
        try {
            db.query(sql, req.body.email, (err, result) => {    // Changing the password at the database
                if (err) throw err;
                else {
                    if (result[0]) {
                        Responsemessage.errors = false;
                        Responsemessage.message = 'Please check for validation code on your email!';
                        Responsemessage.code = Math.floor(Math.random() * 100000 + 100000);            // generate the validation code
                        //  send the validation code to the email
                    }else Responsemessage.message = "we have no account linked with that Email";
                }
                res.send(JSON.stringify(Responsemessage));
            })
        } catch (err) {
            console.log(err);
            res.json({ message: 'something went wrong to the api server !!' });
        };

    }

})

// route to Reset Password
app.post('/users/ResetPassword', (req, res) => {

    let Responsemessage = { errors: true, message: 'Something Is Wrong' };
    // validate the recieved data
    const { error, value } = ResetPasswordSchema.validate(req.body);

    if (error) {
        Responsemessage.message = error.message;
        res.send(JSON.stringify(Responsemessage));
    } else {
        const saltRounds = 10;
        bcrypt.hash(req.body.password, saltRounds, (err, hash) => {         // hashing the new password 
            if (err) throw err;
            const sql = 'UPDATE users set password=? WHERE email=?';
            try {
                db.query(sql, [hash, req.body.email], (err, result) => {    // Changing the password at the database
                    if (err) throw err;
                    else {
                        Responsemessage.errors = false;
                        Responsemessage.message = 'Your Password has been changed !';
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

// route to add More Information to the user account
app.post('/users/info', verifyToken, (req, res) => {

    jwt.verify(req.token, MySecretKey, (err, autData) => {      // verify the token 
        if (err) res.sendStatus(403);
        else {
            upload(req, res, (err) => {         // using multer to read the request content and save the users image if exist
                if (err) console.log(err);
                else {
                    let Photo;
                    const Info = JSON.parse(req.body.Info);
                    req.file ? (Photo = req.file.path) : (Photo = 'public/uploads/default.jpg');        // if the user has send a picture we store it, or the default picture is set
                    const sql = 'UPDATE users SET FirstName=? ,SecondName=? ,Sex=? ,BirthDay=? ,Profession=? ,University=? ,Specialty=? ,subspecialty=? ,Photo=? WHERE id_user=?';

                    db.query(sql, [Info.FirstName, Info.SecondName, Info.Sex, Info.BirthDay, Info.Profession, Info.University, Info.Specialty, Info.subspecialty, Photo, autData.id], (err, result) => {        // add the user's new Info
                        if (err) throw err;
                        console.log("Success");
                        res.send(JSON.stringify({ success: true }));
                    })
                }
            })
        }
    });
})


// route to send Specialities List
app.post('/specialite', verifyToken, (req, res) => {
    jwt.verify(req.token, MySecretKey, (err, autData) => {      // verify Token
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

// route to send SubSpecialities List
app.post('/SousSpecialite', verifyToken, (req, res) => {
    jwt.verify(req.token, MySecretKey, (err, autData) => {      // verify Token
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

// route to send Document List
app.post('/document', verifyToken, (req, res) => {
    jwt.verify(req.token, MySecretKey, (err, autData) => {      // verify Token
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

// route to send Posts
app.post('/post', verifyToken, (req, res) => {
    jwt.verify(req.token, MySecretKey, (err, autData) => {      // verify Token
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

// route to send Comments
app.post('/commentaires', verifyToken, (req, res) => {
    jwt.verify(req.token, MySecretKey, (err, autData) => {      // verify Token
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

// route to send Responses
app.post('/reponses', verifyToken, (req, res) => {
    jwt.verify(req.token, MySecretKey, (err, autData) => {      // verify Token
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


// start The Server Listner
app.listen(3000, () => {
    console.log("server connected on port 3000");
})