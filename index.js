const express = require("express");

const app = express();

app.get('/', function(req, res) {
    res.send('Setting bill app is up');
})

app.post('/settings', function (req, res) {

});

app.post('/action', function (req, res) {
    
});

app.get('/actions', function (req, res) {
    
});

app.get('/actions/:type', function (req, res) {
    
})

const PORT = process.env.PORT || 3014

app.listen(PORT, function () {
console.log("Running at port:" , PORT)

});