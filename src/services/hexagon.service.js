const HexagonService = {
  hex: (x, y) => {
    return {
      label: `${x},${y}`,
      x,
      y,
      coord: {
        col: x + 1,
        row: y + 1
      }
    }
  },
  create: (hex, side) => {
    //TODO: check if has neighbour
    const isEvenCol = hex.coord.col % 2 === 0
    const neighbourMap = {
      0: [hex.x, hex.y - 1],
      1: isEvenCol ? [hex.x + 1, hex.y] : [hex.x + 1, hex.y - 1],
      2: isEvenCol ? [hex.x + 1, hex.y + 1] : [hex.x + 1, hex.y],
      3: [hex.x, hex.y + 1],
      4: isEvenCol ? [hex.x - 1, hex.y + 1] : [hex.x - 1, hex.y],
      5: isEvenCol ? [hex.x - 1, hex.y] : [hex.x - 1, hex.y - 1]
    }
    const [x, y] = neighbourMap[side]

    if (x < 0 || y < 0) {
      //FIXME: find solution for x < 0 or y < 0
      throw new Error('Cannot add hex to negative x or y axis')
    }

    return HexagonService.hex(x, y)
  }
}

export default HexagonService
