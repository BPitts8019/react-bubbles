import React, { useState } from "react";
import {axiosWithAuth as axios} from "../utils/api";

const initialColor = {
   color: "",
   code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
   console.log(colors);
   const [editing, setEditing] = useState(false);
   const [colorToEdit, setColorToEdit] = useState(initialColor);

   const editColor = color => {
      setEditing(true);
      setColorToEdit(color);
   };

   const saveEdit = e => {
      e.preventDefault();
      // Make a put request to save your updated color
      // think about where will you get the id from...
      // where is is saved right now?

      // const colorIdx = colors.findIndex(color => color.id === colorToEdit.id);
      
      // const colorsEnd = colors.slice(colorIdx+1 );
      // const newColors = [
      //    colorsStart,
      //    colorToEdit,
      //    colorsEnd
      // ];

      //close editing form
      setEditing(false);
      let colorIdx;
      let newColors = colors.filter((color, idx) => {
         const result = color.id !== colorToEdit.id;

         if (color.id === colorToEdit.id) {
            colorIdx = idx;
         }

         return result;
      });

      console.log(newColors.slice(colorIdx));
      newColors = [].concat(
         newColors.slice(0,colorIdx),
         [colorToEdit],
         newColors.slice(colorIdx)
      );

      axios()
         .put(`/api/colors/${colorToEdit.id}`, colorToEdit)
         .then(response => {
            updateColors(newColors);
         })
         .catch(err => {
            console.error(err.response);
         })
   };

   const deleteColor = color => {
      // make a delete request to delete this color
   };

   return (
      <div className="colors-wrap">
         <p>colors</p>
         <ul>
            {colors.map(color => (
               <li key={color.color} onClick={() => editColor(color)}>
                  <span>
                     <span className="delete" onClick={e => {
                           e.stopPropagation();
                           deleteColor(color)
                        }
                     }>x</span>
                     {" "}{color.color}
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
         <div className="spacer" />
         {/* stretch - build another form here to add a color */}
      </div>
   );
};

export default ColorList;
