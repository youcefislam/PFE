const express = require('express');
const mysql = require('mysql');
const multer = require('multer');       // user for handling multipart/form-data
const path = require('path');       // user to work with file and directory path
const bcrypt = require("bcryptjs");     // used for hashing password
var jwt = require("jsonwebtoken");          // used to create/verify token 
const Joi = require('@hapi/joi');           // used to validate the form of the recieved data
const nodemailer = require("nodemailer");
const fs = require('fs')
require('dotenv').config();

// initialization of expressJs
var app = express();
app.use(express.json({ limit: '1mb' }));
app.use('/public/uploads', express.static('public/uploads'));

// token's secret key
const MySecretKey = process.env.MYSECRETKEY;

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
// Validation for the cahnge Password requests
const ChangePasswordSchema = Joi.object({
    OldPassword: Joi.string().min(6).required(),
    password: Joi.string().min(6).required(),
});
// Validation for the cahnge username requests
const ChangeUsernameSchema = Joi.object({
    username: Joi.string().min(8).required(),
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

//init nodemailer 
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL, // generated ethereal user
        pass: process.env.PASSWORD // generated ethereal password
    }
});



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

                    bcrypt.compare(req.body.password, password, (err, result) => {        // we compare the request's password with our password
                        if (err) throw err;
                        if (result) {       // if the both passwords match
                            jwt.sign({ id, username }, MySecretKey, (err, token) => {   // create a token for the user & send it
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
            //get today's date
            const date = new Date();
            //YYYY-MM-DD format
            const mysqlDate = date.toISOString().split("T")[0];
            const sql = 'insert into users (email,password,username,insert_date) values (?,?,?,?)';
            try {
                db.query(sql, [req.body.email, hash, req.body.username, mysqlDate], (err, result) => {    // inserting the account to the datebase
                    if (err) {
                        if (err.sqlMessage.includes('username')) Responsemessage.message = 'username already in use';
                        else if (err.sqlMessage.includes('email')) Responsemessage.message = 'email already in use';
                        else throw err;
                    } else {
                        const id = result.insertId;
                        const username = req.body.username;

                        jwt.sign({ id: id, username: username }, MySecretKey, (err, token) => {   // create a token for the user & send it
                            if (err) throw err;
                            Responsemessage.token = token;
                        })
                        Responsemessage.errors = false;
                        Responsemessage.message = 'Your account has been created Please Check the confirmation Email !';

                        const url = `http://localhost:3000/confirmation/${Responsemessage.token}`;
                        const EmailBody = `
                        <h3>Hey ${req.body.username},</h3>
                        <p>Thanks for getting started with cuizzy, We need a little more information 
                        to complete your registration, including confirmation of your email address. Click bellow to Confirm your email address</p>
                        <a href='${url}'>${url}</a>
                        `;

                        // send mail with defined transport object
                        transporter.sendMail({
                            from: '"Cuizzy" cuizzyapp@gmail.com', // sender address
                            to: req.body.email, // list of receivers
                            subject: "Registration Almost Complete ✔", // Subject line
                            text: "Hello world?", // plain text body
                            html: EmailBody // html body
                        }, (err, data) => {
                            if (err) {
                                console.log('Error Occurs', err);
                            } else console.log("email Sent");
                        });
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

//route for the account validation
app.get('/confirmation/:token', (req, res) => {
    jwt.verify(req.params.token, MySecretKey, (err, autData) => {      // verify Token
        if (err) res.sendStatus(403);
        else {
            res.send('Your Account has been confirmed, thank you!')
        }
    })
});

// route to send Validation code for rseting passwords
app.post('/users/ForgotPoassword', (req, res) => {

    let Responsemessage = { errors: true, message: 'Something Is Wrong' };
    // validate the recieved data
    const { error, value } = ForgotPasswordSchema.validate(req.body);
    if (error) {
        Responsemessage.message = error.message;
        res.send(JSON.stringify(Responsemessage));
    } else {
        const sql = 'SELECT * from users WHERE email=?';
        try {
            db.query(sql, req.body.email, async (err, result) => {    // Changing the password at the database
                if (err) throw err;
                else {
                    if (result[0]) {
                        Responsemessage.errors = false;
                        Responsemessage.message = 'Please check for validation code on your email!';
                        Responsemessage.code = Math.floor(Math.random() * 100000 + 100000);            // generate the validation code

                        //  send the validation code to the email
                        const EmailBody = `
                        <h3>Hey ${result[0].username},</h3>
                        <p>Forgot your Password ?</p><br /> 
                        we've recieved a request to reset the password of your account.
                        To reset your password you will need this Validation code</p>
                        <p>${Responsemessage.code}</p><br />
                        <p>if you don't want to reset your password, please ignore this message. your password will not be reset</p>
                        <hr />
                        <p>if you recieved this email by mistake or believe it is a spam, please forward it to cuizzysupport@gmail.com<p>
                        `;

                        // send mail with defined transport object
                        await transporter.sendMail({
                            from: '"Cuizzy" cuizzyapp@gmail.com', // sender address
                            to: req.body.email, // list of receivers
                            subject: "Reset Password", // Subject line
                            text: "Hello world?", // plain text body
                            html: EmailBody // html body
                        }, (err, data) => {
                            if (err) {
                                console.log('Error Occurs', err);
                            }
                        });
                    } else Responsemessage.message = "we have no account linked with that Email";
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
                    req.file ? (Photo = req.file.path) : (Photo = '/public/uploads/default.jpg');        // if the user has send a picture we store it, or the default picture is set
                    const sql = 'UPDATE users SET FirstName=? ,SecondName=? ,Sex=? ,Photo=? WHERE id_user=?';

                    db.query(sql, [Info.FirstName, Info.SecondName, Info.Sex, Photo, autData.id], (err, result) => {        // add the user's new Info
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

// route to send quizz
app.post('/quizz', verifyToken, (req, res) => {
    jwt.verify(req.token, MySecretKey, (err, autData) => {      // verify Token
        if (err) res.sendStatus(403);
        else {
            const sql = 'SELECT * from question where id_quiz=?'
            db.query(sql, req.body.quizzid, (err, result) => {
                if (err) throw err;
                const dataToSend = [];
                for (let i = 0; i < result.length; i++) {
                    const AnswerArray = [];
                    if (result[i].reponse_1 != null) AnswerArray.push({ answer: result[i].reponse_1 })
                    if (result[i].reponse_2 != null) AnswerArray.push({ answer: result[i].reponse_2 })
                    if (result[i].reponse_3 != null) AnswerArray.push({ answer: result[i].reponse_3 })
                    if (result[i].reponse_4 != null) AnswerArray.push({ answer: result[i].reponse_4 })
                    dataToSend.push({ question: result[i].question_text, answers: AnswerArray, correct: result[i].juste_reponse })
                }
                res.send(dataToSend)
            });
        }
    })
})



// route to update course rating
app.post('/document/rate', verifyToken, (req, res) => {
    jwt.verify(req.token, MySecretKey, (err, authData) => {      // verify Token
        if (err) res.sendStatus(403);
        else {
            var rating, nbrRating;
            let sql = 'select * from document where id_document in (select id_document from quizz where id_quiz=?)';
            db.query(sql, [req.body.quizzid], (err, result) => {
                if (err) throw err;
                else {
                    if (result[0]) {
                        if (result[0].number_of_rating == 0) rating = (result[0].rating + req.body.Rating);
                        else rating = result[0].rating * result[0].number_of_rating + req.body.Rating;
                        nbrRating = result[0].number_of_rating + 1;
                        const id_doc=result[0].id_document;
                        const newRating = rating / nbrRating;
                        sql = 'UPDATE document SET rating=?,number_of_rating=? where id_document in (select id_document from quizz where id_quiz=?)';
                        db.query(sql, [newRating, nbrRating, req.body.quizzid], (err, result) => {
                            if (err) throw err;
                            else{
                                sql='INSERT INTO Rates (id_document,id_user,Rate) VALUES (?,?,?)'
                                db.query(sql,[id_doc,authData.id,req.body.Rating],(err,result)=>{
                                    if(err) throw err;
                                    else{
                                        res.send(JSON.stringify({ message: 'Thank you' }));
                                    }
                                })
                            }
                        });
                    } else (res.status(400))
                }
            })
        }
    });
})

// route to add users mark
app.post('/users/mark', verifyToken, (req, res) => {
    jwt.verify(req.token, MySecretKey, (err, autData) => {      // verify Token
        if (err) res.sendStatus(403);
        else {
            
            let sql = 'SELECT * FROM mark WHERE id_quiz=? and id_user=?';
            db.query(sql, [req.body.quizzid, autData.id], (err, result) => {
                if (err) throw err;
                else {
                    if (result[0]) {
                        if (result[0].mark < req.body.mark) {
                            sql = 'UPDATE mark set mark=? where id_quiz=? and id_user=?';
                            db.query(sql, [req.body.mark, req.body.quizzid, autData.id], (err, result) => {
                                if (err) throw err;
                                else {
                                }
                            })
                        }
                        res.send({didRate:true});
                    } else {
                        sql = 'INSERT INTO mark (id_quiz,id_user,mark) values (?,?,?)';
                        db.query(sql, [req.body.quizzid, autData.id, req.body.mark], (err, result) => {
                            if (err) throw err;
                            else {
                                sql='SELECT * FROM Rates WHERE id_user=? AND id_document IN (SELECT id_document FROM quizz WHERE id_quiz=?)';
                                db.query(sql,[autData.id,req.body.quizzid],(err,result)=>{
                                    if(err) throw err;
                                    else{
                                        if(result[0]) res.send({didRate:true});
                                        else res.send({didRate:false});
                                    }
                                })
                            }
                        })
                    }
                }
            })
        }
    });
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

// route to send marks to users
app.post('/users/mark/show', verifyToken, (req, res) => {
    jwt.verify(req.token, MySecretKey, (err, authData) => {      // verify Token
        if (err) res.sendStatus(403);
        else {
            const sql = "SELECT mark.mark as 'mark',mark.id_quiz as 'quizzid',document.titre as 'titre' FROM mark,document,quizz WHERE mark.id_quiz = quizz.id_quiz and quizz.id_document = document.id_document and mark.id_user=?;"
            db.query(sql, authData.id, (err, result) => {
                if (err) throw err;
                resultJSON = result.map(v => Object.assign({}, v))
                res.send(resultJSON)
            })
        }
    })
})


// route to update username
app.post('/users/changeusername', verifyToken, (req, res) => {
    jwt.verify(req.token, MySecretKey, (err, authData) => {      // verify Token
        if (err) res.sendStatus(403);
        else {
            let Responsemessage = { errors: true, message: 'Something Went Wrong' };
            const { error, value } = ChangeUsernameSchema.validate(req.body);   // validating the data's form
            if (error) {
                Responsemessage.message = error.message;
                res.send(JSON.stringify(Responsemessage));
            }
            else {
                const username = req.body.username;

                const sql = "UPDATE users set username=? WHERE id_user=?";
                db.query(sql, [req.body.username, authData.id], (err, result) => {
                    if (err) {
                        if (err.code == 'ER_DUP_ENTRY') {
                            Responsemessage.message = 'username already in use';
                            console.log(Responsemessage);
                        }
                    } else {

                        jwt.sign({ id: authData.id, username: username }, MySecretKey, (err, token) => {   // create a token for the user & send it
                            if (err) throw err;
                            Responsemessage.token = token;
                            Responsemessage.errors = false;
                            Responsemessage.message = 'Your username has been changed !';
                            res.send(JSON.stringify(Responsemessage));
                        })
                    }
                })
            }
        }
    })
})

// route to cahnge Password
app.post('/users/ChangePassword', verifyToken, (req, res) => {
    jwt.verify(req.token, MySecretKey, (err, authData) => {      // verify Token
        if (err) res.sendStatus(403);
        else {
            let Responsemessage = { message: 'Something Is Wrong' };
            // validate the recieved data
            const { error, value } = ChangePasswordSchema.validate(req.body);
            if (error) {
                Responsemessage.message = error.message;
                res.send(JSON.stringify(Responsemessage));
            } else {
                const sql = 'SELECT * FROM users WHERE id_user=?';
                try {
                    db.query(sql, authData.id, (err, result) => {    // Changing the password at the database
                        if (err) throw err;
                        else if (result[0]) {
                            bcrypt.compare(req.body.OldPassword, result[0].password, (err, result) => {        // we compare the request's password with our password
                                if (err) throw err;
                                if (result) {
                                    const saltRounds = 10;
                                    bcrypt.hash(req.body.password, saltRounds, (err, hash) => {         // hashing the new password 
                                        if (err) throw err;
                                        const sql = 'UPDATE users set password=? WHERE id_user=?';
                                        try {
                                            db.query(sql, [hash, authData.id], (err, result) => {    // Changing the password at the database
                                                if (err) throw err;
                                                else {
                                                    Responsemessage.message = 'Your Password has been changed !';
                                                    res.send(JSON.stringify(Responsemessage));
                                                }
                                            })
                                        } catch (err) {
                                            res.json({ message: 'something went wrong to the api server !!' });
                                        };
                                    })
                                } else {
                                    Responsemessage.message = 'Your current password is wrong';
                                    res.send(JSON.stringify(Responsemessage));
                                }
                            })
                        }
                    })
                } catch (err) {
                    res.json({ message: 'something went wrong to the api server !!' });
                };
            }
        }
    })
})

//route getting users profile
app.get('/users/:id', verifyToken, (req, res) => {

    jwt.verify(req.token, MySecretKey, (err, authData) => {      // verify Token
        if (err) { res.sendStatus(403); }
        else {
            const sql = 'SELECT username,email,FirstName,SecondName,Sex,Photo FROM users WHERE id_user=?'
            db.query(sql, req.params.id, (err, result) => {
                if (err) throw err;
                else {
                    if (result[0]) {
                        if (authData.id == req.params.id) result[0].myProfile = true;
                        else result[0].MyProfile = false;
                        res.send(result[0]);
                    }
                }
            })
        }
    })
})

//route change user's email
app.post('/users/ChangeEmail', verifyToken, (req, res) => {
    jwt.verify(req.token, MySecretKey, (err, authData) => {
        if (err) res.sendStatus(403);
        else {
            const sql = 'UPDATE users SET email=? WHERE id_user=?'
            db.query(sql, [req.body.email, authData.id], (err, result) => {
                if (err) {
                    if (err.code == 'ER_DUP_ENTRY') res.send({ message: 'this email is used before' })
                }
                else {
                    const url = `http://localhost:3000/confirmation/${req.token}`;
                    const EmailBody = `
                        <h3>Hey ${authData.username},</h3>
                        <p>We Get email changing request, We need you to confirm 
                        your email address. Click bellow to Confirm your email address</p>
                        <a href='${url}'>${url}</a>
                        `;
                    // send mail with defined transport object
                    transporter.sendMail({
                        from: '"Cuizzy" cuizzyapp@gmail.com', // sender address
                        to: req.body.email, // list of receivers
                        subject: "Changin Email ✔", // Subject line
                        text: "Hello world?", // plain text body
                        html: EmailBody // html body
                    })
                    res.send({ message: 'Your email has been changer please Check your email' })
                }
            })
        }
    })
})

//route to update user's Info
app.post('/users/updateInfo', verifyToken, (req, res) => {
    jwt.verify(req.token, MySecretKey, (err, authData) => {
        if (err) req.sendStatus(403);
        else {
            upload(req, res, (err) => {         // using multer to read the request content and save the users image if exist
                if (err) console.log(err);
                else {
                    const Info = JSON.parse(req.body.Info);
                    let sql = 'UPDATE users SET ';
                    if (Info.FirstName) {
                        sql += 'FirstName=+\'' + Info.FirstName + '\'';
                        if (Info.SecondName) {
                            sql += ',SecondName=\'' + Info.SecondName + '\'';
                            if (Info.Sex) {
                                sql += ',Sex=\'' + Info.Sex + '\'';
                                if (req.file) sql += ',Photo=\'' + req.file.path + '\'';
                            }
                        }
                    } else if (Info.SecondName) {
                        sql += 'SecondName=\'' + Info.SecondName + '\'';
                        if (Info.Sex) {
                            sql += ',Sex=\'' + Info.Sex + '\'';
                            if (req.file) sql += ',Photo=\'' + req.file.path + '\'';
                        }
                    } else if (Info.Sex) {
                        sql += 'Sex=\'' + Info.Sex + '\'';
                        if (req.file) sql += ',Photo=\'' + req.file.path + '\'';
                    } else if (req.file) sql += 'Photo=\'' + req.file.path + '\'';
                    if (req.file.path) {
                        const sqlDelete = 'SELECT Photo FROM users WHERE id_user=?';
                        db.query(sqlDelete,authData.id, (err, result) => {
                            if (err) throw err;
                            else {
                                if(result[0].Photo!=='/public/uploads/default.jpg')
                                {
                                    fs.unlink(`${result[0].Photo}`, (err) => {
                                        if (err) throw err;
                                    });
                                }
                            }
                        })
                    }
                    sql += ' WHERE id_user=?';
                    db.query(sql, authData.id, (err, result) => {
                        if (err) throw err;
                        else {
                            res.send({ message: 'Your Profile is up to date !' })
                        }
                    })
                }
            })
        }
    })
})

// start The Server Listner
app.listen(3000, () => {
    console.log("server connected on port 3000");
})