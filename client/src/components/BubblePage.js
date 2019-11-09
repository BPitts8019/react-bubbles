import React, { useState, useEffect } from "react";
// import axios from "axios";
import { axiosWithAuth as axios } from "../utils/api";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
   const [colorList, setColorList] = useState([]);
   // fetch your colors data from the server when the component mounts
   // set that data to the colorList state property
   useEffect(() => {
      axios()
         .get("/api/colors")
         .then(response => {
            setColorList(response.data);
         })
         .catch(err => {
            console.error(err.response);
         })
   }, []);

   return (
      <>
         <ColorList colors={colorList} updateColors={setColorList} />
         <Bubbles colors={colorList} />
      </>
   );
};

export default BubblePage;
