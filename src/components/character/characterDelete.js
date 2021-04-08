import React from "react"
import {
  Button,
  Box,
  Heading,
  HStack,
} from "@chakra-ui/react"

export default function CharacterDelete({ id, title, onSave, onCancel }) {
  return (
    <Box>
      <Heading size="md" pb={2}>
        Are you sure you want to delete "{title}"?
      </Heading>
      <HStack pt={4} spacing={3} justifyContent="flex-end">
        <Button variant="ghost" onClick={onCancel}>
          No
        </Button>
        <Button colorScheme="blue" onClick={onSave}>
          Yes
        </Button>
      </HStack>
    </Box>
  )
}
