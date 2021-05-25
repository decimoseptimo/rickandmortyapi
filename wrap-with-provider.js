import React from "react"
import { Provider } from "react-redux"

import { createStore, fetchData } from "./src/state/state"

export default ({ element }) => {
  const store = createStore()
  return <Provider store={store}>{element}</Provider>
}
