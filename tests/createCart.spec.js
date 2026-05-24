import { test, expect, request } from '@playwright/test';
import EcomApiUtils from '../api/EcomApiUtils.js';
import { loginPayload, createCartPayload } from '../test-data/ecomTestData.js';

let apiUtils;
let token;

test.beforeAll(async () => {
  const apiContext = await request.newContext();
  apiUtils = new EcomApiUtils(apiContext, loginPayload);
  token = await apiUtils.getToken();
});

test('@integration create cart using token from beforeAll', async () => {
  const response = await apiUtils.createCart(createCartPayload);

  expect(response.token).toBe(token);
  expect(response.cartResponse.message).toContain('Product Added');
});
