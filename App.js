import React, { useState, useEffect, useCallback } from "react";
import uuid from "uuid";
import axios from "axios";
import "./App.css";

function App() {
  const [color, setColor] = useState("000000");
  const [colorsList, setColorsList] = useState([]);
  const [colorInput, setColorInput] = useState("");

  useEffect(() => {
    const handleNewItem = () => {
      if (!colorsList.find((color) => color === colorInput)) {
        const newList = [...colorsList, { id: uuid(), color }];
        setColorsList(newList);
        console.log(colorsList);
      }
    };
    handleNewItem();
  }, [color]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setColor(colorInput);
    setColorInput("");
  };
  const randomColor = () => {
    axios
      .get(
        `https://www.colr.org/json/color/random?query&timestamp=${new Date().getTime()}`
      )
      .then((response) => {
        // console.log(response.data.colors[0].hex);
        setColor(response.data.colors[0].hex);
        // handleNewItem();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container">
      <button
        className="button"
        style={{ color: `#${color}` }}
        onClick={() => randomColor()}
      >
        Get random color
      </button>
      <div>
        {colorsList.map((color) => (
          <li
            className="list-item"
            key={color.id}
            style={{ color: `#${color.color}` }}
          >
            #{color.color}
          </li>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        {" "}
        <input
          maxLength="6"
          className="input"
          onChange={(e) => setColorInput(e.target.value)}
          placeholder="Enter hex color"
          value={colorInput}
        />{" "}
      </form>
    </div>
  );
}

export default App;
