
import React from 'react';
import './App.css'
import { getCurrency, getVacancyByIdAPI, searchAPI } from './api/api';
import { useDispatch,useSelector } from 'react-redux';
import { addAllVacancy, addTopSkills, addVacancyById, sortVacancy,addExperience, addEmployment, addExperienceBySalary, addSalary} from './Redux/Actions/vacancyAC';
import { useState } from 'react';
import { getOpenVacancies } from './Redux/Reducers/vacancyReducer';
import { Search } from './Components/Search';
import { SkillsChart } from './Components/Charts/SkillsChart/SkillsChart';
import { ExperienceChart } from './Components/Charts/ExperienceChart/experinceChart';
import { EmploymentChart } from './Components/Charts/EmploymentChart/employmentChart';
import { ExperienceBySalaryChart } from './Components/Charts/ExperienceBySalaryChart/experienceBySalaryChart';





const getAllVacancies = (message)=>(dispatch)=>{
  debugger
  searchAPI.getSearchId(message).then(
    response=>{
      debugger
      dispatch(addAllVacancy(response))
      dispatch(getOpenVacancies(response))
      
    })
}


// const getOpenVacancies = (vacancyItems)=>(dispatch) =>{      //перебирает массив элементов, делая запрос каждым элементом, посве удачного запроса диспатчит сет экшен
//   debugger
//   vacancyItems.items.forEach(async function(el, index, array) {
//     await getCurrentVacancy(el.id).then(data=>{dispatch(addVacancyById(data))})
//   });
  // vacancyItems.items.map(async(el)=>{ 
  //      let ttt;
  //        await getCurrentVacancy(el.id).then(data=>{dispatch(addVacancyById(data))})
  //        console.log("ttt", ttt)
  //        return ttt
  //   })
