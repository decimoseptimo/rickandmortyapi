import React from "react"

import UpdateForm from "./updateForm"

export default function CharacterUpdate({ id, data, onSave, onCancel }) {
  return (
    <UpdateForm
      id={id}
      data={data}
      title={`Update Character #${id}`}
      onSave={onSave}
      onCancel={onCancel}
    />
  )
}
