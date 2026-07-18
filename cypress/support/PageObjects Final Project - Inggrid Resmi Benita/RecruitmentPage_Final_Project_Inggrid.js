class RecruitmentPage {

    firstName = '.oxd-input.oxd-input--active.orangehrm-firstname'
    lastName = '.oxd-input.oxd-input--active.orangehrm-lastname'
    email = '.oxd-input.oxd-input--active'
    candidateNameInput = '.oxd-autocomplete-text-input > input'
    suggestionDropdown = '.oxd-autocomplete-dropdown'
    deleteIcon = '.oxd-icon.bi-trash'
    candidateCard = '.oxd-table-card'
    vacancieCard = '.card-center'
    dropdownButton = '.oxd-select-text'
    dropdownMenu = '.oxd-select-dropdown'

    verifyRecruitmentPage() {
        cy.url().should('include', '/recruitment/viewCandidates');
        cy.contains('Recruitment').should('be.visible');
    }

    visitRecruitmentPage() {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/recruitment/viewCandidates');
    }

    clickAddButton() {
        cy.contains('button', 'Add').click()
    }

    inputFirstName(firstName) {
        cy.get(this.firstName).type(firstName)
    }

    inputLastName(lastName) {
        cy.get(this.lastName).type(lastName)
    }

    inputEmail(email) {
        cy.get(this.email).eq(3).type(email)
    }

    AllertFieldEmpty() {
        cy.contains('Required').should('be.visible')
    }

    clickSaveButton() {
        cy.contains('button', 'Save').click()
        cy.wait(3000)
    }

    validateCandidateAdded() {
        cy.contains('Candidate Profile').should('be.visible')
    }

    inputCandidateName(name) {
        cy.get(this.candidateNameInput).clear().type(name)
    }

    selectCandidateSuggestion(name) {
        cy.get(this.suggestionDropdown).contains(name).click()
    }

    clickSearchButton() {
        cy.contains('button', 'Search').click()
    }

    verifySearch(candidatename) {
        cy.contains(candidatename).should('be.visible')
    }

    deleteCandidate(candidateName) {
        cy.contains(this.candidateCard, candidateName).find(this.deleteIcon).click()
        cy.contains('button', 'Yes, Delete').click()
    }

    verifyNoRecords() {
        cy.contains('No Records Found', {timeout: 10000}).should('be.visible')
    }

    clickTabVacancie() {
        cy.get('a.oxd-topbar-body-nav-tab-item[href="#"]').contains('Vacancies').click();
    }

    verifyJobTitleDisplayed(InputJobTitle) {
        cy.contains(this.selectedJobTitle).should('be.visible')
    }

    resetSearch() {
        cy.contains('button', 'Reset').click()
    }

    verifyResetSearch() {
        cy.contains('Records Found').should('be.visible');
    }

    InputJobTitle(jobTitle) {
        this.selectedJobTitle = jobTitle
        cy.get(this.dropdownButton).eq(0).click()
        cy.get(this.dropdownMenu).should('be.visible')
        cy.contains('.oxd-select-option', jobTitle).click()
    }
}

export default new RecruitmentPage();