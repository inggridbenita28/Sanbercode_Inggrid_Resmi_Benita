import LoginPage from '../../support/PageObjects Final Project - Inggrid Resmi Benita/LoginPage_Final_Project_Inggrid.js'
import loginData from '../../fixtures/Final Project - Inggrid Resmi Benita/LoginData_Final_Project_Inggrid.json'

describe('Halaman Login Pada Aplikasi Web OrangeHRM', () => {
  it('TC-LOGIN-001 - Login dengan menggunakan username dan passoword yang sudah terdaftar', () => {
    cy.intercept('POST', '**/auth/validate').as('LoginUsername&PasswordValid');
    LoginPage.visitPage();
    LoginPage.inputUsername(loginData.LoginUsernamePasswordValid.username);
    LoginPage.inputPassword(loginData.LoginUsernamePasswordValid.password);
    LoginPage.clickLoginButton();
    cy.wait('@LoginUsername&PasswordValid').its('response.statusCode').should('be.oneOf', [200, 302]);
    LoginPage.verifyDashboardPage();
  });

  it('TC-LOGIN-002 - Login menggunakan username huruf kecil semua untuk akun yang terdaftar dengan huruf kapital', () => {
    cy.intercept('POST', '**/auth/validate').as('LoginUsernameLowercase');
    LoginPage.visitPage();
    LoginPage.inputUsername(loginData.LoginUsernameLowercase.username);
    LoginPage.inputPassword(loginData.LoginUsernamePasswordValid.password);
    LoginPage.clickLoginButton();
    cy.wait('@LoginUsernameLowercase').its('request.method').should('eq', 'POST');
    LoginPage.verifyDashboardPage();
  });

  it('TC-LOGIN-003 - Login dengan mengosongkan kolom input username dan password', () => {
    cy.intercept('GET', '**/auth/login').as('EmptyUsernamePassword');
    LoginPage.visitPage();
    cy.wait('@EmptyUsernamePassword').its('response.statusCode').should('eq', 200);
    LoginPage.clickLoginButton();
    LoginPage.AllertRequiredMessage();
  });

  it('TC-LOGIN-004 - Login dengan mengisi password yang sudah terdaftar dan mengosongkan kolom input username', () => {
     cy.intercept('GET', '**/auth/login').as('EmptyUsername');
    LoginPage.visitPage();
    cy.wait('@EmptyUsername').its('response.statusCode').should('eq', 200);
    LoginPage.inputPassword(loginData.LoginUsernamePasswordValid.password);
    LoginPage.clickLoginButton();
    LoginPage.AllertRequiredMessage();
  });

  it('TC-LOGIN-005 - Login dengan mengisi username yang sudah terdaftar dan mengosongkan kolom input password', () => {
    cy.intercept('GET', '**/auth/login').as('EmptyPassword');
    LoginPage.visitPage();
    cy.wait('@EmptyPassword').its('response.statusCode').should('eq', 200);
    LoginPage.inputUsername(loginData.LoginUsernamePasswordValid.username);
    LoginPage.clickLoginButton();
    LoginPage.AllertRequiredMessage();
  });

  it('TC-LOGIN-006 - Login dengan menggunakan username dan password yang belum terdaftar', () => {
    cy.intercept('POST', '**/auth/validate').as('LoginUsernamePasswordInvalid');
    LoginPage.visitPage();
    LoginPage.inputUsername(loginData.LoginUsernamePasswordInvalid.username);
    LoginPage.inputPassword(loginData.LoginUsernamePasswordInvalid.password);
    LoginPage.clickLoginButton();
    cy.wait('@LoginUsernamePasswordInvalid').its('request.method').should('eq', 'POST');
    LoginPage.AllertInvalidCredential();
  });

  it('TC-LOGIN-007 - Login dengan menggunakan username yang terdaftar dan password salah', () => {
    cy.intercept('POST', '**/auth/validate').as('wrongPassword');
    LoginPage.visitPage();
    LoginPage.inputUsername(loginData.LoginUsernamePasswordValid.username);
    LoginPage.inputPassword(loginData.LoginUsernamePasswordInvalid.password);
    LoginPage.clickLoginButton();
    cy.wait('@wrongPassword').its('request.method').should('eq', 'POST');
    LoginPage.AllertInvalidCredential();
  });

  it('TC-LOGIN-008 - Login dengan meggunakan password yang diinput huruf kapital semua untuk akun yang terdaftar', () => {
    cy.intercept('POST', '**/auth/validate').as('PasswordKapital');
    LoginPage.visitPage();
    LoginPage.inputUsername(loginData.LoginUsernamePasswordValid.username);
    LoginPage.inputPassword(loginData.LoginUppercasePassword.password);
    LoginPage.clickLoginButton();
    cy.wait('@PasswordKapital').its('request.method').should('eq', 'POST');
    LoginPage.AllertInvalidCredential();
  });
});