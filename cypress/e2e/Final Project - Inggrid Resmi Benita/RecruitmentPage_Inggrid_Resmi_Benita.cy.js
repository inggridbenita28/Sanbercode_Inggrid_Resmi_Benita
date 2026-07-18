import RecruitmentPage from '../../support/PageObjects Final Project - Inggrid Resmi Benita/RecruitmentPage_Final_Project_Inggrid.js'
import LoginPage from '../../support/PageObjects Final Project - Inggrid Resmi Benita/LoginPage_Final_Project_Inggrid.js'
import RecruitmentData from '../../fixtures/Final Project - Inggrid Resmi Benita/RecruitmentData_Final_Project_Inggrid.json'
import loginData from '../../fixtures/Final Project - Inggrid Resmi Benita/LoginData_Final_Project_Inggrid.json'

describe('Halaman Reqruitment Pada Aplikasi Web OrangeHRM', () => {
    beforeEach(() => {
        LoginPage.visitPage()
        LoginPage.inputUsername(loginData.LoginUsernamePasswordValid.username);
        LoginPage.inputPassword(loginData.LoginUsernamePasswordValid.password);
        LoginPage.clickLoginButton();
        LoginPage.verifyDashboardPage();
        RecruitmentPage.visitRecruitmentPage();
        RecruitmentPage.verifyRecruitmentPage();
    })

    it('TC-Recruitment-001 - Menambahkan Data Kandidat Baru', () => {
        cy.intercept('POST','**/api/v2/recruitment/candidates').as('addCandidate');
        RecruitmentPage.clickAddButton()
        RecruitmentPage.inputFirstName(RecruitmentData.CandidateInformation.firstName)
        RecruitmentPage.inputLastName(RecruitmentData.CandidateInformation.lastName)
        RecruitmentPage.inputEmail(RecruitmentData.CandidateInformation.email)
        RecruitmentPage.clickSaveButton()
        cy.wait('@addCandidate').its('response.statusCode').should('eq', 200);
        RecruitmentPage.validateCandidateAdded()
    });

    it('TC-Recruitment-002 -Menambahkan Data Kandidat Baru Namun Mengosongkan Semua Field', () => {
        // Tidak menggunakan intercept karena tidak ada request API yang dikirim
        RecruitmentPage.clickAddButton()
        RecruitmentPage.clickSaveButton()
        RecruitmentPage.AllertFieldEmpty()
    });

    it('TC-Recruitment-003 - Searching Berdasarkan Candidate Name, Record Ditemukan', () => {
        cy.intercept('GET','**/api/v2/recruitment/candidates*').as('searchCandidate');
        RecruitmentPage.inputCandidateName(RecruitmentData.CandidateInformation.firstName)
        RecruitmentPage.selectCandidateSuggestion(RecruitmentData.CandidateInformation.fullName)
        RecruitmentPage.clickSearchButton()
        cy.wait('@searchCandidate').its('response.statusCode').should('eq', 200);
        RecruitmentPage.verifySearch(RecruitmentData.CandidateInformation.fullName)
    }) 

    it('TC-Recruitment-004 - Searching Berdasarkan Candidate Name, Lalu Delete Datanya', () => {
        cy.intercept('DELETE','**/api/v2/recruitment/candidates*').as('deleteCandidate');
        RecruitmentPage.inputCandidateName(RecruitmentData.CandidateInformation.firstName)
        RecruitmentPage.selectCandidateSuggestion(RecruitmentData.CandidateInformation.fullName)
        RecruitmentPage.clickSearchButton()
        RecruitmentPage.verifySearch(RecruitmentData.CandidateInformation.fullName)
        RecruitmentPage.deleteCandidate(RecruitmentData.CandidateInformation.fullName)
        cy.wait('@deleteCandidate').its('response.statusCode').should('eq', 200);
        RecruitmentPage.verifyNoRecords()
    }) 

    it('TC-Recruitment-005 - Menmabhkan Data Vancacies Baru Pada Tab Vacancies Namun Mengosongkan Semua Field', () => {
    // Tidak menggunakan intercept karena tidak ada request API yang dikirim
       RecruitmentPage.clickTabVacancie()
       RecruitmentPage.clickAddButton()
       RecruitmentPage.clickSaveButton()
       RecruitmentPage.AllertFieldEmpty()
    })

    it('TC-Recruitment-006 - Searching Berdasarkan Job Title Pada Tab Vacancies, Record Ditemukan', () => {
        cy.intercept('GET','**/api/v2/recruitment/vacancies*').as('searchVacancy');
        RecruitmentPage.clickTabVacancie()
        RecruitmentPage.InputJobTitle(RecruitmentData.VacancyInformation.JobtitleFound)
        RecruitmentPage.clickSearchButton()
        cy.wait('@searchVacancy').its('response.statusCode').should('eq', 200);
        RecruitmentPage.verifyJobTitleDisplayed()
    })

    it('TC-Recruitment-007 - Searching Berdasarkan Job Title Pada Tab Vacancies, Record Tidak Ditemukan', () => {
        cy.intercept('GET','**/api/v2/recruitment/vacancies*').as('searchVacancyNotFound');
        RecruitmentPage.clickTabVacancie()
        RecruitmentPage.InputJobTitle(RecruitmentData.VacancyInformation.JobtitleNotFound)
        RecruitmentPage.clickSearchButton()
        cy.wait('@searchVacancyNotFound').its('response.statusCode').should('eq', 200);
        RecruitmentPage.verifyNoRecords()
    })

    it('TC-Recruitment-008 - Searching Berdasarkan Job Ttitle, Lalu Reset Pencarian', () => {
        RecruitmentPage.clickTabVacancie()
        RecruitmentPage.InputJobTitle(RecruitmentData.VacancyInformation.JobtitleFound)
        RecruitmentPage.clickSearchButton()
        cy.intercept('GET','**/api/v2/recruitment/vacancies*').as('resetVacancy');
        RecruitmentPage.resetSearch();
        cy.wait('@resetVacancy').its('response.statusCode').should('eq', 200);
        RecruitmentPage.verifyResetSearch();
    });
});