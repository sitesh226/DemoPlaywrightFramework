import config from '../utils/config.js';

class EcomApiUtils {
  constructor(apiContext, loginPayload) {
    this.apiContext = apiContext;
    this.loginPayload = loginPayload;
    this.token = null;
  }

  async getToken() {
    if (this.token) {
      return this.token;
    }

    const loginResponse = await this.apiContext.post(`${config.ecomBaseUrl}/api/ecom/auth/login`, {
      data: this.loginPayload,
    });

    const loginResponseJson = await loginResponse.json();
    this.token = loginResponseJson.token;

    return this.token;
  }

  async createCart(cartPayload) {
    const response = {};
    response.token = await this.getToken();

    const cartResponse = await this.apiContext.post(`${config.ecomBaseUrl}/api/ecom/user/add-to-cart`, {
      data: cartPayload,
      headers: {
        Authorization: response.token,
        'Content-Type': 'application/json',
      },
    });

    response.cartResponse = await cartResponse.json();

    return response;
  }
}

export default EcomApiUtils;
