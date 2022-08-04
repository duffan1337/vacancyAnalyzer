import * as React from 'react';
import './App.css'
import { getCurrency} from './api/api';
import { useDispatch,useSelector } from 'react-redux';
import {addAllData} from './Redux/Actions/vacancyAC';
import { useState } from 'react';
import { getAllVacancies, getAllVacanciesOnAllPages} from './Redux/Reducers/vacancyReducer';
import { Search } from './Components/Search/search';
import { SkillsChart } from './Components/Charts/SkillsChart/skillsChart';
import { ExperienceChart } from './Components/Charts/ExperienceChart/experienceChart';
import { ScheduleChart } from './Components/Charts/ScheduleChart/scheduleChart';
import { SalaryByExperienceChart } from './Components/Charts/SalaryByExperienceChart/salaryByExperienceChart';
import { CitiesChart } from './Components/Charts/CitiesChart/CitiesChart';
import { Spinner } from './Components/Spinner/spinner';


function App() {

  const {vacancy}=useSelector((state)=>{
    return{
      vacancy:state.vacancy.vacancy
    };
  });
  const {top10Skills}=useSelector((state)=>{
    return{
      top10Skills:state.vacancy.top10Skills
    };
  });
  const {experience}=useSelector((state)=>{
    return{
      experience:state.vacancy.experience
    };
  });

  const {schedule}=useSelector((state)=>{
    return{
      schedule:state.vacancy.schedule
    };
  });

  const {salaryStat}=useSelector((state)=>{
    return{
      salaryStat:state.vacancy.salaryStat
    };
  });

  const {salaryByExperience}=useSelector((state)=>{
    return{
      salaryByExperience:state.vacancy.salaryByExperience
    };
  });
  const {cities}=useSelector((state)=>{
    return{
      cities:state.vacancy.cities
    };
  });
  const {isLoaded}=useSelector((state)=>{
    return{
      isLoaded:state.vacancy.isLoaded
    };
  });
  const {vacancyName}=useSelector((state)=>{
    return{
      vacancyName:state.vacancy.vacancyName
    };
  });

  const {pages}=useSelector((state)=>{
    return{
      pages:state.vacancy.pages
    };
  });
  

  
  console.log(vacancy.length)
  React.useEffect(()=>{
    ( getCurrency.getCurrencyValues().then(response =>{ 
      setCurrencies(response.conversion_rates)
    }))
  },[])

 

  const dispatch = useDispatch();
  const [currencies, setCurrencies] = useState({});

  const handleSetClick = ()=>{
    dispatch(addAllData({currencies:currencies}))
  }


  if(isLoaded)
   {
    return(
      <div className="App">
    <Spinner/>
    </div>
    )
  }
  else      
  {
  return (
    <div className="App">
       <Search dispatch={dispatch} getAllVacancies={getAllVacancies} currencies={currencies} />
      <body className="App-body">
        <button className="ShowDataButton" onClick={handleSetClick}>Визуализировать данные</button>
      <div className="Stat">
        {vacancy.length!==0 ?<p>Количество вакансий по запросу "{vacancyName}": {vacancy.length}</p>:""}
        <div className="SalaryStat">
          <div> Минимальная зарплата: {salaryStat.min} $</div>
          <div> Средняя зарплата: {salaryStat.middle} $</div>
          <div> Максимальная зарплата: {salaryStat.max} $</div> 
        </div>
        <div className="Charts">
          <div className="DiagramCharts">
            <SkillsChart keySkills={top10Skills}/>
            <SalaryByExperienceChart experienceBySalary ={salaryByExperience}/>
              <CitiesChart cities ={cities}/>
          </div>
          <div className="PieCharts">
            <ExperienceChart experience={experience}/>
            <ScheduleChart schedule={schedule}/>  
          </div>
        </div>
      </div>
      </body>
    </div>  
  );
}}

export default App;
