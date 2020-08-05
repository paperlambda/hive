import { combineReducers } from 'redux'
import clusterReducer from '@/store/reducers/clusterReducer'

export default () =>
  combineReducers({
    cluster: clusterReducer
  })
