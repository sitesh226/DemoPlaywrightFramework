import { test, expect, request } from '@playwright/test';
import EcomApiUtils from '../api/EcomApiUtils.js';
import { loginPayload } from '../test-data/ecomTestData.js';
import DashboardPage from '../pages/DashboardPage.js'
import ClientLoginPage from '../pages/ClientLoginPage.js';
import config from '../utils/config.js';


let apiUtils;
let token;
let webContext;

const fakePayloadResponse={
    data: [],
    message: "No Orders"
}

test.beforeAll(async ({browser}) => {
  const context= await browser.newContext();
  const page= await context.newPage();
  const clientLoginPage = new ClientLoginPage(page);
  await clientLoginPage.openClientLoginPage();
  await clientLoginPage.clientPagelogin(config.ecomUserEmail,config.ecomUserPassword);
  await context.storageState({path: 'state.json'});
  webContext= await browser.newContext({storageState:'state.json'});


  
});

test('@integration Check cart with fake response for order list', async () => {
  const page= await webContext.newPage();
  await page.goto(config.ecomClientUrl)
  const dashboardpage = new DashboardPage(page);
  await page.pause()
  await page.route('**/api/ecom/order/get-orders-for-customer/*',
     async route=>{
      // const response= await route.fetch();
      await route.fulfill(
        {
       
          status: 200,
          contentType: 'application/json',
          body: JSON.stringify(fakePayloadResponse)
          
        }
      )
    }
  )

  await dashboardpage.clickOrdersButton();
  await page.pause();


});
