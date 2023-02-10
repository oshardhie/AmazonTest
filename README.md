

## README

  
This End-To-End automation project is developed using Cypress/Mocha framework for testing shopping cart at Amazon.com.  
  
In order to run the project, make sure latest version of Node.js and npm is available in your environment.  
  

## Running the test

 1. Clone the project from GitHub repository to your local environment -  https://github.com/oshardhie/AmazonTest  
2. Navigate inside AmazonTest/ folder and execute the command 'npm install'.  
3. Execute the command 'npx cypress open' to open cypress test runner.  
4. Select 'E2E Testing' from the welcome page.  
5. Choose a web browser you want to execute the test and click to start.  
6. Once the Cypress test runner opens the project in the selected browser, click on 'Cypress/e2e -> amazonShoppingCart.cy.js'.  
7. Each spec execution status will be available on the left side panel and automation output will be visible on the browser, right side.  
8. Upon completion of the test execution, navigate to 'cypress/reports/html/' to find a report of the test results.  
9. Navigate to 'cypress/screenshots/' to find screenshots of the browser page of the failure cases.   
10. Navigate to 'cypress/video/' to find the video of execution.

## Challenges/Issues Faced

#1
One of the task was to add quantity of two items from the second item from the Product List into the cart.  Product quantity is located in this automation from **cy.get('#quantity').** However, this element is not always available on the web page and assertion fails due to that. It is missing on the page when there is only one item left in the stock or product is out of stock.

#2
Flaky tests are another challenge that different executions same code gives gave different test results from different browsers as well in the same web browser.
