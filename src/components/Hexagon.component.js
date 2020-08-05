import React from 'react'
import {css} from "@emotion/core";

const Hexagon = ({ hex, onClick }) => {
  const label = `${hex.x},${hex.y}`
  const isEven = hex.coord.col % 2 === 0
  const isFirstCol = hex.coord.col === 1
  return (
    <div onClick={onClick} css={css`
      grid-column:${hex.coord.col};
      grid-row:${hex.coord.row};
      margin-bottom:2px;
      ${
        isEven && `
          position: relative;
          top: 26px;
          left: -13px;
        `
      }
      ${
        !isFirstCol && `
          position: relative;
          left: ${(hex.coord.col - 1) * (-13)}px;
        `
      }
    `}>
      <div css={css`
      float: left;
      border-right: 15px solid #faf03c;
      border-top:26px solid transparent;
      border-bottom: 26px solid transparent;
    `}/>
      <div css={css`
      float: left;
      width: 30px;
      height: 52px;
      background-color: #faf03c;
      display: flex;
      justify-content: center;
      align-items: center;
    `}>
        {label}
      </div>
      <div css={css`
      float: left;
      border-left: 15px solid #faf03c;
      border-top: 26px solid transparent;
      border-bottom: 26px solid transparent;
    `}/>
    </div>
  )
}

export default Hexagon
