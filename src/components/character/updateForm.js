import React from "react"
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Box,
  Heading,
  HStack,
  VStack,
} from "@chakra-ui/react"

export default function UpdateForm({ id, title, onSave, onCancel }) {
  return (
    <Box>
      <Heading size="md" pb={2}>
        {title}
      </Heading>
      <FormControl id="updateForm" isRequired spacing={4}>
        <VStack spacing={2} align="stretch">
          <Box>
            <FormLabel>Name</FormLabel>
            <Input id="Name" placeholder="Name" />
          </Box>
          <Box>
            <FormLabel>Image</FormLabel>
            <Input id="Image" placeholder="Image" />
          </Box>
          <Box>
            <FormLabel>Status</FormLabel>
            <Input id="Status" placeholder="Status" />
          </Box>
          <Box>
            <FormLabel>Gender</FormLabel>
            <Input id="Gender" placeholder="Gender" />
          </Box>
          <Box>
            <FormLabel>Origin</FormLabel>
            <Input id="Origin" placeholder="Origin" />
          </Box>
          <Box>
            <FormLabel>Location</FormLabel>
            <Input id="Location" placeholder="Location" />
          </Box>
        </VStack>
      </FormControl>
      <HStack pt={4} spacing={3} justifyContent="flex-end">
        <Button variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
        <Button colorScheme="blue" onClick={onSave}>
          Save
        </Button>
      </HStack>
    </Box>
  )
}
