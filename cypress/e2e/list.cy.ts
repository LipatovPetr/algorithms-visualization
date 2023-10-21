describe("Linked-List Component", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/list");
  });

  it("Should disable the button when the input field is empty", () => {
    cy.getByData("text-input").should("be.empty");
    cy.getByData("button-component").should("be.disabled");
  });

  it("Should render a default list", () => {
    cy.getByData("circle-component").should("have.length.greaterThan", 0);
  });

  it("Should add an element to the Head", () => {
    cy.getByData("text-input").first().type("14");
    cy.contains("Добавить в head").click();

    cy.get('[class*="small"]').last().should("have.text", "14");

    cy.wait(500);
    cy.getByData("circle-element").first().should("have.text", "14");
  });

  it("Should add an element to the Tail", () => {
    cy.getByData("text-input").first().type("14");
    cy.contains("Добавить в tail").click();

    cy.get('[class*="small"]').last().should("have.text", "14");

    cy.wait(500);
    cy.getByData("circle-element").last().should("have.text", "14");
  });

  it("Should remove an element from the Head", () => {
    cy.getByData("text-input").first().type("14");
    cy.contains("Добавить в head").click();

    cy.wait(500);
    cy.getByData("circle-element").first().should("have.text", "14");

    cy.contains("Удалить из head").click();

    cy.get('[class*="small"]').last().should("have.text", "14");
    cy.getByData("circle-element").first().should("not.contain", "14");
  });

  it.only("Should remove an element from the Tail", () => {
    cy.getByData("text-input").first().type("14");
    cy.contains("Добавить в tail").click();

    cy.wait(500);
    cy.getByData("circle-element").last().should("have.text", "14");

    cy.contains("Удалить из tail").click();

    cy.get('[class*="small"]').last().should("have.text", "14");
    cy.getByData("circle-element").last().should("not.contain", "14");
  });
});
