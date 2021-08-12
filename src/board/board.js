import "./board.css";
import reportToolLoader from "../components/reportToolLoader/reportToolLoader.js";
import reportCreator from "../components/reportCreator/reportCreator.js";
import API from "../api.js";

export default class Board {
  constructor(rootElement) {
    this.rootElement = rootElement;
    this.reportCreator = reportCreator;

    this.reportIndex = 0;

    this.loaderController = this.loaderController.bind(this);
  }

  loaderController(request) {
    switch (request) {
      case "general": {
        const selector = "general-table-" + this.reportIndex;
        this.reportCreator.createGeneralTable(selector);
        this.reportIndex++;
        break;
      }
      case "errors": {
        const selector = "error-table-" + this.reportIndex;
        this.reportCreator.createErrorsTable(selector);
        this.reportIndex++;
        break;
      }
      case "balance": {
        const selector = "balance-table-" + this.reportIndex;
        this.reportCreator.createBalanceTable(selector);
        this.reportIndex++;
        break;
      }
      case "device": {
        const selector = "device-graph-" + this.reportIndex;
        this.reportCreator.createDeviceTable(selector);
        this.reportIndex++;
        break;
      }
      default:
        return;
    }
  }

  init() {
    $(this.reportCreator.init()).appendTo(this.rootElement);
    $(reportToolLoader(this.loaderController)).appendTo(this.rootElement);
  }
}
