const express = require('express');
const mysql = require('mysql');
const bcrypt = require("bcryptjs");

const saltRounds = 10;
var app = express();
var jwt = require("jsonwebtoken");



// creating connection with database 
var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'yesser',
    database: 'mydb'
});
console.log("smthn")
db.connect();

app.use(express.json({ limit: '1mb' }));


// middleware verify token
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

    console.log("i got a request");
    bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
        const sql = 'insert into users (email,password,username) values (?,?,?)';
        db.query(sql, [req.body.email, hash, req.body.username], (err, result) => {
            console.log(result);
            if (err) {
                console.log(err);
                res.send(JSON.stringify({ stat: 'failed' }));
                // throw err;
            }
            console.log("1 record inserted");
            res.send(JSON.stringify({ stat: 'success' }));
        });
    })

})


//login request 
app.post('/users/login', (req, res) => {
    console.log("i got a request");
    console.log(req.body);
    const username = req.body.username;
    const password = req.body.password;

    if (username && password) {
        const sql = 'SELECT * FROM users where username=?';
        db.query(sql, req.body.username, (err, result) => {
            var data = { stat: 'failed', message: 'username or password incorect' };
            if (err) {
                throw err;
            }
            if (result[0] !== undefined) {
                bcrypt.compare(req.body.password, result[0].password, function(err, result) {
                    if(err) throw err;
                    if(result)
                    {
                        jwt.sign({ user: result[0] }, 'H43%s#2Bo9PZ#d$X&d6', (err, token) => {
                            if (err) throw err;
                            res.send({ token: token });
                        })
                    }else{
                        data.message = 'password incorrect';
                    res.send(JSON.stringify(data));
                    }                    
                });
                
            }
        })
    }
    else {
        res.send(JSONstringfy({ message: 'please enter Username and Password' }));
    }

})
app.post('/specialite',(req,res)=>{
    const sql = 'SELECT * FROM specialites';
    db.query(sql,req.body,(err,result)=>{
    if(err) throw err;
    resultJSON = result.map(v => Object.assign({}, v))
    console.log(resultJSON)
    res.send(resultJSON)
    });
})

app.post('/SousSpecialite',(req,res)=>{
    const sql = 'SELECT * FROM sous_specialites WHERE id_specialite= ?';
    db.query(sql,req.body.idSpecialite,(err,result)=>{
    if(err) throw err;
    resultJSON = result.map(v => Object.assign({}, v))
    console.log(resultJSON)
    res.send(resultJSON)
    });
})

app.post('/document',(req,res)=>{
    const sql = 'SELECT * from document where id_sous_specialite=?'
    db.query(sql,req.body.SousSpecialiteid,(err,result)=>{
        if(err) throw err;
        resultJSON = result.map(v => Object.assign({}, v))
        console.log(resultJSON)
        res.send(resultJSON)
        });
})
app.post('/post',(req,res)=>{
    const sql = 'SELECT * from Document where id_document=?'
    db.query(sql,req.body.Documentid,(err,result)=>{
        if(err) throw err;
        res.send(result)
        });
})
app.post('/commentaires',(req,res)=>{
    const sql = 'SELECT * from reponses where id_reponse in (SELECT id_commentaire from commentaires where id_document=?)'
    db.query(sql,req.body.Documentid,(err,result)=>{
        if(err) throw err;
        console.log(result)
        resultJSON = result.map(v => Object.assign({}, v))
        console.log(resultJSON)
        res.send(resultJSON)
        });
})
app.post('/reponses',(req,res)=>{
    console.log("smthn smthn smthn")
    console.log(req.body);
    const sql = 'SELECT * from reponses where id_precedent=?'
    db.query(sql,req.body.Commentid,(err,result)=>{
        if(err) throw err;
        resultJSON = result.map(v => Object.assign({}, v))
        console.log(resultJSON)
        res.send(resultJSON)
        });
})
app.listen(3000,() =>
{
    console.log("server connected on port 3000");
})