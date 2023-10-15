describe("Fibonacci Component", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/fibonacci");
  });

  it("Should disable the button when the input field is empty", () => {
    cy.getByData("text-input").should("be.empty");
    cy.getByData("button-component").should("be.disabled");
  });

  it("Should render fibonacci sequence", () => {
    cy.getByData("text-input").type("19");
    cy.getByData("button-component").click();

    cy.getByData("circle-element").eq(0).should("have.text", "0");
    cy.wait(500);
    cy.getByData("circle-element").eq(1).should("have.text", "1");
    cy.wait(500);
    cy.getByData("circle-element").eq(2).should("have.text", "1");
    cy.wait(500);
    cy.getByData("circle-element").eq(3).should("have.text", "2");
    cy.wait(500);
    cy.getByData("circle-element").eq(4).should("have.text", "3");
    cy.wait(500);

    cy.getByData("circle-element").eq(5).should("have.text", "5");
    cy.wait(500);
    cy.getByData("circle-element").eq(6).should("have.text", "8");
    cy.wait(500);
    cy.getByData("circle-element").eq(7).should("have.text", "13");
    cy.wait(500);
    cy.getByData("circle-element").eq(8).should("have.text", "21");
    cy.wait(500);
    cy.getByData("circle-element").eq(9).should("have.text", "34");

    cy.getByData("circle-element").eq(10).should("have.text", "55");
    cy.wait(500);
    cy.getByData("circle-element").eq(11).should("have.text", "89");
    cy.wait(500);
    cy.getByData("circle-element").eq(12).should("have.text", "144");
    cy.wait(500);
    cy.getByData("circle-element").eq(13).should("have.text", "233");
    cy.wait(500);
    cy.getByData("circle-element").eq(14).should("have.text", "377");

    cy.getByData("circle-element").eq(15).should("have.text", "610");
    cy.wait(500);
    cy.getByData("circle-element").eq(16).should("have.text", "987");
    cy.wait(500);
    cy.getByData("circle-element").eq(17).should("have.text", "1597");
    cy.wait(500);
    cy.getByData("circle-element").eq(18).should("have.text", "2584");
    cy.wait(500);
    cy.getByData("circle-element").eq(19).should("have.text", "4181");
  });
});
