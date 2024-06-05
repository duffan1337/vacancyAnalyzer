import { render } from '@testing-library/react';
import { ExperienceChart } from '../Components/Charts/ExperienceChart/experienceChart';


describe('ExperienceChart', () => {
  it('renders chart correctly with given experience data', () => {
 
    const experienceData = {
      between1And3: 10,
      between3And6: 8,
      noExperience: 5,
      moreThan6: 3,
    };

    const { container } = render(<ExperienceChart experience={experienceData} />);
    expect(container.querySelector('canvas')).toBeInTheDocument();
  });
});
