import React from "react"
import { Box, Heading } from "@chakra-ui/react"
import PropTypes from "prop-types"

import { InvalidCharacterAlert } from "./alerts/invalidCharacterAlert"
import CharacterForm from "./characterForm"

export default function CharacterUpdate({ data, routeId, onSubmit, onClose }) {
  const title = `Update Character #${routeId}`
  // Falsy values will throw error
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

CharacterUpdate.propTypes = {
  data: PropTypes.object.isRequired,
  /**
   * Item id obtained from queryparams, used to get the item data (used in the heading for redundancy in case of data.id doesn't exist)
   */
  routeId: PropTypes.string.isRequired,
  onSubmit: PropTypes.func,
  onClose: PropTypes.func,
}
