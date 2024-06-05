import { render } from '@testing-library/react';
import { ScheduleChart } from '../Components/Charts/ScheduleChart/scheduleChart';

describe('ScheduleChart', () => {
  it('renders chart correctly with given schedule data', () => {
    const scheduleData = {
      remote: 20,
      fullDay: 60,
      flexible: 20,
    };

    const { container } = render(
      <ScheduleChart schedule={scheduleData} />
    );

    expect(container.querySelector('canvas')).toBeInTheDocument();
  });
});
