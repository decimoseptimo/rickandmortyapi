import React, { useEffect, useState } from "react"
import { navigate } from "gatsby"
import { ModalRoutingContext } from "gatsby-plugin-modal-routing-3"
import { Box } from "@chakra-ui/react"
import { connect } from "react-redux"

import { CharacterUpdate } from "../components/character"
import { getItem, UPDATE_ITEM } from "../state/state"

const Update = ({ item, onSubmit }) => {
  // const [id, setId] = useState(null)

  // useEffect(() => {
  //   setId(item.id)
  // })

  const ModalContent = () => (
    <Box width="400px" padding="2rem" background="#fff" rounded="sm">
      {item.id ? (
        <CharacterUpdate
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
      dispatch({ type: UPDATE_ITEM, item })
    },
  }
}

export default connect(mapState, mapDispatch)(Update)
