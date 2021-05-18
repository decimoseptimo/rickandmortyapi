describe("Character tests", () => {
  it("Creates character", () => {
    cy.visit("/")

    // count cards
    cy.findAllByTestId("characterListItem").then(el => {
      const initialCardsCount = el.length

      // open 'character create' modal
      cy.findByRole("button", { name: "Add character button" }).click()
      cy.url().should("include", "create")

      // fill form
      cy.findByRole("textbox", { name: /name/i }).type("name")
      cy.findByRole("textbox", { name: /image/i }).type("image")
      cy.findByRole("textbox", { name: /status/i }).type("status")
      cy.findByRole("textbox", { name: /gender/i }).type("gender")
      cy.findByRole("textbox", { name: /origin/i }).type("origin")
      cy.findByRole("textbox", { name: /location/i }).type("location")

      // submit form
      cy.findByRole("button", { name: /save/i }).click()

      // re-count cards & check there's a new card
      cy.findAllByTestId("characterListItem").should(
        "have.length",
        initialCardsCount + 1
      )
    })
  })

  // it('Does not do much!', () => {
  //   expect(true).to.equal(false)
  // })
})
