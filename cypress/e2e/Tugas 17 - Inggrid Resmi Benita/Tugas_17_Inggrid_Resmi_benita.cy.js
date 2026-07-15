import LoginPage from '../../support/PageObjects Tugas 17 - Inggrid Resmi Benita/LoginPage_Tugas_17_Inggrid_Resmi_Benita'
import loginData from '../../fixtures/LoginData_Tugas_17_Inggrid_Resmi_Benita.json'

describe('Login OrangeHRM', () => {
  it('TC-LOGIN-001 - Login dengan menggunakan username dan passoword yang sudah terdaftar', () => {
    LoginPage.visitPage();
    LoginPage.inputUsername(loginData.LoginUsernamePasswordValid.username);
    LoginPage.inputPassword(loginData.LoginUsernamePasswordValid.password);
    LoginPage.clickLoginButton();
    LoginPage.verifyDashboardPage();
  });

  it('TC-LOGIN-002 - Login menggunakan username huruf kecil semua untuk akun yang terdaftar dengan huruf kapital', () => {
    LoginPage.visitPage();
    LoginPage.inputUsername(loginData.LoginUsernameLowercase.username);
    LoginPage.inputPassword(loginData.LoginUsernamePasswordValid.password);
    LoginPage.clickLoginButton();
    LoginPage.verifyDashboardPage();
  });

  it('TC-LOGIN-003 - Login dengan mengosongkan kolom input username dan password', () => {
    LoginPage.visitPage();
    LoginPage.clickLoginButton();
    LoginPage.AllertRequiredMessage();
  });

  it('TC-LOGIN-004 - Login dengan mengisi password yang sudah terdaftar dan mengosongkan kolom input username', () => {
    LoginPage.visitPage();
    LoginPage.inputPassword(loginData.LoginUsernamePasswordValid.password);
    LoginPage.clickLoginButton();
    LoginPage.AllertRequiredMessage();
  });

  it('TC-LOGIN-005 - Login dengan mengisi username yang sudah terdaftar dan mengosongkan kolom input password', () => {
    LoginPage.visitPage();
    LoginPage.inputUsername(loginData.LoginUsernamePasswordValid.username);
    LoginPage.clickLoginButton();
    LoginPage.AllertRequiredMessage();
  });

  it('TC-LOGIN-006 - Login dengan menggunakan username dan password yang belum terdaftar', () => {
    LoginPage.visitPage();
    LoginPage.inputUsername(loginData.LoginUsernamePasswordInvalid.username);
    LoginPage.inputPassword(loginData.LoginUsernamePasswordInvalid.password);
    LoginPage.clickLoginButton();
    LoginPage.AllertInvalidCredential();
  });

  it('TC-LOGIN-007 - Login dengan menggunakan username yang terdaftar dan password salah', () => {
    LoginPage.visitPage();
    LoginPage.inputUsername(loginData.LoginUsernamePasswordValid.username);
    LoginPage.inputPassword(loginData.LoginUsernamePasswordInvalid.password);
    LoginPage.clickLoginButton();
    LoginPage.AllertInvalidCredential();
  });

  it('TC-LOGIN-008 - Login dengan password terdaftar dan username salah', () => {
    LoginPage.visitPage();
    LoginPage.inputUsername(loginData.LoginUsernamePasswordInvalid.username);
    LoginPage.inputPassword(loginData.LoginUsernamePasswordValid.password);
    LoginPage.clickLoginButton();
    LoginPage.AllertInvalidCredential();
  });

  it('TC-LOGIN-009 - Login dengan meggunakan password yang diinput huruf kapital semua untuk akun yang terdaftar', () => {
    LoginPage.visitPage();
    LoginPage.inputUsername(loginData.LoginUsernamePasswordValid.username);
    LoginPage.inputPassword(loginData.LoginUppercasePassword.password);
    LoginPage.clickLoginButton();
    LoginPage.AllertInvalidCredential();
  });

  it('TC-LOGIN-010 - Fitur hide password saat mengetik pada kolom password', () => {
    LoginPage.visitPage();
    LoginPage.inputPassword(loginData.LoginUsernamePasswordValid.password);
    LoginPage.PasswordHidden();
  });

  it('TC-LOGIN-011 - Klik link Forgot your password', () => {
    LoginPage.visitPage();
    LoginPage.clickForgotPassword();
    LoginPage.VerifyForgotPasswordPage();
  });
  
  it('TC-LOGIN-012 - Verifikasi tombol Login tampil', () => {
    LoginPage.visitPage();
    LoginPage.VerifyLoginButton();
  });

  it('TC-LOGIN-013 - Klik link OrangeHRM, Inc.', () => {
    LoginPage.visitPage();
    LoginPage.clickOrangeHRMinc();
    LoginPage.VerifyOrangeHRMincPage();
  });
});