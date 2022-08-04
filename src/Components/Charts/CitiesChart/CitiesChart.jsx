import React from 'react';
import './CitiesChart.css'
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


export const CitiesChart = ({cities})=>{

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
            text: 'Топ 10 городов',
          },
        },
      };
      
      const labels = cities.map(el=>el[0]);
      
       const data = {
        labels,
        datasets: [
          {
            label: 'Частота',
            data: cities.map(el =>el[1] ),
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.7)',
          },
         
        ],
      };

    return(
        <div className="citiesChart">
            <Bar  data={data} options={options} />
        </div>
        
    )

}