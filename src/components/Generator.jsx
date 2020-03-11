import React from 'react';
import Table from './Table'
import Button from './Button'

function Generator({ initialHeight = 4, initialWidth = 4, cellSize = 50 }) {
  return (
    <div className="generator-container" style={{ margin: cellSize * 2 }}>
      <Table 
        initialHeight={initialHeight}
        initialWidth={initialWidth}
        cellSize={cellSize}
      />
      <Button 
        size={cellSize} 
        // id="remove-column-button" 
        className="remove-button"
        initialPosition={{
          top: `${-cellSize - 3}px`,
          left: "3px",
        }}
      >
        -
      </Button>
      <Button 
        size={cellSize} 
        // id="remove-row-button" 
        className="remove-button"
        initialPosition={{
          left: `${-cellSize - 3}px`,
          top: "2px",
        }}
      >
        -
      </Button>
      <Button 
        size={cellSize} 
        // id="add-row-button" 
        className="add-button"
        initialPosition={{
          left: "3px",
          bottom: `${-cellSize - 3}px`,
        }}
      >
        +
      </Button>
      <Button
        size={cellSize} 
        // id="add-column-button" 
        className="add-button"
        initialPosition={{
          right: `${-cellSize - 3}px`,
          top: "2px",
        }}
      >
        +
      </Button>
    </div>
  );
}

export default Generator;
