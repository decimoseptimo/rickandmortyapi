import React from "react"
import { IconButton } from "@chakra-ui/react"
import { AddIcon } from "@chakra-ui/icons"

export default function AddButton(props) {
  return (
    <IconButton
    icon={<AddIcon />}
    aria-label="Add button"
    isRound={true}
    {...props}
    />
  )
}
