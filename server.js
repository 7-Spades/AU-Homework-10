var express = require ("express");
var path = require ("path");
var fs = require ("fs")

var app = express();
var PORT = process.env.PORT || 8000;

var notes = fs.readFileSync("db/db.json", function(err, data){
    if(err){
        throw err
    }
    JSON.stringify(notes)
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
    res.setHeader("Content-Type", "application/json");
    res.end(notes)
});

app.post("/api/notes", function(req,res){
    var entry = JSON.stringify(req.body);
    console.log(entry);
    fs.appendFileSync("db/db.json", entry);
});

//server listener
app.listen(PORT, function (){
    console.log(`currently listening to ${PORT}`)
})