import React from 'react';

const generateTable = (matrix, size) => Array
  .from(Array(matrix.length))
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
                style={{ width: size, height: size }}>
                  {JSON.stringify(matrix[rowNumber][collNumber])}
              </td>
          ))
      }
    </tr>
  ));

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
