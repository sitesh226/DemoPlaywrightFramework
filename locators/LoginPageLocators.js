const LoginPageLocators = {
  getStartedLink: { role: 'link', name: 'Get started' },
  installationHeading: 'h1:has-text("Installation")',

  // Rahul Shetty practice login page locators.
  practiceUsernameTextbox: '#username',
  practicePasswordTextbox: "[type='password']",
  practiceSignInButton: '#signInBtn',
  practiceErrorMessage: "[style*='block']",
  productTitles: '.card-body a',

  // Ecommerce app login locators.
  usernameTextbox: '#userEmail',
  passwordTextbox: '#userPassword',
  loginButton: '#login',
};

export default LoginPageLocators;
