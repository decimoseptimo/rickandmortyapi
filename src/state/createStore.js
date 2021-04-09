import { createStore as reduxCreateStore } from "redux"
import data from "../data/data"

export const reducer = (state, action) => {
  if (action.type === `INCREMENT`) {
    return Object.assign({}, state, {
      count: state.count + 1,
    })
  }
  return state
}

export const createStore = async () => {
    //TODO: catch errors
  const {
    data: {
      characters: { results },
    },
  } = await data()

  return reduxCreateStore(reducer, results)
}
