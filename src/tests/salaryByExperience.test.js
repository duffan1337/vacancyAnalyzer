import { render } from '@testing-library/react';
import { SalaryByExperienceChart } from '../Components/Charts/SalaryByExperienceChart/salaryByExperienceChart';

describe('SalaryByExperienceChart', () => {
  it('renders chart correctly with given salary by experience data', () => {
    const salaryByExperienceData = {
      AVGnoExperience: 35000,
      AVGbetween1And3: 45000,
      AVGbetween3And6: 55000,
      AVGmoreThan6: 65000,
    };

    const { container } = render(
      <SalaryByExperienceChart experienceBySalary={salaryByExperienceData} />
    );

    expect(container.querySelector('canvas')).toBeInTheDocument();
  });
});
