import React from "react"

import CharacterView from "./characterView"
import CharacterData from "../../fixtures/character.json"

const Template = args => <CharacterView {...args} />

export default {
  title: "Character/CharacterView",
  component: CharacterView,
}

export const Normal = Template.bind({})
Normal.args = { data: { ...CharacterData.real } }

export const ImageNotFound = Template.bind({})
ImageNotFound.args = { data: { ...CharacterData.real, image: "" } }
