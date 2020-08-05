import { createStore, compose, applyMiddleware } from 'redux'
import { createEpicMiddleware } from 'redux-observable'
import logger from 'redux-logger'

import createRootReducer from './reducers'
import epics from './epics'

const epicMiddleware = createEpicMiddleware()

const configureStore = () => {
  const store = createStore(
    createRootReducer(),
    compose(applyMiddleware(epicMiddleware, logger))
  )
  epicMiddleware.run(epics)
  return store
}

export default configureStore
