import React from "react"

import CharacterUpdate from "./characterUpdate"
import CharacterData from "../../fixtures/character.json"

const Template = args => <CharacterUpdate {...args} />

export default {
  title: "Character/CharacterUpdate",
  component: CharacterUpdate,
}

export const Normal = Template.bind({})
Normal.args = {
  data: { ...CharacterData.real },
  routeId: CharacterData.real.id,
}

export const InvalidDataID = Template.bind({})
InvalidDataID.args = {
  routeId: CharacterData.real.id,
}
