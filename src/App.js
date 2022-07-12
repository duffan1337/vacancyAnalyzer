
import React from 'react';
import './App.css'
import { getVacancyByIdAPI, searchAPI } from './api/api';
import { useDispatch,useSelector } from 'react-redux';
import { addAllVacancy, addTopSkills, addVacancyById, sortVacancy,addExperience, addEmployment, addExperienceBySalary} from './Redux/Actions/vacancyAC';
import { useState } from 'react';
import { getOpenVacancies } from './Redux/Reducers/vacancyReducer';
// import {Bar} from 'react-chartjs-2'
// import {Chart as ChartJS} from "chart.js/auto"
import { Search } from './Components/Search';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';





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

  
  const {Initialized}=useSelector((state)=>{
    return{
      Initialized:state.vacancy.initialized
    };
  });
  
  React.useEffect(() => {
    dispatch(sortAllVacancies());
  }, [vacancyItems]);               //КОСТЫЛЬ НУЖНО ИСПРАВИТЬ

  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const [topSkills, setTopSkills] = useState({});
  //const [Experience, setExperience] = useState({});



  
  const getSalary = () =>{
      let from = vacancyItems.map(item => 
        {         
            return item.salary.from
      })
           
      let to = vacancyItems.map(item => 
        {
              return item.salary.to
         })

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
    var salary=getSalary()
    var sortedSalaryFrom = sortSalary(salary,"from")
    var sortedSalaryTo = sortSalary(salary,"to")
    var ContactArray  = sortedSalaryFrom.concat(sortedSalaryTo);
    console.log("Contact",ContactArray)
    console.log("from", sortedSalaryFrom)
    console.log("to", sortedSalaryTo)
  }
  //"moreThan6"

  const setExperience = () =>{
    var arrayOfExperience = vacancyItems.map(item =>{
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
        ExperienceStat= {...ExperienceStat, moreThan6: ExperienceStat.noExperience+=1}
      }
     
    }
    console.log("Experience stat", ExperienceStat)
    return ExperienceStat
    
  }

  const setEmployment = () =>{
    var arrayOfEmployment = vacancyItems.map(item =>{
      return item.employment
    })

    let EmploymentStat={full:0, part:0,}
 
    for (let x in arrayOfEmployment) {
      if(arrayOfEmployment[x].id ==="full")
      {
        EmploymentStat= {...EmploymentStat, full: EmploymentStat.full+=1}
      }
      else if(arrayOfEmployment[x].id ==="part")
      {
        EmploymentStat= {...EmploymentStat, "part": EmploymentStat.part+=1}
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
            ExperienceBySalary= {...ExperienceBySalary, between1And3: [...ExperienceBySalary.between1And3, vacancyItems[x].salary]}
          }
          else if(vacancyItems[x].experience.id ==="between3And6")
          {
            ExperienceBySalary= {...ExperienceBySalary, between3And6: [...ExperienceBySalary.between3And6, vacancyItems[x].salary]}
          }
          else if(vacancyItems[x].experience.id ==="noExperience")
          {
            ExperienceBySalary= {...ExperienceBySalary, noExperience: [...ExperienceBySalary.noExperience, vacancyItems[x].salary]}
          }
          else if(vacancyItems[x].experience.id ==="moreThan6")
          {
            ExperienceBySalary= {...ExperienceBySalary, moreThan6: [...ExperienceBySalary.moreThan6, vacancyItems[x].salary]}
          }
        }
        console.log("experience!!!!!", ExperienceBySalary)
        return ExperienceBySalary
        
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
  }






  


  console.log("init",Initialized)
  if(!Initialized)
  {
 
    return(
      <div className="App">
        {/* <header className="App-header">
       <input className="searchInput" 
        type="text"
        value={message}
        placeholder="Введите сообщение"
        onChange={(e) => setMessage(e.target.value)}></input>
       <button className="sendButton" onClick={()=>{dispatch(getAllVacancies(message))
        }}>send</button>
      </header> */}
      <Search dispatch={dispatch} getAllVacancies={getAllVacancies}/>
      </div>
    )
    
  }
  else      //В USESTATE
  {
    setSalary()


    ChartJS.register(
      CategoryScale,
      LinearScale,
      BarElement,
      Title,
      Tooltip,
      Legend
    );
    
     const options = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top' ,
        },
        title: {
          display: true,
          text: 'Chart.js Bar Chart',
        },
      },
    };
    
    const labels = keySkills.map(el=>el[0]);
    console.log("KKKKKKKKKKK",keySkills)
     const data = {
      labels,
      datasets: [
        {
          //label: 'Навыки',
          data: keySkills.map(el=>el[1]),
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
      ],
    };
   
  return (
    <div className="App">
      {/* <header className="App-header">
       <input className="searchInput" 
        type="text"
        value={message}
        placeholder="Введите сообщение"
        onChange={(e) => setMessage(e.target.value)}></input>
       <button className="sendButton" onClick={()=>{dispatch(getAllVacancies(message))
        }}>send</button>
      </header> */}
       <Search dispatch={dispatch} getAllVacancies={getAllVacancies}/>
      <body className="App-body">
        <button onClick={handleSetClick}>Установить данные</button>
      <div>Количество вакансий {Items.length}</div>
      
      {/* <div>fromFrom зп {sortedSalaryFrom}</div>
      <div>To зп {sortedSalaryTo}</div> */}
      {Items ? Items.map((el)=><div>{el.name}</div>):"1"}
      <Bar  data={data} />;
      
      </body>
    </div>  
  );
}}

export default App;
