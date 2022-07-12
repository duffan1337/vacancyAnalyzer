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
}

// const getCurrentVacancy = (message)=>{
//     return  getVacancyByIdAPI.getCurrentVacancy(message).then((response) => {
//         let j = response
//         console.log(j)
//         return j
//     })
// }

// const getOpenItems = async (items)=>{
//    let newItems = await Promise.all(items.map(async(el)=>{ 
//         let ttt;
//           await getCurrentVacancy(el.id).then(data=>ttt=data)
//           //console.log("ttt", ttt)
//           return ttt
//      }))
//      console.log("newItems",newItems)
//      return newItems
     
// }

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
    return state
}


// export const getCurrentVacancy = (message)=>{          //получает элемент, делает запрос 
//     return  getVacancyByIdAPI.getCurrentVacancy(message).then((response) => {
//         let j = response
//         console.log(j)
//         return j
//     })
//   } 

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
    // vacancyItems.items.forEach( function(el, index, array) {
    //    dispatch(getCurrentVacancy(el.id))
    // });
        // let response = await profileAPI.savePhoto(file)
        //     if(response.data.resultCode===0)
        //     {
        //     dispatch(savePhotoSuccess(response.data.data.photos))
        //     }
}
export default vacancy