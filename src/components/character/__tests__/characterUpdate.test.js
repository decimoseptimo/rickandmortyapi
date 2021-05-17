import React from "react"
import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"

import CharacterUpdate from "../characterUpdate"

const data = {
  id: "test id",
  name: "test name",
  image: "test image",
  status: "test status",
  gender: "test gender",
  origin: { name: "test origin" },
  location: { name: "test location" },
}

it("renders correctly on truthy data.id", () => {
  render(
    <CharacterUpdate
      data={data}
      routeId={null}
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
  const data = {
    id: false,
  }
  render(
    <CharacterUpdate
      data={data}
      routeId={null}
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
