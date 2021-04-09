import React from "react"
import { Provider } from "react-redux"

import { createStore } from "./src/state/createStore"

// export default ({ element }) => (
//   <Provider store={createStore()}>{element}</Provider>
// )
export default ({ element }) => {
  const store = createStore()
  console.log(store)
  return <Provider store={store}>{element}</Provider>
}
