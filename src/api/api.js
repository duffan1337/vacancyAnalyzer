import axios from "axios"


export const instance =  axios.create({
    baseURL:'https://api.hh.ru/',
})

//area=16 Belarus
export const searchAPI={
    getAllVacanciesByName(text = "javascript", pages=0) {
        return instance.get(`vacancies?text=${text}&only_with_salary=true&page=${pages}&per_page=100&area=16`
        ).then(response => response.data)
    },

    getVacancyById(id) {
        return instance.get(`vacancies/${id}`
        ).then(response =>response.data)
    },
}


export const getCurrency={
    getCurrencyValues(){
        return axios.get("https://v6.exchangerate-api.com/v6/4f44d7ad6be4d970e8ecc92e/latest/USD/").then(response => response.data);
    }
}

