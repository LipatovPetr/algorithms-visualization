import {
  BASE_URL,
  TEXT_INPUT,
  CIRCLE_COMPONENT,
  CIRCLE_ELEMENT,
  BUTTON_COMPONENT,
} from "../../src/constants/e2e-tests";

describe("Queue Component", () => {
  beforeEach(() => {
    cy.visit(`${BASE_URL}/queue`);
  });

  it("Should disable the button when the input field is empty", () => {
    cy.getByData(TEXT_INPUT).should("be.empty");
    cy.getByData(BUTTON_COMPONENT).should("be.disabled");
  });

  it("Should add an element to the queue", () => {
    cy.getByData(TEXT_INPUT).type("7");
    cy.get('button[type="submit"]').click();

    cy.getByData(CIRCLE_ELEMENT)
      .eq(0)
      .should("have.attr", "class")
      .and("include", "changing");

    cy.wait(500);

    cy.getByData(CIRCLE_ELEMENT)
      .eq(0)
      .should("have.attr", "class")
      .and("include", "default");

    cy.getByData(CIRCLE_ELEMENT).eq(0).should("have.text", "7");

    cy.getByData(CIRCLE_COMPONENT)
      .eq(0)
      .find('[data-test="tail"]')
      .should("have.text", "tail");

    cy.getByData(CIRCLE_COMPONENT)
      .eq(0)
      .find('[data-test="head"]')
      .should("have.text", "head");
  });

  it("Should remove an element from the queue", () => {
    cy.getByData(TEXT_INPUT).type("7");
    cy.get('button[type="submit"]').click();

    cy.wait(500);

    cy.getByData(CIRCLE_ELEMENT).eq(0).should("have.text", "7");
    cy.contains("Удалить").click();

    cy.getByData(CIRCLE_ELEMENT)
      .eq(0)
      .should("have.attr", "class")
      .and("include", "changing");

    cy.wait(500);

    cy.getByData(CIRCLE_ELEMENT)
      .eq(0)
      .should("have.attr", "class")
      .and("include", "default")
      .and("not.contain", "7");
  });

  it("Should clear everything in the queue", () => {
    cy.getByData(TEXT_INPUT).type("1");
    cy.get('button[type="submit"]').click();

    cy.wait(500);

    cy.getByData(TEXT_INPUT).type("2");
    cy.get('button[type="submit"]').click();

    cy.wait(500);

    cy.getByData(TEXT_INPUT).type("3");
    cy.get('button[type="submit"]').click();

    cy.getByData(CIRCLE_ELEMENT).eq(0).should("have.text", "1");
    cy.getByData(CIRCLE_ELEMENT).eq(1).should("have.text", "2");
    cy.getByData(CIRCLE_ELEMENT).eq(2).should("have.text", "3");

    cy.contains("Очистить").click();

    cy.getByData(CIRCLE_ELEMENT).eq(0).should("not.contain", "1");
    cy.getByData(CIRCLE_ELEMENT).eq(1).should("not.contain", "2");
    cy.getByData(CIRCLE_ELEMENT).eq(2).should("not.contain", "3");
  });
});
