// Display date at top of page
var date = moment().format('dddd, MMMM Do');
$('#currentDay').text(date);

// GLOBALS
var containerEl = $('.container');
// specify range of work day
var dayStart = 9;
var dayEnd = 17;

