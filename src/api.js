const clients = [
  {
    id: 1,
    devices: [1, 2],
  },
  {
    id: 2,
    devices: [1, 2],
  }
];

const devices = [
  {
    id: 1,
    location: `Some str. #26`,
    usage: {
      refillsTotal: 500,
      singleRefillVolume: 0.5,
      refillsLastMonth: 40,
      refillsCurrentMonth: 10,
      lifetime: 34,
      energyConsumptionTotal: 30,
      energyConsumptionLastMonth: 4,
    },
    maintenance: {
      upcoming: `12.06.21`,
      inspectionCountLastMonth: 4,
      errors: [`Electricity fluctuation`, `Low water pressure`],
      filterStatus: 76,
    },
  },
  {
    id: 2,
    location: `Some str. #23`,
    usage: {
      refillsTotal: 1200,
      singleRefillVolume: 0.5,
      refillsLastMonth: 49,
      refillsCurrentMonth: 19,
      lifetime: 56,
      energyConsumptionTotal: 87,
      energyConsumptionLastMonth: 6,
    },
    maintenance: {
      upcoming: `12.08.21`,
      inspectionCountLastMonth: 9,
      errors: [`Electricity fluctuation`, `Low water pressure`],
      filterStatus: 12,
    },
  },
  {
    id: 3,
    location: `Some str. #26`,
    usage: {
      refillsTotal: 500,
      singleRefillVolume: 0.5,
      refillsLastMonth: 40,
      refillsCurrentMonth: 10,
      lifetime: 34,
      energyConsumptionTotal: 30,
      energyConsumptionLastMonth: 4,
    },
    maintenance: {
      inspectionCountLastMonth: 4,
      errors: {
        1: `Electricity fluctuation`,
        2: `Low water pressure`,
      },
      filterStatus: 76,
    },
  },
];

export const api = {
  getCustomerDeviceID: (id) => {
    return new Promise((resolve) => {
      setTimeout(function () {
        resolve(() => {
          return clients.find((el) => el.id === id);
        });
      }, 500);
    });
  },
  getDevicesInfo: (ids) => {
    return devices.filter((device) => {
      return ids.some((id) => id === device.id);
    });
  },
};
