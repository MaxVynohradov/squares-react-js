import React, { useState } from 'react';

const addRow = (rowNumber, width, size) => (
  <tr>
    {
      Array
        .from(Array(width))
        .map((i) => (
          <td key={`${rowNumber}_${i}`} style={{ width: size, height: size }}></td>)
        )
    }
  </tr>
)

const generateDefaultTable = (height, width, size) => Array
  .from(Array(height))
  .map(rowNumber => addRow(rowNumber, width, size));


const Table = ({ initialHeight, initialWidth, cellSize }) => {
  const [height, setHeight] = useState(initialHeight);
  const [width, setWidth] = useState(initialHeight);
  const [size, setSize] = useState(cellSize);
  return (
    <table id="main-table">
      {generateDefaultTable(height, width, size)}
    </table>
  );
}

export default Table;
