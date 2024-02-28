$(function () {
  // Display the current day
  $("#currentDay").text(dayjs().format("dddd, MMMM D, YYYY"));

  // Dynamically generate time blocks
  for (let hour = 9; hour <= 17; hour++) {
    let timeBlock = $(`
      <div id="hour-${hour}" class="row time-block">
        <div class="col-2 col-md-1 hour text-center py-3">${hour <= 12 ? hour : hour - 12}${hour < 12 ? 'AM' : 'PM'}</div>
        <textarea class="col-8 col-md-10 description" rows="3"></textarea>
        <button class="btn saveBtn col-2 col-md-1" aria-label="save">
          <i class="fas fa-save" aria-hidden="true"></i>
        </button>
      </div>
    `);

    // color coding
    let currentHour = dayjs().hour();
    if (hour < currentHour) {
      timeBlock.addClass("past");
    } else if (hour === currentHour) {
      timeBlock.addClass("present");
    } else {
      timeBlock.addClass("future");
    }

    // Append to container
    $(".container-lg").append(timeBlock);

    // Load saved events
    $(`#hour-${hour} .description`).val(localStorage.getItem(`hour-${hour}`));
  }

  // Save button click event
  $(".container-lg").on("click", ".saveBtn", function () {
    let parentDiv = $(this).parent();
    let hourId = parentDiv.attr("id");
    let textArea = parentDiv.find(".description");
    localStorage.setItem(hourId, textArea.val());
  });

  // Refresh time block colors every minute
  setInterval(function () {
    $('.time-block').each(function () {
      let blockHour = parseInt($(this).attr("id").replace("hour-", ""));
      let currentHour = dayjs().hour();

      $(this).removeClass("past present future");
      if (blockHour < currentHour) {
        $(this).addClass("past");
      } else if (blockHour === currentHour) {
        $(this).addClass("present");
      } else {
        $(this).addClass("future");
      }
    });
  }, 60000);
});