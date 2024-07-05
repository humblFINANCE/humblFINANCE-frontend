Cypress.on("uncaught:exception", (err, runnable) => {
  return false;
});

const sessionId = new Date().toString();

describe("template spec", () => {
  it("should login anonymously", () => {
    cy.anonymouseLogin(sessionId);
  });

  it("anonymouse user should cannot add watch list", () => {
    cy.anonymouseLogin(sessionId);
    cy.visit("http://localhost:3000/dashboard/home");
    cy.get('a[href="/dashboard/portfolio"]').click();
    cy.get('button[id="watchlist-setting"]').click();
    cy.get('input[aria-label="watchlist Name"]').type("new");
    cy.get("button").contains("Add").click();
    cy.get("span").contains("Oops");
  });
});
