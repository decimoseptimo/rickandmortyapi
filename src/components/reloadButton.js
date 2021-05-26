import React from "react"
import { connect } from "react-redux"

import { getRandomInt } from "../utils"
import { fetchData } from "../state/state"
import View from "./ui/reloadButton"

function ReloadButton({ misc, fetchData }) {
  return (
    <View
      aria-label="Reload character button"
      isLoading={misc.isLoading}
      // pagination is a "1 based" index, see: https://rickandmortyapi.com/documentation/#info-and-pagination
      onClick={() => fetchData(getRandomInt(1, misc.itemsInfo.pages))}
    />
  )
}

function mapState(state) {
  return { misc: state.miscReducer }
}

function mapDispatch(dispatch) {
  return {
    fetchData(i) {
      dispatch(fetchData(i))
    },
  }
}

export default connect(mapState, mapDispatch)(ReloadButton)
