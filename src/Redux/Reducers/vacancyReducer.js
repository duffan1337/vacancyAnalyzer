import { getVacancyByIdAPI } from "../../api/api";
import { addVacancyById } from "../Actions/vacancyAC";

const initialState={
    items: [],
    openItems: [],
    initialized:false,
    isLoaded:false,

    top10Skills:[],
    Experience:[],
    Employment:[],
    ExperienceBySalary:[],
    Salary:{ }
}

const getSalaryStat = (vacancies, currencies)=>{
  debugger
    let salary = getSalary(vacancies,currencies)
    let allSalary = salary.from.concat(salary.to)


   const min = Math.min(...allSalary)
   const max = Math.max(...allSalary)
   const middle = Math.trunc(allSalary.reduce((a, b) => (a + b)) / allSalary.length);
   return {
    max:max,
    min:min,
    middle:middle
    }
}


const setEmployment = (items) =>{
    let arrayOfEmployment = items.map(item =>{
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
        EmploymentStat= {...EmploymentStat, flexible: EmploymentStat.fullDay+=1}
      } 
    }
    console.log("Employment stat", EmploymentStat)
    return EmploymentStat
  }

  const setExperience = (items) =>{
    let arrayOfExperience = items.map(item =>{
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
    return ExperienceStat
  }

  

  const setKeySkills = (items) =>{
    let keySkillsStats={items:[]}
    Array.from(items, el=>Array.from(el.key_skills, (item) =>{keySkillsStats = {...keySkillsStats, items: [...keySkillsStats.items,item.name]}}))

    let map = keySkillsStats.items.reduce(function(prev, cur) {
      prev[cur] = (prev[cur] || 0) + 1;
      return prev;
    }, {});
    
    var sortable = [];
    for (var count in map) {
        sortable.push([count, map[count]]);
    }
    
    let top = sortable.sort(function(a, b) {
        return b[1] - a[1];
    });
    let top10Skills = top.slice(0,10)
    
   return top10Skills   
  }

  
  const setExperienceAndSalary = (vacancyItems,currencies) =>{
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

      
          let between1And3 =getSalary(ExperienceBySalary.between1And3,currencies)
          let between3And6=getSalary(ExperienceBySalary.between3And6,currencies)
          let noExperience = getSalary(ExperienceBySalary.noExperience,currencies)
          let moreThan6 =getSalary(ExperienceBySalary.moreThan6,currencies)
          let AVGbetween1And3= getAvg(between1And3.from.concat(between1And3.to))
           let AVGbetween3And6= getAvg(between3And6.from.concat(between3And6.to))
           let AVGnoExperience= getAvg(noExperience.from.concat(noExperience.to))
           let AVGmoreThan6= getAvg(moreThan6.from.concat(moreThan6.to))
        
        console.log("experience!!!!!", AVGbetween1And3, AVGbetween3And6, AVGnoExperience, AVGmoreThan6)
        return {AVGnoExperience, AVGbetween1And3, AVGbetween3And6, AVGmoreThan6} 
        
  }

  const getSalary = (Vacancy,currencies) =>{
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

 

  function getAvg(grades) {
    const total = grades.reduce((acc, c) => acc + c, 0);
    return Math.trunc(total / grades.length);
  }


const vacancy =  (state = initialState, action)=>{
    debugger
    console.log("payload", action.payload)
    if(action.type ==="ADD_ALL_VACANCY")
    {
        console.log("openItems",state.openItems)
        return {
            ...state,
            isLoaded:true,
            items:action.payload.items,
            openItems: [],
            between1And3Experience:[],
            between3And6Experience:[],
            noExperience:[],
        };
    }
    else if(action.type ==="ADD_OPEN_VACANCY")
    {
      debugger
        console.log("openItems",state.openItems)
        return {
            ...state,
            openItems:  [...state.openItems, action.payload],
            initialized: state.openItems.length===state.items.length-1 ? true : false,
             isLoaded: state.openItems.length===state.items.length-1 ? false : true

        };
    }
    else if(action.type ==="SET_TOP_SKILLS")
    {
        return{
            ...state,
            top10Skills:action.payload
        }
    }
    else if(action.type ==="SET_EXPERIENCE")
    {
        return{
            ...state,
            Experience:action.payload
        }
    }
    else if(action.type ==="SET_EMPLOYMENT")
    {
        return{
            ...state,
            Employment:action.payload
        }
    }
    else if(action.type ==="SET_EXPERIENCE_BY_SALARY")
    {
        return{
            ...state,
            ExperienceBySalary:action.payload
        }
    }
    else if(action.type ==="SET_SALARY")      //Сделать логику
    {

        return{
            ...state,
            Salary: getSalaryStat(action.payload)
        }
    }
    else if(action.type ==="SET_ALL_DATA")      //Сделать логику
    {
      debugger
        const items = state.openItems
      let obj ={
        ...state,
        isLoaded:false,
        Salary: getSalaryStat(items, action.payload.currencies),
        Employment: setEmployment(items),
        Experience: setExperience(items),
        top10Skills: setKeySkills(items),
        ExperienceBySalary: setExperienceAndSalary(items, action.payload.currencies)
    }
    debugger
        return obj
    }
    return state
}



export const getOpenVacancies=(vacancyItems)=>async(dispatch)=>
{

 const getCurrentVacancy =(message)=>(dispatch)=>{          //получает элемент, делает запрос 
    return getVacancyByIdAPI.getCurrentVacancy(message).then((response) => {
        dispatch(addVacancyById(response))
    })
  } 
  for (const item of vacancyItems.items) {
     await dispatch(getCurrentVacancy(item.id));
  }
}
export default vacancy