var tasks = {};

$("<textarea>").addClass("time-block row .btn");
console.log();

var createTask = function(taskText, taskDate, taskList) {
  // create elements that make up a task item
  var taskLi = $("<textarea>").addClass("row time-block");
  var taskSpan = $("<span>")
    .addClass("col-md 9")
    .text(taskDate);
  var taskP = $("<p>")
    .addClass("m-1")
    .text(taskText);

  // append span and p element to parent li
  taskLi.append(taskSpan, taskP);

  // check due date
  //auditTask(taskLi);

  // append to ul list on the page
  $("#list-" + taskList).append(taskLi);
};

var loadTasks = function() {
  tasks = JSON.parse(localStorage.getItem("tasks"));

  // if nothing in localStorage, create a new object to track all task status arrays
  if (!tasks) {
    tasks = {
      toDo: [],
      inProgress: [],
      inReview: [],
      done: []
    };
  }

  // loop over object properties
  $.each(tasks, function(list, arr) {
    console.log(list, arr);
    // then loop over sub-array
    arr.forEach(function(task) {
      createTask(task.text, task.date, list);
    });
  });
};

var saveTasks = function() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

// edit task description
$(".list-group").on("click", "p", function() {
  var text = $(this)
    .text()
    .trim();
  var textInput = $("<textarea>")
    .addClass("form-control")
    .val(text);  
  $(this).replaceWith(textInput);
  textInput.trigger("focus");
});

// save edit
$(".list-group").on("blur", "textarea", function() {
  // get the textarea's current value/text
  var text = $(this)
    .val()
    .trim();

  // get the parent ul's id attribute
  var status = $(this)
    .closest(".list-group")
    .attr("id")
    .replace("list-", "");
  
  // get the task's position in the list of other li elements
  var index = $(this)
    .closest(".list-group-item")
    .index();  

  tasks[status][index].text = text;
  saveTasks();

  // recreate p element
  var taskP = $("<p>")
    .addClass("m-1")
    .text(text);

  // replace textarea with p element
  $(this).replaceWith(taskP);  
});

// due date was clicked
  $(".list-group").on("click", "span", function() {
    // get current text
    var date = $(this)
      .text()
      .trim();

    //create new input element
    var dateInput = $("<input>")
      .attr("type", "text")
      .addClass("form-control")
      .val(date);
      
    // swap out elements
    $(this).replaceWith(dateInput);

    // enable jquery ui datepicker
    dateInput.datepicker({
      minDate: 1,
      onClose: function() {
        // when calendar is closed, force a "change" event on the 'dateInput'
        $(this).trigger("change");
      }
    });
    
    // automatically focus on new element
    //dateInput.trigger("focus");

    // value of due date was changed
    $(".list-group").on("change", "input[type='text']", function() {
      // get current text
      var date = $(this)
        .val()
        .trim();

      // get the parent ul's id attribute
      var status = $(this)
        .closest(".list-group")
        .attr("id")
        .replace("list-", "");
        
      // get the task's position in the list of other li elements
      var index = $(this)
        .closest(".list-group-item")
        .index();
        
      // update task in array and re-save to localstorage
      tasks[status][index].date = date;
      saveTasks();
      
      // recreate span element with bootstrap classes
      var taskSpan = $("<span>")
        .addClass("badge badge-primary badge-pill")
        .text(date);
        
      // replace input with span element
      $(this).replaceWith(taskSpan);  

      // pass task's <li> element into auditTask() to check new due date
      auditTask($(taskSpan).closest(".list-group-item"));
  
    });
  });


// save button in modal was clicked
$("#task-form-modal .btn-save").click(function() {
  // get form values
  var taskText = $("#modalTaskDescription").val();
  var taskDate = $("#modalDueDate").val();

  if (taskText && taskDate) {
    createTask(taskText, taskDate, "toDo");

    // close modal
    $("#task-form-modal").modal("hide");

    // save in tasks array
    tasks.toDo.push({
      text: taskText,
      date: taskDate
    });

    saveTasks();
  }
});

// remove all tasks
$("#remove-tasks").on("click", function() {
  for (var key in tasks) {
    tasks[key].length = 0;
    $("#list-" + key).empty();
  }
  saveTasks();
});

    // loop over current set of children in sortable list
    $(this).children().each(function() {
      var text = $(this)
        .find("p")
        .text()
        .trim();
    
      var date = $(this)
        .find("span")
        .text()
        .trim();

    // add task data to the temp array as an object
      tempArr.push({
        text: text,
        date: date
      });    
    });

    // trim down list's ID to match object property
      var arrName = $(this)
        .attr("id")
       // .replace("list-", "");

    // update array on tasks object and save
      tasks[arrName] = tempArr;
        saveTasks();
        console.log(tempArr);
  