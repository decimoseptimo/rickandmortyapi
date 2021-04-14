import React from "react"
import { Button, Box, Heading, HStack } from "@chakra-ui/react"

import { InvalidCharacterAlert } from "./alerts/invalidCharacterAlert"

export default function CharacterDelete({ data, routeId, onSubmit, onClose }) {
  const onSubmit2 = e => {
    onClose()
    onSubmit(data)
  }
  const error = !Boolean(data?.id)
  console.log(routeId)

  return (
    <Box>
      <Heading size="md" pb={2}>
        Delete Character #{`${routeId}`}
      </Heading>
      {error ? (
        <InvalidCharacterAlert />
      ) : (
        <>
          <p>Do you want to delete "{data.name}"?</p>
          <HStack pt={4} spacing={3} justifyContent="flex-end">
            <Button variant="ghost" onClick={onClose}>
              No
            </Button>
            <Button colorScheme="blue" onClick={onSubmit2}>
              Yes
            </Button>
          </HStack>
        </>
      )}
    </Box>
  )
}
