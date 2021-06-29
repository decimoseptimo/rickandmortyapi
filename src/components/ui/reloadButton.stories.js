import React from "react"

import ReloadButton from "./reloadButton"

const Template = args => <ReloadButton {...args} />

export default {
  title: "UI/ReloadButton",
  component: ReloadButton,
}

export const Normal = Template.bind({})
// Normal.args = {}

export const Loading = Template.bind({})
Loading.args = { isLoading: true }
