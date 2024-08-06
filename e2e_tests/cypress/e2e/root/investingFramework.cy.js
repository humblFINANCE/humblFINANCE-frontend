/// <reference types="Cypress" />

describe("Features Page", () => {
  it("Should be able to see the investing framework page", () => {
    cy.visit("/investing-framework");
    cy.get("h1").should("have.text", "Investing Framework");
  });
});
