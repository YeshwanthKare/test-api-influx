import Tabulator from "tabulator-tables";
import API from "../../api.js";
import Chart from "chart.js/auto";
import dayjs from "dayjs";
import "./reportCreator.css";
import { addLoaderStub, addDeleteBtn, createDeviceSelectorControls } from './utils';
import {
  SEC_IN_DAY,
  REFILL_COUNT_PER_SESSION,
  REFILL_COUNT_PER_SESSION_RENEWED,
  RENEWED_REFILL_DATE,
  ENERGY_SAFE_PER_BOTTLE,
  LITRES_OF_WATER,
  CO2_EMISSIONS,
  PLATIC_WASTE,
  FILTER_LIMIT,
  COLUMNS
} from './constants';

const reportCreator = {
  
  init() {
    return $("<div></div>").addClass("content-block");
  },

  createGeneralTable(selector) {
    addLoaderStub(selector);

    API.loadGeneralTable().then((data) => {
      const table = new Tabulator(`.${selector}`, {
        data: data,
        layout: "fitColumns",
        height: "auto",
        columns: COLUMNS.generalTable,
      });

      addDeleteBtn(selector);
    });
  },

  createErrorsTable(selector) {
    addLoaderStub(selector);

    API.loadErrorsTable().then((data) => {
      const table = new Tabulator(`.${selector}`, {
        data: data,
        layout: "fitColumns",
        height: "auto",
        columns: COLUMNS.errorsTable,
      });

      addDeleteBtn(selector);
    });
  },

  createBalanceTable(selector) {
    addLoaderStub(selector);

    API.loadBalanceTable().then((data) => {
      const table = new Tabulator(`.${selector}`, {
        data: data,
        layout: "fitColumns",
        height: "auto",
        columns: COLUMNS.balanceTable,
      });

      addDeleteBtn(selector);
    });
  },

  createDeviceTable(selector) {
    $("<div></div>").addClass(selector).appendTo($(".content-block"));

    const iccidSelectorId = `device-selector-${selector}`;
    const startSelectorId = `start-${selector}`;
    const endSelectorId = `end-${selector}`;
    const addBtnId = `add-device-${selector}`;
    const statisticsTableId = `env-table-${selector}`;
    const errorTableId = `err-table-${selector}`;

    $(`<select id='${iccidSelectorId}'></select>`).appendTo($(`.${selector}`));

    API.loadGeneralTable().then((data) => {
      
      createDeviceSelectorControls(data, iccidSelectorId, selector, addBtnId, startSelectorId, endSelectorId);

      const usageGraphBlock = $("<div></div>");
      const usageGraphArea = $('<canvas></canvas>');
      $(usageGraphArea).appendTo(usageGraphBlock);
      usageGraphBlock.appendTo($(`.${selector}`));

      const statisticsTable = $("<div></div>").addClass(statisticsTableId).appendTo($(`.${selector}`));
      const errorsTable = $("<div></div>").addClass(errorTableId).appendTo($(`.${selector}`));

      $(`#${addBtnId}`).on("click", () => {
        const startDateInputVal = new Date($(`#${startSelectorId}`).val()).getTime();
        let endDateInputVal;
        endDateInputVal = $(`#${endSelectorId}`).val()
          ? new Date($(`#${endSelectorId}`).val()).getTime()
          : new Date().getTime();

        API.loadDeviceTable(
          $(`#${iccidSelectorId}`).val(),
          startDateInputVal,
          endDateInputVal
        ).then( async (data) => {

          let fullIccidData = data;
          let additionalData;

          if (data.sessions.length === 1000) {
            additionalData = await API.loadDeviceTable(
              $(`#${iccidSelectorId}`).val(),
              data.sessions[999].start_time,
              endDateInputVal
            );
            fullIccidData = await data.sessions.concat(additionalData.sessions);
          }

          const daysCountInCurrentMonth = Math.round(
            (endDateInputVal - startDateInputVal) / SEC_IN_DAY + 1
          );
          const monthlyData = new Array(daysCountInCurrentMonth).fill(0);

          let sessionCounter = 0;
          for (let day = 0; day <= monthlyData.length; day++) {
            let nextDayEpoch = startDateInputVal + SEC_IN_DAY * (day + 1);
            while (sessionCounter < fullIccidData.length) {
              if (fullIccidData[sessionCounter].start_time < nextDayEpoch) {
                if (fullIccidData[sessionCounter].start_time > 1626393600000) {
                  monthlyData[day] += REFILL_COUNT_PER_SESSION_RENEWED;
                } else {
                  monthlyData[day] += REFILL_COUNT_PER_SESSION;
                }
                sessionCounter++;
              } else {
                break;
              }
            }
          }

          const labels = [];
          for (let i = 1; i <= daysCountInCurrentMonth; i++) {
            labels.push(i);
          }

          const usageChart = new Chart(usageGraphArea, {
            type: "bar",
            data: {
              labels,
              datasets: [
                {
                  label: "Number of refills",
                  backgroundColor: ["#3e95cd"],
                  data: monthlyData,
                },
              ],
            },
            options: {
              plugins: {
                legend: {
                  position: `top`,
                },
                title: {
                  display: true,
                  text: `Refills per day; ICCID: ${$(`#${iccidSelectorId}`).val()}`,
                },
              },
            },
          });

          let numOfRefills = 0;

          fullIccidData.forEach((session) => {
            if (session.start_time > 1626393600000) {
              numOfRefills += REFILL_COUNT_PER_SESSION_RENEWED;
            } else {
              numOfRefills += REFILL_COUNT_PER_SESSION;
            }
          });

          const envDetailsData = {
            numOfRefills,
            litOfWater: numOfRefills * LITRES_OF_WATER,
            co2Emissions: numOfRefills * CO2_EMISSIONS,
            plasticWater: numOfRefills * PLATIC_WASTE,
            energySafe: numOfRefills * ENERGY_SAFE_PER_BOTTLE,
          };


          new Tabulator(`.${statisticsTableId}`, {
            data: [envDetailsData],
            layout: "fitColumns",
            height: "auto",
            columns: COLUMNS.deviceStatisticsTable,
          });

          const deviations = [];
          fullIccidData.forEach((session) => {
            if (session["data_size"] > 1000) {
              deviations.push(session);
            }
          });

          new Tabulator(`.${errorTableId}`, {
            data: deviations,
            layout: "fitColumns",
            height: "auto",
            columns: COLUMNS.deviceErrorTable,
          });

          });

        addDeleteBtn(selector);
      });
    });
  },
};

export default reportCreator;
