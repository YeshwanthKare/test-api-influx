import {api} from './api';
import {generalReport} from './reports/general-report';
import {maintenanceReport} from './reports/general-maintenance';
import {deviceReport} from './reports/device-report';
import {contentBlock} from './index';

export const reportCreator = {
  devicesID: null,
  devicesInfo: null,
  generalReport: null,
  maintenanceReport: null,
  deviceReport: null,
  createGeneralReport() {
    return generalReport.createTable(this.devicesInfo);
  },
  createMaintenanceReport() {
    return maintenanceReport.createTable(this.devicesInfo);
  },
  createDeviceReport() {
    return deviceReport.createTable();
  },
  registerEvent(container) {
    container.addEventListener(`click`, (evt) => {
      document.querySelector(`.content-block`).innerHTML = ``;
      if (evt.target.classList.contains(`report-button`)) {
        contentBlock.insertAdjacentHTML(`beforeend`, this.generalReport);
      }
      if (evt.target.classList.contains(`maintenance-button`)) {
        contentBlock.appendChild(this.maintenanceReport);
      }
      if (evt.target.classList.contains(`device-button`)) {
        contentBlock.appendChild(this.deviceReport);
      }
    });
  },
  async loadData(customerID) {
    const data = await api.getCustomerDeviceID(customerID);
    this.devicesID = data().devices;
    this.devicesInfo = api.getDevicesInfo(this.devicesID);
    this.generalReport = this.createGeneralReport();
    this.maintenanceReport = this.createMaintenanceReport();
    this.deviceReport = this.createDeviceReport();
    this.registerEvent(document.querySelector(`.tabs-block`));
  },
};
