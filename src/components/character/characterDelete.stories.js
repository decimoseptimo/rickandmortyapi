import React from "react"

import CharacterDelete from "./characterDelete"
import CharacterData from "../../fixtures/character.json"

const Template = args => <CharacterDelete {...args} />

export default {
  title: "Character/CharacterDelete",
  component: CharacterDelete,
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
