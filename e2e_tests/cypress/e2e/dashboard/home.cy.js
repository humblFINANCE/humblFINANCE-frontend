/// <reference types="Cypress" />

const sessionId = new Date().toString();

const showDashboardHome = () => {
  cy.visit("/dashboard/home");
  cy.url().should("contain", "dashboard/home");
  cy.get("h2").contains("Home").should("exist");
};

const changeDefaultTheme = () => {
  cy.intercept("GET", `${Cypress.env("supabaseURL")}/rest/v1/profiles*`).as("getUser");
  cy.intercept("PATCH", `${Cypress.env("supabaseURL")}/rest/v1/profiles*`).as("updateUser");

  cy.visit("/dashboard/home");

  cy.wait(10000);
  cy.get("#user-dropdown").should("not.exist");
  cy.get("button#user-dropdown-trigger").then(($button) => {
    cy.wrap($button).click();
    cy.get("#user-dropdown").should("exist");

    cy.wait("@getUser").then((interception) => {
      const user = interception.response.body[0];

      cy.get("[data-test='default-theme']")
        .invoke("attr", "data-current-theme")
        .then((currentTheme) => {
          cy.get("[data-test='default-theme']").click();

          if (!currentTheme) {
            currentTheme = user.default_theme;
            window.localStorage.setItem("theme", currentTheme);
          }

          const expectedTheme = currentTheme === "light" ? "dark" : "light";
          const messageRegex = new RegExp(
            `Default Theme Changed to ${expectedTheme.charAt(0).toUpperCase() + expectedTheme.slice(1)}`,
            "i"
          );

          // Multiple checks to ensure the theme is changed
          cy.wait("@updateUser").its("response.statusCode").should("be.oneOf", [200, 304]);
          cy.get("html", { timeout: 5000 }).should("have.class", expectedTheme);
          cy.get(".Toastify > div > div").last().contains("div", messageRegex).should("be.visible");
          cy.get(".Toastify > div > div")
            .last()
            .contains("div", /Failed to update Default Theme/i)
            .should("not.exist");

          cy.getAllLocalStorage().should(() => {
            expect(localStorage.getItem("theme")).to.eq(expectedTheme);
          });
        });
    });
  });
};

describe("Dashboard Home Page", () => {
  context("Anonymous user", () => {
    beforeEach(() => {
      cy.anonymouseLogin(sessionId);
    });

    it("Should be able to see the dashboard home page", () => {
      showDashboardHome();
    });

    it("Should be able to change the default theme", () => {
      changeDefaultTheme();
    });
  });

  context("Logged in user with email and password", () => {
    beforeEach(() => {
      cy.signInWithEmail(Cypress.env("email"), Cypress.env("password"));
    });

    it("Should be able to see the dashboard home page", () => {
      showDashboardHome();
    });

    it("Should be able to change the default theme", () => {
      changeDefaultTheme();
    });
  });

  context("Logged in user with cookie", () => {
    beforeEach(() => {
      cy.signInWithCookie(sessionId, Cypress.env("authCookie"));
    });

    it("Should be able to see the dashboard home page", () => {
      showDashboardHome();
    });

    it("Should be able to change the default theme", () => {
      changeDefaultTheme();
    });
  });
});
