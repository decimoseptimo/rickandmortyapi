import React from "react"

import CharacterForm from "./characterForm"

export default function CharacterUpdate({ data, onSubmit, onClose }) {
  return (
    <CharacterForm
      title={`Update Character #${data.id}`}
      data={data}
      onSubmit={onSubmit}
      onClose={onClose}
    />
  )
}
