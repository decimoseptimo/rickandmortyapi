import React from "react"
import { navigate } from "gatsby"
import { ModalRoutingContext } from "gatsby-plugin-modal-routing-3"
import { Box } from "@chakra-ui/react"

import { CharacterCreate } from "../components/character"

const Create = () => (
  <ModalRoutingContext.Consumer>
    {({ modal, closeTo }) =>
      modal ? (
        <Box width="400px" padding="2rem" background="#fff" rounded="sm">
          <CharacterCreate
            onSave={() => alert("DISABLED")}
            onCancel={() => navigate(-1)}
          />
        </Box>
      ) : (
        <div>non modal content</div>
      )
    }
  </ModalRoutingContext.Consumer>
)

export default Create
