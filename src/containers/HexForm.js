import React from 'react'
import { css } from '@emotion/core'
import { Hexes } from '@/constant'
import { connect } from 'react-redux'
import ClusterService from '@/services/cluster.service'
import {
  createCluster,
  createHex,
  getCluster,
  setCluster
} from '@/store/actions'
import PropTypes from 'prop-types'
import HexagonService from '@/services/hexagon.service'

const HexForm = ({ cluster, ...props }) => {
  const [selectedHex, setHex] = React.useState('')
  const [selectedSide, setSide] = React.useState('')

  React.useEffect(() => {
    const clusterLocal = localStorage.getItem('hive-cluster-id')
    if (clusterLocal) {
      props.getCluster(clusterLocal)
    }
  }, [])

  const createCluster = () => {
    props.createCluster()
  }

  const generateFromTemplate = () => {
    const newHexes = Hexes.map(({ x, y }) => HexagonService.hex({ x, y }))
    props.setCluster(newHexes)
  }

  const willReset = () => {
    localStorage.removeItem('hive-cluster-id')
    createCluster()
  }

  const willCreateHex = e => {
    e.preventDefault()
    const clusterLocal = localStorage.getItem('hive-cluster-id')
    const getAnchorHex = cluster.hexagons.find(
      ({ label }) => label === selectedHex
    )
    const newHex = HexagonService.create(getAnchorHex, selectedSide)

    if (ClusterService.findHex(cluster.hexagons, newHex)) {
      alert('Attempting to create hex in occupied coordinate')
      return
    }
    props.createHex({ ...newHex, cluster: clusterLocal })
  }

  if (cluster === null) {
    return (
      <div className="p-2">
        <button
          className="bg-blue-200 hover:bg-blue-300 py-2 px-4 rounded text-sm"
          onClick={() => createCluster()}
        >
          Create New Cluster
        </button>
        {/*<button*/}
        {/*  className="bg-gray-200 hover:bg-gray-300 py-2 px-4 rounded text-sm"*/}
        {/*  onClick={() => generateFromTemplate()}*/}
        {/*>*/}
        {/*  Generate From Template*/}
        {/*</button>*/}
      </div>
    )
  }

  return (
    cluster && (
      <form className="p-2" onSubmit={willCreateHex}>
        <div className="flex">
          <div className="mr-3">
            <label className="text-sm">Hex</label>
            <div
              className="relative"
              css={css`
                width: 180px;
              `}
            >
              <select
                required
                className="block w-full appearance-none bg-gray-200 border border-gray-200 text-gray-700 py-2 px-1 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                onChange={e => setHex(e.target.value)}
              >
                <option value="">Select Hex</option>
                {cluster.hexagons.map(({ x, y }, index) => (
                  <option key={`opt-hex-${index}`} value={`${x},${y}`}>
                    {[x, y].join(',')}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
          <div>
            <label className="text-sm">Side</label>
            <div
              className="relative"
              css={css`
                width: 180px;
              `}
            >
              <select
                required
                className="block w-full appearance-none bg-gray-200 border border-gray-200 text-gray-700 py-2 px-1 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                onChange={e => setSide(e.target.value)}
              >
                {[0, 1, 2, 3, 4, 5].map(side => (
                  <option key={`opt-side-${side}`} value={side}>
                    {side}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-2">
          <button className="bg-blue-200 hover:bg-blue-300 py-2 px-4 rounded text-sm">
            Attach
          </button>
          <button
            onClick={() => willReset()}
            type="button"
            className="bg-gray-300 hover:bg-gray-400 py-2 px-4 rounded text-sm ml-3"
          >
            Reset Cluster
          </button>
        </div>
      </form>
    )
  )
}

HexForm.propTypes = {
  cluster: PropTypes.object,
  setCluster: PropTypes.func,
  createCluster: PropTypes.func,
  getCluster: PropTypes.func,
  createHex: PropTypes.func
}

const mapStateToProps = state => ({
  cluster: state.cluster.cluster
})

export default connect(
  mapStateToProps,
  {
    setCluster: setCluster.init,
    createCluster: createCluster.init,
    getCluster: getCluster.init,
    createHex: createHex.init
  }
)(HexForm)
