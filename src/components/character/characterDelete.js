import React from "react"
import { Button, Box, Heading, HStack } from "@chakra-ui/react"

export default function CharacterDelete({ data, onSubmit, onClose }) {
  const onSubmit2 = e => {
    onClose()
    onSubmit(data)
  }
  return (
    <Box>
      <Heading size="md" pb={2}>
        Are you sure to delete character #{data.id} "{data.name}"?
      </Heading>
      <HStack pt={4} spacing={3} justifyContent="flex-end">
        <Button variant="ghost" onClick={onClose}>
          No
        </Button>
        <Button colorScheme="blue" onClick={onSubmit2}>
          Yes
        </Button>
      </HStack>
    </Box>
  )
}
