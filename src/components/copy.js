import React, { useState } from "react";

// shuffle helper
function shuffleArray(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function App() {
  const [level, setLevel] = useState("");
  const [tiles, setTiles] = useState([]);
  const [flipped, setFlipped] = useState([]); // store indexes of flipped tiles
  const [attempts, setAttempts] = useState(0);
  const [matchedCount, setMatchedCount] = useState(0);

  const pairsForLevel = (lvl) => (lvl === "easy" ? 4 : lvl === "normal" ? 8 : 16);

  // change selected level
  const handleLevelChange = (e) => setLevel(e.target.id);

  // start button
  const handleStart = () => {
    if (!level) {
      alert("Please select a level first!");
      return;
    }

    const pairs = pairsForLevel(level);
    const values = [];
    for (let i = 1; i <= pairs; i++) values.push(i, i);

    const shuffled = shuffleArray(values).map((v, idx) => ({
      id: `${v}-${idx}`,
      value: v,
      matched: false,
      flipped: false,
    }));

    setTiles(shuffled);
    setFlipped([]);
    setAttempts(0);
    setMatchedCount(0);
  };

  // click a tile
  const handleTileClick = (index) => {
    const clickedTile = tiles[index];

    if (clickedTile.flipped || clickedTile.matched) return; // ignore if already open
    if (flipped.length === 2) return; // ignore extra click while comparing

    const newTiles = [...tiles];
    newTiles[index].flipped = true;
    setTiles(newTiles);

    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      // second tile clicked → check match
      setAttempts((prev) => prev + 1);

      const [first, second] = newFlipped;
      const firstTile = newTiles[first];
      const secondTile = newTiles[second];

      if (firstTile.value === secondTile.value) {
        // ✅ matched
        newTiles[first].matched = true;
        newTiles[second].matched = true;
        setTiles(newTiles);
        setMatchedCount((c) => c + 1);
        setFlipped([]);
      } else {
        // ❌ not match → flip back after short delay
        setTimeout(() => {
          const resetTiles = [...newTiles];
          resetTiles[first].flipped = false;
          resetTiles[second].flipped = false;
          setTiles(resetTiles);
          setFlipped([]);
        }, 800);
      }
    }
  };

  // game complete check
  const allMatched = tiles.length > 0 && matchedCount === tiles.length / 2;

  return (
    <div className="app">
      {/* Level selection */}
      <div className="levels_container">
        <label>
          <input type="radio" id="easy" name="level" onChange={handleLevelChange} />
          Easy
        </label>
        <label>
          <input type="radio" id="normal" name="level" onChange={handleLevelChange} />
          Normal
        </label>
        <label>
          <input type="radio" id="hard" name="level" onChange={handleLevelChange} />
          Hard
        </label>
      </div>

      {/* Start button */}
      <button id="start_btn" onClick={handleStart}>
        Start Game
      </button>

      {/* Game grid */}
      <div className="cells_container">
        {tiles.map((tile, idx) => (
          <div
            key={tile.id}
            className="cell"
            data-index={idx}
            onClick={() => handleTileClick(idx)}
            style={{
              display: "inline-block",
              width: 60,
              height: 60,
              lineHeight: "60px",
              margin: 6,
              textAlign: "center",
              border: "1px solid #ccc",
              borderRadius: 8,
              cursor: "pointer",
              backgroundColor: tile.matched
                ? "#8f8"
                : tile.flipped
                ? "#eef"
                : "#ddd",
              userSelect: "none",
              fontWeight: "bold",
            }}
          >
            {tile.flipped || tile.matched ? tile.value : ""}
          </div>
        ))}
      </div>

      {/* Attempts & Result */}
      {tiles.length > 0 && (
        <p style={{ marginTop: 16 }}>
          Attempts: {attempts}{" "}
          {allMatched && <span>🎉 All pairs matched!</span>}
        </p>
      )}
    </div>
  );
}
