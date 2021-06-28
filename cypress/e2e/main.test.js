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

it("Renders index page (tests one random card only)", () => {
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

it("Renders create page", () => {
  cy.visit(`/create`)

  // has page header
  cy.findByRole("heading", {
    name: /Create Character/i,
  }).should("exist")

  // has all form fields
  cy.findByLabelText(/name/i).should("be.empty")
  cy.findByLabelText(/image/i).should("be.empty")
  cy.findByLabelText(/status/i).should("be.empty")
  cy.findByLabelText(/gender/i).should("be.empty")
  cy.findByLabelText(/origin/i).should("be.empty")
  cy.findByLabelText(/location/i).should("be.empty")

  // has action buttons
  cy.findByRole("button", { name: /cancel/i }).should("exist")
  cy.findByRole("button", { name: /save/i }).should("exist")
})

it("Renders update page", () => {
  // load sample data. This item must exist on the fetched data [i.e. /src/state/state/fetchData(page=2)]
  // In this case (id=27) exists at: https://rickandmortyapi.com/api/character/?page=2
  cy.fixture("character").then(({ real: character }) => {
    cy.visit(`/update/?id=${character.id}`)

    // has page header
    cy.findByRole("heading", {
      name: `Update Character #${character.id}`,
    }).should("exist")

    // has all form fields
    cy.findByLabelText(/name/i).should("have.value", character.name)
    cy.findByLabelText(/image/i).should("have.value", character.image)
    cy.findByLabelText(/status/i).should("have.value", character.status)
    cy.findByLabelText(/gender/i).should("have.value", character.gender)
    cy.findByLabelText(/origin/i).should("have.value", character.origin.name)
    cy.findByLabelText(/location/i).should(
      "have.value",
      character.location.name
    )

    // has action buttons
    cy.findByRole("button", { name: /cancel/i }).should("exist")
    cy.findByRole("button", { name: /save/i }).should("exist")
  })
})

it("Renders delete page", () => {
  // load sample data. This item must exist on the fetched data [i.e. /src/state/state/fetchData(page=2)]
  // In this case (id=27) exists at: https://rickandmortyapi.com/api/character/?page=2
  cy.fixture("character").then(({ real: character }) => {
    cy.visit(`/delete/?id=${character.id}`)

    // has page header
    cy.findByRole("heading", {
      name: `Delete Character #${character.id}`,
    }).should("exist")

    cy.findByText(`Do you want to delete "${character.name}"?`).should("exist")

    // has action buttons
    cy.findByRole("button", { name: /no/i }).should("exist")
    cy.findByRole("button", { name: /yes/i }).should("exist")
  })
})

it("Creates character (from modal)", () => {
  cy.visit("/")
  setup()

  // open 'character create' modal
  cy.findByRole("button", { name: "Add character button" }).click()
  cy.url().should("include", "create")

  // load sample data
  cy.fixture("character").then(({ machine: character }) => {
    // fill form
    cy.findByRole("textbox", { name: /name/i }).type(character.name)
    cy.findByRole("textbox", { name: /image/i }).type(character.image)
    cy.findByRole("textbox", { name: /status/i }).type(character.status)
    cy.findByRole("textbox", { name: /gender/i }).type(character.gender)
    cy.findByRole("textbox", { name: /origin/i }).type(character.origin.name)
    cy.findByRole("textbox", { name: /location/i }).type(
      character.location.name
    )
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

it("Updates character (from modal)", () => {
  cy.visit("/")
  setup()

  // on a chosen card, click update
  cy.get("@chosenCard")
    .findByRole("button", { name: /update character/i })
    .click()
  cy.url().should("include", "update")

  // load sample data
  cy.fixture("character").then(({ machine: character }) => {
    // a modal opens, says 'update character'
    cy.findByRole("dialog").within(() => {
      cy.findByRole("heading", { name: /update character/i }).should("exist")
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
        .type(character.origin.name)
      cy.findByRole("textbox", { name: /location/i })
        .clear()
        .type(character.location.name)
    })
    // submit
    cy.findAllByRole("button", { name: /save/i }).click()

    // check that the previous card has actually updated with the sample data
    cy.get("@chosenCard").within(() => {
      cy.findByRole("heading").should("have.text", character.name)
      cy.findByTestId("x-from-y")
        .should("contain.text", character.status)
        .should("contain.text", character.gender)
        .should("contain.text", character.origin.name)
      cy.findByTestId("last-seen").should(
        "contain.text",
        character.location.name
      )
    })
  })

  cy.get("@initialCardsCount").then(initialCardsCount => {
    // re-count cards & check there's the same initial ammount
    cy.findAllByTestId("characterCard").should("have.length", initialCardsCount)
  })
})

it("Deletes character (from modal)", function () {
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

it("Reload characters & renders index page (tests one random card only)", () => {
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
  cy.findByRole("button", { name: "Reload character button isLoading" }).then(
    () => {
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
        cy.findByRole("button", { name: "Add character button" }).should(
          "exist"
        )
        cy.findByRole("button", { name: "Reload character button" }).should(
          "exist"
        )

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
    }
  )
})
