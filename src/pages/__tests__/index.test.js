import React from "react"
import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"
import { useStaticQuery } from "gatsby"

import { IndexPage } from "../index"
jest.mock("../../components/seo", () => jest.fn(() => null)) // mocked to 'null' so it doesn't render

const siteTitle = {
  site: {
    siteMetadata: {
      title: `The Rick and Morty API`,
    },
  },
}

const characterList = [
  {
    id: "21",
    name: "Aqua Morty",
    image: "https://rickandmortyapi.com/api/character/avatar/21.jpeg",
    status: "unknown",
    gender: "Male",
    origin: {
      name: "unknown",
    },
    location: {
      name: "Citadel of Ricks",
    },
  },
  {
    id: "22",
    name: "Aqua Rick",
    image: "https://rickandmortyapi.com/api/character/avatar/22.jpeg",
    status: "unknown",
    gender: "Male",
    origin: {
      name: "unknown",
    },
    location: {
      name: "Citadel of Ricks",
    },
  },
]

beforeEach(() => {
  useStaticQuery.mockImplementationOnce(() => siteTitle)
  // render(<IndexPage data={characterList} />)
})

it("renders header, character list (cards), and add button", () => {
  render(<IndexPage data={characterList} />)

  // header
  expect(
    screen.getByRole("heading", { name: siteTitle.site.siteMetadata.title })
  ).toBeInTheDocument()

  // character list
  const cards = screen.getAllByTestId("characterListItem")
  expect(cards.length).toBe(characterList.length)

  // add button
  expect(
    screen.getByRole("button", { name: /Add character/i })
  ).toBeInTheDocument()
})
