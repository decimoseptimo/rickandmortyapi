import * as React from "react"
import { Link } from "gatsby-plugin-modal-routing-3"
import { Box, SimpleGrid } from "@chakra-ui/react"
import { connect } from "react-redux"

import Layout from "../components/layout"
import SEO from "../components/seo"
import AddButton from "../components/addButton"
import { CharacterView } from "../components/character"

export const IndexPage = ({ data }) => {
  const characterList = data.map(i => (
    <Box
      key={i.id}
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      data-testid="characterListItem"
    >
      <CharacterView data={i} />
    </Box>
  ))

  return (
    <Layout>
      <SEO title="Home" />
      <SimpleGrid columns={[1, 2, 3]} spacing={10} data-testid="characterList">
        {characterList}
      </SimpleGrid>
      <Box position="fixed" bottom="1rem" right="1rem">
        <Link to="create" asModal>
          <AddButton colorScheme={"green"} aria-label="Add character button" />
        </Link>
      </Box>
    </Layout>
  )
}

function mapState(state) {
  return { data: state }
}

export default connect(mapState)(IndexPage)
