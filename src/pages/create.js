import React from "react"
import { navigate } from "gatsby"
import { ModalRoutingContext } from "gatsby-plugin-modal-routing-3"
import { Box } from "@chakra-ui/react"
import { connect } from "react-redux"

import { CharacterCreate } from "../components/character"
import { ADD_ITEM } from "../state/state"

const Create = ({ onSubmit }) => (
  <ModalRoutingContext.Consumer>
    {({ modal, closeTo }) =>
      modal ? (
        <Box width="400px" padding="2rem" background="#fff" rounded="sm">
          <CharacterCreate onSubmit={onSubmit} onClose={() => navigate(-1)} />
        </Box>
      ) : (
        <div>non modal content</div>
      )
    }
  </ModalRoutingContext.Consumer>
)

function mapDispatch(dispatch) {
  return {
    onSubmit(item) {
      dispatch({ type: ADD_ITEM, item })
    },
  }
}

export default connect(null, mapDispatch)(Create)
