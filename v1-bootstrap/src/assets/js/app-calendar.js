//________ FullCalendar
document.addEventListener('DOMContentLoaded', function() {
	var containerEl = document.getElementById('external-events-list');
	new FullCalendar.Draggable(containerEl, {
	  itemSelector: '.fc-event',
	  eventData: function(eventEl) {
		return {
		  title: eventEl.innerText.trim(),
		title: eventEl.innerText,
		className: eventEl.className + ' overflow-hidden '
		}
	  }
	});

	var calendarEl = document.getElementById('calendar');
	//RTL 
	var calendar1 = new FullCalendar1.Calendar(calendarEl, {
		headerToolbar: {
			left: 'prev,next today',
			center: 'title',
			right: 'dayGridMonth,timeGridWeek,timeGridDay'
		  },
	   navLinks: true, // can click day/week names to navigate views
	  businessHours: true, // display business hours
	  editable: true,
	  selectable: true,
	  selectMirror: true,
	  droppable: true, // this allows things to be dropped onto the calendar
		  	
	  select: function(arg) {
		var title = prompt('Event Title:');
		if (title) {
		  calendar.addEvent({
			title: title,
			start: arg.start,
			end: arg.end,
			allDay: arg.allDay
		  })
		}
		calendar.unselect()
	  },
	  eventClick: function(arg) {
		if (confirm('Are you sure you want to delete this event?')) {
		  arg.event.remove()
		}
	  },

	  editable: true,
		eventSources: [sptCalendarEvents, sptBirthdayEvents, sptHolidayEvents, sptOtherEvents,],
		
	});
	//LTR 
	var calendar = new FullCalendar.Calendar(calendarEl, {
		headerToolbar: {
			left: 'prev,next today',
			center: 'title',
			right: 'dayGridMonth,timeGridWeek,timeGridDay'
		  },
	   navLinks: true, // can click day/week names to navigate views
	  businessHours: true, // display business hours
	  editable: true,
	  selectable: true,
	  selectMirror: true,
	  droppable: true, // this allows things to be dropped onto the calendar
		  	
	  select: function(arg) {
		var title = prompt('Event Title:');
		if (title) {
		  calendar.addEvent({
			title: title,
			start: arg.start,
			end: arg.end,
			allDay: arg.allDay
		  })
		}
		calendar.unselect()
	  },
	  eventClick: function(arg) {
		if (confirm('Are you sure you want to delete this event?')) {
		  arg.event.remove()
		}
	  },

	  editable: true,
		eventSources: [sptCalendarEvents, sptBirthdayEvents, sptHolidayEvents, sptOtherEvents,],
		
	});
	// To check and add the corresponding calendar output according to direction(ltr, rtl)
	(function checkRtl(){
		let bodyRtl = $('body').hasClass('rtl');
		if (bodyRtl) {
			calendar1.render();
		}
		else{
			calendar.render();

		}
	})();
});	


// this functions are declared optionally to load the desired output for ltr and rtl using switcher

// global calendarEl value
var calendarEl = document.getElementById('calendar');
// this functions are called declared in switcher

function rtlcalendar(){
	var calendar1 = new FullCalendar1.Calendar(calendarEl, {
		headerToolbar: {
			left: 'prev,next today',
			center: 'title',
			right: 'dayGridMonth,timeGridWeek,timeGridDay'
		  },
	   navLinks: true, // can click day/week names to navigate views
	  businessHours: true, // display business hours
	  editable: true,
	  selectable: true,
	  selectMirror: true,
	  droppable: true, // this allows things to be dropped onto the calendar
		  	
	  select: function(arg) {
		var title = prompt('Event Title:');
		if (title) {
		  calendar.addEvent({
			title: title,
			start: arg.start,
			end: arg.end,
			allDay: arg.allDay
		  })
		}
		calendar.unselect()
	  },
	  eventClick: function(arg) {
		if (confirm('Are you sure you want to delete this event?')) {
		  arg.event.remove()
		}
	  },

	  editable: true,
		eventSources: [sptCalendarEvents, sptBirthdayEvents, sptHolidayEvents, sptOtherEvents,],
		
	});
	document.querySelector('.fc-media-screen')?.classList.remove('fc-direction-ltr')
	calendar1.render()
}

function ltrcalendar(){
	var calendar = new FullCalendar.Calendar(calendarEl, {
		headerToolbar: {
			left: 'prev,next today',
			center: 'title',
			right: 'dayGridMonth,timeGridWeek,timeGridDay'
		  },
	   navLinks: true, // can click day/week names to navigate views
	  businessHours: true, // display business hours
	  editable: true,
	  selectable: true,
	  selectMirror: true,
	  droppable: true, // this allows things to be dropped onto the calendar
		  	
	  select: function(arg) {
		var title = prompt('Event Title:');
		if (title) {
		  calendar.addEvent({
			title: title,
			start: arg.start,
			end: arg.end,
			allDay: arg.allDay
		  })
		}
		calendar.unselect()
	  },
	  eventClick: function(arg) {
		if (confirm('Are you sure you want to delete this event?')) {
		  arg.event.remove()
		}
	  },

	  editable: true,
		eventSources: [sptCalendarEvents, sptBirthdayEvents, sptHolidayEvents, sptOtherEvents,],
		
	});
	document.querySelector('.fc-media-screen')?.classList.remove('fc-direction-rtl')
	calendar.render()
}
$('#myonoffswitch55').click(function() {
	rtlcalendar();
});

$('#myonoffswitch54').click(function() {
	ltrcalendar();
});