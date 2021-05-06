import React from "react"

/**
 * Renders colored dot according to given state
 * @param {*} props 
 * @returns ReactElement 
 */
export default function StatusIcon({ status }) {
  return <span className={`status-icon ${status?.toLowerCase()}`}></span>
}
