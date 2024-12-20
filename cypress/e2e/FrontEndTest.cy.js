describe('Personal Information Form', () => {
  beforeEach(() => {
    // Visit the page containing the form before each test
    cy.visit('http://localhost:8080/docs/'); 
  });

  it('Title', () => {
    // Check if essential elements on the page exist and have the correct text
    cy.get('section.block.col-12').should('exist');
    cy.get('hgroup.main').should('exist');
    cy.get('[class="description"]').should('exist').should('have.text', 'learnlounge')
    cy.get('[class="info__tos"]').should('exist').should('have.text', 'Terms of service');
    cy.get('[class="info__license"]').should('exist').should('have.text', 'Apache 2.0');
    cy.get('h2.title').should('exist').should('have.text', 'Swagger LearnLounge - OpenAPI 3.0 1.0.11 OAS3'); 
  });

  it('Authorize', () => {
    // Check that the authorization wrapper and button exist, then initiate the authorization process
    cy.get('[class="auth-wrapper"]').should('exist');
    cy.get('[class="btn authorize unlocked"]').should('exist').should('have.text', 'Authorize').click();

    // Toggle checkboxes and ensure they can be clicked multiple times
    cy.get('[class="checkbox"]').should('exist').each(($checkbox) => { 
      cy.wrap($checkbox).click();
    });

    // Type client_id and api_key into the respective fields
    cy.get('input#client_id').should('exist').type('15').should('have.value', '15');
    cy.get('[type="text"]').type('api_key').should('have.value', 'api_key'); 

    // Close the modal after entering the authorization details
    cy.get('button.btn.modal-btn.auth.btn-done.button').should('exist').should('have.text', 'Close').click(); 

    // Repeat the authorization button clicks and ensure proper behavior (open and close)
    cy.get('[class="btn authorize unlocked"]').should('exist').should('have.text', 'Authorize').click();
    cy.get('button.btn.modal-btn.auth.btn-done.button').should('exist').should('have.text', 'Close').click();

    // Final authorization and logout actions
    cy.get('[class="btn authorize unlocked"]').should('exist').should('have.text', 'Authorize').click();
    cy.get('button.btn.modal-btn.auth.authorize.button').should('exist').should('have.text', 'Authorize').click();
    cy.get('[type="text"]').type('api_key').should('have.value', 'api_key');
    cy.get('button.btn.modal-btn.auth.authorize.button').should('exist').should('have.text', 'Authorize').click(); 
    cy.get('button:nth-child(1)').should('exist').should('have.text', 'Logout').click();
  });

  it('Schemas', () => {
    // Test schema interactions by clicking on expandable sections
    cy.get('#swagger-ui > section > div.swagger-ui > div:nth-child(2) > div:nth-child(5) > section > section > h4').should('exist').click();
    cy.get('#swagger-ui > section > div.swagger-ui > div:nth-child(2) > div:nth-child(5) > section > section > h4').should('exist').click();

    // Ensure model containers exist and iterate through them
    cy.get('[class="model-container"]').should('exist').each(($modelcontainer) => { 
      cy.wrap($modelcontainer);
    });

    // Click on each model box
    cy.get('[class="model-box"]').should('exist').then(($elements) => {
        const total = $elements.length;
        for (let i = 0; i < total; i++) {
          cy.get('[class="model-box"]').eq(i).click(); 
        }
      });

    // Check for model toggle elements and ensure they are expanded
    cy.get('[class="model-toggle"]').should('exist').then(($elements) => {
        const total = $elements.length; 
        openAllToggles(); // Recursively expand collapsed toggles
        for (let i = 0; i < total; i++) {
          cy.get('[class="model-toggle"]').eq(0).click(); 
        }
      });
  });
})

// Recursive function to open all collapsed toggles
function openAllToggles() {
  cy.get('body').then(($body) => {
    // If there are collapsed toggles, click and open them
    if ($body.find('.model-toggle.collapsed').length > 0) {
      cy.get('.model-toggle.collapsed').first().click();
      openAllToggles(); // Recursively call to open the next toggle
    } else {
      // Log once all toggles are opened
      cy.log('All toggles are now open.');
    }
  });
}
