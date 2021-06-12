import React from "react"
import PropTypes from "prop-types"

import "./statusIcon.css"

/**
 * Renders colored dot according to a given status
 * @param {*} props
 * @returns ReactElement
 */
export default function StatusIcon({ status = "default" }) {
  return (
    <span
      className={`status-icon ${status?.toLowerCase()}`}
      aria-label={`status icon ${status?.toLowerCase()}`}
    />
  )
}

StatusIcon.propTypes = {
  /**
   * sets the color of the status indicator
   */
  status: PropTypes.oneOf(["default", "dead", "alive"]),
}
