import React, { useState, useEffect } from 'react';
import { fetchDailyData } from '../../api';
import { Line, Bar } from 'react-chartjs-2';

import styles from './Chart.module.css';

const Chart = ({ data: { confirmed, deaths, recovered }, country }) => {
  const [dailyData, setDailyData] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      setDailyData(await fetchDailyData());
    };

    fetchAPI();
  }, []);

  const barChart = confirmed ? (
    <Bar
      data={{
        labels: ['Infected', 'Recovered', 'Deaths'],
        datasets: [
          {
            labels: 'People',
            backgroundColor: ['#b590ca', '#a7e9af', '#f67280'],
            data: [confirmed.value, recovered.value, deaths.value],
          },
        ],
      }}
      options={{
        legend: { display: false },
        title: { display: true, text: `Current state in ${country}` },
      }}
    />
  ) : null;

  const lineChart = dailyData.length ? (
    <Line
      data={{
        labels: dailyData.map(({ date }) => date),
        datasets: [
          {
            data: dailyData.map(({ confirmed }) => confirmed),
            labels: 'Infected',
            borderColor: '#b590ca',
            fill: true,
          },
          {
            data: dailyData.map(({ deaths }) => deaths),
            labels: 'Deaths',
            borderColor: '#f67280',
            backgroundColor: '#ffb6b9',
            fill: true,
          },
        ],
      }}
    />
  ) : null;

  console.log(confirmed, recovered, deaths);

  return (
    <div className={styles.container}>{country ? barChart : lineChart}</div>
  );
};

export default Chart;
