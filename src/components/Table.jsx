import React from 'react';

const generateTable = (matrix, size) => {
  return Array
    .from(Array(matrix.length))
    .map((_, rowNumber) => (
      <tr
        key={`${Date.now()}${rowNumber}`}
      >
        {
          Array
            .from(Array(matrix[0].length))
            .map((_, collNumber) => (
            <td key={matrix[rowNumber][collNumber]} style={{ width: size, height: size }}>{matrix[rowNumber][collNumber]}</td>)
            )
        }
      </tr>
    ))
};

const Table = ({ matrix, cellSize , onMouseOver, onMouseLeave }) => {
  return (
    <table id="main-table" onMouseOver={onMouseOver} onMouseLeave={onMouseLeave} >
      <tbody>
        {generateTable(matrix, cellSize)}
      </tbody>
    </table>
  );
}

export default Table;
