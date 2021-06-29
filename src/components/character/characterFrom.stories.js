import React from "react"

import CharacterForm from "./characterForm"
import CharacterData from "../../fixtures/character.json"

const Template = args => <CharacterForm {...args} />

export default {
  title: "Character/CharacterForm",
  component: CharacterForm,
}

export const WithData = Template.bind({})
WithData.args = { data: { ...CharacterData.real } }

export const Empty = Template.bind({})
