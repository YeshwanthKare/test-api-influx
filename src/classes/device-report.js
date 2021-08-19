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
  }

  async createReportControl() {
    $(this.deviceSelect).appendTo($(this.contentWrapper));

    const data = await API.loadGeneralTable();

    data.forEach((device) => {
      $(`<option value="${device.iccid}">${device.iccid}</option>`).appendTo(
        $(this.deviceSelect)
      );
    });
    $(`<input type="date" id="${this.startSelectorId}">`).appendTo($(this.contentWrapper));
    $(`<input type="date" id="${this.endSelectorId}">`).appendTo($(this.contentWrapper));
    $(`<button id="${this.addBtnId}">Add</button>`).appendTo($(this.contentWrapper));
  }

  handleReportAddBtn() {
    this.contentWrapper.querySelector(`#${this.addBtnId}`).addEventListener('click', () => {
      console.log('kek');
    });
  }

  async init() {
    this.contentWrapper.classList.add(this.selector);

    await this.createReportControl();
    this.handleReportAddBtn();

    return this.contentWrapper;
  }
}
