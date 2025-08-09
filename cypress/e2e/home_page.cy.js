describe('The Home Page', () => {
    let userData;

    beforeEach(() => {
        cy.visit('/')
        cy.fixture('loginCreds.json').then((data) => {
          userData = data;
        });
      });
    
    it('should have two tabs', () => {
        cy.get('#customer-checkin-tab').should('have.text', 'Check In')
        cy.get('#admin-login-tab').should('have.text', 'Admin Login')
    })

    it('should login successfully', () => {
        cy.login(userData.standardUser.username, userData.standardUser.password)
        cy.contains('Customer Checkins')
        cy.url().should('include', '/admin/dashboard')

        cy.get('svg#logout-icon').click()
        cy.url().should('include', 'http://localhost:3000')
        cy.contains('Customer Check-In')
    })

    it('should generate validation error for invalid creds', () => {
        cy.login(userData.invalidUsername.username, userData.invalidUsername.password)
        cy.get('.login-form').children('p').should('have.text', 'Invalid username or password')

        cy.get('#customer-checkin-tab').click()
        
        cy.login(userData.invalidPassword.username, userData.invalidPassword.password)
        cy.get('.login-form').children('p').should('have.text', 'Invalid username or password')
    })
      
})