//}
const sortAllVacancies = ()=>(dispatch) =>{
     dispatch(sortVacancy())
     return 0
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
  const {experince}=useSelector((state)=>{
    return{
      experince:state.vacancy.Experience
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
  
  React.useEffect(() => {
    dispatch(sortAllVacancies());
  }, [vacancyItems]);               //КОСТЫЛЬ НУЖНО ИСПРАВИТЬ

  React.useEffect(()=>{
    ( getCurrency.getCurrencyValues().then(response =>{ 
      setCurrencies(response.conversion_rates)
    }))
  },[])


  const dispatch = useDispatch();
 
  const [currencies, setCurrencies] = useState({});



  
  const getSalary = (Vacancy) =>{
   
    let arr = {
      KZT:currencies.KZT,
      RUR:currencies.RUB,
      BYR:currencies.BYN,
      USD:currencies.USD,
      EUR:currencies.EUR,
      UAH:currencies.UAH,
    }  

    console.log("arrtewegshshe",arr)
    let filterFrom = Vacancy.filter(el => el.salary.from !== null )
      let from = filterFrom.map(item => 
        {      
          console.log("FFFFFFFFFFFFFFf", currencies)
          debugger   
          console.log("YYYYY",item.salary.from)
          if(item.salary.currency !== "USD")
          {
            let el;
            debugger
            for (var currency in arr) 
            {
             debugger

             if(currency===item.salary.currency)
             {
             el =Math.trunc((item.salary.from)/arr[currency])
             console.log("ELLLLL",item.salary)
             }
             
            }
            return el
      }
      else
      {
        return item.salary.from
      }
    })
           
    let filterTo = Vacancy.filter(el => el.salary.to !== null )
    let to = filterTo.map(item => 
      {         
        if(item.salary.currency !== "USD")
        {
          let el;
          console.log("CC",currencies)
          for (var currency in arr) 
          {
           if(currency===item.salary.currency)
           {
            console.log(currency)
           el=Math.trunc(item.salary.to / arr[currency])
           }
           
        }
          return el
    }
    else{
      return  item.salary.to 
    }
  })

  console.log("FFFFTTT",from,to)
      return {from:from, to:to}
}

  const sortSalary = (salary, param) =>{
    const sortedAsc = salary[param].sort((a, b) => {
      if (a === null) {
        return 1;
      }
    
      if (b === null) {
        return -1;
      }
    
      if (a === b) {
        return 0;
      }
    
      return a < b ? -1 : 1;
    });
    return sortedAsc
  }
  
  
  const setSalary = () =>{
    var salary=getSalary(vacancyItems)
    var sortedSalaryFrom = sortSalary(salary,"from")
    var sortedSalaryTo = sortSalary(salary,"to")
    var ContactArray  = sortedSalaryFrom.concat(sortedSalaryTo);
    let ar = ContactArray.filter(contact => contact !== null )
    console.log("arrrrrrrrrrrrrrrrrrrrr",ar)
   return ar

  }
  //"moreThan6"

  const setExperience = () =>{
    let arrayOfExperience = vacancyItems.map(item =>{
      return item.experience.id
    })

    let ExperienceStat={between1And3:0, between3And6:0,noExperience:0, moreThan6:0}
 
    for (let x in arrayOfExperience) {
      if(arrayOfExperience[x] ==="between1And3")
      {
        ExperienceStat= {...ExperienceStat, between1And3: ExperienceStat.between1And3+=1}
      }
      else if(arrayOfExperience[x] ==="between3And6")
      {
        ExperienceStat= {...ExperienceStat, between3And6: ExperienceStat.between3And6+=1}
      }
      else if(arrayOfExperience[x] ==="noExperience")
      {
        ExperienceStat= {...ExperienceStat, noExperience: ExperienceStat.noExperience+=1}
      }
      else if(arrayOfExperience[x] ==="moreThan6")
      {
        ExperienceStat= {...ExperienceStat, moreThan6: ExperienceStat.moreThan6+=1}
      }
     
    }

    console.log("Experience stat", ExperienceStat)
    return ExperienceStat
    
  }

  const setEmployment = () =>{
    let arrayOfEmployment = vacancyItems.map(item =>{
      return item.schedule
    })

    let EmploymentStat={remote:0, fullDay:0,flexible:0}
 
    for (let x in arrayOfEmployment) {
      if(arrayOfEmployment[x].id ==="remote")
      {
        EmploymentStat= {...EmploymentStat, remote: EmploymentStat.remote+=1}
      }
      else if(arrayOfEmployment[x].id ==="fullDay")
      {
        EmploymentStat= {...EmploymentStat, fullDay: EmploymentStat.fullDay+=1}
      } 
      else if(arrayOfEmployment[x].id ==="flexible")
      {
        EmploymentStat= {...EmploymentStat, flexible: EmploymentStat.flexible+=1}
      } 
    }
    console.log("Employment stat", EmploymentStat)
    return EmploymentStat
  }


  const setExperienceAndSalary = () =>{
    let ExperienceBySalary={between1And3:[], between3And6:[],noExperience:[], moreThan6:[]}
 
        for (let x in vacancyItems) {
          if(vacancyItems[x].experience.id ==="between1And3")
          {
            ExperienceBySalary= {...ExperienceBySalary, between1And3: [...ExperienceBySalary.between1And3, vacancyItems[x]]}
          }
          else if(vacancyItems[x].experience.id ==="between3And6")
          {
            ExperienceBySalary= {...ExperienceBySalary, between3And6: [...ExperienceBySalary.between3And6, vacancyItems[x]]}
          }
          else if(vacancyItems[x].experience.id ==="noExperience")
          {
            ExperienceBySalary= {...ExperienceBySalary, noExperience: [...ExperienceBySalary.noExperience, vacancyItems[x]]}
          }
          else if(vacancyItems[x].experience.id ==="moreThan6")
          {
            ExperienceBySalary= {...ExperienceBySalary, moreThan6: [...ExperienceBySalary.moreThan6, vacancyItems[x]]}
          }
        }

      
          let between1And3 =getSalary(ExperienceBySalary.between1And3)
          let between3And6=getSalary(ExperienceBySalary.between3And6)
          let noExperience = getSalary(ExperienceBySalary.noExperience)
          let moreThan6 =getSalary(ExperienceBySalary.moreThan6)
          let AVGbetween1And3= getAvg(between1And3.from.concat(between1And3.to))
           let AVGbetween3And6= getAvg(between3And6.from.concat(between3And6.to))
           let AVGnoExperience= getAvg(noExperience.from.concat(noExperience.to))
           let AVGmoreThan6= getAvg(moreThan6.from.concat(moreThan6.to))
        
        console.log("experience!!!!!", AVGbetween1And3, AVGbetween3And6, AVGnoExperience, AVGmoreThan6)
        return {AVGnoExperience, AVGbetween1And3, AVGbetween3And6, AVGmoreThan6} 
        
  }
 

  function getAvg(grades) {
    const total = grades.reduce((acc, c) => acc + c, 0);
    return Math.trunc(total / grades.length);
  }
  const setKeySkills = () =>{
    let keySkillsStats={items:[]}
    Array.from(vacancyItems, el=>Array.from(el.key_skills, (item) =>{keySkillsStats = {...keySkillsStats, items: [...keySkillsStats.items,item.name]}}))
    console.log(keySkillsStats.items)

    let map = keySkillsStats.items.reduce(function(prev, cur) {
      prev[cur] = (prev[cur] || 0) + 1;
      return prev;
    }, {});
    console.log("map",map)
    
    // for (let prop in map) {
    //   console.log("obj." + prop + " = " + map[prop]);
    // }

    var sortable = [];
    for (var count in map) {
        sortable.push([count, map[count]]);
    }
    
    let top = sortable.sort(function(a, b) {
        return b[1] - a[1];
    });
    let top10Skills = top.slice(0,10)
    
    //onSelectSortType()
   return top10Skills   
  }

  const handleSetClick = ()=>{
    dispatch(addTopSkills(setKeySkills()))
    dispatch(addExperience(setExperience()))
    dispatch(addEmployment(setEmployment()))
    dispatch(addExperienceBySalary(setExperienceAndSalary()))
    dispatch(addSalary(setSalary()))
  }






  


  console.log("init",Initialized)
  if(!Initialized)
  {
 
    return(
      <div className="App">
      <Search dispatch={dispatch} getAllVacancies={getAllVacancies}/>
      </div>
    )
    
  }
  else      //В USESTATE
  {
   
   
  return (
    <div className="App">
       <Search dispatch={dispatch} getAllVacancies={getAllVacancies}/>
      <body className="App-body">
        <button onClick={handleSetClick}>Установить данные</button>
      <div>Количество вакансий {Items.length}</div>
      <div className="salary">
        <div> Минимальная зарплата  {salary.min}</div>
        <div> Средняя зарплата  {salary.middle}</div>
        <div> Максимальная зарплата {salary.max}</div> */
      </div>
      
      <SkillsChart keySkills={keySkills}/>
      <ExperienceChart experience={experince}/>
      <EmploymentChart employment={employment}/>
      <ExperienceBySalaryChart experienceBySalary ={experienceBySalary}/>
      
      </body>
    </div>  
  );
}}

export default App;
