import React from "react"

import UpdateForm from "./updateForm"

export default function CharacterCreate({ onSave, onCancel }) {
  return (
    <UpdateForm
      id={null}
      title="Create Character"
      onSave={onSave}
      onCancel={onCancel}
    />
  )
}
