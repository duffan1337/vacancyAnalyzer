import * as axios from "axios"
import { useDebugValue } from "react"


export const instance =  axios.create({
    baseURL:'https://api.hh.ru/',
    
 
})


export const searchAPI={
    getSearchId(text = "javascript") {
        return instance.get(`vacancies?text=${text}&only_with_salary=true&per_page=25`
        ).then(response => response.data)
    },
}

export const getVacancyByIdAPI={
    getCurrentVacancy(id) {
        return instance.get(`vacancies/${id}`
        ).then(response =>response.data)
    },
    
}

