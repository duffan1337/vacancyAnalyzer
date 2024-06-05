import vacancyReducer from '../Redux/Reducers/vacancyReducer';
import * as actions from '../Redux/Actions/vacancyAC';

describe('vacancy reducer', () => {
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

  it('should return the initial state', () => {
    expect(vacancyReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle SET_VACANCY_NAME', () => {
    const action = actions.addVacancyName('Developer');
    const expectedState = {
      ...initialState,
      vacancyName: 'Developer',
    };
    expect(vacancyReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle SET_CURRENT_PAGE', () => {
    const action = actions.setCurrentPage(2);
    const expectedState = {
      ...initialState,
      currentPage: 2,
    };
    expect(vacancyReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle ADD_ALL_VACANCY', () => {
    const vacancies = { items: [{ id: 1, name: 'Developer' }], pages: 1 };
    const action = actions.addAllVacancy(vacancies);
    const expectedState = {
      ...initialState,
      isLoaded: true,
      vacancy: vacancies.items,
      pages: vacancies.pages,
    };
    expect(vacancyReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle ADD_DETAILED_VACANCY', () => {
    const detailedVacancy = { id: 1, name: 'Developer', description: 'Job description' };
    const action = actions.addVacancyById(detailedVacancy);
    const currentState = {
      ...initialState,
      vacancy: [{ id: 1, name: 'Developer' }]
    };
    const expectedState = {
      ...currentState,
      detailedVacancy: [detailedVacancy],
      isLoaded: false
    };
    expect(vacancyReducer(currentState, action)).toEqual(expectedState);
  });
});
