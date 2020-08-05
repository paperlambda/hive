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
  },
  {
    x: 1,
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

  const getNeighbours = (hex) => {
    const isEvenCol = hex.coord.col % 2 === 0
    const neighbourMap = {
      0: [hex.x, hex.y - 1],
      1: isEvenCol ? [hex.x+1, hex.y] : [hex.x+1, hex.y-1],
      2: isEvenCol ? [hex.x+1, hex.y+1] : [hex.x+1, hex.y],
      3: [hex.x, hex.y+1],
      4: isEvenCol ? [hex.x-1, hex.y+1] : [hex.x-1, hex.y],
      5: isEvenCol ? [hex.x-1, hex.y] : [hex.x-1, hex.y-1]
    }

    const normalizedHexes = Hexs.map(({ x,y }) => [x,y].join('.'))

    const neighbours = Object.entries(neighbourMap).filter(([_, value]) => {
      return normalizedHexes.includes(value.join('.'))
    }).map(n => {
      return {
        side: n[0],
        hex: n[1].join(',')
      }
    })

    console.log(neighbours)
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
          <Hexagon onClick={getNeighbours(hex)} hex={hex} />
        ))
      }
    </div>
  )
}

export default Cluster
