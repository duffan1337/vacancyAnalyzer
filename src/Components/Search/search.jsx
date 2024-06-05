import * as React from 'react';
import './search.css'
import { useState } from "react";

export const Search =({dispatch,getAllVacancies,currencies,region})=>{
    const [vacanciesName, setVacanciesName] = useState("");
    return(
        <div className="search__wrapper">
          <div className='search__send'>
            <button className="sendButton" onClick={()=>{dispatch(getAllVacancies(vacanciesName,currencies,region))
              }}>Поиск</button>
          </div>
          <div className="search">
            <input className="search__input" 
              type="text"
              value={vacanciesName}
              placeholder="Введите название вакансии"
              onChange={(e) => setVacanciesName(e.target.value)}>
            </input>
          </div>
       </div>
    )
}