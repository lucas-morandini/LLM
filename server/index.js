const express = require('express');
const app = express();
const port = 6000;
// import puppeteer from 'puppeteer';
const puppeteer = require('puppeteer');

app.use(express.json());


app.post('/', async (req, res) => {
    const data = req.body;
    console.log(data);
    try
    {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto('https://blackbox.ai/');
        await page.type('#chat-input-box', data.content);
        const submitButton = await page.$('button[type="submit"]');
        submitButton.click();
        await page.waitForSelector('.response-speaker');
        await page.waitForFunction(() => {
            const elements = document.querySelectorAll('.text-sm');
            console.log(elements);
            let ThereIsGoodElem = false;
            elements.forEach(elem => {
                if (elem.innerHTML === 'Is this conversation helpful so far?') {
                    ThereIsGoodElem = true;
                }
            });
            return ThereIsGoodElem;
        });
        console.log(await page.$('.text-sm'));
        const prose = await page.$$('.prose');
        const lastProse = prose[prose.length - 1];
        const text = await page.evaluate(element => element.textContent, lastProse);
        console.log(text);
        res.send(text);
    }catch(e){
        console.log(e);
        res.send('Erreur lors de la communication avec le serveur');
    }
});


app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
