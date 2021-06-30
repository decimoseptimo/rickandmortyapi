import React from "react"

import AddButton from "./addButton"

const Template = args => <AddButton {...args} />

export default {
  title: "UI/AddButton",
  component: AddButton,
}

export const Normal = Template.bind({})
// Normal.args = {}
