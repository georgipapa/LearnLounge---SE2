describe('Personal Information Form', () => {
  beforeEach(() => {
    // Visit the page before each test
    cy.visit('http://localhost:8080/docs/');
  });

  it('Title', () => {
    // Check if required elements exist and have correct text
    cy.get('section.block.col-12').should('exist');
    cy.get('hgroup.main').should('exist');
    cy.get('[class="description"]').should('exist').should('have.text', 'learnlounge');
    cy.get('[class="info__tos"]').should('exist').should('have.text', 'Terms of service');
    cy.get('[class="info__license"]').should('exist').should('have.text', 'Apache 2.0');
    cy.get('h2.title').should('exist').should('have.text', 'Swagger LearnLounge - OpenAPI 3.0 1.0.11 OAS3');
  });

  it('Authorize', () => {
    // Check authorization section and simulate clicks
    cy.get('[class="auth-wrapper"]').should('exist');
    cy.get('[class="btn authorize unlocked"]').click();
    cy.get('[class="checkbox"]').each(($checkbox) => {
      cy.wrap($checkbox).click();
    });
    cy.get('input#client_id').type('15').should('have.value', '15');
    cy.get('input[type="text"]').type('api_key').should('have.value', 'api_key');
    cy.get('[class="btn modal-btn.auth.btn-done.button"]').click();
    cy.get('[class="btn authorize unlocked"]').click();
    cy.get('[class="btn modal-btn.auth.btn-done.button"]').click();
    cy.get('[class="btn authorize unlocked"]').click();
    cy.get('[class="btn modal-btn.auth.authorize.button"]').click();
    cy.get('input[type="text"]').type('api_key').should('have.value', 'api_key');
    cy.get('[class="btn modal-btn.auth.authorize.button"]').click();
    cy.get('[class="btn.modal-btn.auth.authorize.button"]').click();
  });

  it('Schemas', () => {
    // Test schema section, click models, and open all toggles
    cy.get('#swagger-ui > section > div.swagger-ui > div:nth-child(2) > div:nth-child(5) > section > section > h4').click();
    cy.get('[class="model-container"]').each(($modelcontainer) => {
      cy.wrap($modelcontainer);
    });
    cy.get('[class="model-box"]').each(($elements) => {
      const total = $elements.length;
      for (let i = 0; i < total; i++) {
        cy.get('[class="model-box"]').eq(i).click();
      }
    });
    cy.get('[class="model-toggle"]').then(($elements) => {
      const total = $elements.length;
      openAllToggles();
      for (let i = 0; i < total; i++) {
        cy.get('[class="model-toggle"]').eq(0).click();
      }
    });
  });
});

function openAllToggles() {
  cy.get('body').then(($body) => {
    // Open collapsed toggles recursively
    if ($body.find('.model-toggle.collapsed').length > 0) {
      cy.get('.model-toggle.collapsed').first().click();
      openAllToggles();
    } else {
      cy.log('All toggles are now open.');
    }
  });
}
