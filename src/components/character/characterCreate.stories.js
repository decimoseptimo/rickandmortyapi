import React from "react"

import { CharacterCreate } from "./characterCreate"

const Template = args => <CharacterCreate {...args} />

export default {
  title: "Character/CharacterCreate",
  component: CharacterCreate,
}

export const Normal = Template.bind({})
