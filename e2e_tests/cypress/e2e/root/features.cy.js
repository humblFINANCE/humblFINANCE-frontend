/// <reference types="Cypress" />

describe("Features Page", () => {
  it("Should be able to see the features page", () => {
    cy.visit("/features");
    cy.get("h1").should("have.text", "Features");
  });
});
