import { getRandomInt } from "../../src/utils"

/**
 * Finds all the character cards in the current page and count them
 * set the count as @initialCardsCount alias,
 * chooses one randomly and set it as @chosenCard alias
 */
function setup() {
  cy.findAllByTestId("characterCard").then(el => {
    cy.wrap(el.length).as("initialCardsCount")
    const index = getRandomInt(0, el.length - 1)
    cy.wrap(el[index]).as("chosenCard")
  })
}

it("Renders correctly (tests one random card only)", () => {
  cy.visit("/")
  setup()

  // has page header
  cy.findByRole("heading", { name: /Rick and Morty/i }).should("exist")

  // has add/reload buttons
  cy.findByRole("button", { name: "Add character button" }).should("exist")
  cy.findByRole("button", { name: "Reload character button" }).should("exist")

  // Get chosen card, and check it's got a minimum set of DOM objects.
  // This will also ensure there's at least 1 card present
  cy.get("@chosenCard").within(() => {
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
    cy.findAllByTestId("characterCard").should(
      "have.length",
      initialCardsCount + 1
    )
  })
})

it("Updates character", () => {
  cy.visit("/")
  setup()

  // on a chosen card, click update
  cy.get("@chosenCard")
    .findByRole("button", { name: /update character/i })
    .click()
  cy.url().should("include", "update")

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
    cy.get("@chosenCard").within(() => {
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
    cy.findAllByTestId("characterCard").should("have.length", initialCardsCount)
  })
})

it("Deletes character", function () {
  cy.visit("/")
  setup()

  // on a chosen card, click delete
  cy.get("@chosenCard")
    .findByRole("button", { name: /delete character/i })
    .click()
  cy.url().should("include", "delete")
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
    cy.findAllByTestId("characterCard").should(
      "have.length",
      initialCardsCount - 1
    )
  })
})

it("Reload characters & renders correctly (tests one random card only)", () => {
  // RELOAD CHARACTERS
  cy.visit("/")
  setup()

  // set heading from chosen card
  cy.get("@chosenCard")
    .findByRole("heading")
    .invoke("text")
    .as("chosenCardHeading")

  // click reload
  cy.findByRole("button", { name: "Reload character button" }).click()
  // is loading
  cy.findByRole("button", { name: "Reload character button isLoading" }).then(() => {
    // has loaded
    cy.findByRole("button", { name: "Reload character button" }).then(() => {
      // chosen card should no longer exist (we actually test for its inner heading)
      cy.get("@chosenCardHeading").then(chosenCardHeading => {
        cy.findByRole("heading", { name: chosenCardHeading }).should(
          "not.exist"
        )
      })

      // RENDERS CORRECTLY
      setup()

      // has page header
      cy.findByRole("heading", { name: /Rick and Morty/i }).should("exist")
    
      // has add/reload buttons
      cy.findByRole("button", { name: "Add character button" }).should("exist")
      cy.findByRole("button", { name: "Reload character button" }).should("exist")
    
      // Get chosen card, and check it's got a minimum set of DOM objects.
      // This will also ensure there's at least 1 card present
      cy.get("@chosenCard").within(() => {
        cy.findByRole("img").should("exist")
        cy.findByRole("heading").should("not.be.empty")
        cy.findByTestId("x-from-y").should("not.be.empty")
        cy.findByTestId("last-seen").should("not.be.empty")
        cy.findByRole("button", { name: /update character/i }).should("exist")
        cy.findByRole("button", { name: /delete character/i }).should("exist")
      })
    })
  })
})
