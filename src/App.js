import React, { useState } from "react";
import uuid from "uuid";
import axios from "axios";
import "./App.css";

function App() {
  const [color, setColor] = useState("00000");
  const [colorsList, setColorsList] = useState([]);

  const handleNewItem = () => {
    if (!colorsList.find((color) => color.color === color)) {
      const newList = [...colorsList, { id: uuid(), color }];
      setColorsList(newList);
      console.log(colorsList);
    }
  };
  const randomColor = () => {
    axios
      .get(
        `https://www.colr.org/json/color/random?query&timestamp=${new Date().getTime()}`
      )
      .then((response) => {
        // console.log(response.data.colors[0].hex);
        setColor(response.data.colors[0].hex);
        handleNewItem();
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
    </div>
  );
}

export default App;
