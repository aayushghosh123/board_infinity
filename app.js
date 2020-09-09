const express = require('express')
const app = express()
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const dotenv = require('dotenv')
dotenv.config()

const Data = require('../board_infinity/models/Post');
//const { db } = require('../board_infinity/models/Post');
const user = Data.find({});

app.use(bodyParser.json());

app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use(express.static('public'))
app.set('views','views')
app.set('view engine', 'ejs')
//----------------------------------------------

app.get("/",function(req,res){
    res.render("index");
})

app.get("/add",function(req,res){
    res.render("add");
})
//---------------------------------------------

app.get("/list",function(req,res,next){
        Data.find({},function(err,data){
            if(err) throw err;
            res.render('list',{record:data});
        })
})

app.post('/list',function(req,res,next){
    const addDetails =  new Data({
        taskname : req.body.task,
        taskdescription:req.body.taskd,
        creator:req.body.create,
        duration:req.body.time,
        createat:req.body.createat
    })
    console.log(addDetails)
    addDetails.save();
})
//---------------------------------------------

mongoose.connect(process.env.DB_CONNECT,{
    useUnifiedTopology: true,useNewUrlParser: true },()=>console.log('Connected to DB'));

app.listen(process.env.PORT);