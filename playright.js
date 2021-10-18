const { firefox } = require('playwright');

require('dotenv').config();

const download = async (url) => {
    try {
        const browser = await firefox.launch({headless:true});
        const page = await browser.newPage();
        await page.goto('https://github.com');
        await page.click('text=Sign in');
        await page.fill('#login_field', process.env.EMAIL);
        await page.fill('#password', process.env.PASSWORD);
        await page.click('#login > div.auth-form-body.mt-3 > form > div.position-relative > input.btn.btn-primary.btn-block.js-sign-in-button');
        await page.waitForTimeout(10000);
        await page.screenshot({ path : 'screenshot1.png'})
        await page.goto(`${url}`);
        console.log("Forking the repo : ", url)
        await page.click('text=Fork')
        await page.waitForTimeout(3000);
        await page.screenshot({ path: 'screenshot.png' });
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

download("https://github.com/metagrover/ES6-for-humans");
