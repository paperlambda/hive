import React from 'react'
import Hexagon from '@/components/Hexagon'
import { css } from '@emotion/core'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

const ClusterGrid = ({ cluster }) => {
  const getNeighbours = hex => {
    const isEvenCol = hex.coord.col % 2 === 0
    const neighbourMap = {
      0: [hex.x, hex.y - 1],
      1: isEvenCol ? [hex.x + 1, hex.y] : [hex.x + 1, hex.y - 1],
      2: isEvenCol ? [hex.x + 1, hex.y + 1] : [hex.x + 1, hex.y],
      3: [hex.x, hex.y + 1],
      4: isEvenCol ? [hex.x - 1, hex.y + 1] : [hex.x - 1, hex.y],
      5: isEvenCol ? [hex.x - 1, hex.y] : [hex.x - 1, hex.y - 1]
    }

    const normalizedHexes = cluster.map(({ x, y }) => [x, y].join('.'))

    const neighbours = Object.entries(neighbourMap)
      .filter(([_, value]) => {
        return normalizedHexes.includes(value.join('.'))
      })
      .map(n => {
        return {
          side: n[0],
          hex: n[1].join(',')
        }
      })

    console.log(neighbours)
  }

  return (
    cluster && (
      <div
        css={css`
          display: grid;
          column-gap: -13px;
          grid-template-columns: repeat(${cluster.length}, 60px);
        `}
      >
        {cluster.map((hex, index) => (
          <Hexagon
            key={`hex-${index}`}
            onClick={() => getNeighbours(hex)}
            hex={hex}
          />
        ))}
      </div>
    )
  )
}

ClusterGrid.propTypes = {
  cluster: PropTypes.array
}

const mapStateToProps = state => ({
  cluster: state.cluster.cluster
})

export default connect(
  mapStateToProps,
  null
)(ClusterGrid)
