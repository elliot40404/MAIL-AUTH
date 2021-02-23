const express = require('express');
const mail = require('./mail');
const app = express();

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
    console.log('dotenv loaded');
}

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false, limit: '150mb' }));
app.use(express.json());
app.use(express.static(__dirname + '/public'));

let val

app.get('/', (req, res) => {
    res.status(200).render('index');
});

app.get('/verify', (req, res) => {
    res.render('verify', {verified: ''});
})

app.post('/mail', async (req, res) => {
    const to = await req.body.email;
    val = await mail(to).catch((err) => {
        console.error(err);
    });
    console.log(val);
    res.redirect('/');
});

app.post('/verify', async (req, res) => {
    const num = await req.body.num;
    if (num === val) {
        res.render('verify', {verified: true});
    } else {
        res.render('verify', {verified: false});
    }
});

app.listen(process.env.PORT, () => {
    console.log(`Server listening on http://localhost:${process.env.PORT}`);
});