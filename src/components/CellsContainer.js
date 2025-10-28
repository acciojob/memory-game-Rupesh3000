import React from "react";

const CellsContainer = ({ handleTileClick, tiles, tries }) => {
  return (
    <div className=".cells_container">
      <h4>{tries}</h4>
      {tiles.map((tile, index) => (
        <div
          key={tile.id}
          className="cell"
          style={{
            display: "inline-block",
            width: 60,
            height: 60,
            lineHeight: "60px",
            margin: 6,
            textAlign: "center",
            border: "1px solid #ccc",
            cursor: "pointer",
            userSelect: "none",
            backgroundColor:
              tile.flipped || tile.matched ? "lightgreen" : "aqua",
            fontWeight: "bold",
            fontSize: "18px",
          }}
          data-index={index}
          onClick={() => handleTileClick(tile.id, tile.value)}
        >
          {tile.flipped || tile.matched ? tile.value : ""}
        </div>
      ))}
    </div>
  );
};

export default CellsContainer;
