import React, { useState, useEffect } from "react";
import withAuth from './axios';

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = (props) => {
  const [colorList, setColorList] = useState([]);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property
  useEffect(() => {
    withAuth().get(`http://localhost:5000/api/colors`)
              .then((res) => {
                setColorList(colorList.concat(res.data));
              }).catch(e => alert(e));
  }, [])

  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
