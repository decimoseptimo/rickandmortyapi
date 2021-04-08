import React from "react"

import UpdateForm from "./updateForm"

export default function CharacterUpdate({ id, onSave, onCancel }) {
  return (
    <UpdateForm
      id={id}
      title={`Update Character #${id}`}
      onSave={onSave}
      onCancel={onCancel}
    />
  )
}
