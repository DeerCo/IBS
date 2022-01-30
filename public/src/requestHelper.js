/**
 * 
 * Sets up the page so that buttons are mapped to their respective functions.
 * 
 */

function pageLoader(){
    $('#main').html('\
    <h2> Current Task: ' + localStorage.task + '</h2>\
    <div id="data"> <p id="message">Use the selections at the left sidebar to query commands</p> </div>\
    ');

    $('#getAll').click(getAll);
    $('#getToday').click(getToday);
    $('#schedule').click(scheduleSetup);
    $('#delete').click(delSetup);
    $('#change').click(changeSetup);
    $('#backupAll').click(backupAll);
    $('#backupTask').click(backupTask);
}

/**
 * 
 * Obtains a JSON file from the backend
 * Generated a table based on rows and columns.
 * 
 * @param { JSON file } rawData 
 * 
 * 
 * @returns HTML File
 */

function makeTable(rawData){
    let cleanData = rawData.replaceAll('\"', '');
    let dataRows = cleanData.split('\n');
    let table = "<table>";

    for ( let i = 0; i < dataRows.length; i++ ){
        let dataCol = dataRows[i].split(",");
        let elementTag = 'td>';
        table += '<tr>';
        if(dataCol[0] == 'id') elementTag = 'th>';
        for( let j = 0; j < dataCol.length; j++ ) {
            let element = dataCol[j]
            table += `<${elementTag} ${element} </${elementTag}`;
        }
        table += '</tr>';
    }
    table += '</table>'
    return table;
}

/**
 * 
 * Displays the schedule form.
 * 
 */

function scheduleSetup() {
    let htmlString = '<form id="scheduleForm"> \
                        <label for="date">Date: </label>\
                        <input type="date" id="date" name="date" required" /><br>\
                        <label for="time">Time: </label>\
                        <input type="time" id="time" name="time" required" /><br>\
                        <label for="length">Duration: </label>\
                        <input type="number" id="length" name="length" value="15" required /><br>\
                        <label for="location">Location: </label>\
                        <input type="text" id="location" name="location" value="zoom" /><br>\
                        <input type="submit" id="submit" value="Schedule Interview" />\
                    </form>\
                    <div id="errMessage"><div>';
    $('#data').html(htmlString);
    $('#submit').click(schedule)
    $('#scheduleForm').submit(function (e) {
        e.preventDefault();
      });
}

/**
 * 
 * Obtains data from Schedule Form and sends a POST request through scheduleInterview().
 * 
 */

function schedule() {
    $('#errMessage').html('');
    let time = $('#time').val().toString();
    let date = $('#date').val().toString();
    let length = $('#length').val().toString();
    let location = $('#location').val().toString();
    let dateTime = date + ' ' + time;

    if ( !time || !date || !length ) {
        $('#errMessage').html('<p> Please fill out all the fields</p>');
        return;
    }

    if ( !location ) {
        location = 'Zoom';
    }
    
    let payload = {
        'time': dateTime,
        'length': length,
        'location': location
    }

    scheduleInterview(payload)

}

/**
 * 
 * Displays the change form.
 * 
 */
