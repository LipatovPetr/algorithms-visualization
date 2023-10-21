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

    cy.getByData("circle-element").eq(0).should("have.text", "7");

    cy.getByData("circle-component")
      .eq(0)
      .find('[data-test="tail"]')
      .should("have.text", "tail");

    cy.getByData("circle-component")
      .eq(0)
      .find('[data-test="head"]')
      .should("have.text", "head");
  });

  it("Should remove an element from the queue", () => {
    cy.getByData("text-input").type("7");
    cy.get('button[type="submit"]').click();

    cy.wait(500);

    cy.getByData("circle-element").eq(0).should("have.text", "7");
    cy.contains("Удалить").click();

    cy.getByData("circle-element")
      .eq(0)
      .should("have.attr", "class")
      .and("include", "changing");

    cy.wait(500);

    cy.getByData("circle-element")
      .eq(0)
      .should("have.attr", "class")
      .and("include", "default")
      .and("not.contain", "7");
  });

  it("Should clear everything in the queue", () => {
    cy.getByData("text-input").type("1");
    cy.get('button[type="submit"]').click();

    cy.wait(500);

    cy.getByData("text-input").type("2");
    cy.get('button[type="submit"]').click();

    cy.wait(500);

    cy.getByData("text-input").type("3");
    cy.get('button[type="submit"]').click();

    cy.getByData("circle-element").eq(0).should("have.text", "1");
    cy.getByData("circle-element").eq(1).should("have.text", "2");
    cy.getByData("circle-element").eq(2).should("have.text", "3");

    cy.contains("Очистить").click();

    cy.getByData("circle-element").eq(0).should("not.contain", "1");
    cy.getByData("circle-element").eq(1).should("not.contain", "2");
    cy.getByData("circle-element").eq(2).should("not.contain", "3");
  });
});
