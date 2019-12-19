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
  var min= function(a,b){
    if (a>b) return b;
    return a;
}
var scoreModel = mongoose.model('Score',scoreChema);

app.get('/getscore', function(req,res){
    var list =scoreModel.find({},
        function(err,list)
        {
            console.log(list);
            list.sort(function(a,b){
                if (a.score>b.score) return -1;
                return 1;
              })
              var s="";
              for (var i =0; i<min(5,list.length); i++)    
              {
                  if ((list[i].name)&&(list[i].score))
                  s=s+list[i].name+" "+list[i].score+",";
              }
              res.send(s);
        });
})
app.get('/pushscore',function(req,res){
    console.log(req.query)
     var score = new scoreModel({
         name:req.query.name,
         score:req.query.score
     });
     score.save();
     res.send('success');
})