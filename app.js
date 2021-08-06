const express = require('express');
const https = require('https');


const app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs');

const allData = []

app.get('/', function (req, res) {
    https.get('https://reqres.in/api/users', function (response) {
        const datas = []
        response.on('data', function (chunk) {
            datas.push(chunk)
        })
        response.on('end', () => {
            const data = Buffer.concat(datas)
            const cards = JSON.parse(data)
            const users = cards.data

            res.render("index", {
                users: users
            });
        })
    })
})



app.listen(3000, function () {
    console.log('Server is up! ');
})