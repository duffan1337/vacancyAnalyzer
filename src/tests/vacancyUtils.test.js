import { getSalaryStat, setSchedule, setExperience, setTop10Skills, setCities, setSalaryByExperience } from '../Redux/Reducers/vacancyReducer';

describe('utility functions', () => {
  const mockVacancies = [
    { salary: { from: 500, to: 1000, currency: 'USD' } },
    { salary: { from: 600, to: 1100, currency: 'USD' } },
  ];

  const mockCurrencies = { USD: 1, EUR: 0.9 };

  it('getSalaryStat should calculate correct salary statistics', () => {
    const salaryStat = getSalaryStat(mockVacancies, mockCurrencies);
    expect(salaryStat).toEqual({
      max: 1100,
      min: 500,
      middle: 800,
    });
  });

  it('setSchedule should calculate correct schedule statistics', () => {
    const mockItems = [
      { schedule: { id: 'remote' } },
      { schedule: { id: 'fullDay' } },
      { schedule: { id: 'flexible' } },
      { schedule: { id: 'remote' } },
    ];
    const scheduleStat = setSchedule(mockItems);
    expect(scheduleStat).toEqual({
      remote: 2,
      fullDay: 1,
      flexible: 1,
    });
  });

  it('setExperience should calculate correct experience statistics', () => {
    const mockItems = [
      { experience: { id: 'between1And3' } },
      { experience: { id: 'between3And6' } },
      { experience: { id: 'noExperience' } },
      { experience: { id: 'moreThan6' } },
      { experience: { id: 'moreThan6' } },
    ];
    const experienceStat = setExperience(mockItems);
    expect(experienceStat).toEqual({
      between1And3: 1,
      between3And6: 1,
      noExperience: 1,
      moreThan6: 2,
    });
  });

  it('setTop10Skills should calculate correct top 10 skills', () => {
    const mockItems = [
      { key_skills: [{ name: 'React' }, { name: 'JavaScript' }] },
      { key_skills: [{ name: 'React' }, { name: 'CSS' }] },
    ];
    const top10Skills = setTop10Skills(mockItems);
    expect(top10Skills).toEqual([
      ['React', 2],
      ['JavaScript', 1],
      ['CSS', 1],
    ]);
  });

  it('setCities should calculate correct top 10 cities', () => {
    const mockItems = [
      { address: { city: 'New York' } },
      { address: { city: 'Los Angeles' } },
      { address: { city: 'New York' } },
    ];
    const top10Cities = setCities(mockItems);
    expect(top10Cities).toEqual([
      ['New York', 2],
      ['Los Angeles', 1],
    ]);
  });

  it('setSalaryByExperience should calculate correct salary by experience', () => {
    const mockVacancyItems = [
      { experience: { id: 'between1And3' }, salary: { from: 500, to: 1000, currency: 'USD' } },
      { experience: { id: 'between3And6' }, salary: { from: 600, to: 1100, currency: 'USD' } },
      { experience: { id: 'noExperience' }, salary: { from: 400, to: 900, currency: 'USD' } },
      { experience: { id: 'moreThan6' }, salary: { from: 700, to: 1200, currency: 'USD' } },
    ];
    const salaryByExperience = setSalaryByExperience(mockVacancyItems, mockCurrencies);
    expect(salaryByExperience).toEqual({
      AVGbetween1And3: 750,
      AVGbetween3And6: 850,
      AVGnoExperience: 650,
      AVGmoreThan6: 950,
    });
  });
});
