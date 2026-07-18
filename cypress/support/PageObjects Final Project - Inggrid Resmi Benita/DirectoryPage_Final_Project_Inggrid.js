class DirectoryPage{
    employeeNameInput = 'input[placeholder="Type for hints..."]'
    dropdown = '.oxd-select-text'
    autoCompleteOption = '.oxd-autocomplete-option'

    veryfyDirectoryPage() {
        cy.url().should('include', '/directory/viewDirectory');
        cy.contains('Directory').should('be.visible');
    }

    visitDirectoryPage() {
        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/directory/viewDirectory');
    }

    InputEmployeeName(name) {
        cy.get(this.employeeNameInput).first().clear().type(name)
    }

    verifyEmployeeFound(InputEmployeeName) {
        cy.contains(InputEmployeeName).should('be.visible')
    }

    selectSuggestion(employeeName) {
        cy.contains(this.autoCompleteOption, employeeName).click()
    }

    InputJobTitle(jobTitle) {
        this.selectedJobTitle = jobTitle

        cy.get(this.dropdown).eq(0).click()
        cy.contains(jobTitle).click()
    }

    verifyJobTitleDisplayed(InputJobTitle) {
        cy.contains(this.selectedJobTitle).should('be.visible')
    }

    verifyLocationDisplayed(InputLocation) {
        cy.contains(this.selectedLocation).should('be.visible')
    }

    InputLocation(location) {
        this.selectedLocation = location

        cy.get(this.dropdown).eq(1).click()
        cy.contains(location).click()
    }

    verifyNoRecordsFound() {
        cy.contains('No Records Found').should('be.visible')
    }
    
    verifyIfNoSelection() {
        cy.contains('Invalid').should('be.visible');
    }

    clickSearch() {
        cy.contains('button', 'Search').click()
    }

    resetSearch() {
        cy.contains('button', 'Reset').click()
    }

    verifyResetSearch() {
        cy.get(this.employeeNameInput).first().should('have.value', '');
        cy.get(this.dropdown).eq(0).should('contain', '-- Select --');
        cy.get(this.dropdown).eq(1).should('contain', '-- Select --');
        cy.contains('Records Found').should('be.visible');
    }
}

export default new DirectoryPage();