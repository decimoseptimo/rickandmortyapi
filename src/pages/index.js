import * as React from "react"
import { Link } from "gatsby-plugin-modal-routing-3"
import { Box, SimpleGrid } from "@chakra-ui/react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import AddButton from "../components/addButton"
import { CharacterView } from "../components/character"

// export const query = graphql`
//   query {
//     ram {
//       characters(page: 2) {
//         info {
//           count
//         }
//         results {
//           id
//           name
//           image
//           status
//           gender
//           origin {
//             name
//           }
//           location {
//             name
//           }
//         }
//       }
//     }
//   }
// `

const IndexPage = props => {
  const data = {}
  const { results: data2 } = data.ram.characters
  const characterList = data2.map(i => (
    <Box
      key={i.id}
      maxW="sm"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
    >
      <CharacterView data={i} />
    </Box>
  ))

  return (
    <Layout>
      <SEO title="Home" />
      <SimpleGrid columns={[1, 2, 3]} spacing={10}>
        {characterList}
      </SimpleGrid>
      <Box position="fixed" bottom="1rem" right="1rem">
        <Link to="create" asModal>
          <AddButton colorScheme={"green"} />
        </Link>
      </Box>
    </Layout>
  )
}

export default IndexPage
