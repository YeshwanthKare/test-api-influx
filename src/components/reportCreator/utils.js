export const addLoaderStub = (selector) => {
  $("<div>Loading...</div>").addClass(selector).appendTo($(".content-block"));
};

export const addDeleteBtn = (selector) => {
  $("<button>Delete</button>")
    .addClass("delete-btn")
    .appendTo($(".content-block"))
    .click((e) => {
      $(`.${selector}`).remove();
      $(e.target).remove();
    });
};

export const createDeviceSelectorControls = (data, parentEl, selector, addBtnId, start, end) => {
  data.forEach((device) => {
    $(`<option value="${device.iccid}">${device.iccid}</option>`).appendTo(
      $(`#${parentEl}`)
    );
  });
  $(`<input type="date" id="${start}">`).appendTo($(`.${selector}`));
  $(`<input type="date" id="${end}">`).appendTo($(`.${selector}`));
  $(`<button id="${addBtnId}">Add</button>`).appendTo($(`.${selector}`));
};
