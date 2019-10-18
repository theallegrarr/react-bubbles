import React, { useState } from "react";
import withAuth from './axios';
import axios from "axios";

const initialColor = {
  id: null,
  color: "",
  code: { hex: "" }
};

const newColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors, reload }) => {
  
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [adding, setAdding] = useState(false);
  const [colorToAdd, setColorToAdd] = useState(newColor);
  
  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const addingColor = color => {
    setAdding(true);
    setColorToAdd(color);
  };

  const saveEdit = (e) => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    
    withAuth().put(`http://localhost:5000/api/colors/${colorToEdit.id}`, colorToEdit)
      .then(res => {
        reload();
        setEditing(false);
      }).catch(e => alert(e));
  };

  const addColor = (e) => {
    e.preventDefault();
    
    withAuth().post(`http://localhost:5000/api/colors`, colorToAdd)
      .then(res => {
        reload();
        setAdding(false);
      }).catch(e => alert(e));
  };

  const deleteColor = color => {
    // make a delete request to delete this color
    setEditing(false);
    withAuth().delete(`http://localhost:5000/api/colors/${color.id}`)
      .then(res => {
        reload();
        setEditing(false);
      }).catch(e => alert(e));
  };

  

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color, color.id)}>
            <span>
              <span className="delete" onClick={() => deleteColor(color)}>
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      {!editing && !adding && (<button onClick={() => setAdding(true)}>Add</button>)
      }
      {adding && (
        <form onSubmit={addColor}>
          <legend>Add color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToAdd({ ...colorToAdd, color: e.target.value })
              }
              value={colorToAdd.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToAdd({
                  ...colorToAdd,
                  code: { hex: e.target.value }
                })
              }
              value={colorToAdd.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setAdding(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
    </div>
  );
};

export default ColorList;
