
import React from 'react';
import './App.css'
import { getCurrency, getVacancyByIdAPI, searchAPI } from './api/api';
import { useDispatch,useSelector } from 'react-redux';
import { addAllVacancy, addTopSkills, addVacancyById, sortVacancy,addExperience, addEmployment, addExperienceBySalary, addSalary,addAllData} from './Redux/Actions/vacancyAC';
import { useState } from 'react';
import { getOpenVacancies } from './Redux/Reducers/vacancyReducer';
import { Search } from './Components/Search/Search';
import { SkillsChart } from './Components/Charts/SkillsChart/SkillsChart';
import { ExperienceChart } from './Components/Charts/ExperienceChart/experinceChart';
import { EmploymentChart } from './Components/Charts/EmploymentChart/employmentChart';
import { ExperienceBySalaryChart } from './Components/Charts/ExperienceBySalaryChart/experienceBySalaryChart';
import { Spinner } from './Components/Spinner/spinner';


const getAllVacancies = (message)=>(dispatch)=>{
  searchAPI.getSearchId(message).then(
    response=>{
      dispatch(addAllVacancy(response))
      dispatch(getOpenVacancies(response))
    })
}



function App() {

  const {vacancyItems}=useSelector((state)=>{
    return{
      vacancyItems:state.vacancy.openItems
    };
  });
  const {Items}=useSelector((state)=>{
    return{
      Items:state.vacancy.items
    };
  });
  const {keySkills}=useSelector((state)=>{
    return{
      keySkills:state.vacancy.top10Skills
    };
  });
  const {experience}=useSelector((state)=>{
    return{
      experience:state.vacancy.Experience
    };
  });
  const {employment}=useSelector((state)=>{
    return{
      employment:state.vacancy.Employment
    };
  });
  const {salary}=useSelector((state)=>{
    return{
      salary:state.vacancy.Salary
    };
  });
  const {experienceBySalary}=useSelector((state)=>{
    return{
      experienceBySalary:state.vacancy.ExperienceBySalary
    };
  });

  
  const {Initialized}=useSelector((state)=>{
    return{
      Initialized:state.vacancy.initialized
    };
  });
  const {isLoaded}=useSelector((state)=>{
    return{
      isLoaded:state.vacancy.isLoaded
    };
  });
  
  React.useEffect(()=>{
    ( getCurrency.getCurrencyValues().then(response =>{ 
      setCurrencies(response.conversion_rates)
    }))
  },[])

 

  const dispatch = useDispatch();
  const [currencies, setCurrencies] = useState({});

  // const SetDataClick = (currencies)=>(dispatch)=>{
  //   debugger
  //   // dispatch(addTopSkills(setKeySkills()))
  //   // dispatch(addExperience(setExperience()))
  //   // dispatch(addEmployment(setEmployment()))
  //   // dispatch(addExperienceBySalary(setExperienceAndSalary()))
  //   // dispatch(addSalary(setSalary()))
  //   dispatch(addAllData({currencies:currencies}))
  
  //}

  const handleSetClick = ()=>{
    debugger
    //dispatch(SetDataClick(currencies))
    // dispatch(addTopSkills(setKeySkills()))
    // dispatch(addExperience(setExperience()))
    // dispatch(addEmployment(setEmployment()))
    // dispatch(addExperienceBySalary(setExperienceAndSalary()))
    // dispatch(addSalary(setSalary()))
    dispatch(addAllData({currencies:currencies}))

  }
  

  console.log("init",Initialized)
  if(isLoaded)
   {
    return(
      <div className="App">
    <Spinner/>
    </div>
    )
  }
  else      //В USESTATE
  {
    
  return (
    
    <div className="App">
       <Search dispatch={dispatch} getAllVacancies={getAllVacancies}/>
      <body className="App-body">
        <button className="ShowDataButton" onClick={handleSetClick}>Визуализировать данные</button>
      <div className="Stat">
        <p>Количество вакансий: {Items.length}</p>
        <div className="SalaryStat">
          <div> Минимальная зарплата: {salary.min} $</div>
          <div> Средняя зарплата: {salary.middle} $</div>
          <div> Максимальная зарплата: {salary.max} $</div> 
        </div>
        <div className="Charts">
          <div className="DiagramCharts">
            <SkillsChart keySkills={keySkills}/>
            <ExperienceBySalaryChart experienceBySalary ={experienceBySalary}/>
          </div>
          <div className="PieCharts">
            <ExperienceChart experience={experience}/>
            <EmploymentChart employment={employment}/>  
          </div>
        </div>
      </div>
      </body>
    </div>  
  );
}}

export default App;
