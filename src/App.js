import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import uuid from "uuid";
import axios from "axios";
import "./App.css";

function App() {
  const [color, setColor] = useState("000000");
  const [colorsList, setColorsList] = useState([]);
  const [colorInput, setColorInput] = useState("");

  //unique color generated
  const handleNewItem = () => {
    if (!colorsList.find(({ color }) => color.color === color)) {
      const newList = [...colorsList, { id: uuid(), color }];
      setColorsList(newList);
      console.log(colorsList);
    } else {
      console.log("color exists");
    }
  };

  useEffect(() => {
    handleNewItem();
  }, [color]);

  //unique color entered
  const handleSubmit = (e) => {
    e.preventDefault();
    if (colorsList.find(({ color }) => color === colorInput)) {
      console.log("color exists");
      setColorInput("");
    } else {
      // handleNewItem();
      setColor(colorInput);
      setColorInput("");
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
        // handleNewItem();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  function handleOnDragEnd(result) {
    if (!result.destination) return;

    const items = Array.from(colorsList);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setColorsList(items);
  }

  return (
    <div className="container">
      <button
        className="button"
        style={{ color: `#${color}` }}
        onClick={() => randomColor()}
      >
        {colorInput ? colorInput : "Get random color"}
      </button>
      <div>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="colors">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                {colorsList.map(({ color, id }, index) => {
                  return (
                    <Draggable key={id} draggableId={"drag" + id} index={index}>
                      {(provided) => (
                        <li
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                          className="list-item"
                          style={{ color: `#${color}` }}
                        >
                          #{color}
                        </li>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
      <form onSubmit={handleSubmit}>
        {" "}
        <input
          required
          maxLength="6"
          minLength="6"
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
