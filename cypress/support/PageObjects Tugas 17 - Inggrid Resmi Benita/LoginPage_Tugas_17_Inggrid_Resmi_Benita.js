class loginPage{
    visitPage(){
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    }

    inputUsername(username){
        cy.get('input[name="username"]').should('be.visible').type(username);
    }

    inputPassword(password){
        cy.get('input[name="password"]').should('be.visible').type(password);
    }

    clickLoginButton(){
        cy.get('button[type="submit"]').click();
    }

    verifyDashboardPage() {
        cy.url().should('include', '/dashboard/index');
        cy.contains('Dashboard').should('be.visible');
    }

    AllertRequiredMessage() {
        cy.get('.oxd-input-field-error-message').should('contain', 'Required');
    }

    AllertInvalidCredential() {
        cy.contains('Invalid credentials').should('be.visible');
    }

    clickForgotPassword() {
        cy.contains('Forgot your password?').click();
    }

    VerifyForgotPasswordPage() {
        cy.url().should('include', '/requestPasswordResetCode');
        cy.contains('Reset Password').should('be.visible');
    }

    clickOrangeHRMinc(){
        cy.contains('OrangeHRM, Inc.').invoke('removeAttr', 'target').click();
    }

    VerifyOrangeHRMincPage() {
        cy.url().should('include', 'orangehrm.com');
    }

    PasswordHidden() {
        cy.get('input[name="password"]').should('have.attr', 'type', 'password');
    }

    VerifyLoginButton(){
        cy.get('button[type="submit"]').should('be.visible').and('contain.text', 'Login').and('not.be.disabled');
    }
}

export default new loginPage();