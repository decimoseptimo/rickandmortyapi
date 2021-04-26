import React from "react"
import renderer from "react-test-renderer"

import CharacterCreate from "./characterCreate"

it("renders correctly", () => {
  const tree = renderer
    .create(<CharacterCreate onSubmit={_ => {}} onClose={_ => {}} />)
    .toJSON()
  expect(tree).toMatchSnapshot()
})
