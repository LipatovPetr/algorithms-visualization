import {
  BASE_URL,
  TEXT_INPUT,
  CIRCLE_ELEMENT,
  BUTTON_COMPONENT,
  BUTTON_TYPE_SUBMIT,
} from "../../src/constants/e2e-tests";

describe("Stack Component", () => {
  beforeEach(() => {
    cy.visit(`${BASE_URL}/stack`);
  });

  it("Should disable the button when the input field is empty", () => {
    cy.getByData(TEXT_INPUT).should("be.empty");
    cy.getByData(BUTTON_COMPONENT).should("be.disabled");
  });

  it("Should add an element to the stack", () => {
    cy.getByData(TEXT_INPUT).type("7");
    cy.get(BUTTON_TYPE_SUBMIT).click();

    cy.getByData(CIRCLE_ELEMENT)
      .eq(0)
      .should("have.attr", "class")
      .and("include", "changing");

    cy.wait(500);

    cy.getByData(CIRCLE_ELEMENT)
      .eq(0)
      .should("have.attr", "class")
      .and("include", "default");
  });

  it("Should remove an element from the stack", () => {
    cy.getByData(TEXT_INPUT).type("7");
    cy.get(BUTTON_TYPE_SUBMIT).click();

    cy.getByData(CIRCLE_ELEMENT).eq(0);

    cy.wait(1000);

    cy.contains("Удалить").click();

    cy.getByData(CIRCLE_ELEMENT)
      .eq(0)
      .should("have.attr", "class")
      .and("include", "changing");

    cy.wait(1000);

    cy.getByData(CIRCLE_ELEMENT).should("have.length", 0);
  });

  it("Should clear the stack", () => {
    cy.getByData(TEXT_INPUT).type("7");
    cy.get(BUTTON_TYPE_SUBMIT).click();

    cy.wait(1000);

    cy.getByData(TEXT_INPUT).type("7");
    cy.get(BUTTON_TYPE_SUBMIT).click();

    cy.wait(1000);

    cy.getByData(TEXT_INPUT).type("7");
    cy.get(BUTTON_TYPE_SUBMIT).click();

    cy.contains("Очистить").click();
    cy.getByData(CIRCLE_ELEMENT).should("have.length", 0);
  });
});
