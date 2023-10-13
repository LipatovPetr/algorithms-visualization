describe("App", () => {
  it("Successfully loads", () => {
    cy.visit("http://localhost:3000");
  });

  it("Routing works", () => {
    cy.visit("http://localhost:3000/recursion");
    cy.visit("http://localhost:3000/fibonacci");
    cy.visit("http://localhost:3000/sorting");
    cy.visit("http://localhost:3000/stack");
    cy.visit("http://localhost:3000/queue");
    cy.visit("http://localhost:3000/list");
  });
});
