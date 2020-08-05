import React from 'react'
import Hexagon from '@/components/Hexagon'
import { css } from '@emotion/core'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { setHex } from '@/store/actions'

const ClusterGrid = ({ cluster, selectedHex, setHex }) => {
  const [displayHex, setDisplayHex] = React.useState(selectedHex)

  React.useEffect(() => {
    if (selectedHex) {
      const neighbours = getNeighbours(selectedHex)
      setDisplayHex({
        hex: selectedHex,
        neighbours: JSON.stringify(neighbours)
      })
    }
  }, [selectedHex])

  const getNeighbours = React.useCallback(hex => {
    const isEvenCol = hex.column % 2 === 0
    const neighbourMap = {
      0: [hex.x, hex.y - 1],
      1: isEvenCol ? [hex.x + 1, hex.y] : [hex.x + 1, hex.y - 1],
      2: isEvenCol ? [hex.x + 1, hex.y + 1] : [hex.x + 1, hex.y],
      3: [hex.x, hex.y + 1],
      4: isEvenCol ? [hex.x - 1, hex.y + 1] : [hex.x - 1, hex.y],
      5: isEvenCol ? [hex.x - 1, hex.y] : [hex.x - 1, hex.y - 1]
    }

    const normalizedHexes = cluster.hexagons.map(({ x, y }) => [x, y].join('.'))

    const neighbours = Object.entries(neighbourMap)
      .filter(([_, value]) => {
        return normalizedHexes.includes(value.join('.'))
      })
      .map(n => {
        return [n[0], n[1].join(',')]
      })

    return neighbours
  })

  const didSelectHex = hex => {
    setHex(hex)
  }

  return (
    cluster && (
      <div className="p-2">
        {displayHex && (
          <div className="px-2 py-3 mb-2 bg-gray-200">
            <p>Selected: {displayHex.hex.label}</p>
            <p>Neighbours: {displayHex.neighbours}</p>
          </div>
        )}
        <div
          css={css`
            display: grid;
            column-gap: -13px;
            grid-template-columns: repeat(${cluster.hexagons.length}, 60px);
          `}
        >
          {cluster.hexagons.map((hex, index) => (
            <Hexagon
              key={`hex-${index}`}
              onClick={() => didSelectHex(hex)}
              hex={hex}
            />
          ))}
        </div>
      </div>
    )
  )
}

ClusterGrid.propTypes = {
  cluster: PropTypes.object,
  selectedHex: PropTypes.object,
  setHex: PropTypes.func
}

const mapStateToProps = state => ({
  cluster: state.cluster.cluster,
  selectedHex: state.hex.hex
})

export default connect(
  mapStateToProps,
  {
    setHex: setHex.init
  }
)(ClusterGrid)
