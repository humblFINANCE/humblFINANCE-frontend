/// <reference types="Cypress" />

describe("About Page", () => {
  it("Should be able to see the about us page", () => {
    cy.visit("/about-us");
    cy.get("h1").should("have.text", "About");
  });
});
