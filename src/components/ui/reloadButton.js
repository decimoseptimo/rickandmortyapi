import React from "react"
import PropTypes from "prop-types"
import { IconButton, Spinner } from "@chakra-ui/react"
import { RepeatIcon } from "@chakra-ui/icons"

export default function ReloadButton({
  isLoading = false,
  "aria-label": ariaLabel = "Reload button",
  "aria-label-loading": ariaLabelLoading = "Reload button isLoading",
  ...props
}) {
  return (
    <IconButton
      icon={isLoading ? <Spinner size="sm" /> : <RepeatIcon />}
      aria-label={isLoading ? ariaLabelLoading : ariaLabel}
      isRound={true}
      color="#999"
      {...props}
    />
  )
}

ReloadButton.propTypes = {
  /**
   * self
   */
  "aria-label": PropTypes.string,
  /**
   * aria-label when isLoading=true
   */
  "aria-label-loading": PropTypes.string,
  /**
   * Show 'loading' animation
   */
  isLoading: PropTypes.bool,
  /**
   * Optional click handler
   */
  onClick: PropTypes.func,
}
