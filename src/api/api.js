// import axios from "axios"

// export const instance =  axios.create({
//     baseURL:'http://127.0.0.1:8000/',
// })

// //area=16 Belarus
// export const searchAPI={
//     // getAllVacanciesByName(text = "javascript", pages=0) {
//     //     return instance.get(`vacancies?text=${text}&only_with_salary=true&page=${pages}&per_page=100&area=16`
//     //     ).then(response => response.data)
//     // },
//     getAllVacanciesByName(text = "javascript", pages=0) {
//         return instance.get(`vacancies/?text=${text}&pages=${pages}`,
//         ).then(response => response.data)
//     },

//     getVacancyById(id) {
//         return instance.get(`vacancies/${id}`
//         ).then(response =>response.data)
//         .catch((error)=>
            
//             // document.location.href = error.response.data.errors[0].captcha_url + '&backurl=' + document.location.origin
//             window.open(error.response.data.errors[0].captcha_url + '&backurl=' + document.location.origin)
//         )
// }
// }


// export const getCurrency={
//     getCurrencyValues(){
//         return axios.get("https://v6.exchangerate-api.com/v6/4f44d7ad6be4d970e8ecc92e/latest/USD/").then(response => response.data);
//     }
// }

import axios from 'axios';

export const instance = axios.create({
    baseURL: 'https://api.hh.ru/',
});

export const searchAPI = {
    getAllVacanciesByName(text = "javascript", pages = 0, region = 16) {
        console.log(region)
        return instance.get(`vacancies?text=${text}&only_with_salary=true&page=${pages}&per_page=50&area=${region}`, {
            headers: {
                'Authorization': `Bearer USERLHQPCJIAG6L8FI1SUDKRFDDGHVL6AO713JK51TLD8168JQ00IT63DPUFKN98`
            }
        })
            .then(response => response.data)
            .catch(error => {
                console.error("Error fetching vacancies:", error);
                throw error;
            });
    },

    getVacancyById(id) {
        return instance.get(`vacancies/${id}`, {
            headers: {
                'Authorization': `Bearer USERLHQPCJIAG6L8FI1SUDKRFDDGHVL6AO713JK51TLD8168JQ00IT63DPUFKN98`
            }
        })
            .then(response => response.data)
            .catch(error => {
                if (error.response && error.response.data.errors && error.response.data.errors[0].captcha_url) {
                    window.open(error.response.data.errors[0].captcha_url + '&backurl=' + document.location.origin);
                } else {
                    console.error("Error fetching vacancy by ID:", error);
                }
                throw error;
            });
    }
}

export const getCurrency = {
    getCurrencyValues() {
        return axios.get("https://v6.exchangerate-api.com/v6/4f44d7ad6be4d970e8ecc92e/latest/USD/")
            .then(response => response.data)
            .catch(error => {
                console.error("Error fetching currency data:", error);
                throw error;
            });
    }
}
