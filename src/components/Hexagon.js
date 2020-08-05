import React from 'react'
import { css } from '@emotion/core'
import PropTypes from 'prop-types'

const Hexagon = ({ hex, onClick }) => {
  const label = `${hex.x},${hex.y}`
  const isEven = hex.column % 2 === 0
  const isFirstCol = hex.column === 1
  return (
    <div
      onClick={onClick}
      css={css`
        grid-column: ${hex.column};
        grid-row: ${hex.row};
        margin-bottom: 2px;
        ${isEven &&
          `
          position: relative;
          top: 26px;
          left: -13px;
        `}
        ${!isFirstCol &&
          `
          position: relative;
          left: ${(hex.column - 1) * -13}px;
        `}
      `}
    >
      <div
        css={css`
          float: left;
          border-right: 15px solid #faf03c;
          border-top: 26px solid transparent;
          border-bottom: 26px solid transparent;
        `}
      />
      <div
        css={css`
          float: left;
          width: 30px;
          height: 52px;
          background-color: #faf03c;
          display: flex;
          justify-content: center;
          align-items: center;
        `}
      >
        {label}
      </div>
      <div
        css={css`
          float: left;
          border-left: 15px solid #faf03c;
          border-top: 26px solid transparent;
          border-bottom: 26px solid transparent;
        `}
      />
    </div>
  )
}

Hexagon.propTypes = {
  hex: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    column: PropTypes.number.isRequired,
    row: PropTypes.number.isRequired
  }),
  onClick: PropTypes.func
}

export default Hexagon
