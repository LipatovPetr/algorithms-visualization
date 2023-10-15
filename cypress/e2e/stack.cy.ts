describe("Stack Component", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/stack");
  });

  it("Should disable the button when the input field is empty", () => {
    cy.getByData("text-input").should("be.empty");
    cy.getByData("button-component").should("be.disabled");
  });

  it("Should add an element to the stack", () => {
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
  });

  it("Should remove an element from the stack", () => {
    cy.getByData("text-input").type("7");
    cy.get('button[type="submit"]').click();

    cy.getByData("circle-element").eq(0);

    cy.wait(1000);

    cy.contains("Удалить").click();

    cy.getByData("circle-element")
      .eq(0)
      .should("have.attr", "class")
      .and("include", "changing");

    cy.wait(1000);

    cy.getByData("circle-element").should("have.length", 0);
  });

  it("Should clear  the stack", () => {
    cy.getByData("text-input").type("7");
    cy.get('button[type="submit"]').click();

    cy.wait(1000);

    cy.getByData("text-input").type("7");
    cy.get('button[type="submit"]').click();

    cy.wait(1000);

    cy.getByData("text-input").type("7");
    cy.get('button[type="submit"]').click();

    cy.contains("Очистить").click();
    cy.getByData("circle-element").should("have.length", 0);
  });
});
