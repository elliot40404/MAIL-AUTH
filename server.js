const express = require('express');
const mail = require('./mail');
const app = express();
if (process.env.NODE_ENV !== 'PROD') {
    require('dotenv').config();
    console.log('dotenv loaded');
}
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false, limit: '150mb' }));
app.use(express.json());
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.status(200).render('index');
});

app.post('/mail', async (req, res) => {
    const to = await req.body.email;
    const val = await mail(to).catch((err) => {
        console.error(err);
    });
    console.log(val);
    res.redirect('/');
});

app.listen(process.env.PORT, () => {
    console.log(`Server listening on http://localhost:${process.env.PORT}`);
});