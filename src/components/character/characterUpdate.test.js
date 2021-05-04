import React from "react"
import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"

import CharacterUpdate from "./characterUpdate"

it("renders form with data on truthy data.id", () => {
  const data = {
    id: "1",
    name: "2",
    image: "3",
    status: "4",
    gender: "5",
    origin: { name: "6" },
    location: { name: "7" },
  }
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

  // form fields (input values)
  expect(screen.getByRole("form")).toBeInTheDocument()
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
  expect(screen.queryByRole("form")).not.toBeInTheDocument()
  expect(screen.getByRole("alert")).toHaveTextContent(/invalid id/i)
})
