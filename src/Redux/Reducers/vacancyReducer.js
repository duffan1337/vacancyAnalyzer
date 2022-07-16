import { getVacancyByIdAPI } from "../../api/api";
import { addVacancyById } from "../Actions/vacancyAC";

const initialState={
    items: [],
    totalCount: 20,
    openItems: [],
    initialized:false,

    between1And3Experience:[],
    between3And6Experience:[],
    noExperience:[],

    top10Skills:[],
    Experience:[],
    Employment:[],
    ExperienceBySalary:[],
    Salary:{ }
}

const getSalaryStat = (salary)=>{
   const min = Math.min(...salary)
   const max = Math.max(...salary)
   const middle = Math.trunc(salary.reduce((a, b) => (a + b)) / salary.length);
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


const vacancy =  (state = initialState, action)=>{
    debugger
    console.log("payload", action.payload)
    if(action.type ==="ADD_ALL_VACANCY")
    {
        console.log("openItems",state.openItems)
        return {
            ...state,
            items:action.payload.items,
            openItems: [],
            between1And3Experience:[],
            between3And6Experience:[],
            noExperience:[]
            
            //action.payload.items.map(async(el)=>{ 
            //    let ttt;
            //      await getCurrentVacancy(el.id).then(data=>ttt=data)
            //      console.log("ttt", ttt)
            //      return ttt
            // })
        };
    }
    else if(action.type ==="ADD_OPEN_VACANCY")
    {
      debugger
        console.log("openItems",state.openItems)
        return {
            ...state,
            openItems:  [...state.openItems, action.payload],
            initialized: state.openItems.length===state.items.length-1 ? true : false
            //action.payload.items.map(async(el)=>{ 
            //    let ttt;
            //      await getCurrentVacancy(el.id).then(data=>ttt=data)
            //      console.log("ttt", ttt)
            //      return ttt
            // })
        };
    }
    else if(action.type ==="SET_SORT_VACANCY")
    {
     
        return{
            ...state,
            between1And3Experience: state.openItems.filter( el=>el.experience.id==="between1And3"),
            between3And6Experience: state.openItems.filter( el=>el.experience.id==="between3And6"),
            noExperience: state.openItems.filter( el=>el.experience.id==="noExperience"),
            
            
        }
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
    else if(action.type ==="SET_ALL_DATA")      //Сделать логику
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
    else if(action.type ==="SET_DATA")      //Сделать логику
    {
        const items = state.openItems

        return{
            ...state,
            Salary: getSalaryStat(action.payload),
            Employment: setEmployment(items),
            Experience: setExperience(items),
            top10Skills: setKeySkills(items)
        }
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