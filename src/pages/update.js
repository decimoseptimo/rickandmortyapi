import React, { useEffect, useState } from "react"
import { navigate } from "gatsby"
import { ModalRoutingContext } from "gatsby-plugin-modal-routing-3"
import { Box } from "@chakra-ui/react"

import { CharacterUpdate } from "../components/character"

const Update = () => {
  const [id, setId] = useState(null)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    setId(params?.get("id"))
  })

  const ModalContent = () => (
    <Box width="400px" padding="2rem" background="#fff" rounded="sm">
      {id ? (
        <CharacterUpdate
          id={id}
          onSave={() => alert("DISABLED")}
          onCancel={() => navigate(-1)}
        />
      ) : (
        "Invalid ID"
      )}
    </Box>
  )

  return (
    <ModalRoutingContext.Consumer>
      {({ modal, closeTo }) =>
        modal ? <ModalContent /> : <div>non modal content</div>
      }
    </ModalRoutingContext.Consumer>
  )
}

export default Update
