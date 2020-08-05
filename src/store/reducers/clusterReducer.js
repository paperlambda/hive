import { createCluster, setCluster } from '@/store/actions'
import update from 'immutability-helper'

const initialState = {
  cluster: null,
  loading: false,
  error: null
}

const clusterReducer = (state = initialState, action) => {
  switch (action.type) {
    case setCluster.success: {
      return update(state, {
        cluster: { $set: action.payload }
      })
    }
    case createCluster.start: {
      return update(state, {
        loading: { $set: true },
        error: { $set: null }
      })
    }
    case createCluster.success: {
      return update(state, {
        cluster: { $set: action.payload },
        loading: { $set: false },
        error: { $set: null }
      })
    }
    case createCluster.error: {
      return update(state, {
        loading: { $set: false },
        error: { $set: action.payload }
      })
    }
    default:
      return state
  }
}

export default clusterReducer
