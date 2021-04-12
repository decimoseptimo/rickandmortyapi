import React from "react"

import CharacterForm from "./characterForm"

export default function CharacterCreate({ onSubmit, onClose }) {
  return (
    <CharacterForm
      title="Create Character"
      onSubmit={onSubmit}
      onClose={onClose}
    />
  )
}
