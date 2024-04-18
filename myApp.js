let express = require('express');
var bodyParser = require('body-parser');
let app = express();
require('dotenv').config();
absolutePath = __dirname + '/public';
const note = {
    "message": "Hello json"
};
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/name', (req, res) => {
    var String = req.body.first + " " + req.body.last;
    res.json(
        { name: String }
    );
})

app.use((req, res, next) => {
    console.log(`${req.method} ${req.path} - ${req.ip}`)
    next();
})

app.use('/public', express.static(__dirname + "/public"));
console.log(process.env.MESSAGE_STYLE)
app.get("/json", (req, res) => {
    if (process.env.MESSAGE_STYLE == 'uppercase') {
        note.message = note.message.toUpperCase();
    };

    res.json(note);
});

app.get('/now', (req, res, next) => {
    req.time = new Date().toString();
    next();

}, (req, res) => {
    res.json(
        { time: req.time }
    );
})


app.get('/:word/echo', (req, res) => {
    res.json(
        { echo: req.params.word }
    )
})





app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/index.html");
})




























module.exports = app;
