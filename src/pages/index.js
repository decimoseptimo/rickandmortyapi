import * as React from "react"
// import { Link } from "gatsby"
import { Box, SimpleGrid } from "@chakra-ui/react"

import { data } from "../data"
import Layout from "../components/layout"
import SEO from "../components/seo"
import AddButton from "../components/addButton"
import Character from "../components/character"

const IndexPage = props => {
  const characterList = data.map(i => (
    <Box
      key={i.id}
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
    >
      <Character data={i} />
    </Box>
  ))

  return (
    <Layout>
      <SEO title="Home" />
      {/* <h1>Characters</h1> */}
      <SimpleGrid columns={[1, 2, 3]} spacing={10}>
        {characterList}
      </SimpleGrid>
      <Box position="fixed" bottom="1rem" right="1rem">
        <AddButton colorScheme={"green"} />
      </Box>
    </Layout>
  )
}

export default IndexPage
