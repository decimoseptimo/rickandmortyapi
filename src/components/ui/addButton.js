import React from "react"
import PropTypes from "prop-types"
import { IconButton } from "@chakra-ui/react"
import { AddIcon } from "@chakra-ui/icons"

export default function AddButton(props) {
  return (
    <IconButton
      icon={<AddIcon />}
      aria-label="Add button"
      isRound={true}
      {...props}
    />
  )
}

AddButton.propTypes = {
  /**
   * self
   */
  "aria-label": PropTypes.string,
  /**
   * Optional click handler
   */
  onClick: PropTypes.func,
}

AddButton.defaultProps = {
  "aria-label": "Add button",
}
