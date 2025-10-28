import React, { useState } from "react";

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
  const [tries, setTries] = useState(0);
  const [flippedTiles, setFlippedTiles] = useState([]);

  const pairsForLevel = (lvl) =>
    lvl === "easy" ? 4 : lvl === "normal" ? 8 : 16;

  const handleStart = () => {
    if (!level) {
      alert("select level");
      return;
    }
    const pairs = pairsForLevel(level);
    const newTiles = [];
    for (let i = 1; i <= pairs; i++) newTiles.push(i, i);

    const shuffled = shuffleArray(newTiles).map((v, idx) => ({
      id: `${v}-${idx}`,
      value: v,
      matched: false,
      flipped: false,
    }));
    setTiles(shuffled);
  };

  const handleTileClick = (id, value) => {
    // 1️⃣ Ignore if tile already flipped or matched
    const clickedTile = tiles.find((t) => t.id === id);
    if (clickedTile.flipped || clickedTile.matched) return;

    // 2️⃣ Flip the clicked tile
    const newTiles = tiles.map((tile) =>
      tile.id === id ? { ...tile, flipped: true } : tile
    );

    setTiles(newTiles);

    // 3️⃣ Add to flippedTiles
    const newFlipped = [...flippedTiles, { id, value }];
    setFlippedTiles(newFlipped);

    // 4️⃣ If two tiles flipped, check match
    if (newFlipped.length === 2) {
      setTries((prev) => prev + 1);

      const [first, second] = newFlipped;
      if (first.value === second.value) {
        // ✅ Match found
        const updatedTiles = newTiles.map((tile) =>
          tile.value === first.value ? { ...tile, matched: true } : tile
        );
        setTiles(updatedTiles);
        setFlippedTiles([]); // clear flipped
      } else {
        // ❌ No match → flip back after delay
        const resetTiles = newTiles.map((tile) =>
          tile.matched ? tile : { ...tile, flipped: false }
        );
        setTiles(resetTiles);
        setFlippedTiles([]);
      }
    }
  };

  return (
    <>
      <div className="levels_container">
        Welcome!
        <label>
          <input
            type="radio"
            id="easy"
            value="easy"
            name="level"
            onChange={(e) => setLevel(e.target.id)}
          />{" "}
          Easy
        </label>
        <br />
        <label>
          <input
            type="radio"
            id="normal"
            value="normal"
            name="level"
            onChange={(e) => setLevel(e.target.id)}
          />{" "}
          Normal
        </label>
        <br />
        <label>
          <input
            type="radio"
            id="hard"
            value="hard"
            name="level"
            onChange={(e) => setLevel(e.target.id)}
          />{" "}
          Hard
        </label>
        <br />
        <button onClick={handleStart}>Start</button>
      </div>
      <h4>{tries}</h4>

      <div className="cells_container">
        {tiles.map((tile, index) => (
          <span
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
            <span>{tile.flipped || tile.matched ? tile.value : ""}</span>
          </span>
        ))}
      </div>
    </>
  );
}
