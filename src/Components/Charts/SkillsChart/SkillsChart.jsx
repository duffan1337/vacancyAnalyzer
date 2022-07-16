import React from 'react';
import './SkillsChart.css'
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


export const SkillsChart = ({keySkills})=>{

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
            position: 'right',
          },
          title: {
            display: true,
            text: 'Топ 10 навыков',
          },
        },
      };
      
      const labels = keySkills.map(el=>el[0]);
      
       const data = {
        labels,
        datasets: [
          {
            label: 'Частота',
            data: keySkills.map(el =>el[1] ),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
          },
         
        ],
      };

    return(
        <div className="skillsChart">
            <Bar  data={data} options={options} />
        </div>
        
    )

}