import React, { useState }  from 'react';
import Table from './Table'
import Button from './Button'

const generateCellId = (rowNumber, collNumber) => `${Date.now()}${rowNumber}${collNumber}`

const generateMatrix = (height, width) => Array
  .from(Array(height))
  .map((_, rowNumber) => Array.from(Array(width)).map((_, collNumber) => generateCellId(rowNumber, collNumber)));


const hideRemoveButtonsProcessor = (setButtonVisibility) => {
  setButtonVisibility({ removeColumnButtonVisible: 'hidden', removeRowButtonVisible: 'hidden' });
}

const hideRemoveButtons = (setRemoveButtonsPosition) => {
  hideRemoveButtonsProcessor(setRemoveButtonsPosition);
}

// hideRemoveButtons() {
//   this.#timer = setTimeout(this.hideRemoveButtonsProcessor, 3000);
// }


const addRowActionHandler = (matrix, setMatrix) => () => {
  const collNumber = matrix[0].length;
  const rowNumber = matrix.length;
  const newMatrix = JSON.parse(JSON.stringify(matrix));
  newMatrix.push(Array.from(Array(collNumber)).map((_, idx) => generateCellId(rowNumber, idx)))
  setMatrix(newMatrix);
}

const addColumnHandler = (matrix, setMatrix) => () => {
  const collNumber = matrix[0].length;
  const rowNumber = matrix.length;
  const newMatrix = JSON.parse(JSON.stringify(matrix)).map(row => ([...row, generateCellId(rowNumber, collNumber)]));
  setMatrix(newMatrix);
}

const removeRowActionHandler = (matrix, setMatrix, rowIndex) => () => {
  const newMatrix = JSON.parse(JSON.stringify(matrix));
  setMatrix(newMatrix.filter((v, i) => i !== rowIndex));
}

const removeColumnActionHandler = (matrix, setMatrix, columnIndex) => () => {
  const newMatrix = JSON.parse(JSON.stringify(matrix));
  setMatrix(newMatrix.map(row => row.filter((v, i) => i !== columnIndex)));
}

const mouseOverTableHandler = (removeButtonsPosition, setRemoveButtonsPosition, setItemToRemove, setButtonVisibility) => (event) => {
  if (!(event.target instanceof HTMLTableCellElement)) return;
  const { 
    target: { 
      cellIndex: columnIndex,
      parentNode: { rowIndex },
      offsetTop: removeRowButtonTop,
      offsetLeft:  removeColumnButtonLeft,
    },
  } = event;

  setRemoveButtonsPosition({ removeColumnButtonLeft, removeRowButtonTop });
  setItemToRemove({ columnIndex, rowIndex });
  setButtonVisibility({ removeColumnButtonVisible: 'visible', removeRowButtonVisible: 'visible' })
}

const mouseLeaveTableOrButtonHandler = (setRemoveButtonsPosition) => (event) => {
  const isMouseMovedOnButton = event.relatedTarget.classList.contains('remove-button') ||
    (event.relatedTarget.parentElement && event.relatedTarget.parentElement.classList.contains('remove-button'));
  const isMouseMovedFromTable = event.target.id === 'main-table';
  if (isMouseMovedFromTable && isMouseMovedOnButton) return;
  hideRemoveButtons(setRemoveButtonsPosition);
}


const Generator = ({ initialHeight = 4, initialWidth = 4, cellSize = 50 }) => {
  const [matrix, setMatrix] = useState(generateMatrix(initialHeight, initialWidth));
  const [itemToRemove, setItemToRemove] = useState({ columnIndex: 0, rowIndex: 0  });
  const [buttonVisibility, setButtonVisibility] = useState({ removeColumnButtonVisible: 'hidden', removeRowButtonVisible: 'hidden' });
  const [removeButtonsPosition, setRemoveButtonsPosition] = useState({
    removeColumnButtonLeft: 3,
    removeRowButtonTop: 2,
  });
  return (
    <div className="generator-container" style={{ margin: cellSize * 2 }}>
      <Table 
        matrix={matrix}
        cellSize={cellSize}
        onMouseOver={mouseOverTableHandler(removeButtonsPosition, setRemoveButtonsPosition, setItemToRemove, setButtonVisibility)}
        onMouseLeave={mouseLeaveTableOrButtonHandler(setButtonVisibility)}
      />
      <Button 
        size={cellSize} 
        className="remove-button"
        dynamicStyles={{
          top: `${-cellSize - 3}px`,
          left: `${removeButtonsPosition.removeColumnButtonLeft}px`,
          visibility: buttonVisibility.removeColumnButtonVisible,
        }}
        handleClick={removeColumnActionHandler(matrix, setMatrix, itemToRemove.columnIndex)}
        onMouseLeave={mouseLeaveTableOrButtonHandler(setButtonVisibility)}
      >
        -
      </Button>
      <Button 
        size={cellSize} 
        className="remove-button"
        dynamicStyles={{
          left: `${-cellSize - 3}px`,
          top: `${removeButtonsPosition.removeRowButtonTop}px`,
          visibility: buttonVisibility.removeRowButtonVisible,
        }}
        handleClick={removeRowActionHandler(matrix, setMatrix, itemToRemove.rowIndex)}
        onMouseLeave={mouseLeaveTableOrButtonHandler(setButtonVisibility)}
      >
        -
      </Button>
      <Button 
        size={cellSize} 
        className="add-button"
        dynamicStyles={{
          left: "3px",
          bottom: `${-cellSize - 3}px`,
        }}
        handleClick={addRowActionHandler(matrix, setMatrix)}
        onMouseLeave={mouseLeaveTableOrButtonHandler(setButtonVisibility)}
      >
        + 
      </Button>
      <Button
        size={cellSize} 
        className="add-button"
        dynamicStyles={{
          right: `${-cellSize - 3}px`,
          top: "2px",
        }}
        handleClick={addColumnHandler(matrix, setMatrix)}
        onMouseLeave={mouseLeaveTableOrButtonHandler(setButtonVisibility)}
      >
        +
      </Button>
    </div>
  );
}

export default Generator;
