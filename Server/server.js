const express = require('express');
const mysql = require('mysql');



var app = express(); 
var db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'password',
    database:'testing'
});

db.connect();

app.use(express.json({limit:'1mb'}));



app.post('/users/r',(req,res)=>
{
    console.log("i got a request");
    const sql = 'insert into users (email,password,username) values (\''+req.body.email+'\',\''+req.body.password+'\',\''+req.body.username+'\')';
    db.query(sql, function (err, result) {
        if (err) 
        {  
            res.send(JSON.stringify({ stat : 'failed' }));
            throw err;
        }
        console.log("1 record inserted");
        res.send(JSON.stringify({ stat : 'success' }));
    });
})
app.post('/users/l',(req,res)=>{
    console.log("i got a request");
    console.log(req.body);
    const sql = 'SELECT * FROM users';
    var res1;
    db.query(sql,(err,result)=>{
    if(err) throw err;
    res1 = result;
    //var data = JSON.stringify({ stat : 'failed' });
    // for(var i=0; i<result.length;i++)
    // {
    //      if (result[i].username == req.body.username)
    //      {
    //          if(result[i].password == req.body.password) 
    //          {
    //              data = JSON.stringify({ stat : 'success' }); 
    //              break;
    //          }
    //      }

    // }
    // console.log(data);
    // res.send(data);
    })
    console.log(res1); 
})
app.get('/specialite',(req,res)=>{
    const sql = 'SELECT * FROM specialites';
    db.query(sql,req.body,(err,result)=>{
    if(err) throw err;
    res.send(result)
    });
})

app.get('/SousSpecialite',(req,res)=>{
    const sql = 'SELECT * FROM SousSpecialite where specialite=?';
    db.query(sql,req.body,req.body,(err,result)=>{
        if(err) throw err;
        res.send(result)
        });
})

app.get('/document',(req,res)=>{
    const sql = 'SELECT * from DOCUMENT where sousspecialite=?'
    db.query(sql,req.body,(err,result)=>{
        if(err) throw err;
        res.send(result)
        });
})
app.get('/post',(req,res)=>{
    const sql = 'SELECT * from Document where id=?'
    db.query(sql,req.body,(err,result)=>{
        if(err) throw err;
        res.send(result)
        });
})
app.get('/comment',(req,res)=>{
    const sql = 'SELECT * from comment where Post=?'
    db.query(sql,req.body,(err,result)=>{
        if(err) throw err;
        res.send(result)
        });
})
app.get('/replies',(req,res)=>{
    const sql = 'SELECT * from replies where id=?'
    db.query(sql,req.body,(err,result)=>{
        if(err) throw err;
        res.send(result)
        });
})
app.listen(3000,() =>
{
    console.log("server connected on port 3000");
})