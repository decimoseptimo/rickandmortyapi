import React from "react"
import { navigate } from "gatsby"
import { ModalRoutingContext } from "gatsby-plugin-modal-routing-3"
import { Box } from "@chakra-ui/react"
import { connect } from "react-redux"

import { CharacterCreate } from "../components/character"
import { ADD_ITEM } from "../state/state"
import Layout from "../components/layout"

const Create = ({ onSubmit }) => (
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
          <CharacterCreate onSubmit={onSubmit} onClose={() => navigate(-1)} />
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
            <CharacterCreate
              onSubmit={onSubmit}
              onClose={() => navigate("/")}
            />
          </Box>
        </Layout>
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
