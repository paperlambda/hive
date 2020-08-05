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
    return HexagonService.hex(neighbourMap[side][0], neighbourMap[side][1])
  }
}

export default HexagonService
