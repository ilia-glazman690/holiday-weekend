// Function to update the styling of time blocks based on the current hour
function updateHourBlocks() {
  // Get the current hour in 24-hour format using Day.js
  const currentHour = dayjs().format("H");

  // Loop through each time block
  $(".time-block").each(function () {
    // Extract the hour from the time block's id (e.g., hour-9)
    const blockHour = parseInt($(this).attr("id").split("-")[1]);

    // Remove all classes (past, present, future) to reset the styling
    $(this).removeClass("past present future");

    // Add the appropriate class based on the current hour
    if (blockHour < currentHour) {
      $(this).addClass("past");
    } else if (blockHour == currentHour) {
      $(this).addClass("present");
    } else {
      $(this).addClass("future");
    }
  });
}

// Function to save user input to local storage
function saveEventToLocalStorage(hourId, eventDescription) {
  // Save the user input in local storage using the hourId as the key
  localStorage.setItem(hourId, eventDescription);
}

// Function to load saved events from local storage and display them in the textareas
function loadSavedEvents() {
  // Loop through each time block
  $(".time-block").each(function () {
    // Get the time block's id (hour) to use as a key in local storage
    const hourId = $(this).attr("id");

    // Retrieve the saved event from local storage
    const savedEvent = localStorage.getItem(hourId);

    // Display the saved event in the corresponding textarea
    if (savedEvent) {
      $(this).find(".description").val(savedEvent);
    }
  });
}

// Function to initialize the work day scheduler
function initializeScheduler() {
  // Get the current date using Day.js and display it in the header
  const currentDate = dayjs().format("MMMM D, YYYY");
  $("#currentDay").text(currentDate);

  // Call the function to update the hour blocks
  updateHourBlocks();

  // Call the function to load saved events from local storage
  loadSavedEvents();
}

// Call the function to initialize the work day scheduler when the page is loaded
$(function () {
  initializeScheduler();

  // Event listener for the save button
  $(".saveBtn").on("click", function () {
    // Get the user input from the corresponding textarea
    const description = $(this).siblings(".description").val().trim();

    // Get the time block's id (hour) to use as a key in local storage
    const hourId = $(this).parent().attr("id");

    // Call the function to save the event to local storage
    saveEventToLocalStorage(hourId, description);
  });

  // Set an interval to update the hour blocks every minute to reflect real-time changes
  setInterval(updateHourBlocks, 60000);
});


