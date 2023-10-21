import { BASE_URL } from "../../src/constants/e2e-tests";

describe("App", () => {
  it("Successfully loads", () => {
    cy.visit(BASE_URL);
  });

  it("Routing works", () => {
    cy.visit(`${BASE_URL}/recursion`);
    cy.visit(`${BASE_URL}/fibonacci`);
    cy.visit(`${BASE_URL}/sorting`);
    cy.visit(`${BASE_URL}/stack`);
    cy.visit(`${BASE_URL}/queue`);
    cy.visit(`${BASE_URL}/list`);
  });
});
