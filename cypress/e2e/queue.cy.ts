describe("Queue Component", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/queue");
  });

  it("Should disable the button when the input field is empty", () => {
    cy.getByData("text-input").should("be.empty");
    cy.getByData("button-component").should("be.disabled");
  });

  it("Should add an element to the queue", () => {
    cy.getByData("text-input").type("7");
    cy.get('button[type="submit"]').click();

    cy.getByData("circle-element")
      .eq(0)
      .should("have.attr", "class")
      .and("include", "changing");

    cy.wait(500);

    cy.getByData("circle-element")
      .eq(0)
      .should("have.attr", "class")
      .and("include", "default");

    cy.getByData("circle-component")
      .eq(0)
      .find('[data-test="tail"]')
      .should("have.text", "tail");

    cy.getByData("circle-component")
      .eq(0)
      .find('[data-test="head"]')
      .should("have.text", "head");
  });
});
