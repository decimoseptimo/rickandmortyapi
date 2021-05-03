import React from "react"
import { Box, Heading } from "@chakra-ui/react"

import { InvalidCharacterAlert } from "./alerts/invalidCharacterAlert"
import CharacterForm from "./characterForm"

export default function CharacterUpdate({ data, routeId, onSubmit, onClose }) {
  const title = `Update Character #${routeId}`
  const error = !Boolean(data?.id)

  return (
    <Box>
      <Heading size="md" pb={2}>
        {title}
      </Heading>
      {error ? (
        <InvalidCharacterAlert />
      ) : (
        <CharacterForm data={data} onSubmit={onSubmit} onClose={onClose} />
      )}
    </Box>
  )
}
