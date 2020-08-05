import { combineReducers } from 'redux'
import clusterReducer from '@/store/reducers/clusterReducer'
import hexReducer from '@/store/reducers/hexReducer'

export default () =>
  combineReducers({
    cluster: clusterReducer,
    hex: hexReducer
  })
