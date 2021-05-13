import Chart from 'chart.js/auto';
import Table from 'table-builder';

const dataTransformer = (deviceInfo) => {
  return [{
    "id": deviceInfo.id,
    "location": deviceInfo.location,
    "upcoming": deviceInfo.maintenance.upcoming,
    "inspectionCountLastMonth": deviceInfo.maintenance.inspectionCountLastMonth,
    "errors": deviceInfo.maintenance.errors,
  }];
};

const createChart = (filterInfo) => {
  const usageGraphBlock = document.createElement(`DIV`);
  usageGraphBlock.style.width = `200px`;
  usageGraphBlock.style.height = `200px`;
  const usageGraphArea = usageGraphBlock.appendChild(document.createElement(`CANVAS`));
  // eslint-disable-next-line no-unused-vars
  const usageGraphChart = new Chart(usageGraphArea, {
    type: `doughnut`,
    data: {
      labels: [`Filter progress`, `Residual`],
      datasets: [{
        label: `Filter progress of the device`,
        data: filterInfo,
        backgroundColor: [
          `rgba(255, 99, 132, 0.2)`,
          `rgb(54, 162, 235)`
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
          text: `Filter progress of the device`
        }
      }
    }
  });
  return usageGraphBlock;
};

export const maintenanceReport = {
  headers: {"id": `ID`, "location": `Location`, "upcoming": `Upcoming maintenance`, "inspectionCountLastMonth": `Inspection count`, "errors": `Errors`},
  createTable(data) {
    const result = document.createElement(`DIV`);

    data.forEach((el, i) => {
      const heading = document.createElement(`H2`);
      heading.textContent = `Device #${i + 1}`;

      result.appendChild(heading);

      const dataTransformed = dataTransformer(el);
      const table = new Table({'class': `another-table`})
        .setHeaders(this.headers)
        .setData(dataTransformed)
        .render();
      result.insertAdjacentHTML(`beforeend`, table);

      const filterInfo = [];
      filterInfo.push(el.maintenance.filterStatus);
      filterInfo.push(100 - el.maintenance.filterStatus);
      result.appendChild(createChart(filterInfo));

      result.appendChild(document.createElement(`BR`));
    });

    return result;
  }
};
