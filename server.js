const express = require('express');

const app = express();

app.use(express.static('public'));

const PORT = process.env.PORT || 3000;

app.get('/',(req,res)=>{
    res.sendFile(`${__dirname}/public/eleve.html`);
})

app.listen(PORT,()=>{
    console.log(`Server listening on port ${PORT}...`);
});