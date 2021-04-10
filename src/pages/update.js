import React, { useEffect, useState } from "react"
import { navigate } from "gatsby"
import { ModalRoutingContext } from "gatsby-plugin-modal-routing-3"
import { Box } from "@chakra-ui/react"
import { connect } from "react-redux"

import { CharacterUpdate } from "../components/character"
import { getItem } from "../state/state"

const Update = ({ item }) => {
  console.log(item)
  const [id, setId] = useState(null)

  useEffect(() => {
    setId(item.id)
  })

  const ModalContent = () => (
    <Box width="400px" padding="2rem" background="#fff" rounded="sm">
      {id ? (
        <CharacterUpdate
          id={id}
          data={item}
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

function mapState(state, ownProps) {
  const params = new URLSearchParams(ownProps.location.search)
  const id = params.get("id")

  return { item: getItem(state, id) }
}

function mapDispatch(dispatch) {
  return {
    onMessageClick(message) {
      dispatch({ type: "click", message })
    },
  }
}

export default connect(mapState, mapDispatch)(Update)
