import * as React from 'react';
import './search.css'
import { useState } from "react";
import { useSelector } from 'react-redux';

export const Search =({dispatch,getAllVacancies,currencies})=>{

    const [vacanciesName, setVacanciesName] = useState("");
    const {vacancyName}=useSelector((state)=>{
        return{
          vacancyName:state.vacancy.vacancyName
        };
      });
      
    return(
        <header className="App-header">
             <input className="searchInput" 
         type="text"
         value={vacanciesName}
         placeholder="Введите название вакансии"
         onChange={(e) => setVacanciesName(e.target.value)}></input>
          <button className="sendButton" onClick={()=>{dispatch(getAllVacancies(vacanciesName,currencies))
         }}>Отправить</button>
       </header>
    )
}