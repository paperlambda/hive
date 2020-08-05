import React from 'react'
import Hexagon from "@/components/Hexagon.component";
import {css} from "@emotion/core";

const Hexs = [
  {
    x: 0,
    y: 0
  },
  {
    x: 0,
    y: 1
  },
  {
    x: 2,
    y: 1
  },
  {
    x:1,
    y:0
  },
  {
    x:0,
    y:2
  },
  {
    x: 3,
    y: 0
  },
  {
    x:2,
    y:2
  },
  {
    x: 3,
    y: 1
  }
]

const Cluster = () => {
  const [hexMap, setHexMap] = React.useState([])

  const assignCoordinate = () => {
    return Hexs.map((hex) => {
      return {
        ...hex,
        coord: {
          col: hex.x + 1,
          row: hex.y + 1
        }
      }
    })
  }

  React.useEffect(() => {
    setHexMap(assignCoordinate())
  }, [])

  return hexMap && (
    <div css={css`
      display: grid;
      column-gap: -13px;
      grid-template-columns: repeat(${hexMap.length}, 60px);
    `}>
      {
        hexMap.map(hex => (
          <Hexagon hex={hex} />
        ))
      }
    </div>
  )
}

export default Cluster
