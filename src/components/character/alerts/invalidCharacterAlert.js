import React from "react"
import { Alert, AlertIcon } from "@chakra-ui/react"

export const InvalidCharacterAlert = () => (
  <Alert status="error">
    <AlertIcon />
    Error: Invalid ID
  </Alert>
)
