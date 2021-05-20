/**
 * Finds all the character cards in the current page and count them 
 * set the count as @initialCardsCount alias,
 * chooses one randomly and set it as @randomCard alias
 */
function setup() {
  /**
   * Returns a random integer between min (inclusive) and max (inclusive).
   * The value is no lower than min (or the next integer greater than min
   * if min isn't an integer) and no greater than max (or the next integer
   * lower than max if max isn't an integer).
   * Using Math.round() will give you a non-uniform distribution!
   */
  function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  cy.findAllByTestId("characterListItem").then(el => {
    cy.wrap(el.length).as("initialCardsCount")
    const index = getRandomInt(0, el.length - 1)
    cy.wrap(el[index]).as("randomCard")
  })
}

it("Renders correctly", () => {
  cy.visit("/")
  setup()

  // has page header
  cy.findByRole("heading", { name: /Rick and Morty/i }).should("exist")

  // has 'add' button
  cy.findByRole("button", { name: "Add character button" }).should("exist")

  // Get a random card, and check it's got a minimum set of DOM objects.
  // This will also ensure there's at least 1 card present
  cy.get("@randomCard").within(() => {
    cy.findByRole("img").should("exist")
    cy.findByRole("heading").should("not.be.empty")
    cy.findByTestId("x-from-y").should("not.be.empty")
    cy.findByTestId("last-seen").should("not.be.empty")
    cy.findByRole("button", { name: /update character/i }).should("exist")
    cy.findByRole("button", { name: /delete character/i }).should("exist")
  })
})

it("Creates character", () => {
  cy.visit("/")
  setup()

  // open 'character create' modal
  cy.findByRole("button", { name: "Add character button" }).click()
  cy.url().should("include", "create")

  // load sample data
  cy.fixture("character").then(character => {
    // fill form
    cy.findByRole("textbox", { name: /name/i }).type(character.name)
    cy.findByRole("textbox", { name: /image/i }).type(character.image)
    cy.findByRole("textbox", { name: /status/i }).type(character.status)
    cy.findByRole("textbox", { name: /gender/i }).type(character.gender)
    cy.findByRole("textbox", { name: /origin/i }).type(character.origin)
    cy.findByRole("textbox", { name: /location/i }).type(character.location)
  })

  // submit form
  cy.findByRole("button", { name: /save/i }).click()

  cy.get("@initialCardsCount").then(initialCardsCount => {
    // re-count cards & check there's a new card
    cy.findAllByTestId("characterListItem").should(
      "have.length",
      initialCardsCount + 1
    )
  })
})

it("Updates character", () => {
  cy.visit("/")
  setup()

  // on a random card, click update
  cy.get("@randomCard")
    .findByRole("button", { name: /update character/i })
    .click()

  // load sample data
  cy.fixture("character").then(character => {
    // a modal opens, says 'update character'
    cy.findByRole("dialog").within(() => {
      cy.findByRole("heading", { name: /update character/i }).should("exist")
      cy.log(character.name)
      // update all fields with new values
      cy.findByRole("textbox", { name: /name/i }).clear().type(character.name)
      cy.findByRole("textbox", { name: /image/i }).clear().type(character.image)
      cy.findByRole("textbox", { name: /status/i })
        .clear()
        .type(character.status)
      cy.findByRole("textbox", { name: /gender/i })
        .clear()
        .type(character.gender)
      cy.findByRole("textbox", { name: /origin/i })
        .clear()
        .type(character.origin)
      cy.findByRole("textbox", { name: /location/i })
        .clear()
        .type(character.location)
    })
    // submit
    cy.findAllByRole("button", { name: /save/i }).click()

    // check that the previous card has actually updated with the sample data
    cy.get("@randomCard").within(() => {
      cy.findByRole("heading").should("have.text", character.name)
      cy.findByTestId("x-from-y")
        .should("contain.text", character.status)
        .should("contain.text", character.gender)
        .should("contain.text", character.origin)
      cy.findByTestId("last-seen").should("contain.text", character.location)
    })
  })

  cy.get("@initialCardsCount").then(initialCardsCount => {
    // re-count cards & check there's the same initial ammount
    cy.findAllByTestId("characterListItem").should(
      "have.length",
      initialCardsCount
    )
  })
})

it("Deletes character", function () {
  cy.visit("/")
  setup()

  // on a random card, click delete
  cy.get("@randomCard")
    .findByRole("button", { name: /delete character/i })
    .click()
  // a modal opens, says 'delete character', click yes.
  // multiple children selection over a parent element, using then/wrap as an alternative to within
  cy.findByRole("dialog").then(el => {
    cy.wrap(el)
      .findByRole("heading", { name: /delete character/i })
      .should("exist")
    cy.wrap(el).findAllByRole("button", { name: /yes/i }).click()
  })
  // re-count cards & check there's one less card present on the page
  cy.get("@initialCardsCount").then(initialCardsCount => {
    cy.findAllByTestId("characterListItem").should(
      "have.length",
      initialCardsCount - 1
    )
  })
})
