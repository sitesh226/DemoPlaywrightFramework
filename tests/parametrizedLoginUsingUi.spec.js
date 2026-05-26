import { test, expect, request } from '@playwright/test';
import config from '../utils/config.js';
import PageObjectManager from '../pages/PageObjectManager.js';
import data from '../test-data/login-test-data.json' assert { type: 'json' };

let clientLoginPage;
const inputData = structuredClone(data);



for(const data of inputData){

test(`@ui Client app login using ${data.username}`, async ({browser}) => {
    const context= await browser.newContext();
    const page= await context.newPage();
    const pageManager = new PageObjectManager(page);
    clientLoginPage = pageManager.getClientLoginPage();

    await clientLoginPage.openClientLoginPage();
    await clientLoginPage.clientPagelogin(data.username,data.password);
    console.log();
});

}