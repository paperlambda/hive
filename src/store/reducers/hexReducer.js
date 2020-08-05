import { setHex } from '@/store/actions'
import update from 'immutability-helper'

const initialState = {
  hex: null
}

const clusterReducer = (state = initialState, action) => {
  switch (action.type) {
    case setHex.success: {
      return update(state, {
        hex: { $set: action.payload }
      })
    }
    default:
      return state
  }
}

export default clusterReducer
