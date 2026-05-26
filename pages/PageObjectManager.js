import ClientLoginPage from "./ClientLoginPage";
import DashboardPage from "./DashboardPage";

class PageObjectManager {

    constructor(page) {
        this.page = page;
    }

    getLoginPage() {
        return this.loginPage ||
            (this.loginPage = new LoginPage(this.page));
    }

    getDashboardPage() {
        return this.dashboardPage ||
            (this.dashboardPage = new DashboardPage(this.page));
    }

    getCartPage() {
        return this.cartPage ||
            (this.cartPage = new CartPage(this.page));
    }

      getClientLoginPage() {
        return this.clientLoginPage ||
            (this.clientLoginPage = new ClientLoginPage(this.page));
    }
}

export default PageObjectManager;