import React from "react"
import { Box, Heading } from "@chakra-ui/react"
import PropTypes from "prop-types"

import CharacterForm from "./characterForm"

export const CharacterCreate = ({ onSubmit, onClose }) => (
  <Box>
    <Heading size="md" pb={2}>
      Create Character
    </Heading>
    <CharacterForm onSubmit={onSubmit} onClose={onClose} />
  </Box>
)

CharacterCreate.propTypes = {
  onSubmit: PropTypes.func,
  onClose: PropTypes.func,
}
