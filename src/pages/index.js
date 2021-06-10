import * as React from "react"
import { Link } from "gatsby-plugin-modal-routing-3"
import { Box, SimpleGrid, Spinner, Center, VStack } from "@chakra-ui/react"
import { connect } from "react-redux"

import Layout from "../components/layout"
import SEO from "../components/seo"
import AddButton from "../components/ui/addButton"
import ReloadButton from "../components/reloadButton"
import { CharacterView } from "../components/character"
import { fetchData } from "../state/state"

const IndexPage = ({ data, fetchData }) => {
  const characterCards = data.map(i => (
    <CharacterView data={i} key={i.id} />
  ))

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

  React.useEffect(() => {
    fetchData()
  }, [])

  return (
    <Layout>
      <SEO title="Home" />
      {data.length ? (
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
  return { data: state.itemsReducer }
}

function mapDispatch(dispatch) {
  return {
    fetchData() {
      dispatch(fetchData())
    },
  }
}

export default connect(mapState, mapDispatch)(IndexPage)
