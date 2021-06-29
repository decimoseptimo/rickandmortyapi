import React from "react"
import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"

import CharacterUpdate from "../characterUpdate"
import CharacterData from "../../../fixtures/character.json"

const data = CharacterData.real

it("renders correctly on truthy data.id", () => {
  render(
    <CharacterUpdate
      data={data}
      routeId={data.id}
      onSubmit={_ => {}}
      onClose={_ => {}}
    />
  )
  // form title
  expect(
    screen.getByRole("heading", { name: /update character/i })
  ).toBeInTheDocument()

  // form fields (filled input values)
  expect(screen.getByRole("textbox", { name: /name/i })).toHaveValue(data.name)
  expect(screen.getByRole("textbox", { name: /image/i })).toHaveValue(
    data.image
  )
  expect(screen.getByRole("textbox", { name: /status/i })).toHaveValue(
    data.status
  )
  expect(screen.getByRole("textbox", { name: /gender/i })).toHaveValue(
    data.gender
  )
  expect(screen.getByRole("textbox", { name: /origin/i })).toHaveValue(
    data.origin.name
  )
  expect(screen.getByRole("textbox", { name: /location/i })).toHaveValue(
    data.location.name
  )

  // alert
  expect(screen.queryByRole("alert")).not.toBeInTheDocument()
})

it("renders alert on falsy data.id", () => {
  const data2 = {
    ...data,
    id: ""
  }
  render(
    <CharacterUpdate
      data={data2}
      routeId={data2.id}
      onSubmit={_ => {}}
      onClose={_ => {}}
    />
  )

  // form
  expect(
    screen.queryByRole("form", { name: "characterForm" })
  ).not.toBeInTheDocument()

  // alert
  expect(screen.getByRole("alert")).toHaveTextContent(/invalid id/i)
})
