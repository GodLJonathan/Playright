const { chromium } = require('playwright');

require('dotenv').config();

const download = async (url) => {
    try {
        const browser = await chromium.launch();
        const page = await browser.newPage();
        await page.goto('https://github.com');
        await page.click('text=Sign in');
        await page.fill('#login_field', process.env.EMAIL);
        await page.fill('#password', process.env.PASSWORD);
        await page.click('#login > div.auth-form-body.mt-3 > form > div.position-relative > input.btn.btn-primary.btn-block.js-sign-in-button');
        await page.goto(`${url}`);
        console.log("Forking the repo : ", url)
        await page.click('//html/body/div[4]/div/main/div[1]/div[1]/ul/li[3]/form/button')
        await page.waitForTimeout(5000);
        console.log('Repo is Forked');
        browser.close();
        process.exit();
    }
    catch(err) {
        console.log("Unable to fork the repo : ", url)
        console.log(err);
        process.exit();
    }
}

download(process.env.title);
