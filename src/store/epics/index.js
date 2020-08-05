import { of } from 'rxjs'
import { combineEpics, ofType } from 'redux-observable'
import { switchMap, map, catchError } from 'rxjs/operators'
import { createCluster, createHex, getCluster } from '@/store/actions'
import ClusterService from '@/services/cluster.service'
import HexagonService from '@/services/hexagon.service'

const createClusterEpic = action$ =>
  action$.pipe(
    ofType(createCluster.start),
    switchMap(() => {
      return ClusterService.create().pipe(
        map(res => {
          const { data } = res.data
          localStorage.setItem('hive-cluster-id', data._id)
          return { type: createCluster.success, payload: data }
        }),
        catchError(err => {
          console.log(err)
          return of({ type: createCluster.error, payload: err })
        })
      )
    })
  )

const getClusterEpic = action$ =>
  action$.pipe(
    ofType(getCluster.start),
    switchMap(action => {
      return ClusterService.get(action.payload).pipe(
        map(res => {
          const { data } = res.data
          return { type: getCluster.success, payload: data }
        }),
        catchError(err => {
          console.log(err)
          return of({ type: getCluster.error, payload: err })
        })
      )
    })
  )

const createHexEpic = action$ =>
  action$.pipe(
    ofType(createHex.start),
    switchMap(action => {
      return HexagonService.save(action.payload).pipe(
        map(res => {
          const { data } = res.data
          return { type: createHex.success, payload: data }
        }),
        catchError(err => {
          console.log(err)
          return of({ type: createHex.error, payload: err })
        })
      )
    })
  )

const rootEpic = combineEpics(createClusterEpic, createHexEpic, getClusterEpic)

export default rootEpic
