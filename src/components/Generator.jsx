import React, { useState, memo }  from 'react';
import Table from './Table'
import Button from './Button'

const generateMatrix = (height, width, i = 0) => Array
  .from(Array(height))
  .map((_, rowNumber) => Array.from(Array(width)).map((_, collNumber) => ({ rowNumber, collNumber })));


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
  const rowNumber = matrix[matrix.length - 1][0].rowNumber + 1;
  setMatrix([
    ...matrix,
    Array.from(Array(matrix[0].length)).map((_, collNumber) => ({ rowNumber, collNumber })),
  ])
};

const addColumnHandler = (matrix, setMatrix) => () => {
  setMatrix(
    [...matrix].map((row, rowNumber) => ([...row, { rowNumber, collNumber: row[row.length - 1].collNumber + 1 }]))
  )
};

const removeRowActionHandler = (matrix, setMatrix, rowIndex) => () => setMatrix([...matrix].filter((v, i) => i !== rowIndex));

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
        className="remove-button"
        dynamicStyles={{
          width: `${cellSize}px`, 
          height: `${cellSize}px`,
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
        className="remove-button"
        dynamicStyles={{
          width: `${cellSize}px`, 
          height: `${cellSize}px`,
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
        className="add-button"
        dynamicStyles={{
          width: `${cellSize}px`, 
          height: `${cellSize}px`,
          left: "3px",
          bottom: `${-cellSize - 3}px`,
        }}
        handleClick={addRowActionHandler(matrix, setMatrix)}
        onMouseLeave={mouseLeaveTableOrButtonHandler(setButtonVisibility)}
      >
        + 
      </Button>
      <Button
        className="add-button"
        dynamicStyles={{
          width: `${cellSize}px`, 
          height: `${cellSize}px`,
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

export default memo(Generator);
