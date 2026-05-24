import dotenv from 'dotenv';

dotenv.config({ quiet: true });

const config = {
  ecomBaseUrl: 'https://rahulshettyacademy.com',
  ecomClientUrl: 'https://rahulshettyacademy.com/client',
  loginPracticeUrl: 'https://rahulshettyacademy.com/loginpagePractise/',
  ecomUserId: process.env.ECOM_USER_ID || '',
  ecomUserEmail: process.env.ECOM_USER_EMAIL || '',
  ecomUserPassword: process.env.ECOM_USER_PASSWORD || '',
  headless: process.env.HEADLESS !== 'false',
};

export default config;
