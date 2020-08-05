const createAsyncAction = type => {
  return {
    init: payload => {
      return {
        type: type + '_START',
        payload
      }
    },
    start: type + '_START',
    success: type + '_SUCCESS',
    error: type + '_ERROR'
  }
}

const createSyncAction = type => {
  return {
    init: payload => {
      return {
        type,
        payload
      }
    },
    success: type
  }
}

export const createCluster = createAsyncAction('CLUSTER_CREATE')
export const setCluster = createSyncAction('CLUSTER_SET')
export const setHex = createSyncAction('HEX_SET')
