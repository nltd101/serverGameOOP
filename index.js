var express = require("express");
var app = express();
app.listen(3000);
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true},{ useUnifiedTopology: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("connection Mongoose")
});
var scoreChema = new mongoose.Schema({
    name: String,
    score:Number
  });
var scoreModel = mongoose.model('Score',scoreChema);

app.get('/getscore',async function(req,res){
  //  console.log(await scoreModel.find());
    res.send(await scoreModel.find());
})
app.get('/pushscore',function(req,res){
    console.log(req.query);
     var score = new scoreModel({
         name:req.query.name,
         score:req.query.score
     });
     score.save();
     res.send('hello');
})