/// <reference types="Cypress" />

Cypress.on("uncaught:exception", (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  return false;
});

describe("OAuth Login", () => {
  it("Should show the OAuth providers buttons", () => {
    cy.visit("/");
    cy.get("button").contains("Dashboard").click();
    cy.get("#social-login-form button").should("have.length.greaterThan", 0);
  });

  it("Should show Google login", () => {
    cy.providerLogin("google", () => {
      cy.origin("https://accounts.google.com", () => {
        cy.get("#headingSubtext", { timeout: 5000 }).contains(Cypress.env("supabaseHost"));
      });
    });
  });

  it("Should show Github login", () => {
    cy.providerLogin("github", () => {
      cy.origin("https://github.com", () => {
        cy.location("href").should("contain", Cypress.env("supabaseHost"));
      });
    });
  });

  it("Should show Twitter login", () => {
    cy.providerLogin("twitter", () => {
      cy.origin("https://twitter.com", () => {
        cy.location("href").should("contain", Cypress.env("supabaseHost"));
      });
    });
  });

  it("Should show Discord login", () => {
    cy.providerLogin("discord", () => {
      cy.origin("https://discord.com", () => {
        cy.location("href").should("contain", Cypress.env("supabaseHost"));
      });
    });
  });

  it("Should show Linkedin login", () => {
    cy.providerLogin("linkedin", () => {
      cy.origin("https://www.linkedin.com", () => {
        cy.location("href").should("contain", Cypress.env("supabaseHost"));
      });
    });
  });

  it("Should show Apple login", () => {
    cy.providerLogin("apple", () => {
      cy.origin("https://appleid.apple.com", () => {
        cy.location("href").should("contain", Cypress.env("supabaseHost"));
      });
    });
  });
});
