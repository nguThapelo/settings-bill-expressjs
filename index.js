const express = require("express");
const exphbs = require('express-handlebars');
const app = express();

const SettingsBill = require('./settings-bill')
const bodyParser = require('body-parser');

const settingsBill = SettingsBill();

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use(express.static('public'));

app.get('/', function(req, res) {
    res.render('index', { 
        settings: settingsBill.getSettings(),
        totals: settingsBill.totals(),
        warningLevel: settingsBill.hasReachedWarningLevel(),
        criticalLevel: settingsBill.hasReachedCriticalLevel()
    }); 
});

app.post('/settings', function (req, res) {
     console.log(req.body);

    settingsBill.setSettings({
        callCost: req.body.callCost,
        smsCost: req.body.smsCost,
        warningLevel: req.body.warningLevel,
        criticalLevel: req.body.criticalLevel
    })
    
    res.redirect('/');
});

app.post('/action', function (req, res) {
    settingsBill.recordAction(req.body.actionType)
    res.redirect('/');
});

app.get('/actions', function (req, res) {

    res.render('actions', {actions: settingsBill.actions()
     
        
    });
});

app.get('/actions/:actionType', function (req, res) {
    const actionType = req.params.actionType;
    res.render('actions', {actions: settingsBill.actionsFor(actionType) 
    })
})

const PORT = process.env.PORT || 3014

app.listen(PORT, function () {
console.log(`Running at port: ${PORT}`)
});