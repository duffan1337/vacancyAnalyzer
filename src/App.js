
import React from 'react';
import './App.css'
import { getVacancyByIdAPI, searchAPI } from './api/api';
import { useDispatch,useSelector } from 'react-redux';
import { addAllVacancy, addVacancyById, sortVacancy } from './Redux/Actions/vacancyAC';
import { useState } from 'react';
import { getOpenVacancies } from './Redux/Reducers/vacancyReducer';




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

const getMin =(array, attrib)=>{
  debugger
  return (array.length && array.reduce(function(prev, curr){ 
      return prev.salary[attrib] < curr.salary[attrib] ? prev : curr; 
  })) || null;
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
  console.log("JJJJJJJJJJJJJJJJJJJJ", Items)
  
  React.useEffect(() => {
    dispatch(sortAllVacancies());
  }, [vacancyItems]);               //КОСТЫЛЬ НУЖНО ИСПРАВИТЬ

  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  
  const getMinOrMax = (minOrMax,param) =>{

    if(minOrMax ==="MIN")
    {
      let min = vacancyItems.map(item => 
        {
          if(item.salary !== null)
          { 
          if(item.salary[param] !== null)
           {
            return item.salary[param]
           } 
           else
           {
             return `non salary ${param} value`
           }
          }
          else
          {
            return "non salary"
          }
        })
        console.log(min)
        let m = min.find(element => element > 0)
         return m
    }
    else if(minOrMax ==="MAX")
    {
      let m = vacancyItems.map(item => 
        {
          if(item.salary !== null)
          { 
            if(item.salary[param] !== null)
            {
              return item.salary[param]
            } 
            else
            {
              return `non salary ${param} value`
            }
          }
          else
          {
            return "non salary"
          }
         })
         const max = Math.max(m);
         console.log(max)
         return max
    }
  }

  if(vacancyItems.length!==Items.length)
  {
    return(
      <div>Loading data...</div>
    )
  }
  else      //В USESTATE
  {
    
    var minFrom = getMinOrMax("MIN","from")
    var maxFrom = getMinOrMax("MAX","from")
    var minTo = getMinOrMax("MIN","to")
    var maxTo = getMinOrMax("MAX","to")
  }
  return (
    <div className="App">
      <header className="App-header">
       <input className="searchInput" 
        type="text"
        value={message}
        placeholder="Введите сообщение"
        onChange={(e) => setMessage(e.target.value)}></input>
       <button className="sendButton" onClick={()=>{
        dispatch(getAllVacancies(message))
        }}>send</button>
      </header>
      <body className="App-body">
      <div>Количество вакансий</div>
      <div>MinFrom зп {minFrom}</div>
      <div>MaxTo зп {maxTo}</div>
      <div>MinTo зп {minTo}</div>
      <div>MaxFrom зп {maxFrom}</div>
      {Items ? Items.map((el)=><div>{el.name}</div>):"1"}
      </body>
    </div>  
  );
}

export default App;
