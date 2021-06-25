import React from "react"
import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"

import CharacterView from "../characterView"
import CharacterData from "../../../fixtures/character.json"

const data = CharacterData.real

it("renders correctly", () => {
  render(<CharacterView data={data} />)

  // image
  expect(screen.getByAltText(data.name)).toBeInTheDocument()
  // name
  expect(screen.getByRole("heading", { name: data.name })).toBeInTheDocument()
  // X Y from Z
  expect(
    screen.getByText(
      `${data.status} ${data.gender.toLowerCase()} from ${data.origin.name}`
    )
  ).toBeInTheDocument()
  // last seen
  expect(
    screen.getByText(data.location.name, { exact: false })
  ).toBeInTheDocument()
  // update
  const updateBtn = screen.getByRole("button", { name: /update character/i })
  expect(updateBtn).toBeInTheDocument()
  expect(updateBtn.closest("a")).toHaveAttribute(
    "href",
    `/update/?id=${data.id}`
  )
  // delete
  const deleteBtn = screen.getByRole("button", { name: /delete character/i })
  expect(deleteBtn).toBeInTheDocument()
  expect(deleteBtn.closest("a")).toHaveAttribute(
    "href",
    `/delete/?id=${data.id}`
  )
})

it("renders with fallback image", () => {
  render(<CharacterView data={{}} />)

  // undefined fields are going to be presented as "undefined" to the user
  // we'll only assert that a fallback image is displayed
  expect(screen.getByRole("img")).toHaveAttribute(
    "src",
    "https://via.placeholder.com/400?text=Not%20found"
  )
})
