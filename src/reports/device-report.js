import Table from 'table-builder';
import Chart from 'chart.js/auto';

export const deviceReport = {
  headers: {"id": `ID`, "refillsCount": `Number of refills`, "waterLiters": `Liters of water`, "carbonEmissions": `CO2 emissions`, "plasticWaste": `Plastic waste`},
  createTable() {
    const result = document.createElement(`DIV`);

    const dataTransformed = [{
      id: 1,
      refillsCount: 40,
      waterLiters: 80,
      carbonEmissions: 7344,
      plasticWaste: 1600,
    }];
    const table = new Table({'class': `some-table`})
      .setHeaders(this.headers)
      .setData(dataTransformed)
      .render();

    result.insertAdjacentHTML(`beforeend`, table);
    result.appendChild(document.createElement(`BR`));

    const usageGraphBlock = document.createElement(`DIV`);
    const usageGraphArea = usageGraphBlock.appendChild(document.createElement(`CANVAS`));
    usageGraphBlock.style.width = `800px`;
    usageGraphBlock.style.height = `400px`;

    const labels = [];
    const data = [];
    for (let i = 1; i < 31; i++) {
      labels.push(i);
      data.push(Math.floor(Math.random() * i));
    }
    // eslint-disable-next-line no-unused-vars
    const usageGraphChart = new Chart(usageGraphArea, {
      type: `bar`,
      data: {
        labels,
        datasets: [{
          label: `Number of refills`,
          data,
          backgroundColor: [
            `rgba(54, 162, 235, 0.2)`,
          ],
          borderColor: [
            `rgba(54, 162, 235, 1)`,
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        },
        plugins: {
          legend: {
            position: `top`,
          },
          title: {
            display: true,
            text: `Refills per day`
          }
        }
      }
    });

    result.appendChild(usageGraphBlock);


    const pieChart = document.createElement(`DIV`);
    pieChart.style.width = `300px`;
    pieChart.style.height = `300px`;
    const pieChartGraph = pieChart.appendChild(document.createElement(`CANVAS`));
    // eslint-disable-next-line no-unused-vars
    const pieChartResult = new Chart(pieChartGraph, {
      type: `doughnut`,
      data: {
        labels: [`Refills total`, `Refills last month`, `Refills current month`],
        datasets: [{
          label: `Refills`,
          data: [120, 10, 40],
          backgroundColor: [
            `rgba(255, 99, 132, 0.2)`,
            `rgb(54, 162, 235)`,
            `rgba(255, 159, 64, 0.2)`
          ],
          hoverOffset: 4
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: `top`,
          },
          title: {
            display: true,
            text: `Refills structure`
          }
        }
      }
    });

    result.appendChild(document.createElement(`BR`));

    result.appendChild(pieChart);

    return result;
  }
};
