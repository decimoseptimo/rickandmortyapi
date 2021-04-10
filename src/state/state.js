import { createStore as reduxCreateStore, applyMiddleware } from "redux"
import thunkMiddleware from "redux-thunk"

import data from "../data/data"

//ACTION TYPES
export const SET_ITEMS = "set_items"
export const GET_ITEM = "get_item"
export const ADD_ITEM = "add_item"
export const UPDATE_ITEM = "update_item"
export const DELETE_ITEM = "delete_item"

//REDUCERS-ACTIONS
export const reducer = (state, action) => {
  const { id, name, image, status, gender, origin, location } = action

  switch (action.type) {
    case SET_ITEMS: {
      return action.payload
    }
    case GET_ITEM: {
      return getItem(state, id)
    }
    case ADD_ITEM: {
      return [...state, { id, name, image, status, gender, origin, location }]
    }
    case UPDATE_ITEM: {
      return state.map(i => {
        if (i.id === id) {
          return { ...i, name, image, status, gender, origin, location }
        }
        return i
      })
    }
    case DELETE_ITEM: {
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

  // console.log('before: ', getState())
  dispatch({ type: SET_ITEMS, payload: results })
  // console.log("after: ", getState())
}

//SELECTORS
export const getItem = (state, id) => state.find(i => i.id === id)