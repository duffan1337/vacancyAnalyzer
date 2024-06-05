import { render } from '@testing-library/react';
import { SkillsChart } from '../Components/Charts/SkillsChart/skillsChart';

describe('SkillsChart', () => {
  it('renders chart correctly with given key skills data', () => {
    const keySkillsData = [
      ['JavaScript', 10],
      ['React', 8],
      ['HTML', 6],
      ['CSS', 4],
    ];

    const { container } = render(
      <SkillsChart keySkills={keySkillsData} />
    );

    expect(container.querySelector('canvas')).toBeInTheDocument();
  });
});
