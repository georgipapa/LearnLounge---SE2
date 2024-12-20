describe('Front-End Testing', () => {
  // Before each test, visit the documentation page
  beforeEach(() => {
    cy.visit('http://localhost:8080/docs')
  })

  // Test case: Verify 4 entities are displayed
  it('display 4 entities', () => {
    // Check the number of entities
    cy.get('[class="block col-12 block-desktop col-12-desktop"]').should('have.length', 2)
    cy.get('[class="block col-12 block-desktop col-12-desktop"]').first().children('div').children().should('have.length', 4)

    // Check each entity's text
    cy.get('[class="block col-12 block-desktop col-12-desktop"]').first().children('div').children().first().children('div').children().first().find('a').should('have.text','user')
    cy.get('[class="block col-12 block-desktop col-12-desktop"]').first().children('div').children().eq(1).children('div').children().first().find('a').should('have.text','course')
    cy.get('[class="block col-12 block-desktop col-12-desktop"]').first().children('div').children().eq(2).children('div').children().first().find('a').should('have.text','Payment')
    cy.get('[class="block col-12 block-desktop col-12-desktop"]').first().children('div').children().last().children('div').children().first().find('a').should('have.text','Report')
  })

  // Test case: Click on entities and check if they toggle correctly
  it('clicks on entities to check if they work', () => {
    cy.get('[class="opblock-tag-section is-open"]').should('have.length', 4)
    cy.get('[class="opblock-tag-section"]').should('have.length', 0)

    // Toggle entities and verify their visibility
    cy.get('#operations-tag-user').click()
    cy.get('#operations-tag-course').click()
    cy.get('#operations-tag-Payment').click()
    cy.get('#operations-tag-Report').click()

    // Verify sections toggle correctly
    cy.get('[class="opblock-tag-section is-open"]').should('have.length', 0)
    cy.get('[class="opblock-tag-section"]').should('have.length', 4)

    // Toggle back and forth
    cy.get('#operations-tag-user').click()
    cy.get('#operations-tag-course').click()
    cy.get('#operations-tag-Payment').click()
    cy.get('#operations-tag-Report').click()

    cy.get('[class="opblock-tag-section is-open"]').should('have.length', 4)
    cy.get('[class="opblock-tag-section"]').should('have.length', 0)
  });

  // Test case: Verify all endpoints exist
  it('Test that all endpoints exist', () => {
    // Click 'Authorize' button and fill in the API key
    cy.get('[class="btn authorize unlocked"]').should('exist').should('have.text', 'Authorize').click();
    cy.get('#swagger-ui > section > div.swagger-ui > div:nth-child(2) > div.scheme-container > section > div > div > div.modal-ux > div > div > div.modal-ux-content > div:nth-child(2) > form > div:nth-child(1) > div > div:nth-child(5) > section > input[type="text"]')
      .type('api_key').should('have.value', 'api_key');
    cy.get('#swagger-ui > section > div.swagger-ui > div:nth-child(2) > div.scheme-container > section > div > div > div.modal-ux > div > div > div.modal-ux-content > div:nth-child(2) > form > div.auth-btn-wrapper > button.btn.modal-btn.auth.authorize.button')
      .should('exist').should('have.text', 'Authorize').click(); 
    cy.get('#swagger-ui > section > div.swagger-ui > div:nth-child(2) > div.scheme-container > section > div > div > div.modal-ux > div > div > div.modal-ux-content > div:nth-child(2) > form > div.auth-btn-wrapper > button.btn.modal-btn.auth.btn-done.button')
      .should('exist').should('have.text', 'Close').click();

    // Check the number of operations for the user section
    cy.get('[class="opblock-tag-section is-open"]').first().children('div').children().should('have.length', 5)

    // Test User endpoints
    testApiEndpoint(0, 0, 'PUT', '​/user​/{userId}​/info');
    testApiEndpoint(0, 1, 'POST', '​/user​/{userId}​/info');
    testApiEndpoint(0, 2, 'POST', '​/user​/{userId}​/courses');
    testApiEndpoint(0, 3, 'DELETE', '​/user​/{userId}​/courses​/{courseId}');

    // Test Course endpoints
    testApiEndpoint(1, 0, 'POST', '​/courses​/create');
    testApiEndpoint(1, 1, 'PUT', '​/courses​/teaching​/{courseId}​/edit');
    testApiEndpoint(1, 2, 'DELETE', '​/courses​/teaching​/{courseId}​/edit');
    testApiEndpoint(1, 3, 'POST', '​/courses​/{courseId}​/connect');
    testApiEndpoint(1, 4, 'GET', '​/courses​/{courseId}​/live');
    testApiEndpoint(1, 5, 'POST', '​/courses​/{courseId}​/text');
    testApiEndpoint(1, 6, 'GET', '​/courses​/{courseId}​/files');
    testApiEndpoint(1, 7, 'POST', '​/courses​/{courseId}​/review');
    testApiEndpoint(1, 8, 'POST', '​/courses​/search');
    testApiEndpoint(1, 9, 'GET', '​/courses​/{courseId}');
    testApiEndpoint(1, 10, 'POST', '​/courses​/{courseId}​/certificate');
    
    // Test Payment endpoints
    testApiEndpoint(2, 0, 'POST', '​/courses​/{courseId}​/pay');

    // Test Report endpoints
    testApiEndpoint(3, 0, 'POST', '​/report');
  });

  // Helper function to test API endpoint details
  function testApiEndpoint(sectionIndex, methodIndex, expectedMethod, expectedPath) {
    // Verify the HTTP method and path for each endpoint
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
      
    // Open and test the request
    cy.get('[class="opblock-tag-section is-open"]')
      .eq(sectionIndex)
      .children('div')
      .children()
      .eq(methodIndex)
      .click()

    cy.get('[class="opblock-tag-section is-open"]')
      .eq(sectionIndex)
      .children('div')
      .children()
      .eq(methodIndex)
      .find('button')
      .last()
      .click()

    cy.get('[class="opblock-tag-section is-open"]')
      .eq(sectionIndex)
      .children('div')
      .children()
      .eq(methodIndex)
      .find('button')
      .last().click()

    // Validate form inputs for required fields
    if (!(sectionIndex == 3 || (sectionIndex == 1 && (methodIndex == 0 || methodIndex == 8 )))) {
      cy.get('[class="opblock-tag-section is-open"]')  
        .eq(sectionIndex)                             
        .children('div')                              
        .children()                                   
        .eq(methodIndex)                              
        .find('input')                               
        .should('have.class', 'invalid')
        .and('have.attr', 'title', 'Required field is not provided');   

      // Fill out inputs and test again
      cy.get('[class="opblock-tag-section is-open"]')  
        .eq(sectionIndex)
        .children('div')                              
        .children()                                   
        .eq(methodIndex)
        .find('input')                                 
        .each(($input) => {
          cy.wrap($input).type('test');                
        }); 

      cy.get('[class="opblock-tag-section is-open"]')
        .eq(sectionIndex)
        .children('div')
        .children()
        .eq(methodIndex)
        .find('button')
        .last().click()

    }

    // Verify the curl copy-paste section
    cy.get('[class="opblock-tag-section is-open"]')  
        .eq(sectionIndex)                             
        .children('div')                              
        .children()                                   
        .eq(methodIndex)                              
        .find('div.copy-paste')
        .find('textarea.curl')
        .should('exist');   

    // Check if copy-paste section disappears after clicking the button
    cy.get('[class="opblock-tag-section is-open"]')
      .eq(sectionIndex)
      .children('div')
      .children()
      .eq(methodIndex)
      .find('button')
      .last().click()
      
    cy.get('[class="opblock-tag-section is-open"]')  
      .eq(sectionIndex)                             
      .children('div')                              
      .children()                                   
      .eq(methodIndex)                              
      .find('div.copy-paste').should('not.exist'); 

    // Ensure method and path are correct after clicking
    cy.get('[class="opblock-tag-section is-open"]')
      .eq(sectionIndex)
      .children('div')
      .children()
      .eq(methodIndex)
      .find('span')
      .first()
      .should('have.text', expectedMethod)
      .click()
  }
})
