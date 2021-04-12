import React from "react"
import { navigate } from "gatsby"
import { ModalRoutingContext } from "gatsby-plugin-modal-routing-3"
import { Box } from "@chakra-ui/react"
import { connect } from "react-redux"

import { CharacterDelete } from "../components/character"
import { getItem, DELETE_ITEM } from "../state/state"

const Delete = ({ item, onSubmit }) => {
  const ModalContent = () => (
    // TODO: prevent render on falsy id or handle it inside CharacterDelete
    <Box width="400px" padding="2rem" background="#fff" rounded="sm">
      {item?.id ? (
        <CharacterDelete
          data={item}
          onSubmit={onSubmit}
          onClose={() => navigate(-1)}
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

function mapState(state, ownProps) {
  const params = new URLSearchParams(ownProps.location.search)
  const id = params.get("id")

  return { item: getItem(state, id) }
}

function mapDispatch(dispatch) {
  return {
    onSubmit(item) {
      dispatch({ type: DELETE_ITEM, item })
    },
  }
}

export default connect(mapState, mapDispatch)(Delete)
