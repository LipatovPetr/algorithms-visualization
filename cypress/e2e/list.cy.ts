import {
  BASE_URL,
  TEXT_INPUT,
  CIRCLE_COMPONENT,
  CIRCLE_ELEMENT,
  BUTTON_COMPONENT,
  CLASS_CONTAINS_SMALL,
} from "../../src/constants/e2e-tests";

describe("Linked-List Component", () => {
  beforeEach(() => {
    cy.visit(`${BASE_URL}/list`);
  });

  it("Should disable the button when the input field is empty", () => {
    cy.getByData(TEXT_INPUT).should("be.empty");
    cy.getByData(BUTTON_COMPONENT).should("be.disabled");
  });

  it("Should render a default list", () => {
    cy.getByData(CIRCLE_COMPONENT).should("have.length.greaterThan", 0);
  });

  it("Should add an element to the Head", () => {
    cy.getByData(TEXT_INPUT).first().type("14");
    cy.contains("Добавить в head").click();

    cy.get('[class*="small"]')
      .last()
      .should("have.text", "14")
      .and("have.attr", "class")
      .and("include", "changing");

    cy.wait(500);
    cy.getByData(CIRCLE_ELEMENT)
      .first()
      .should("have.text", "14")
      .and("have.attr", "class")
      .and("include", "modified");

    cy.wait(500);

    cy.getByData(CIRCLE_ELEMENT)
      .first()
      .should("have.text", "14")
      .and("have.attr", "class")
      .and("include", "default");
  });

  it("Should add an element to the Tail", () => {
    cy.getByData(TEXT_INPUT).first().type("14");
    cy.contains("Добавить в tail").click();

    cy.get('[class*="small"]')
      .last()
      .should("have.text", "14")
      .and("have.attr", "class")
      .and("include", "changing");

    cy.wait(500);

    cy.getByData(CIRCLE_ELEMENT)
      .last()
      .should("have.text", "14")
      .and("have.attr", "class")
      .and("include", "modified");

    cy.wait(500);

    cy.getByData(CIRCLE_ELEMENT)
      .last()
      .should("have.text", "14")
      .and("have.attr", "class")
      .and("include", "default");
  });

  it("Should remove an element from the Head", () => {
    cy.getByData(TEXT_INPUT).first().type("14");
    cy.contains("Добавить в head").click();

    cy.wait(500);
    cy.getByData(CIRCLE_ELEMENT).first().should("have.text", "14");

    cy.contains("Удалить из head").click();

    cy.get('[class*="small"]')
      .last()
      .should("have.text", "14")
      .and("have.attr", "class")
      .and("include", "changing");

    cy.getByData(CIRCLE_ELEMENT).first().should("not.contain", "14");
  });

  it("Should remove an element from the Tail", () => {
    cy.getByData(TEXT_INPUT).first().type("14");
    cy.contains("Добавить в tail").click();

    cy.wait(500);
    cy.getByData(CIRCLE_ELEMENT).last().should("have.text", "14");

    cy.contains("Удалить из tail").click();

    cy.get('[class*="small"]')
      .last()
      .should("have.text", "14")
      .and("have.attr", "class")
      .and("include", "changing");

    cy.getByData(CIRCLE_ELEMENT).last().should("not.contain", "14");
  });

  it("Should add an element by the index", () => {
    cy.getByData(TEXT_INPUT).first().type("14");
    cy.getByData(TEXT_INPUT).last().type("1");

    cy.contains("Добавить по индексу").click();

    cy.get('[class*="small"]')
      .last()
      .should("have.text", "14")
      .and("have.attr", "class")
      .and("include", "changing");

    cy.wait(1500);
    cy.getByData(CIRCLE_ELEMENT)
      .eq(1)
      .should("have.text", "14")
      .and("have.attr", "class")
      .and("include", "modified");

    cy.wait(500);

    cy.getByData(CIRCLE_ELEMENT)
      .eq(1)
      .should("have.text", "14")
      .and("have.attr", "class")
      .and("include", "default");
  });

  it("Should remove an element by the index", () => {
    cy.getByData(TEXT_INPUT).first().type("14");
    cy.getByData(TEXT_INPUT).last().type("1");

    cy.contains("Добавить по индексу").click();

    cy.get('[class*="small"]')
      .last()
      .should("have.text", "14")
      .and("have.attr", "class")
      .and("include", "changing");

    cy.wait(1500);
    cy.getByData(CIRCLE_ELEMENT).eq(1).should("have.text", "14");

    cy.contains("Удалить по индексу").click();

    cy.wait(500);

    cy.getByData(CIRCLE_ELEMENT).eq(1).should("not.contain", "14");
  });
});
