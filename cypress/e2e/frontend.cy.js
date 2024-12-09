describe('Front-End Testing', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/docs')
  })

  it('display 4 entities', () => {

    cy.get('[class="block col-12 block-desktop col-12-desktop"]').should('have.length', 2)

    cy.get('[class="block col-12 block-desktop col-12-desktop"]').first().children('div').children().should('have.length',4)

    cy.get('[class="block col-12 block-desktop col-12-desktop"]').first().children('div').children().first().children('div').children().first().find('a').should('have.text','user')
    cy.get('[class="block col-12 block-desktop col-12-desktop"]').first().children('div').children().eq(1).children('div').children().first().find('a').should('have.text','course')
    cy.get('[class="block col-12 block-desktop col-12-desktop"]').first().children('div').children().eq(2).children('div').children().first().find('a').should('have.text','Payment')
    cy.get('[class="block col-12 block-desktop col-12-desktop"]').first().children('div').children().last().children('div').children().first().find('a').should('have.text','Report')
  })

  it('clicks on entities to check if they work', () => {
      cy.get('[class="opblock-tag-section is-open"]').should('have.length', 4)
      cy.get('[class="opblock-tag-section"]').should('have.length', 0)

      cy.get('#operations-tag-user').click()
      cy.get('#operations-tag-course').click()
      cy.get('#operations-tag-Payment').click()
      cy.get('#operations-tag-Report').click()

      cy.get('[class="opblock-tag-section is-open"]').should('have.length', 0)
      cy.get('[class="opblock-tag-section"]').should('have.length', 4)

      cy.get('#operations-tag-user').click()
      cy.get('#operations-tag-course').click()
      cy.get('#operations-tag-Payment').click()
      cy.get('#operations-tag-Report').click()

      cy.get('[class="opblock-tag-section is-open"]').should('have.length', 4)
      cy.get('[class="opblock-tag-section"]').should('have.length', 0)
  });

  it('Test that all endpoints exist', () => {

      cy.get('[class="btn authorize unlocked"]').should('exist').should('have.text', 'Authorize').click();
      cy.get('#swagger-ui > section > div.swagger-ui > div:nth-child(2) > div.scheme-container > section > div > div > div.modal-ux > div > div > div.modal-ux-content > div:nth-child(2) > form > div:nth-child(1) > div > div:nth-child(5) > section > input[type="text"]')
      .type('api_key').should('have.value', 'api_key');
      cy.get('#swagger-ui > section > div.swagger-ui > div:nth-child(2) > div.scheme-container > section > div > div > div.modal-ux > div > div > div.modal-ux-content > div:nth-child(2) > form > div.auth-btn-wrapper > button.btn.modal-btn.auth.authorize.button')
      .should('exist').should('have.text', 'Authorize').click(); 
      cy.get('#swagger-ui > section > div.swagger-ui > div:nth-child(2) > div.scheme-container > section > div > div > div.modal-ux > div > div > div.modal-ux-content > div:nth-child(2) > form > div.auth-btn-wrapper > button.btn.modal-btn.auth.btn-done.button')
      .should('exist').should('have.text', 'Close').click();

      cy.get('[class="opblock-tag-section is-open"]').first().children('div').children().should('have.length', 5)

      // User endpoints
      testApiEndpoint(0, 0, 'PUT', '​/user​/{userId}​/info');
      testApiEndpoint(0, 1, 'POST', '​/user​/{userId}​/info');
      testApiEndpoint(0, 2, 'POST', '​/user​/{userId}​/courses');
      testApiEndpoint(0, 3, 'DELETE', '​/user​/{userId}​/courses​/{courseId}');

      // Course endpoints
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
      
      // Paymetn endpoints
      testApiEndpoint(2, 0, 'POST', '​/courses​/{courseId}​/pay');

      // Report endpoints
      testApiEndpoint(3, 0, 'POST', '​/report');

  });

  function testApiEndpoint(sectionIndex, methodIndex, expectedMethod, expectedPath) {
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

      if (!(sectionIndex == 3 || (sectionIndex == 1 && (methodIndex == 0 || methodIndex == 8 )))) {
        cy.get('[class="opblock-tag-section is-open"]')  
          .eq(sectionIndex)                             
          .children('div')                              
          .children()                                   
          .eq(methodIndex)                              
          .find('input')                               
          .should('have.class', 'invalid')
          .and('have.attr', 'title', 'Required field is not provided');   

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

      cy.get('[class="opblock-tag-section is-open"]')  
          .eq(sectionIndex)                             
          .children('div')                              
          .children()                                   
          .eq(methodIndex)                              
          .find('div.copy-paste')
          .find('textarea.curl')
          .should('exist');   

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
  