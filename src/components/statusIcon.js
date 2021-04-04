import React from "react"

//TODO: validate status
export default function StatusIcon({ status }) {
  return <span className={`status-icon ${status.toLowerCase()}`}></span>
}
