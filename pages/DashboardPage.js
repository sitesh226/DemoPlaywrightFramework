
import BasePage from './BasePage.js';
import locators from '../locators/DashboardPageLocators.js'
import config from '../utils/config.js';

class DashboardPage extends BasePage{
    constructor(page){
        super(page);
        this.locators=locators;
    }


    async openDashboardPage() {
    await this.page.goto(config.ecomClientUrl);
    }

    async clickOrdersButton(){
         await this.page
        .locator(this.locators.ordersButton)
        .click();
    }



}

export default DashboardPage;

