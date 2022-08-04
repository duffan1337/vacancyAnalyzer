import React from 'react';
import "./salaryByExperienceChart.css"
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



export function SalaryByExperienceChart({experienceBySalary}) {

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  
   const options = {
    indexAxis: 'y',
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Зарплата',
      },
    },
  };
  
  const labels = ['Без опыта ', '1-3 года', '3-6 лет', '6 и более лет'];
  
   const data = {
    labels,
    datasets: [
      {
        label: 'Зарплата',
        data: [experienceBySalary.AVGnoExperience,experienceBySalary.AVGbetween1And3,experienceBySalary.AVGbetween3And6,experienceBySalary.AVGmoreThan6],
        borderColor: 'rgb(30, 20, 200)',
        backgroundColor: 'rgba(30, 20, 200, 0.7)',
      },
  
    ],
  };

  return (
    <div className="salaryByExperienceChart">
  <Bar options={options} data={data} />
  </div>
  )
}
