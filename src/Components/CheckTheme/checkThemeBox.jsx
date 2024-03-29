import * as React from 'react';
import { useState } from 'react';
import './checkThemeBox.css'

const CheckThemeBox = (props) => {

  const [theme, setTheme] = useState(true);

  const themeHandler = () =>{
    debugger
    setTheme(!theme)
  }
  
    return (
      <div >
        <label className="theme-container">
            <button onClick={themeHandler} className={theme? "theme light" : "theme dark"} data-label-on="" data-label-off="">{theme ?"light" : "dark"}</button>
        </label>
      </div>
    );
  };
  
  export default CheckThemeBox;