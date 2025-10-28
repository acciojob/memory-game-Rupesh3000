import React from "react";

const LandingPage = ({ handleStart, setLevel }) => {
  return (
    <div className="levels_container">
      Welcome!
      <label>
        <input
          type="radio"
          id="easy"
          value="easy"
          name="level"
          onChange={(e) => setLevel(e.target.id)}
        />
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
        />
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
        />
        Hard
      </label>
      <br />
      <button onClick={handleStart}>Start</button>
    </div>
  );
};

export default LandingPage;
