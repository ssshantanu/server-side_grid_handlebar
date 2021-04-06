var express = require('express');
var exphbs  = require('express-handlebars');
const axios =require('axios');

var app = express();
var emp= require('./employeemock');

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.use(express.urlencoded({extended:true}));
app.use(express.json());

var employees= emp


app.get("/",(req,res)=>{
    res.write("Home Page .....");
    res.write("/employeetable/1 for employeetable by employeemock.js file and /countrytable/1 for country table via api request");
    res.end();
})




app.get("/employeetable/:x",(req,res)=>{
    var x = parseInt(req.params.x);
    var startindex=x*5;
    var endindex = x*5+5;
    try{
        if(employees.length===0){
            axios.get('http://dummy.restapiexample.com/api/v1/employees')
            .then((response)=>{
                console.log(response.data.data)
                res.render('employeetable',{layout:false,employee:response.data.data.slice(startindex,endindex)});
            })
            .catch((err)=>{
                console.log("error");
                //console.log(err);
            })    
        }
        else{
            res.render('employeetable',{layout:false,employee:employees.slice(startindex,endindex),prev:x-1,next:x+1})

        }
    }
    catch{}
    
})


app.get("/countrytable/:x",(req,res)=>{
    var x = parseInt(req.params.x);
    var startindex=x*5;
    var endindex = x*5+5;
    try{
            axios.get('https://restcountries.eu/rest/v2/all')
            .then((response)=>{
                res.render('country',{layout:false,country:response.data.slice(startindex,endindex),prev:x-1,next:x+1});
            })
            .catch((err)=>{
                console.log("error");
                //console.log(err);
            })    
    }
    catch{}
    
})

app.listen(9000,()=>{console.log("Server Listening on port 9000 ...")});