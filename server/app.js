const express = require('express');
const fs = require('fs');
const csv = require('csvtojson');
//const { Agent } = require('http');
const app = express();


app.set('json spaces', 2);

app.get('/', (req, res) => {
    let Agent =req.headers['user-agent'].split(',').join('');
    let Time = new Date().toISOString();
    let Method = req.method;
    let Resource = req.path;
    let Version ='HTTP/' + req.httpVersion;
    let Status =200;
    // write your code to respond "ok" here
    let logs = '\n' + Agent  + ',' + Time + ',' + Method + ',' + Resource + ',' + Version + ',' + Status;
    console.log(logs)
    fs.appendFile('./server/logs.csv',logs ,(err)=> {
        if(err)throw err;
        
        //if no error 
        //console.log(data)
        //next();
        res.status(200).send('ok')
    })
});

app.get('/logs', (req, res)=>{
        csv()
    .fromFile('./server/logs.csv')
    .then((jsonObj)=>{
        res.json(jsonObj)
    })
    
    

});
// write your code to return a json object containing the log data here
// Use fs.readFile() method to read the file
/* fs.readFile('./log.csv',data,'utf8',(err)=>{
    if(err)throw err;
    next();
// console.log(data);*/
module.exports = app;

