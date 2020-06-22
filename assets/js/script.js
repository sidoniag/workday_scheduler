
// display date at top of page
var date = moment().format('dddd, MMMM Do');
$('#currentDay').text(date);

var containerEl = $('.container');
// specify range of work day
var dayStart = 9;
var dayEnd = 17;

// create an hour block for each hour in the workday
for (var i = dayStart; i <= dayEnd; i++) {
	createTask(i);
}
// create tasks
function createTask(time) {
	// create moment object for hour block at current iteration
	var hour = moment(time, 'h');
	// format as x:00AM/PM
	var hourDisplay = hour.format('hA');

	// build calendar task block
	var inputGroupEl = $('<div>').addClass('input-group');
	var inputGroupPreEl = $('<div>').addClass('input-group-prepend');
	var timeSpanEl = $('<span>').addClass('hour').text(hourDisplay);
	var taskEl = $('<textarea>').addClass('form-control').attr('data-id', time);
	var inputGroupAppEl = $('<div>').addClass('input-group-append');
	var saveBtnEl = $('<span>')
		.addClass('input-group-text saveBtn')
		.attr('data-id', time);
	var calendarIconEl = $('<i>').addClass('fas fa-calendar-plus');

	inputGroupAppEl.append(saveBtnEl);
	saveBtnEl.append(calendarIconEl);
	inputGroupPreEl.append(timeSpanEl);
	inputGroupEl.append(inputGroupPreEl, taskEl, inputGroupAppEl);
	containerEl.append(inputGroupEl);

	// pass current hour block and event block
	//styleEventColor(hour, eventEl);
}
var saveTasks = function() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
// save tasks
$(".saveBtn").on("click", saveTask);

  var text = $(this)
    .val()
    .trim();


  
    };    

createTask();