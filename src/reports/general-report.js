import Table from 'table-builder';

const dataTransformer = (deviceInfo) => {
  return {
    "id": deviceInfo.id,
    "location": deviceInfo.location,
    "refillsTotal": deviceInfo.usage.refillsTotal,
    "refillsMonth": deviceInfo.usage.refillsLastMonth,
    "energyTotal": deviceInfo.usage.energyConsumptionTotal,
    "energyMonth": deviceInfo.usage.energyConsumptionLastMonth,
    "usagePerDay": Math.floor(deviceInfo.usage.refillsTotal / deviceInfo.usage.lifetime),
  };
};

export const generalReport = {
  headers: {"id": `ID`, "location": `Location`, "refillsTotal": `Refills Total`, "refillsMonth": `Refills Last Month`, "energyTotal": `Energy Total`, "energyMonth": `Energy Last Month`, "usagePerDay": `Usage Per day`},
  createTable(data) {
    const dataTransformed = data.map((el) => dataTransformer(el));
    return new Table({'class': `some-table`})
      .setHeaders(this.headers)
      .setData(dataTransformed)
      .render();
  }
};
