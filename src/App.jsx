 import * as React from 'react';
import './App.css'
import { getCurrency} from './api/api';
import { useDispatch,useSelector } from 'react-redux';
import {addAllData} from './Redux/Actions/vacancyAC';
import { useState } from 'react';
import { getAllVacancies} from './Redux/Reducers/vacancyReducer';
import { Search } from './Components/Search/search';
import { SkillsChart } from './Components/Charts/SkillsChart/skillsChart';
import { ExperienceChart } from './Components/Charts/ExperienceChart/experienceChart';
import { ScheduleChart } from './Components/Charts/ScheduleChart/scheduleChart';
import { SalaryByExperienceChart } from './Components/Charts/SalaryByExperienceChart/salaryByExperienceChart';
import { CitiesChart } from './Components/Charts/CitiesChart/CitiesChart';
import ProgressBar from './Components/ProgressBar/progressBar';
import { StatBlock } from './Components/StatBlock/statBlock';



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
  const {vacancyName}=useSelector((state)=>{
    return{
      vacancyName:state.vacancy.vacancyName
    };
  });

  const {pageLoad}=useSelector((state)=>{
    return{
      pageLoad:state.vacancy.currentPage
    };
  });
  const {allPage}=useSelector((state)=>{
    return{
      allPage:state.vacancy.pages
    };
  });
  const {allDataLoaded}=useSelector((state)=>{
    return{
      allDataLoaded:state.vacancy.allDataLoaded
    };
  });

  
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


  return (
    <body className="App-body">
      <div className="App">
        <div className="app-container _container">

          <header className="header">
            <div className="header-container">
            <Search dispatch={dispatch} getAllVacancies={getAllVacancies} currencies={currencies} />
            </div>
          </header>

          <div className="App-body-container">
          {pageLoad !== allPage ? <ProgressBar bgcolor={"#6a1b9a"} completed={Math.trunc(pageLoad/(allPage-1)*100)}/> :""}
              {pageLoad ? <button className="ShowDataButton" onClick={handleSetClick}>visible data</button> :""}
              <div className="Stat">
                {vacancy.length!==0 ?<p>Количество вакансий по запросу "{vacancyName}": {vacancy.length}</p>:""}
               

                {/* { vacancy.length!==0 ? */}
                <div className="SalaryStat-blocks">
                  <StatBlock isVisible={allDataLoaded} statName="Количество вакансий" statElement={vacancy.length}></StatBlock>
                  <StatBlock isVisible={allDataLoaded} statName="max" statElement={salaryStat.max} icon={"$"}></StatBlock>
                  <StatBlock isVisible={allDataLoaded} statName="мiddle" statElement={salaryStat.middle} icon={"$"}></StatBlock>
                  <StatBlock isVisible={allDataLoaded} statName="min" statElement={salaryStat.min} icon={"$"}></StatBlock>
                </div>
                {/* :""} */}
              </div>

              <div className="Charts">
                <div className="Charts-wrapper">
                  <div className="DiagramCharts ">
                    
                    <div className="First-charts-block _chartBlock">
                      <div className="chart-wrapper">
                       <ExperienceChart  experience={experience}/>
                      </div>
                      <div className="chart-wrapper">
                        <SkillsChart keySkills={top10Skills}/>
                      </div>
                    </div>

                    <div className="Second-charts-block _chartBlock">
                      <div className="chart-wrapper">
                       <ScheduleChart schedule={schedule}/>  
                      </div>
                      <div className="chart-wrapper">
                        <SalaryByExperienceChart experienceBySalary ={salaryByExperience}/>
                      </div>
                    </div>

                    <div className="Third-charts-block _chartBlock">
                      <div className="chart-wrapper">
                        <CitiesChart cities ={cities}/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          </div>
        </div>
      </div>  
    </body>
  );
}
//}

export default App

// const App=()=>{
// return <h1>hui</h1>
// }

// export default App