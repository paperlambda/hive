import { setCluster } from '@/store/actions'
import update from 'immutability-helper'

const initialState = {
  cluster: null
}

const clusterReducer = (state = initialState, action) => {
  switch (action.type) {
    case setCluster.success: {
      return update(state, {
        cluster: { $set: action.payload }
      })
    }
    default:
      return state
  }
}

export default clusterReducer
