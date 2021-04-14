import React from "react"

import CharacterForm from "./characterForm"

export default function CharacterUpdate({ data, routeId, onSubmit, onClose }) {
  console.log(routeId)

  return (
    <CharacterForm
      title={`Update Character #${routeId}`}
      data={data}
      error={!Boolean(data?.id)}
      onSubmit={onSubmit}
      onClose={onClose}
    />
  )
}
