import React from "react"
import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"

import { CharacterCreate } from "../characterCreate"

it("renders correctly", () => {
  render(<CharacterCreate onSubmit={_ => {}} onClose={_ => {}} />)

  // heading
  expect(
    screen.getByRole("heading", { name: /create character/i })
  ).toBeInTheDocument()
  // form
  expect(
    screen.getByRole("form", { name: "characterForm" })
  ).toBeInTheDocument()
})
