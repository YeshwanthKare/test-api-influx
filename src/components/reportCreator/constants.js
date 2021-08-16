import dayjs from "dayjs";

export const SEC_IN_DAY = 24 * 60 * 60 * 1000;
export const REFILL_COUNT_PER_SESSION = 5;
export const REFILL_COUNT_PER_SESSION_RENEWED = 20;
export const RENEWED_REFILL_DATE = 1626393600000;
export const ENERGY_SAFE_PER_BOTTLE = 1.5;
export const LITRES_OF_WATER = 0.5;
export const CO2_EMISSIONS = 0.091;
export const PLATIC_WASTE = 0.024;
export const FILTER_LIMIT = 50000;

export const COLUMNS = {
  generalTable: [
    {
      title: "ICCID",
      field: "iccid",
    },
    {
      title: "Power",
      field: "status.primary",
    },
    {
      title: "Status",
      field: "status.secondary",
    },
  ],

  errorsTable: [
    {
      title: "ICCID",
      field: "iccid",
    },
    {
      title: "Message",
      field: "trigger",
    },
    {
      title: "Timestamp",
      field: "timestamp",
    },
  ],

  balanceTable: [
    {
      title: "Year",
      field: "year",
    },
    {
      title: "Month",
      field: "month",
    },
    {
      title: "Data used, bytes",
      field: "data_used",
    },
    {
      title: "Data cost",
      field: "data_const",
    },
  ],

  deviceStatisticsTable: [
    {
      title: "Number of refills",
      field: "numOfRefills",
    },
    {
      title: "Litres of water",
      field: "litOfWater",
    },
    {
      title: "CO2 emissions, kg",
      field: "co2Emissions",
    },
    {
      title: "Plastic waste, kg",
      field: "plasticWater",
    },
    {
      title: "Energy not wasted, kWh",
      field: "energySafe",
    },
  ],

  deviceErrorTable: [
    {
      title: "Date",
      field: "start_time",
      mutator: (value) => {
        return dayjs(value).format("DD/MM/YYYY HH:mm:ss");
      },
    },
    {
      title: "Data Size",
      field: "data_size",
    },
    {
      title: "Duration, sec",
      field: "duration_in_seconds",
    },
    {
      title: "Country",
      field: "country",
    },
  ],
};
