import { test, expect, request } from '@playwright/test';
import EcomApiUtils from '../api/EcomApiUtils.js';
import { loginPayload } from '../test-data/ecomTestData.js';

test('@api login and get token', async () => {
  const apiContext = await request.newContext();
  const apiUtils = new EcomApiUtils(apiContext, loginPayload);

  const token = await apiUtils.getToken();

  expect(token).toBeTruthy();
});
