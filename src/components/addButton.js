import React from "react"
import { IconButton } from "@chakra-ui/react"
import { AddIcon } from "@chakra-ui/icons"

export default function AddButton(props) {
  return (
    <IconButton
      {...props}
      icon={<AddIcon />}
      aria-label="Add character"
      isRound={true}
    />
  )
}
