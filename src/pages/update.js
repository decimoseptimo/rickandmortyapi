import React from "react"
import { navigate } from "gatsby"
import { ModalRoutingContext } from "gatsby-plugin-modal-routing-3"
import { Box } from "@chakra-ui/react"
import { connect } from "react-redux"

import { CharacterUpdate } from "../components/character"
import { getItem, UPDATE_ITEM } from "../state/state"
import Layout from "../components/layout"

const Update = ({ routeId, item, onSubmit }) => (
  <ModalRoutingContext.Consumer>
    {({ modal /* , closeTo */ }) =>
      modal ? (
        <Box
          maxWidth="400px"
          width="400px"
          margin="0 auto"
          padding="2rem"
          background="#fff"
          rounded="sm"
        >
          <CharacterUpdate
            routeId={routeId}
            data={item}
            onSubmit={onSubmit}
            onClose={() => navigate(-1)}
          />
        </Box>
      ) : (
        <Layout>
          <Box
            maxWidth="400px"
            margin="0 auto"
            padding="0 2rem"
            background="#fff"
            rounded="sm"
          >
            <CharacterUpdate
              routeId={routeId}
              data={item}
              onSubmit={onSubmit}
              onClose={() => navigate("/")}
            />
          </Box>
        </Layout>
      )
    }
  </ModalRoutingContext.Consumer>
)

function mapState(state, ownProps) {
  const params = new URLSearchParams(ownProps.location.search)
  const routeId = params.get("id")

  return { routeId, item: getItem(state, routeId) }
}

function mapDispatch(dispatch) {
  return {
    onSubmit(item) {
      dispatch({ type: UPDATE_ITEM, item })
    },
  }
}

export default connect(mapState, mapDispatch)(Update)
