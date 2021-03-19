const express = require('express');

const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded());
app.set('view engine', 'ejs');


const PORT = process.env.PORT || 3000;

app.get('/',(req,res)=>{
    res.redirect('/eleve');
});

app.get('/eleve',(req,res)=>{
    res.render('eleve');
});

app.get('/auth',(req,res)=>{
    res.render('finish');
});

app.post('/',(req,res)=>{
    console.log(req.body);
    res.redirect('/auth');
})

app.listen(PORT,()=>{
    console.log(`Server listening on port ${PORT}...`);
});