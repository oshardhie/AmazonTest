describe('Amazon Book Search', () => {
  let bookNameInSearchPage;
  let bookNameInProductPage;
  let unitPrice;

  it('Home - Visits Amazon Homepage and Selects Books Category', () => {
    cy.visit('https://www.amazon.com/')
    cy.get('#searchDropdownBox')
      .should('exist')
      .select('Books', { force: true });
  });

  it('Home - Searches for Automation Books', () => {
    cy.get('#twotabsearchtextbox')
      .should('exist')
      .type('Automation');

    cy.get('#nav-search-submit-button').click();

  });

  it('Search - Set rating to 4 STAR OR ABOVE', () => {
    cy.get('#reviewsRefinements').find('[aria-label="4 Stars & Up"]').click({ force: true });
  });

  it('Search - Set language filter to ENGLISH', () => {
    cy.get('#filters').contains('English').click({ force: true });
  });

  it('Search - Capture name and navigates to 2nd result', () => {

    cy.get('.s-result-item:nth-of-type(3) .a-link-normal > .a-size-medium')
      .should('exist')
      .invoke('text')
      .then(title => {
        bookNameInSearchPage = title.trim();
        cy.log(`Book Name in Search Page: ${bookNameInSearchPage}`);
      });

    cy.get('.s-result-item:nth-of-type(3) .a-link-normal > .a-size-medium')
      .should('exist')
      .click();

  });


  it('Product - Captures Book Name from Product Page', () => {
    cy.get('#productTitle')
      .should('exist')
      .invoke('text')
      .then(title => {
        bookNameInProductPage = title.trim();
        cy.log(`Book Name in Product Page: ${bookNameInProductPage}`);
      });
  });

  it('Product - Verifies if Book Names in Search and Product Page are Same', () => {
    // cy.log(`Book Name in search Page: ${bookNameInSearchPage}`);
    // cy.log(`Book Name in Product Page: ${bookNameInProductPage}`);
    expect(bookNameInSearchPage).to.equal(bookNameInProductPage)

  });

  it('Product - Captures Unit Price', () => {
    cy.get('.a-column > .a-price > [aria-hidden="true"]')
      .should('exist')
      .invoke('text')
      .then(text => {
        unitPrice = text;

        cy.log(`Unit Price: ${unitPrice}`);
      });
  });

  it('Product - Validate and increase the quantity to 2', () => {
    cy.get('#quantity')
      .then(($input) => {
        if ($input.is(':enabled')) {
          cy.get('#quantity').select('2',{ force: true });
        } else {
          cy.log('Item is not in stock');
        }
      })
  });

  it('Product - Add product to cart and navigate to card', () => {
    cy.get('#add-to-cart-button').click();

    cy.get('#nav-cart').click();

  });


  it('Cart - Validate Product Name', () => {

    cy.get('.a-truncate-cut')
      .should('exist')
      .invoke('text')
      .then(text => {
        expect(bookNameInSearchPage).to.equal(text.trim());
      });

  });

  it('Cart - Validate Price', () => {
    cy.get('#sc-subtotal-amount-activecart > .a-size-medium')
      .should('exist')
      .invoke('text')
      .then(subtotal => {
        let calculatedSubTotal = 2 * Number(unitPrice.replace(/[^0-9\.]+/g,""));
        let extractedSubTotal =  Number(subtotal.replace(/[^0-9\.]+/g,""));
        expect(calculatedSubTotal).to.equal(extractedSubTotal);
      });

  });

  it('Cart - Validate Quantity', () => {
    cy.get('.a-dropdown-prompt')
      .should('exist')
      .invoke('text')
      .then(qty => {
               expect(2).to.equal(Number(qty));
      });

  });


  it('Cart - Clear Cart', () => {
    cy.get('.sc-action-delete > .a-declarative > .a-color-link').click();
  });


  it('Cart - Verify amount after clear the cart', () => {
    cy.get('#sc-subtotal-amount-activecart > .a-size-medium')
      .should('exist')
      .invoke('text')
      .then(subtotal => {
        let zeroSubTotal =  Number(subtotal.replace(/[^0-9\.]+/g,""));
        expect(0).to.equal(zeroSubTotal);
      });

  });


});