function changeSetup() {
    let htmlString = '<form id="changeForm"> \
                        <p> Status Filter </p>\
                        <label for="id">ID: </label> <input type="number" id="id" name="id" required" /><br>\
                        <label for="time">Time: </label> <input type="time" id="time" name="time" required" /><br>\
                        <label for="date">Date: </label> <input type="date" id="date" name="date" /><br>\
                        <label for="student">Student: </label> <input type="text" id="student" name="student" /><br>\
                        <label for="length" >Length: </label> <input type="number" id="length" name="length" /><br>\
                        <label for="location">Location: </label> <input type="text" id="location" name="location" /><br>\
                        <label for="cancelled">Cancelled: </label> <select name="cancelled" id="cancelled"> <option value="none" selected> </option> <option value="true"> Yes </option> <option value="true"> No </option> </select>\
                        <label for="note">Note: </label> <input type="text" id="note" name="note" /><br>\
                        <br>\
                        <p> Change Status </p>\
                        <label for="set_time">Set Time: </label> <input type="time" id="set_time" name="set_time" /><br>\
                        <label for="set_date">Set Date: </label> <input type="date" id="set_date" name="set_time" /><br>\
                        <label for="set_length">Set Length: </label> <input type="text" id="set_length" name="set_length" /><br>\
                        <label for="set_location">Set Location: </label> <input type="text" id="set_location" name="set_location" /><br>\
                        <label for="set_cancelled">Set Canceled: </label> <select name="set_cancelled" id="set_cancelled"> <option value="none" selected> </option>  <option value="true"> Yes </option> <option value="true"> No </option> </select>\
                        <label for="set_note">Set Note: </label> <input type="text" id="set_note" name="set_note" /><br>\
                        <br>\
                        <input type="submit" id="submit" value="Change Interview" />\
                    </form>\
                    <div id="errMessage"><div>';
    $('#data').html(htmlString);
    $('#submit').click(change)
    $('#changeForm').submit(function (e) {
        e.preventDefault();
      });
}

/**
 * 
 * Obtains data from Change Form and sends a PUT request through changeInterview().
 * 
 */

function change() {
    $('#errMessage').html('')

    // Status Filters
    let id = $('#id').val().toString();
    let time = $('#time').val().toString();
    let date = $('#date').val().toString();
    let length = $('#length').val().toString();
    let student = $('#student').val().toString();
    let location = $('#location').val().toString();
    let cancelled = $('#cancelled').val().toString();
    let note = $('#note').val().toString();

    // Change Status
    let set_time = $('#set_time').val().toString();
    let set_date = $('#set_date').val().toString();
    let set_length = $('#set_length').val().toString();
    let set_location = $('#set_location').val().toString();
    let set_cancelled = $('#set_cancelled').val().toString();
    let set_note = $('#set_note').val().toString();
    let err = false;

    if ( ( !date && time ) || ( !time && date ) || ( !set_date && set_time ) || ( !set_time && set_date ) ) {
        $('#errMessage').append("Please fill out both Date and Time fields.");
        err = true;
    }

    if ( !id && !time && !date && !length && !student && !location && cancelled == 'none' && !note ) {
        $('#errMessage').append("Fill out at least one of the status filter fields.");
        err = true;
    }

    if ( !set_time && !set_length && !set_location && set_cancelled == 'none' && !set_note ) {
        $('#errMessage').append("Fill out at least one of the change status fields.");
        err = true;
    }

    if (err) return;

    time_payload = date + ' ' + time;
    set_time_payload = set_date + ' ' + set_time;
    let payload = {
        'set_time': set_time_payload,
        'set_length': set_length,
        'set_location': set_location,
        'set_cancelled': set_cancelled,
        'set_note': set_note,
        'id': id,
        'time': time_payload,
        'date': date,
        'student': student,
        'length': length,
        'location': location,
        'cancelled': cancelled,
        'note': note
    }

    for ( key in payload ) {
        if ( !payload[key] || payload[key] == 'none' || payload[key] == ' ') {
            delete payload[key];
        }
    }

    changeInterview(payload);
}


/**
 * 
 * Displays the delete form.
 * 
 */

function delSetup() {
    let htmlString = '<form id="delForm"> \
                        <label for="id">Interview ID: </label>\
                        <input type="number" id="id" name="id" required" /><br>\
                        <input type="submit" id="submit" value="Delete Interview" />\
                    </form>\
                    <div id="errMessage"><div>';
    $('#data').html(htmlString);
    $('#submit').click(del)
    $('#delForm').submit(function (e) {
        e.preventDefault();
      });
}

/**
 * 
 * Obtains data from Delete Form and sends a DELETE request through deleteInterview().
 * 
 */

function del() {
    $('#errMessage').html('');
    let id = $('#id').val().toString();

    if ( !id ) {
        $('#errMessage').html('<p> Please provide the meeting ID you would like to remove.</p>');
        return;
    }
    
    let payload = {
        'id': id,
    }

    deleteInterview(payload)
}