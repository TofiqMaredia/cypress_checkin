describe('Customer Check in', () => {
  let userData;

  beforeEach(() => {
    cy.visit('/')
    cy.fixture('loginCreds.json').then((data) => {
      userData = data;
    });
  });

  it('should verify elements on Customer Check in page', () => {
    cy.login(userData.standardUser.username, userData.standardUser.password)
    cy.contains('Customer Checkins').eq(0).should('have.text', 'Customer Checkins')
    cy.get('svg#checkin-icon').click()

    cy.contains('Customer Check-In')
    cy.get('#home-icon').should('exist')
    cy.get('#logout-icon').should('exist')
  })

  it('should check in new customer successfully', () => {
    cy.login(userData.standardUser.username, userData.standardUser.password)
    cy.get('svg#checkin-icon').click()

    cy.get('input[name="phone"]').type('8324584572')
    cy.get('input[name="name"]').type('Testing CheckIn')
    cy.get('input[name="email"]').type('testing@test.com')
    cy.get('.select__indicators').click({ force: true })
    cy.get('#react-select-7-option-0').click()

    cy.get('.select__multi-value__label').should('have.text', 'Facial')
    cy.get('button[type="Submit"]').click()
    cy.contains('Customer checked in!')

  })

  it('should verify added customer checkin', () => {
    cy.login(userData.standardUser.username, userData.standardUser.password)
    cy.get('.customer-list > ul > li').eq(0).contains('Testing CheckIn – testing@test.com, +18324584572,')
    cy.get('.customer-list > ul > li').eq(0).children('div').eq(0).contains('Facial')
  })

  after(() => {
    cy.get('#delete-checkin').eq(0).click()
  })

})