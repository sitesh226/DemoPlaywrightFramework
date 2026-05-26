import { test, expect, request } from '@playwright/test';
import config from '../utils/config.js';
import PageObjectManager from '../pages/PageObjectManager.js';

let apiUtils;
let token;
let webContext;

test.beforeAll(async ({browser})=> {

    const context= await browser.newContext();
    const page= await context.newPage();
    const pageManager = new PageObjectManager(page);
    const clientLoginPage = pageManager.getClientLoginPage();
    await clientLoginPage.openClientLoginPage();
    await clientLoginPage.clientPagelogin(config.ecomUserEmail,config.ecomUserPassword);
    await context.storageState({path: 'state.json'});
    webContext= await browser.newContext({storageState:'state.json'});

});


test('@ui Check cart using ui login browser context', async () => {

    const page= await webContext.newPage();
    await page.goto(config.ecomClientUrl)
    const products= page.locator("#.card-body");
    const titles= await page.locator(".card-body b").allTextContents();
    console.log(titles);
});

//Multiple tests using the same context , no multiple logins needed
test('@ui Check cart with same context', async () => {

    const page= await webContext.newPage();
    await page.goto(config.ecomClientUrl)
    const products= page.locator("#.card-body");
    const titles= await page.locator(".card-body b").allTextContents();
    console.log(titles);
});