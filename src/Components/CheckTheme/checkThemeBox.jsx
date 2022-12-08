import * as React from 'react';
import { useState } from 'react';
import './checkThemeBox.css'
const CheckThemeBox = (props) => {

  const [theme, setTheme] = useState("light");

  const th={
  
  }
  
    return (
      <div >
        <label class="checkbox-green">
            <input type="checkbox"/>
            <span onclick={setTheme} class="checkbox-green-switch" data-label-on="" data-label-off=""></span>
        </label>
      </div>
    );
  };
  
  export default CheckThemeBox;