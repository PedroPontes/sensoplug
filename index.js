const express    = require('express');
const mongoose   = require('mongoose');
const bodyParser = require('body-parser');
const validator  = require("email-validator");


// Set up main variables
const port   = process.env.PORT || 8080;
const app    = express();
const db     = mongoose.connection;

// set up server middleware and utilities
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('trust proxy', 1);

// Define public folder
app.use(express.static('public'))

app.get('*', (req, res) => {
  res.sendFile('/public/index.html');
});

app.post('/subscribe', async (req, res) => {
  try {
    const { body: { email } } = req;
    if (!validator.validate(email)) {
      console.log({email, validation: validator.validate(email)});
      return res.status(422).send({error: "invalid e-mail!"});
    }
    const alreadyPresent = await db.collection("subscribers").findOne({ email });
    if (alreadyPresent) {
       return res.status(422).send({error: "You are already subscribed!"});
    }
    await db.collection("subscribers").insertOne({ email });
    res.status(200).send();
  } catch (exception) {
    return res.status(500).send({error: "Failed to register this e-mail!"});
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