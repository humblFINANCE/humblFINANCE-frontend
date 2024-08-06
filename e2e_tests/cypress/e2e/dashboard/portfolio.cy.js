/// <reference types="Cypress" />

const date = new Date();
const dateOptions = {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
};

const sessionId = date.toString();
const currentDate = new Intl.DateTimeFormat("en-US", dateOptions).format(date);
let watchlistName = `test-${currentDate}`;
const symbolCode = "A";

const visitPortfolioPage = () => {
  cy.visit("/dashboard/portfolio");
  cy.url().should("contain", "dashboard/portfolio");
  cy.get("h2").contains("Portfolio").should("exist");
};

/**
 * @param {Object} props
 * @param {"SWITCH" | "ADD" | "RENAME" | "REMOVE"} props.type
 * @param {boolean | undefined} props.shouldSuccess
 * @param {boolean | undefined} props.isAnonymous
 */
const watchlistTests = ({ type = "ADD", shouldSuccess = true, isAnonymous = false }) => {
  const ALLOWED_TYPES = ["SWITCH", "ADD", "RENAME", "REMOVE"];
  if (!ALLOWED_TYPES.includes(type)) {
    throw new Error("Invalid test type");
  }

  cy.visit("/dashboard/portfolio");

  const watchlistEndpoint = new URL(`${Cypress.env("supabaseURL")}/rest/v1/watchlists`);
  cy.intercept("GET", `${Cypress.env("supabaseURL")}/auth/v1/user`).as("getUser");
  cy.intercept("GET", `${watchlistEndpoint.toString()}*`).as("getWatchlists");
  cy.intercept("POST", `${watchlistEndpoint.toString()}*`).as("addWatchlist");
  cy.intercept("PATCH", `${watchlistEndpoint.toString()}*`).as("renameWatchlist");
  cy.intercept("DELETE", `${Cypress.env("supabaseURL")}/rest/v1/watchlist_symbols*`).as("removeWatchlistSymbols");
  cy.intercept("DELETE", `${watchlistEndpoint.toString()}*`).as("removeWatchlist");

  cy.wait("@getUser").then((interception) => {
    const user = interception.response.body;

    cy.wait("@getWatchlists").then((interception) => {
      const watchlists = interception.response.body;
      const watchlist = watchlists.find((data) => data.name === watchlistName);

      if (type === "SWITCH") {
        cy.get("button#select-watchlist").then(($button) => {
          cy.get($button).click();
          cy.get("ul[role='listbox'] li", { timeout: 5000 }).contains(watchlistName).click();

          if (watchlist.watchlist_symbols.length > 0) {
            cy.intercept("GET", `${Cypress.env("supabaseURL")}/api/user-table*`).as("getSymbolDetails");
            cy.wait("@getSymbolDetails").then((interception) => {
              watchlist.watchlist_symbols.forEach((symbol) => {
                cy.get("div[col-id='symbol']").contains(symbol.symbol).should("exist");
              });
            });
          }
        });

        return false;
      }

      cy.get("button#add-watchlist").click();
      cy.get("h4").contains("My Watchlists").should("exist");

      if (type === "ADD") {
        cy.get("button#save-watchlist").as("addButton");
        cy.get("@addButton").should("be.disabled");
        cy.get("input[type='text'][aria-label='watchlist-name']").type(watchlistName);
        cy.get("@addButton").should("be.enabled").click();

        if (isAnonymous) {
          cy.get("section[role='dialog']").then(($dialog) => {
            cy.get($dialog)
              .find("header")
              .contains(/Oops... you need to be a HumblPEON to access this feature/)
              .should("exist");

            cy.get($dialog)
              .find("div")
              .contains(/Don't worry, access is as easy as clicking below/)
              .should("exist");
          });

          return false;
        }

        if (!shouldSuccess) {
          cy.get("p").contains("Watchlist already exists").should("exist");
          return false;
        }

        cy.wait("@addWatchlist").its("response.statusCode").should("be.oneOf", [200, 201]);
      }

      if (type === "RENAME") {
        cy.get(`div[data-watchlist-id='${watchlist.id}']`).then(($watchlist) => {
          cy.get($watchlist).find("button#edit-watchlist").click();
          watchlistName = `test-${currentDate}-renamed`;
          cy.get("input[type='text'][aria-label='watchlist-name']").clear().type(watchlistName);
        });

        cy.get("button#save-watchlist").as("saveButton");
        cy.get("@saveButton").should("be.enabled").click();
        cy.wait("@renameWatchlist").its("response.statusCode").should("be.oneOf", [200, 201]);
      }

      if (type === "REMOVE") {
        cy.get(`div[data-watchlist-id='${watchlist.id}']`).then(($watchlist) => {
          cy.get($watchlist).find("button#remove-watchlist").click();
        });

        cy.wait("@getUser").then(() => {
          cy.wait("@removeWatchlistSymbols").its("response.statusCode").should("be.oneOf", [200, 204]);
          cy.wait("@removeWatchlist").its("response.statusCode").should("be.oneOf", [200, 204]);
        });

        return false;
      }

      cy.wait("@getWatchlists").then((interception) => {
        const watchlists = interception.response.body;
        const newWatchlist = watchlists.find((watchlist) => watchlist.name === watchlistName);

        cy.get("h4").contains("My Watchlists").should("exist");

        if (type === "REMOVE") {
          cy.get("#watchlists[role='list']").contains(newWatchlist.name).should("not.exist");
        } else {
          cy.get("#watchlists[role='list']").contains(newWatchlist.name).should("exist");
        }
      });
    });
  });
};

/**
 * @param {Object} props
 * @param {"ADD" | "REMOVE"} props.type
 * @param {boolean | undefined} props.shouldSuccess
 */
const symbolTests = ({ type = "ADD", shouldSuccess = true }) => {
  if (type !== "ADD" && type !== "REMOVE") {
    throw new Error("Invalid test type");
  }

  cy.visit("/dashboard/portfolio");

  const watchlistEndpoint = new URL(`${Cypress.env("supabaseURL")}/rest/v1/watchlists`);
  cy.intercept("GET", `${Cypress.env("supabaseURL")}/auth/v1/user`).as("getUser");
  cy.intercept("GET", `${watchlistEndpoint.toString()}*`).as("getWatchlists");
  cy.intercept("GET", `${Cypress.env("supabaseURL")}/rest/v1/all_symbols*`).as("getSymbols");
  cy.intercept("GET", `${Cypress.env("supabaseURL")}/rest/v1/watchlist_symbols*`).as("getCurrentSymbols");
  cy.intercept("POST", `${Cypress.env("supabaseURL")}/rest/v1/watchlist_symbols`).as("addSymbol");
  cy.intercept("DELETE", `${Cypress.env("supabaseURL")}/rest/v1/watchlist_symbols*`).as("removeSymbol");

  cy.wait("@getUser").then((interception) => {
    const user = interception.response.body;

    cy.wait("@getWatchlists").then(() => {
      cy.get("button#add-watchlist").click();
      cy.get("h4").contains("My Watchlists").should("exist");
      cy.get("#watchlists[role='list']")
        .contains(watchlistName)
        .then(($watchlist) => {
          const watchlistId = $watchlist.attr("data-watchlist-id");

          cy.get($watchlist).click();
          cy.get("h4").contains(watchlistName).should("exist");

          cy.wait("@getCurrentSymbols").then((interception) => {
            const currentSymbols = interception.response.body;
            const isSymbolExist = currentSymbols.some((data) => data.symbol === symbolCode);

            if (type === "ADD") {
              cy.get("button#add-symbol").as("addSymbolButton");
              cy.get("@addSymbolButton").should("be.disabled");

              cy.get("input[type='text'][aria-label='symbol']").type(symbolCode);
              cy.wait("@getSymbols").then((interception) => {
                const symbols = interception.response.body;
                const symbol = symbols.find((data) => data.symbol === symbolCode);

                cy.get(`li[role='option'][data-key='${symbol.symbol}']`).click();
                cy.get("@addSymbolButton").should("be.enabled").click();

                if (!shouldSuccess && isSymbolExist) {
                  cy.get("p").contains("Symbol already added").should("exist");
                  return false;
                }

                cy.wait("@addSymbol").its("response.statusCode").should("be.oneOf", [200, 201]);
                cy.get(`div[data-symbol-code="${symbol.symbol}"]`).should("exist");
              });
            }

            if (type === "REMOVE") {
              cy.get(`div[data-symbol-code="${symbolCode}"]`).then(($symbol) => {
                cy.get($symbol).find("button").click();
                cy.wait("@removeSymbol").its("response.statusCode").should("be.oneOf", [200, 204]);
                cy.get(`div[data-symbol-code="${symbolCode}"]`).should("not.exist");
              });
            }
          });
        });
    });
  });
};

describe("Dashboard Portfolio Page", () => {
  context("Anonymous user", () => {
    beforeEach(() => {
      cy.anonymouseLogin(sessionId);
    });

    it("Should be able to see the portfolio page", () => {
      visitPortfolioPage();
    });

    it("Should prevent anonymous users from adding new watchlists", () => {
      watchlistTests({ isAnonymous: true, shouldSuccess: false });
    });
  });

  context("Logged in user with email and password", () => {
    beforeEach(() => {
      cy.signInWithEmail(Cypress.env("email"), Cypress.env("password"));
    });

    it("Should be able to see the portfolio page", () => {
      visitPortfolioPage();
    });

    it("Should be able to add a new watchlist", () => {
      watchlistTests({ type: "ADD", shouldSuccess: true });
    });

    it("Should not be able to add watchlist with the same name", () => {
      watchlistTests({ type: "ADD", shouldSuccess: false });
    });

    it("Should be able to rename a watchlist", () => {
      watchlistTests({ type: "RENAME" });
    });

    it("Should be able to switch between watchlists", () => {
      watchlistTests({ type: "SWITCH" });
    });

    it("Should be able to add a new symbol to a watchlist", () => {
      symbolTests({ type: "ADD", shouldSuccess: true });
    });

    it("Should not be able to add the same symbol to a watchlist", () => {
      symbolTests({ type: "ADD", shouldSuccess: false });
    });

    it("Should be able to remove a symbol from a watchlist", () => {
      symbolTests({ type: "REMOVE" });
    });

    it("Should be able to remove a watchlist", () => {
      watchlistTests({ type: "REMOVE" });
    });
  });

  context("Logged in user with cookie", () => {
    beforeEach(() => {
      cy.signInWithCookie(sessionId, Cypress.env("authCookie"));
    });

    it("Should be able to see the portfolio page", () => {
      visitPortfolioPage();
    });

    it("Should be able to add a new watchlist", () => {
      watchlistTests({ type: "ADD", shouldSuccess: true });
    });

    it("Should not be able to add watchlist with the same name", () => {
      watchlistTests({ type: "ADD", shouldSuccess: false });
    });

    it("Should be able to rename a watchlist", () => {
      watchlistTests({ type: "RENAME" });
    });

    it("Should be able to switch between watchlists", () => {
      watchlistTests({ type: "SWITCH" });
    });

    it("Should be able to add a new symbol to a watchlist", () => {
      symbolTests({ type: "ADD", shouldSuccess: true });
    });

    it("Should not be able to add the same symbol to a watchlist", () => {
      symbolTests({ type: "ADD", shouldSuccess: false });
    });

    it("Should be able to remove a symbol from a watchlist", () => {
      symbolTests({ type: "REMOVE" });
    });

    it("Should be able to remove a watchlist", () => {
      watchlistTests({ type: "REMOVE" });
    });
  });
});
