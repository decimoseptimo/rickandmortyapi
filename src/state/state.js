import {
  createStore as reduxCreateStore,
  applyMiddleware,
  combineReducers,
} from "redux"
import thunkMiddleware from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"
import { nanoid } from "nanoid"

import data from "../data/data"

// ACTION TYPES
export const SET_ITEMS = "set_items"
export const ADD_ITEM = "add_item"
export const UPDATE_ITEM = "update_item"
export const DELETE_ITEM = "delete_item"
// misc
export const SET_IS_LOADING_ITEMS = "set_is_loading_items"
export const SET_ITEMS_INFO = "set_items_info"

// REDUCERS
export const itemsReducer = (state = [], action) => {
  const { id, name, image, status, gender, origin, location } =
    action.item || {}

  switch (action.type) {
    case SET_ITEMS: {
      return action.payload
    }
    case ADD_ITEM: {
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
      return state.map(i => {
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
      return state.filter(i => {
        return i.id !== id
      })
    }
    default:
      return state
  }
}
// misc
export const miscReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_IS_LOADING_ITEMS: {
      return {
        ...state,
        isLoading: action.payload === true ? true : false,
      }
    }
    case SET_ITEMS_INFO: {
      return {
        ...state,
        itemsInfo: action.payload,
      }
    }
    default:
      return state
  }
}

// STORE
export const createStore = () => {
  return reduxCreateStore(
    combineReducers({
      itemsReducer,
      miscReducer,
    }),
    // [],
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  )
}

// ACTION CREATORS
export function fetchData(page = 2) {
  // THUNK
  return async function (dispatch /* , getState */) {
    dispatch({ type: SET_IS_LOADING_ITEMS, payload: true })
    // TODO: catch errors
    const {
      data: {
        characters: { info, results },
      },
    } = await data(page)

    // console.log("before: ", getState())
    dispatch({ type: SET_ITEMS_INFO, payload: info })
    dispatch({ type: SET_IS_LOADING_ITEMS, payload: false })
    dispatch({ type: SET_ITEMS, payload: results })
    // console.log("after: ", getState())
  }
}

// SELECTORS
export const getItem = (state, id) => state.find(i => i.id === id)
