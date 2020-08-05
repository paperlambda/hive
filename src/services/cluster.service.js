import http from '@/utils/http'
import { map } from 'rxjs/operators'

const ClusterService = {
  create: () => {
    return http({
      url: '/cluster',
      method: 'POST'
    }).pipe(map(res => res))
  },

  findHex: (cluster, hex) => {
    const { label: selectedLabel } = hex
    return cluster.find(({ label }) => label === selectedLabel) || false
  }
}

export default ClusterService
