import HexagonService from '@/services/hexagon.service'

export default class Cluster {
  constructor() {
    this.cluster = null
  }

  create() {
    const newHex = HexagonService.hex(0, 0)
    this.cluster = [newHex]
  }

  getCluster() {
    if (this.cluster === null) {
      this.create()
    }
    return this.cluster
  }

  findHex(cluster, hex) {
    const { label: selectedLabel } = hex
    return cluster.find(({ label }) => label === selectedLabel) || false
  }
}
