Cypress.Commands.add("anonymouseLogin", (id) => {
  cy.session(id, () => {
    cy.visit("/");
    cy.url().then((url) => {
      cy.intercept("POST", url).as("loginAnonymously");
      cy.get("button").contains("Dashboard").click();
      cy.get("button").contains("Continue Anonymously").click();
      cy.wait("@loginAnonymously");
      cy.url({ timeout: 10000 }).should("contain", "dashboard/home");
    });
  });
});

Cypress.Commands.add("signInWithEmail", (email, password) => {
  cy.session([email, password], () => {
    cy.visit("/login");
    cy.url().then((url) => {
      cy.intercept("POST", url).as("loginWithEmail");
      cy.get("button").contains("Continue with Email").click();
      cy.get('input[type="email"]').type(email);
      cy.get('input[type="password"]').type(password);
      cy.get('button[type="submit"]').contains("Login").click();
      cy.wait("@loginWithEmail").then((interception) => {
        expect(interception.request.body).to.include(email);
        cy.get("pre", { timeout: 10000 }).contains(email).should("exist");
      });
    });
  });
});

Cypress.Commands.add("providerLogin", (provider, callback) => {
  cy.session(provider, () => {
    cy.visit("/");
    cy.get("button").contains("Dashboard").click();
    cy.get(`button#login-with-${provider}`).then(($button) => {
      if ($button.is(":not(:disabled)")) {
        cy.wrap($button).click();
        callback();
      } else {
        cy.log(`Button for ${provider} auth is disabled`);
        console.warn(`Button for ${provider} auth is disabled`);
      }
    });
  });
});

Cypress.Commands.add("signInWithCookie", (id, cookie) => {
  cy.session(["cookie-session", id], () => {
    cy.visit("/");
    cy.setCookie("sb-loavwylgjranxanmktaa-auth-token", cookie);
    cy.visit("/dashboard/home");
    cy.url().should("contain", "dashboard/home");
  });
});
