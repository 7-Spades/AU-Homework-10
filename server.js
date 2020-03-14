var express = require ("express");
var path = require ("path");
var fs = require ("fs")

var app = express();
var PORT = process.env.PORT || 8000;

var notes = fs.readFile("db/db.json", function(err, data){
    if(err){
        throw err
    }
});

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static("public"))

//routing code
app.get("/", function(req, res){
    res.sendFile(path.join(__dirname, "index.html"))
});

app.get("/notes", function(req, res){
    res.sendFile(path.join(__dirname, "notes.html"))
});

//server api
app.get("/api/notes", function(req, res){
  return res.json(notes);
});

app.post("/api/notes", function(req,res){
    var entry = req.body;
    fs.appendFile("db/db.json", entry);
});

//server listener
app.listen(PORT, function (){
    console.log(`currently listening to ${PORT}`)
})