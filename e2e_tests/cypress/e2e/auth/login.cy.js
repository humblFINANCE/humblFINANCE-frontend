/// <reference types="Cypress" />

const sessionId = new Date().toString();

describe("Basic Login", () => {
  it("Should be able to login anonymously", () => {
    cy.anonymouseLogin(sessionId);
  });

  it("Should be able to login with email and password", () => {
    cy.signInWithEmail(Cypress.env("email"), Cypress.env("password"));
  });
});
