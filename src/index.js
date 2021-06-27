// import Chart from 'chart.js/auto';
import {reportCreator} from './report';

const tabs = {
  report: `Report`,
  maintenance: `Maintenance`,
  device: `Device`,
};

const rootElement = document.querySelector(`#root`);
const tabsBlock = document.createElement(`DIV`);
tabsBlock.classList.add(`tabs-block`);
export const contentBlock = document.createElement(`DIV`);
contentBlock.classList.add(`content-block`);

const reportTab = document.createElement(`button`);
reportTab.classList.add(`report-button`);
reportTab.textContent = tabs.report;
const maintenanceTab = document.createElement(`button`);
maintenanceTab.classList.add(`maintenance-button`);
maintenanceTab.textContent = tabs.maintenance;
const deviceTab = document.createElement(`button`);
deviceTab.classList.add(`device-button`);
deviceTab.textContent = tabs.device;
tabsBlock.appendChild(reportTab);
tabsBlock.appendChild(maintenanceTab);
tabsBlock.appendChild(deviceTab);

reportCreator.loadData(1);

// setTimeout(function () {
//   console.log(reportCreator.devicesID);
//   console.log(reportCreator.devicesInfo);
//   console.log(reportCreator.generalReport);
// }, 1000);

rootElement.appendChild(tabsBlock);
rootElement.appendChild(contentBlock);
