import * as React from "react"
import { Link } from "gatsby-plugin-modal-routing-3"
import { Box, SimpleGrid, Spinner, Center, VStack } from "@chakra-ui/react"
import { connect } from "react-redux"

import Layout from "../components/layout"
import SEO from "../components/seo"
import AddButton from "../components/ui/addButton"
import ReloadButton from "../components/reloadButton"
import { CharacterView } from "../components/character"

const IndexPage = ({ items }) => {
  const characterCards = items.map(i => <CharacterView data={i} key={i.id} />)

  const loadingCards = (
    <>
      <Center>
        <Spinner color="red.500" as="span" size="sm" />
        <Box
          css={{
            textTransform: "uppercase",
            fontSize: "14px",
            fontWeight: "600",
            color: "#444",
          }}
        >
          &nbsp;loading characters
        </Box>
      </Center>
    </>
  )

  return (
    <Layout>
      <SEO title="Home" />
      {items.length ? (
        <SimpleGrid columns={[1, 2, 3]} spacing={10}>
          {characterCards}
        </SimpleGrid>
      ) : (
        loadingCards
      )}
      <Box position="fixed" bottom="1rem" right="1rem">
        <VStack>
          <ReloadButton />
          <Link to="create" asModal>
            <AddButton
              colorScheme={"green"}
              aria-label="Add character button"
            />
          </Link>
        </VStack>
      </Box>
    </Layout>
  )
}

function mapState(state) {
  return { items: state.itemsReducer }
}

export default connect(mapState)(IndexPage)
