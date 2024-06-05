import { addAllVacancy, addAllVacancy2, addVacancyById, addAllData, addVacancyName, setCurrentPage } from "../Actions/vacancyActions";
import { getSalaryStat, setSchedule, setExperience, setTop10Skills, setCities, setSalaryByExperience } from "../../helpers";

const initialState = {
    vacancy: [],
    detailedVacancy: [],
    isLoaded: false,
    vacancyName: "",
    top10Skills: [],
    experience: [],
    schedule: [],
    salaryByExperience: [],
    salaryStat: {},
    cities: [],
    currentPage: 0,
    pages: 0,
    allDataLoaded: false
};

const vacancy = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_VACANCY_NAME':
            return {
                ...state,
                vacancyName: action.payload,
            };
        case 'SET_CURRENT_PAGE':
            return {
                ...state,
                currentPage: action.payload,
            };
        case 'ADD_ALL_VACANCY':
            return {
                ...state,
                isLoaded: true,
                vacancy: action.payload.items,
                detailedVacancy: [],
                pages: action.payload.pages
            };
        case 'ADD_ALL_VACANCY_2':
            return {
                ...state,
                vacancy: [...state.vacancy, ...action.payload.items],
                pages: action.payload.pages
            };
        case 'ADD_DETAILED_VACANCY':
            return {
                ...state,
                detailedVacancy: [...state.detailedVacancy, action.payload],
                isLoaded: state.detailedVacancy.length === state.vacancy.length - 1 ? false : true
            };
        case 'SET_ALL_DATA':
            const items = state.detailedVacancy;
            return {
                ...state,
                salaryStat: getSalaryStat(items, action.payload.currencies),
                schedule: setSchedule(items),
                experience: setExperience(items),
                top10Skills: setTop10Skills(items),
                salaryByExperience: setSalaryByExperience(items, action.payload.currencies),
                cities: setCities(items),
                isLoaded: false,
                allDataLoaded: true
            };
        default:
            return state;
    }
};

export default vacancy;
