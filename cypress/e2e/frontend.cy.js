describe('Front-End Testing', () => {
  // Before each test, visit the documentation page
  beforeEach(() => {
    cy.visit('http://localhost:8080/docs'); // Adjust the URL if necessary
  });

  // Test 1: Displaying 4 entities
  it('display 4 entities', () => {
    // Check if there are 2 entities blocks on the page
    cy.get('[class="block col-12 block-desktop col-12-desktop"]').should('have.length', 2);

    // Check if the first block has 4 children (entities)
    cy.get('[class="block col-12 block-desktop col-12-desktop"]').first().children('div').children().should('have.length', 4);

    // Check each entity's name (like 'user', 'course', etc.)
    cy.get('[class="block col-12 block-desktop col-12-desktop"]').first().children('div').children().first().children('div').children().first().find('a').should('have.text', 'user');
    cy.get('[class="block col-12 block-desktop col-12-desktop"]').first().children('div').children().eq(1).children('div').children().first().find('a').should('have.text', 'course');
    cy.get('[class="block col-12 block-desktop col-12-desktop"]').first().children('div').children().eq(2).children('div').children().first().find('a').should('have.text', 'Payment');
    cy.get('[class="block col-12 block-desktop col-12-desktop"]').first().children('div').children().last().children('div').children().first().find('a').should('have.text', 'Report');
  });

  // Test 2: Clicks on entities and checks if they expand
  it('clicks on entities to check if they work', () => {
    // Check that initially, all entity sections are open
    cy.get('[class="opblock-tag-section is-open"]').should('have.length', 4);

    // Click on the entities to collapse the sections
    cy.get('#operations-tag-user').click();
    cy.get('#operations-tag-course').click();
    cy.get('#operations-tag-Payment').click();
    cy.get('#operations-tag-Report').click();

    // Check that all entity sections are now collapsed
    cy.get('[class="opblock-tag-section is-open"]').should('have.length', 0);
    cy.get('[class="opblock-tag-section"]').should('have.length', 4);

    // Click again to reopen the sections
    cy.get('#operations-tag-user').click();
    cy.get('#operations-tag-course').click();
    cy.get('#operations-tag-Payment').click();
    cy.get('#operations-tag-Report').click();

    // Verify the sections are open again
    cy.get('[class="opblock-tag-section is-open"]').should('have.length', 4);
    cy.get('[class="opblock-tag-section"]').should('have.length', 0);
  });

  // Test 3: Validate that all endpoints exist and are accessible
  it('Test that all endpoints exist', () => {
    // Authorize the API to unlock the endpoints
    cy.get('[class="btn authorize unlocked"]').should('exist').should('have.text', 'Authorize').click();
    cy.get('#swagger-ui > section > div.swagger-ui > div:nth-child(2) > div.scheme-container > section > div > div > div.modal-ux > div > div > div.modal-ux-content > div:nth-child(2) > form > div:nth-child(1) > div > div:nth-child(5) > section > input[type="text"]')
      .type('api_key').should('have.value', 'api_key');
    cy.get('#swagger-ui > section > div.swagger-ui > div:nth-child(2) > div.scheme-container > section > div > div > div.modal-ux > div > div > div.modal-ux-content > div:nth-child(2) > form > div.auth-btn-wrapper > button.btn.modal-btn.auth.authorize.button')
      .should('exist').should('have.text', 'Authorize').click(); 
    cy.get('#swagger-ui > section > div.swagger-ui > div:nth-child(2) > div.scheme-container > section > div > div > div.modal-ux > div > div > div.modal-ux-content > div:nth-child(2) > form > div.auth-btn-wrapper > button.btn.modal-btn.auth.btn-done.button')
      .should('exist').should('have.text', 'Close').click();

    // Check if the first block (User endpoints) contains 5 methods
    cy.get('[class="opblock-tag-section is-open"]').first().children('div').children().should('have.length', 5);

    // Validate User endpoints
    testApiEndpoint(0, 0, 'PUT', '/user/{userId}/info');
    testApiEndpoint(0, 1, 'POST', '/user/{userId}/info');
    testApiEndpoint(0, 2, 'POST', '/user/{userId}/courses');
    testApiEndpoint(0, 3, 'DELETE', '/user/{userId}/courses/{courseId}');

    // Validate Course endpoints
    testApiEndpoint(1, 0, 'POST', '/courses/create');
    testApiEndpoint(1, 1, 'PUT', '/courses/teaching/{courseId}/edit');
    testApiEndpoint(1, 2, 'DELETE', '/courses/teaching/{courseId}/edit');
    testApiEndpoint(1, 3, 'POST', '/courses/{courseId}/connect');
    testApiEndpoint(1, 4, 'GET', '/courses/{courseId}/live');
    testApiEndpoint(1, 5, 'POST', '/courses/{courseId}/text');
    testApiEndpoint(1, 6, 'GET', '/courses/{courseId}/files');
    testApiEndpoint(1, 7, 'POST', '/courses/{courseId}/review');
    testApiEndpoint(1, 8, 'POST', '/courses/search');
    testApiEndpoint(1, 9, 'GET', '/courses/{courseId}');
    testApiEndpoint(1, 10, 'POST', '/courses/{courseId}/certificate');

    // Validate Payment endpoints
    testApiEndpoint(2, 0, 'POST', '/courses/{courseId}/pay');

    // Validate Report endpoints
    testApiEndpoint(3, 0, 'POST', '/report');
  });

  // Helper function to validate an individual API endpoint
  function testApiEndpoint(sectionIndex, methodIndex, expectedMethod, expectedPath) {
    // Check if the method and path are correctly displayed
    cy.get('[class="opblock-tag-section is-open"]')
      .eq(sectionIndex)
      .children('div')
      .children()
      .eq(methodIndex)
      .find('span')
      .first()
      .should('have.text', expectedMethod);

    cy.get('[class="opblock-tag-section is-open"]')
      .eq(sectionIndex)
      .children('div')
      .children()
      .eq(methodIndex)
      .find('span')
      .last()
      .should('have.text', expectedPath);

    // Click the endpoint to expand it
    cy.get('[class="opblock-tag-section is-open"]')
      .eq(sectionIndex)
      .children('div')
      .children()
      .eq(methodIndex)
      .click();

    // Click the 'Try it out' button and interact with the input fields
    cy.get('[class="opblock-tag-section is-open"]')
      .eq(sectionIndex)
      .children('div')
      .children()
      .eq(methodIndex)
      .find('button')
      .last()
      .click();

    // Validate input fields for required attributes
    if (!(sectionIndex == 3 || (sectionIndex == 1 && (methodIndex == 0 || methodIndex == 8)))) {
      cy.get('[class="opblock-tag-section is-open"]')  
        .eq(sectionIndex)                             
        .children('div')                              
        .children()                                   
        .eq(methodIndex)                              
        .find('input')                                
        .should('have.class', 'invalid')
        .and('have.attr', 'title', 'Required field is not provided');   

      // Type some test data into the input fields
      cy.get('[class="opblock-tag-section is-open"]')  
        .eq(sectionIndex)
        .children('div')                              
        .children()                                   
        .eq(methodIndex)
        .find('input')                                
        .each(($input) => {
          cy.wrap($input).type('test');                
        }); 

      // Submit the request again after providing input data
      cy.get('[class="opblock-tag-section is-open"]')
        .eq(sectionIndex)
        .children('div')
        .children()
        .eq(methodIndex)
        .find('button')
        .last().click();
    }

    // Check if the curl command is displayed after submitting the request
    cy.get('[class="opblock-tag-section is-open"]')  
      .eq(sectionIndex)                             
      .children('div')                              
      .children()                                   
      .eq(methodIndex)                              
      .find('div.copy-paste')
      .find('textarea.curl')
      .should('exist');

    // Close the curl section after checking
    cy.get('[class="opblock-tag-section is-open"]')
      .eq(sectionIndex)
      .children('div')
      .children()
      .eq(methodIndex)
      .find('button')
      .last().click();

    // Ensure that the curl section is no longer visible
    cy.get('[class="opblock-tag-section is-open"]')
      .eq(sectionIndex)
      .children('div')
      .children()
      .eq(methodIndex)
      .find('div.copy-paste')
      .should('not.exist');
  }
});
