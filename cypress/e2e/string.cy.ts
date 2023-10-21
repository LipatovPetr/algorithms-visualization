import { BASE_URL, TEXT_INPUT } from "../../src/constants/e2e-tests";

describe("String Component", () => {
  beforeEach(() => {
    cy.visit(`${BASE_URL}/string`);
  });

  it("Should disable the button when the input field is empty", () => {
    cy.getByData(TEXT_INPUT).should("be.empty");
    cy.getByData("button-component").should("be.disabled");
  });

  it("Should check the animation steps", () => {
    cy.getByData(TEXT_INPUT).type("abc");
    cy.getByData("button-component").click();

    cy.wait(1000);

    cy.getByData("circle-element")
      .eq(0)
      .should("have.text", "a")
      .should("have.attr", "class")
      .and("include", "changing");
    cy.getByData("circle-element")
      .eq(1)
      .should("have.text", "b")
      .should("have.attr", "class")
      .and("include", "default");
    cy.getByData("circle-element")
      .eq(2)
      .should("have.text", "c")
      .should("have.attr", "class")
      .and("include", "changing");

    cy.wait(1000);

    cy.getByData("circle-element")
      .eq(0)
      .should("have.text", "c")
      .should("have.attr", "class")
      .and("include", "modified");
    cy.getByData("circle-element")
      .eq(1)
      .should("have.text", "b")
      .should("have.attr", "class")
      .and("include", "default");
    cy.getByData("circle-element")
      .eq(2)
      .should("have.text", "a")
      .should("have.attr", "class")
      .and("include", "modified");

    cy.wait(1000);

    cy.getByData("circle-element")
      .eq(0)
      .should("have.text", "c")
      .should("have.attr", "class")
      .and("include", "modified");
    cy.getByData("circle-element")
      .eq(1)
      .should("have.text", "b")
      .should("have.attr", "class")
      .and("include", "changing");
    cy.getByData("circle-element")
      .eq(2)
      .should("have.text", "a")
      .should("have.attr", "class")
      .and("include", "modified");

    cy.wait(1000);

    cy.getByData("circle-element")
      .eq(0)
      .should("have.text", "c")
      .should("have.attr", "class")
      .and("include", "modified");
    cy.getByData("circle-element")
      .eq(1)
      .should("have.text", "b")
      .should("have.attr", "class")
      .and("include", "modified");
    cy.getByData("circle-element")
      .eq(2)
      .should("have.text", "a")
      .should("have.attr", "class")
      .and("include", "modified");
  });
});
