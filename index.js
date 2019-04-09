const express    = require('express');
const mongoose   = require('mongoose');
const bodyParser = require('body-parser');
const router     = express.Router();
const validator  = require("email-validator");

// Set up main variables
const port   = process.env.PORT || 8080;
const app    = express();
const db     = mongoose.connection;


validator.validate("test@email.com"); // true
// set up server middleware and utilities
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('trust proxy', 1);

// Define public folder
app.use(express.static('public'))

app.get('*', (req, res) => {
    res.sendFile('/public/index.html');
});

app.post('/subscribe', (req, res) => {
    const { body: email } = req;
    if (validator.validate(email)) {
        db.collection("subscribers").findOne({ email }, (error, doc) => {
            if (doc) {
                return res.status(422).send({error: "already subscribed"});
            }
            db.collection("subscribers").insertOne({ email }, error => {
                if (error) {
                    return res.status(500).send({error: "Failed to register this e-mail"});
                }
                res.status(200).send();
            });
        });
    } else {
        return res.status(422).send({error: "invalid e-mail"});
    }
});

// Connect to DataBase
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/sensoplug', { useNewUrlParser: true });
mongoose.promise = global.Promise;

// Start server
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
	app.listen(port);
	console.log("Connected to DB!");
	console.log('Server is running on port ' + port);
});



module.exports = app;