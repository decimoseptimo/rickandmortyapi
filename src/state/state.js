import { createStore as reduxCreateStore, applyMiddleware } from "redux"
import thunkMiddleware from "redux-thunk"

import data from "../data/data"

//TYPES
export const SET_DATA = "set_data"

//REDUCERS-ACTIONS
export const reducer = (state, action) => {
  switch (action.type) {
    case SET_DATA: {
      return action.payload
    }
    default:
      return state
  }
}

//STORE
export const createStore = () => {
  return reduxCreateStore(reducer, applyMiddleware(thunkMiddleware))
}

//THUNKS
export async function fetchData(dispatch, getState) {
  //TODO: catch errors
  const {
    data: {
      characters: { results },
    },
  } = await data(2)

  // console.log('before dispatch: ', getState())
  dispatch({ type: SET_DATA, payload: results })
  // console.log("after dispatch: ", getState())
}
