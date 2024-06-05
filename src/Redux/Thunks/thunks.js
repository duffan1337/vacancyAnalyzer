import { searchAPI } from "../../api/api";
import { addAllVacancy, addAllVacancy2, addVacancyById, addVacancyName, setCurrentPage, addAllData } from "../Actions/vacancyActions";


export const getAllVacanciesOnAllPages = (pages, vacanciesName, currencies, region) => async (dispatch) => {
    for (var item = 1; item <= pages; item++) {
      await searchAPI.getAllVacanciesByName(vacanciesName, item, region).then(
        response => {
          dispatch(addAllVacancy2(response));
          dispatch(getADetailedVacancies(response));
        }
      );
      dispatch(setCurrentPage(item));
    }
    return 0;
  }
  
// Thunk
export const getAllVacancies = (vacanciesName, currencies, region) => (dispatch) => {
    dispatch(addVacancyName(vacanciesName));
    searchAPI.getAllVacanciesByName(vacanciesName, 0, region).then(
        response => {
        dispatch(addAllVacancy(response));
        dispatch(getADetailedVacancies(response));
        dispatch(getAllVacanciesOnAllPages(response.pages, vacanciesName, currencies, region));
        }
    );
}
  

export const getADetailedVacancies = (vacancyItems) => (dispatch) => {
    const getCurrentVacancy = (id) => (dispatch) => {
        return searchAPI.getVacancyById(id).then((response) => {
            dispatch(addVacancyById(response));
        });
    };

    vacancyItems.items.forEach(async (element) => {
        await dispatch(getCurrentVacancy(element.id));
    });
};
