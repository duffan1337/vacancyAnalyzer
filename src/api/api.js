import * as axios from "axios"
import { useDebugValue } from "react"


export const instance =  axios.create({
    baseURL:'https://api.hh.ru/',
    
 
})


export const searchAPI={
    getSearchId(text = "javascript") {
        return instance.get(`vacancies?text=${text}&only_with_salary=true&per_page=5`
        ).then(response => response.data)
    },
}

export const getVacancyByIdAPI={
    getCurrentVacancy(id) {
        return instance.get(`vacancies/${id}`
        ).then(response =>response.data)
    },
}

export const getCurrency={
    getCurrencyValues(){
        return axios.get("https://v6.exchangerate-api.com/v6/4f44d7ad6be4d970e8ecc92e/latest/USD/").then(response => response.data);
    }
}

