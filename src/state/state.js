import { createStore as reduxCreateStore, applyMiddleware } from "redux"
import thunkMiddleware from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"
import { nanoid } from "nanoid"

import data from "../data/data"

//ACTION TYPES
export const SET_ITEMS = "set_items"
export const ADD_ITEM = "add_item"
export const UPDATE_ITEM = "update_item"
export const DELETE_ITEM = "delete_item"

//REDUCERS-ACTIONS
export const reducer = (state, action) => {
  console.log("--R")
  console.log(state)
  console.log(action)
  const { id, name, image, status, gender, origin, location } =
    action.item || {}

  switch (action.type) {
    case SET_ITEMS: {
      console.log("--sI")
      return action.payload
    }
    case ADD_ITEM: {
      console.log("--aI")
      return [
        ...state,
        {
          id: nanoid(),
          name,
          image,
          status,
          gender,
          origin: { name: origin },
          location: { name: location },
        },
      ]
    }
    case UPDATE_ITEM: {
      console.log("--uI")
      return state.map(i => {
        console.log(id)
        if (i.id === id) {
          return {
            id,
            name,
            image,
            status,
            gender,
            origin: { name: origin },
            location: { name: location },
          }
        }
        return i
      })
    }
    case DELETE_ITEM: {
      console.log("--dI")
      return state.filter(i => {
        return i.id !== id
      })
    }
    default:
      return state
  }
}

//STORE
export const createStore = () => {
  return reduxCreateStore(
    reducer,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  )
}

//THUNKS
export async function fetchData(dispatch, getState) {
  //TODO: catch errors
  const {
    data: {
      characters: { results },
    },
  } = await data(2)

  // console.log("before: ", getState())
  dispatch({ type: SET_ITEMS, payload: results })
  // console.log("after: ", getState())
}

//SELECTORS
export const getItem = (state, id) => state.find(i => i.id === id)
