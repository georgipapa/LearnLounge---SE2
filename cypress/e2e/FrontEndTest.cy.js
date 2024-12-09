describe('Personal Information Form', () => {
  beforeEach(() => {
    // Visit the page containing the form
    cy.visit('http://localhost:8080/docs/'); 
  });

  it('Title', () => {
    cy.get('section.block.col-12').should('exist');
    cy.get('hgroup.main').should('exist');
    cy.get('[class="description"]').should('exist').should('have.text', 'learnlounge')
    cy.get('[class="info__tos"]').should('exist').should('have.text', 'Terms of service');
    cy.get('[class="info__license"]').should('exist').should('have.text', 'Apache 2.0');
    cy.get('h2.title').should('exist').should('have.text', 'Swagger LearnLounge - OpenAPI 3.0 1.0.11 OAS3'); 
  });

  it('Authorize', () => {
    cy.get('[class="auth-wrapper"]').should('exist');
    cy.get('[class="btn authorize unlocked"]').should('exist').should('have.text', 'Authorize').click();
    cy.get('[class="checkbox"]').should('exist').each(($checkbox) => { 
      cy.wrap($checkbox).click();});
    cy.get('[class="checkbox"]').should('exist').each(($checkbox) => { 
      cy.wrap($checkbox).click();});
    cy.get('input#client_id').should('exist').type('15').should('have.value', '15');
    cy.get('#swagger-ui > section > div.swagger-ui > div:nth-child(2) > div.scheme-container > section > div > div > div.modal-ux > div > div > div.modal-ux-content > div:nth-child(2) > form > div:nth-child(1) > div > div:nth-child(5) > section > input[type="text"]')
      .type('api_key').should('have.value', 'api_key'); 
   cy.get('#swagger-ui > section > div.swagger-ui > div:nth-child(2) > div.scheme-container > section > div > div > div.modal-ux > div > div > div.modal-ux-content > div:nth-child(1) > div > div:nth-child(2) > div > div.auth-btn-wrapper > button.btn.modal-btn.auth.btn-done.button')
   .should('exist').should('have.text', 'Close').click(); 
   cy.get('[class="btn authorize unlocked"]').should('exist').should('have.text', 'Authorize').click();
   cy.get('#swagger-ui > section > div.swagger-ui > div:nth-child(2) > div.scheme-container > section > div > div > div.modal-ux > div > div > div.modal-ux-content > div:nth-child(2) > form > div.auth-btn-wrapper > button.btn.modal-btn.auth.btn-done.button')
   .should('exist').should('have.text', 'Close').click();
   cy.get('[class="btn authorize unlocked"]').should('exist').should('have.text', 'Authorize').click();
   cy.get('#swagger-ui > section > div.swagger-ui > div:nth-child(2) > div.scheme-container > section > div > div > div.modal-ux > div > div > div.modal-ux-content > div:nth-child(2) > form > div.auth-btn-wrapper > button.btn.modal-btn.auth.authorize.button')
   .should('exist').should('have.text', 'Authorize').click();
   cy.get('#swagger-ui > section > div.swagger-ui > div:nth-child(2) > div.scheme-container > section > div > div > div.modal-ux > div > div > div.modal-ux-content > div:nth-child(2) > form > div:nth-child(1) > div > div:nth-child(5) > section > input[type="text"]')
   .type('api_key').should('have.value', 'api_key');
   cy.get('#swagger-ui > section > div.swagger-ui > div:nth-child(2) > div.scheme-container > section > div > div > div.modal-ux > div > div > div.modal-ux-content > div:nth-child(2) > form > div.auth-btn-wrapper > button.btn.modal-btn.auth.authorize.button')
   .should('exist').should('have.text', 'Authorize').click(); 
   cy.get('#swagger-ui > section > div.swagger-ui > div:nth-child(2) > div.scheme-container > section > div > div > div.modal-ux > div > div > div.modal-ux-content > div:nth-child(2) > form > div.auth-btn-wrapper > button:nth-child(1)')
   .should('exist').should('have.text', 'Logout').click();
  });

  it('Schemas', () => {
    cy.get('#swagger-ui > section > div.swagger-ui > div:nth-child(2) > div:nth-child(5) > section > section > h4').should('exist').click();
    cy.get('#swagger-ui > section > div.swagger-ui > div:nth-child(2) > div:nth-child(5) > section > section > h4').should('exist').click();
    cy.get('[class="model-container"]').should('exist').each(($modelcontainer) => { 
      cy.wrap($modelcontainer)});
    cy.get('[class="model-box"]').should('exist').then(($elements) => {
        const total = $elements.length;
        for (let i = 0; i < total; i++) {
          cy.get('[class="model-box"]').eq(i).click(); 
        }
      });
    cy.get('[class="model-toggle"]').should('exist').then(($elements) => {
        const total = $elements.length; 
        openAllToggles();
        for (let i = 0; i < total; i++) {
          cy.get('[class="model-toggle"]').eq(0).click(); 
        }
      });
  });
})

function openAllToggles() {
  cy.get('body').then(($body) => {
    // Check if any collapsed toggles exist
    if ($body.find('.model-toggle.collapsed').length > 0) {
      // If a toggle exists, click the first one
      cy.get('.model-toggle.collapsed').first().click();

      // Recursively call the function to open the next toggle
      openAllToggles();
    } else {
      // Log a message when all toggles are open
      cy.log('All toggles are now open.');
    }
  });
}
  