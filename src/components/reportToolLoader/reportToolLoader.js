import './reportToolLoader.css';
import API from '../../api.js';

const reportToolLoader = (controller) => {
  const panel = $('<div></div>')
    .addClass('report-tool-loader');

  const reportToolSelector = $('<select id="report-tool-selector"></select>')
    .append('<option disabled selected value> -- select an option -- </option>')
    .append('<option value="general">Table: General</option>')
    .append('<option value="errors">Table: Errors</option>')
    .append('<option value="balance">Table: Account Balance</option>')
    .append('<option value="device">Graph: Device</option>')
    .appendTo(panel);  

  const submitBtn = $('<button>Add</button>');

  submitBtn.on('click', () => {
    if ( $(reportToolSelector).val() ) {
      controller($(reportToolSelector).val());
    }
  });

  $(submitBtn).appendTo(panel);

  return panel;
};

export default reportToolLoader;