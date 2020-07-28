var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({extended: false});

var blocks = {
    'Fixed': "Fastened securtely in position",
    'Movable':'Capable of being moved',
    'Rotating':'Moving in a circle'
};

app.post('/blocks', parseUrlencoded, function(req,res){
    var newBlock = request.body;
    blocks[newBlock.name] = newBlock.description;

    res.status(201).json(newBlock.name);
    
});

var locations = {'Fixed': 'First Floor', 'Movable': 'Second floor', 'Rotating': 'Penthouse'};

app.param('name',function(req,res,next) {
    var name = req.params.name;
    // convert first character to upper case and all remaining to lower case
    var block = name[0].toUpperCase() + name.slice(1).toLowerCase();

    req.blockName = block;

    next();
});

app.get('/', function(req,res){
    res.json(blocks);
});

app.get('/blocks',function(req,res){
    res.json(Object.keys(blocks));
});


app.get('/blocks/:name',function(req, res){
    //var name = req.params.name;
    // convert first character to upper case and all remaining to lower case
    // var block = name[0].toUpperCase() + name.slice(1).toLowerCase();
    var description = blocks[req.blockName];
    // var description = blocks[block]; replaced by the above
    if (!description) {
        res.status(404).json('no descriptions found for ' + req.params.name);
    }  else {
     res.json(description);
    }
});

app.get('/locations/:name',function(req, res){
    var location = locations[req.blockName];
    if (!location) {
        res.status(404).json('no locations found for ' + req.params.name);
    }  else {
     res.json(location);
    }
});



app.listen(3000);