import html2PDF from 'jspdf-html2canvas';

import Board from './board/board.js';

import jQuery from "jquery";
window.$ = window.jQuery = jQuery;

$( document ).ready(function() {
  if (!sessionStorage.getItem('key')) {
    sessionStorage.setItem('key', window.prompt('Enter Auth Key'));
  }

  const board = new Board($('#root')).init();

  $("<button>Print</button>")
  .addClass("print-btn")
  .appendTo($("#root"))
  .click(() => {
    html2PDF(document.body, {
      jsPDF: {
        format: "a4",
      },
      imageType: "image/jpeg",
      imageQuality: 1,
      margin: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      },
      output: "report.pdf",
    });
  });
});