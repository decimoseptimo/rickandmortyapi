import React from "react"
import { IconButton } from "@chakra-ui/react"
import { AddIcon } from "@chakra-ui/icons"

export default function AddButton(props) {
  return (
    <IconButton
      icon={<AddIcon />}
      isRound={true}
      aria-label="Add button"
      {...props}
    />
  )
}
