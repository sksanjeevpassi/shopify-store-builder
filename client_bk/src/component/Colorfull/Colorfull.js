import { useState } from "react";

const Colorfull = () => {
    const [color, setColor] = useState("#aabbcc");
    return <input type="color" color={color} onChange={setColor} />;
  };

export default Colorfull