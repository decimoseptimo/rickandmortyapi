import React from "react"
import { IconButton, Spinner } from "@chakra-ui/react"
import { RepeatIcon } from "@chakra-ui/icons"

export default function ReloadButton({ isLoading = false, ...props }) {
  return (
    <IconButton
      icon={isLoading ? <Spinner size="sm" /> : <RepeatIcon />}
      aria-label="Reload button"
      isRound={true}
      color="#999"
      {...props}
    />
  )
}
