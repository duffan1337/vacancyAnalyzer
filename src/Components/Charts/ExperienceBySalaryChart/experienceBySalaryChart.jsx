import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';



export function ExperienceBySalaryChart({experienceBySalary}) {
console.log("AAAAAAAA")
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  
   const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Bar Chart',
      },
    },
  };
  
  const labels = ['Без опыта ', '1-3 года', '3-6 лет', '6 и более лет'];
  
   const data = {
    labels,
    datasets: [
      {
        label: 'Зарплаты',
        data: [experienceBySalary.AVGnoExperience,experienceBySalary.AVGbetween1And3,experienceBySalary.AVGbetween3And6,experienceBySalary.AVGmoreThan6],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
  
    ],
  };

  return (
    <div className="experienceBySalaryChart">
  <Bar options={options} data={data} />
  </div>
  )
}
