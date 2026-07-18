import DirectoryPage from '../../support/PageObjects Final Project - Inggrid Resmi Benita/DirectoryPage_Final_Project_Inggrid.js'
import LoginPage from '../../support/PageObjects Final Project - Inggrid Resmi Benita/LoginPage_Final_Project_Inggrid.js'
import DirectoryData from '../../fixtures/Final Project - Inggrid Resmi Benita/DirectoryData_Final_Project_Inggrid.json'
import loginData from '../../fixtures/Final Project - Inggrid Resmi Benita/LoginData_Final_Project_Inggrid.json'

describe('Halaman Directory Pada Aplikasi Web OrangeHRM', () => {
    beforeEach(() => {
        LoginPage.visitPage()
        LoginPage.inputUsername(loginData.LoginUsernamePasswordValid.username);
        LoginPage.inputPassword(loginData.LoginUsernamePasswordValid.password);
        LoginPage.clickLoginButton();
        LoginPage.verifyDashboardPage();
        DirectoryPage.visitDirectoryPage();
        DirectoryPage.veryfyDirectoryPage();
    })

    it('TC-DIRECTORY-001 - Searching Berdasarkan Nama Employee Dan Memilih Suggestion, Record Ditemukan', () => {
        cy.intercept('GET', '**/api/v2/directory/employees*').as('SearchEmployeeFound');
        DirectoryPage.InputEmployeeName(DirectoryData.EmployeeName.EmployeeName1);
        DirectoryPage.selectSuggestion(DirectoryData.EmployeeName.EmployeeName2);
        DirectoryPage.clickSearch();
        cy.wait('@SearchEmployeeFound').its('response.statusCode').should('eq', 200);
        DirectoryPage.verifyEmployeeFound(DirectoryData.EmployeeName.EmployeeName2);
    });

    it('TC-DIRECTORY-002 - Searching Berdasarkan Nama Employee Tanpa Memilih Suggestion', () => {
        cy.intercept('GET', '**/api/v2/directory/employees*').as('SearchEmployeeWithoutSelection');
        DirectoryPage.InputEmployeeName(DirectoryData.EmployeeName.EmployeeName2);
        cy.wait('@SearchEmployeeWithoutSelection').its('response.statusCode').should('eq', 200);
        DirectoryPage.clickSearch();
        DirectoryPage.verifyIfNoSelection();
    });

    it('TC-DIRECTORY-003 - Searching Berdasarkan Lokasi dan Record Ditemukan', () => {
        cy.intercept('GET', '**/api/v2/directory/employees*').as('SearchLocationFound');
        DirectoryPage.InputLocation(DirectoryData.LocationisRecordFound.location);
        DirectoryPage.clickSearch();
        cy.wait('@SearchLocationFound').its('response.statusCode').should('eq', 200);
        DirectoryPage.verifyLocationDisplayed();
    });

    it('TC-DIRECTORY-004 - Searching Berdasarkan Lokasi dan Record Tidak Ditemukan', () => {
        cy.intercept('GET', '**/api/v2/directory/employees*').as('SearchLocationNotFound');
        DirectoryPage.InputLocation(DirectoryData.LocationisRecordNotFound.location);
        DirectoryPage.clickSearch();
        cy.wait('@SearchLocationNotFound').its('response.statusCode').should('eq', 200);
        DirectoryPage.verifyNoRecordsFound();
    });

    it('TC-DIRECTORY-005 - Searching Berdasarkan Jabatan dan Record Ditemukan', () => {
        cy.intercept('GET', '**/api/v2/directory/employees*').as('SearchJobTitleFound');
        DirectoryPage.InputJobTitle(DirectoryData.JobtitleisRecordFound.jobTitle);
        DirectoryPage.clickSearch();
        cy.wait('@SearchJobTitleFound').its('response.statusCode').should('eq', 200);
        DirectoryPage.verifyJobTitleDisplayed();
    });

    it('TC-DIRECTORY-006 - Searching Berdasarkan Jabatan dan Record Tidak Ditemukan', () => {
        cy.intercept('GET', '**/api/v2/directory/employees*').as('SearchJobTitleNotFound');
        DirectoryPage.InputJobTitle(DirectoryData.JobtitleisRecordNotFound.jobTitle);
        DirectoryPage.clickSearch();
        cy.wait('@SearchJobTitleNotFound').its('response.statusCode').should('eq', 200);
        DirectoryPage.verifyNoRecordsFound();
    });

    it('TC-DIRECTORY-007 - Searching Berdasarkan Nama, Jabatan, dan Lokasi dan Record Ditemukan', () => {
        cy.intercept('GET', '**/api/v2/directory/employees*').as('SearchEmployeeJobTitleLocation');
        DirectoryPage.InputEmployeeName(DirectoryData.EmployeeName.EmployeeName1);
        DirectoryPage.selectSuggestion(DirectoryData.EmployeeName.EmployeeName2);
        DirectoryPage.InputJobTitle(DirectoryData.JobtitleisRecordFound.jobTitle);
        DirectoryPage.InputLocation(DirectoryData.LocationisRecordFound.location);
        DirectoryPage.clickSearch();
        cy.wait('@SearchEmployeeJobTitleLocation').its('response.statusCode').should('eq', 200);
        DirectoryPage.verifyEmployeeFound(DirectoryData.EmployeeName.EmployeeName2);
        DirectoryPage.verifyJobTitleDisplayed();
        DirectoryPage.verifyLocationDisplayed();
    });

    it('TC-DIRECTORY-008 - Searching Berdasarkan Nama, Jabatan, dan Lokasi, Lalu Reset Pencarian', () => {
        cy.intercept('GET', '**/api/v2/directory/employees*').as('SearchBeforeReset');
        DirectoryPage.InputEmployeeName(DirectoryData.EmployeeName.EmployeeName1);
        DirectoryPage.selectSuggestion(DirectoryData.EmployeeName.EmployeeName2);
        DirectoryPage.InputJobTitle(DirectoryData.JobtitleisRecordFound.jobTitle);
        DirectoryPage.InputLocation(DirectoryData.LocationisRecordFound.location);
        DirectoryPage.clickSearch();
        cy.wait('@SearchBeforeReset').its('response.statusCode').should('eq', 200);
        DirectoryPage.resetSearch();
        DirectoryPage.verifyResetSearch();
    });
});