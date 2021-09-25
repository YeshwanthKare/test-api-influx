import API from "../api";

export default class DeviceReport {
  constructor(selector) {
    this.selector = selector;

    this.iccidSelectorId = `device-selector-${selector}`;
    this.startSelectorId = `start-${selector}`;
    this.endSelectorId = `end-${selector}`;
    this.addBtnId = `add-device-${selector}`;
    this.statisticsTableId = `env-table-${selector}`;
    this.filterStatusId = `filter-status-${selector}`;
    this.errorTableId = `err-table-${selector}`;

    this.contentWrapper = document.createElement("DIV");
    this.deviceSelect = document.createElement("SELECT");
    this.startDateSelector = $(
      `<input type="date" id="${this.startSelectorId}">`
    );
    this.endDateSelector = $(`<input type="date" id="${this.endSelectorId}">`);
    this.addButton = $(`<button id="${this.addBtnId}">Add</button>`);
  }

  generateReportControlElements(data) {
    data.forEach((device) => {
      $(`<option value="${device.iccid}">${device.iccid}</option>`).appendTo(
        $(this.deviceSelect)
      );
    });
    this.startDateSelector.appendTo($(this.contentWrapper));
    this.endDateSelector.appendTo($(this.contentWrapper));
    this.addButton.appendTo($(this.contentWrapper));
  }

  async createReportControl() {
    $(this.deviceSelect).appendTo($(this.contentWrapper));
    const data = await API.loadGeneralTable();
    this.generateReportControlElements(data);
  }

  handleReportAddBtn() {
    this.addButton.on("click", () => {
      console.log("kek");
    });
  }

  async init() {
    this.contentWrapper.classList.add(this.selector);

    await this.createReportControl();
    this.handleReportAddBtn();

    return this.contentWrapper;
  }
}
