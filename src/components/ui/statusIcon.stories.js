import React from "react"

import StatusIcon from "./statusIcon"

const Template = args => <StatusIcon {...args} />

export default {
  title: "UI/StatusIcon",
  component: StatusIcon,
}

export const Default = Template.bind({})
Default.storyName = "Default (unknown)"

export const Dead = Template.bind({})
Dead.args = { status: "dead" }

export const Alive = Template.bind({})
Alive.args = { status: "alive" }
