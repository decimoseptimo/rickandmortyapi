import React from "react"
import { fireEvent, render, screen } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"

import CharacterDelete from "../characterDelete"
import CharacterData from "../../../fixtures/character.json"

const data = CharacterData.real

it("renders correctly on truthy data.id", () => {
  render(
    <CharacterDelete
      data={data}
      routeId={data.id}
      onSubmit={_ => {}}
      onClose={_ => {}}
    />
  )

  // heading
  expect(
    screen.getByRole("heading", { name: /delete character/i })
  ).toBeInTheDocument()

  // body
  expect(screen.queryByRole("alert")).not.toBeInTheDocument()
  expect(
    screen.getByText(`Do you want to delete "${data.name}"?`, { exact: false })
  ).toBeInTheDocument()

  // footer buttons
  expect(screen.getByRole("button", { name: /no/i })).toBeInTheDocument()
  expect(screen.getByRole("button", { name: /yes/i })).toBeInTheDocument()
})

it("renders alert on falsy data.id", () => {
  const data2 = {
    ...data,
    id: "",
  }
  render(
    <CharacterDelete
      data={data2}
      routeId={data2.id}
      onSubmit={_ => {}}
      onClose={_ => {}}
    />
  )

  // alert
  expect(screen.getByRole("alert")).toHaveTextContent(/invalid id/i)
})

it("on cancel, run callback", () => {
  const cb = jest.fn()
  render(
    <CharacterDelete
      data={data}
      routeId={data.id}
      onSubmit={_ => {}}
      onClose={cb}
    />
  )
  // click cancel
  fireEvent.click(screen.getByRole("button", { name: /no/i }))
  expect(cb).toHaveBeenCalled()
})

it("on submit, run callback", async () => {
  const cb = jest.fn()
  render(
    <CharacterDelete
      data={data}
      routeId={data.id}
      onSubmit={cb}
      onClose={_ => {}}
    />
  )

  // click submit
  fireEvent.click(screen.getByRole("button", { name: /yes/i }))
  expect(cb).toHaveBeenCalled()
})
