const cheerio = require('cheerio');
const axios = require('axios');

const express = require('express');
const app = express();

const url = 'https://es.wikipedia.org/wiki/Categor%C3%ADa:M%C3%BAsicos_de_rap';
const rootUrl = 'https://es.wikipedia.org';

app.get('/', (req, res) => {
    axios.get(url).then((response) => {
        if(response.status === 200) {
            const html = response.data
            const $ = cheerio.load(html)
            const links = []
            $('#mw-pages a').each((index, element) => {
                const link = $(element).attr('href')
                links.push(link)
            })
            let completLinks = []
            completLinks = links.map(link => rootUrl + link)
            console.log(completLinks)
            res.send(`
            <h2>Enlaces</h2>
                    <ul>
                    ${links.map(link => `<li><a href="${rootUrl}${link}">${link}</a></li>`).join('')}
                    </ul>
            `)
        }
    })
    /*completLinks.map(link => axios.get(link).then((response) => {
        if(response.status === 200) {
            const html = response.data
            const $ = cheerio.load(html)
            const titulos = []
            $('h1').each((index, element) =>
            const  )
        }*/
    }) )

})

app.listen(3000, () => {
    console.log('express esta escuchando en el puerto http://localhost:3000')
})