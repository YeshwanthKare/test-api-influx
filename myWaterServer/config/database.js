const Influx = require("influx");
const dotenv = require("dotenv");

dotenv.config();

const influx = new Influx.InfluxDB({
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  schema: [
    {
      measurement: "session",
      fields: {
        iccid: Influx.FieldType.INTEGER,
        ADC_main: Influx.FieldType.BOOLEAN,
        ADC1: Influx.FieldType.INTEGER,
        ADC2: Influx.FieldType.INTEGER,
        ADC3: Influx.FieldType.INTEGER,
        ADC4: Influx.FieldType.INTEGER,
        ADC5: Influx.FieldType.INTEGER,
        ADC6: Influx.FieldType.INTEGER,
      },
      tags: ["ADC_main", "ADC1", "ADC2", "ADC3", "ADC4", "ADC5", "ADC6"],
    },
  ],
});

module.exports = influx;
