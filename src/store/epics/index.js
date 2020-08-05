import { combineEpics, ofType } from 'redux-observable'
import { switchMap, map, catchError } from 'rxjs/operators'
import { createCluster } from '@/store/actions'
import ClusterService from '@/services/cluster.service'
import { of } from 'rxjs'

const createClusterEpic = action$ =>
  action$.pipe(
    ofType(createCluster.start),
    switchMap(() => {
      return ClusterService.create().pipe(
        map(res => {
          const { data } = res.data
          return { type: createCluster.success, payload: data }
        }),
        catchError(err => {
          console.log(err)
          return of({ type: createCluster.error, payload: err })
        })
      )
    })
  )

const rootEpic = combineEpics(createClusterEpic)

export default rootEpic
