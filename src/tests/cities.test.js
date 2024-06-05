import { render } from '@testing-library/react';
import { CitiesChart } from '../Components/Charts/CitiesChart/CitiesChart';

describe('CitiesChart', () => {
  it('renders chart correctly with given city data', () => {
    const citiesData = [
      ['Москва', 10],
      ['Санкт-Петербург', 8],
      ['Екатеринбург', 6],
      ['Новосибирск', 5],
      ['Краснодар', 4],
      ['Казань', 3],
      ['Воронеж', 2],
      ['Омск', 2],
      ['Самара', 1],
      ['Уфа', 1],
    ];

    const { container } = render(<CitiesChart cities={citiesData} />);

    expect(container.querySelector('canvas')).toBeInTheDocument();
  });
});
