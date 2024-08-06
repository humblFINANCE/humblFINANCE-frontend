/// <reference types="Cypress" />

const navItems = [
  {
    label: "Features",
    href: "/features",
    heading: "Features",
  },
  {
    label: "Investing Framework",
    href: "/investing-framework",
    heading: "Investing Framework",
  },
  {
    label: "Pricing",
    href: "/pricing",
    heading: "Compare plans & features.",
  },
  {
    label: "About Us",
    href: "/about-us",
    heading: "About",
  },
];

describe("Home Page", () => {
  it("Should be able to see the home page", () => {
    cy.visit("/");
    cy.get("h1").should("have.text", "humblFINANCEinvesting. re-imagined.");
  });

  it("Should be able to navigate the navbar", () => {
    cy.visit("/");
    navItems.forEach((navItem) => {
      cy.get("nav").find("a").contains(navItem.label).click();
      cy.url().should("include", navItem.href);
      cy.get("h1").should("have.text", navItem.heading);
    });
  });
});
