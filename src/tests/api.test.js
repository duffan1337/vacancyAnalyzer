import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { searchAPI } from '../api/api'; 

const mock = new MockAdapter(axios);

describe('searchAPI', () => {
  afterEach(() => {
    mock.reset();
  });

  const mockResponse = {
    items: [
      { id: 1, name: 'JavaScript Developer' },
      { id: 2, name: 'Frontend Developer' },
    ],
    pages: 1,
    found: 2,
  };

  it('should fetch vacancies correctly', async () => {
    mock.onGet('https://api.hh.ru/vacancies?text=javascript&only_with_salary=true&page=0&per_page=50&area=16').reply(200, mockResponse);

    const data = await searchAPI.getAllVacanciesByName('javascript', 0, 16);

    expect(data.items).not.toHaveLength(0);
  });
});
