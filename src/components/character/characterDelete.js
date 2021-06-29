import React from "react"
import { Button, Box, Heading, HStack } from "@chakra-ui/react"
import PropTypes from "prop-types"

import { InvalidCharacterAlert } from "./alerts/invalidCharacterAlert"

export default function CharacterDelete({ data, routeId, onSubmit, onClose }) {
  const onSubmit2 = e => {
    onClose()
    onSubmit(data)
  }
  const error = !Boolean(data?.id)

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

CharacterDelete.propTypes = {
  data: PropTypes.object.isRequired,
  /**
   * Item id obtained from queryparams, used to get the item data (used in the heading for redundancy in case of data.id doesn't exist)
   */
  routeId: PropTypes.string.isRequired,
  onSubmit: PropTypes.func,
  onClose: PropTypes.func,
}
