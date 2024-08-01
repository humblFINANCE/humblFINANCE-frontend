/// <reference types="Cypress" />

describe("Pricing Page", () => {
  it("Should be able to see the pricing page", () => {
    cy.visit("/pricing");
    cy.get("h1").should("have.text", "Compare plans & features.");
  });
});
