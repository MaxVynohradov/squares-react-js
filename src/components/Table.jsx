import React from 'react';

const Table = ({ matrix, cellSize, onMouseOver, onMouseLeave }) => {
  const generateTable = () => matrix
    .map((_, rowNumber) => (
      <tr
        key={matrix[rowNumber][0].rowNumber}
      >
        {
          Array
            .from(Array(matrix[0].length))
            .map((_, collNumber) => (
              <td
                key={`${matrix[rowNumber][collNumber].collNumber}`}
                style={{ width: cellSize, height: cellSize }}>
              </td>
            ))
        }
      </tr>
    ));

  return (
    <table id="main-table" onMouseOver={onMouseOver} onMouseLeave={onMouseLeave} >
      <tbody>
        {generateTable(matrix, cellSize)}
      </tbody>
    </table>
  );
}

export default Table;
