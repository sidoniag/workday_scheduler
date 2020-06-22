
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

}

// save tasks


var taskArr = loadTask() || [];

function saveTask() {
  var taskText = $(this)
    .parent()
    .val()
    .trim();

  var taskObj = {
    id : $(this).attr("data-id"),
    taskText : taskText
  };
  
  for (var i = 0; i < taskArr.length; i++) {
    if (taskArr[i].id === taskObj.id) {
      taskArr.splice(i,1);
    }

    taskArr.push(taskObj);
  };

  $(".saveBtn").on("click","span", saveTask());
}



localStorage.setItem("task", JSON.stringify(taskArr));

function loadTask() {
  var task = localStorage.getItem("task");
  task = JSON.parse(task);
  console.log(task);

  if (!task) {
    return false;
  }

  for (var i = 0; i < task.length; i++) {
    $('.form-control[data-id="' + task[i].id + '"]').val(task[i].taskText);
  }
  return task;
}
