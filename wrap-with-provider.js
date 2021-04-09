import React from "react"
// import { createStore } from "redux"
// import { Provider } from "react-redux"
import { graphql, StaticQuery } from "gatsby"

// import { reducer } from "./src/state/createStore"
// import { createStore } from "./src/state/createStore"

export default ({ element }) => (
  <StaticQuery
    query={graphql`
    query {
      site {
        siteMetadata {
          title
        }
      }
      ram {
        characters(page: 2) {
          info {
            count
          }
          results {
            id
            name
            image
            status
            gender
            origin {
              name
            }
            location {
              name
            }
          }
        }
      }
    }
    `}
    render={data => {
      // return <Provider store={createStore(reducer, data)}>{element}</Provider>
      return { element }
    }}
  />
)
