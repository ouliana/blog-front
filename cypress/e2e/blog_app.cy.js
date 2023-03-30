describe('Blog app', () => {
  beforeEach(() => {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`);
    cy.visit('/');
  });

  it('Login form is shown', () => {
    cy.getBySel('username').should('be.visible');
    cy.getBySel('password').should('be.visible');
    cy.contains('sign in');
  });
});
