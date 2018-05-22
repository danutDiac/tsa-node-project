const express = require('express');

var bodyParser = require('body-parser');

var users = require ('./database');

const app = express();

app.use(bodyParser.json());

//app.use(tsrocks); // how to use a MW 

app.get('/users', (req,res)=>{ // in loc de use, se foloseste ca al doilea parametru mw
    console.log(req.ts);
    res.send(users);
}) 
app.delete('/users/:name',(req,res)=>{
    const name = req.params.name;
    users = users.filter(u => u.name !==name);
    res.send(users);
})

app.post('/users',(req,res)=>{
    users.push({name:"Ionut",age:26});
    console.log(users);
})

app.listen(3000,()=>{
    console.log("Server is listening 3000");
});

//handler = callbackul de pe get/delete etc.